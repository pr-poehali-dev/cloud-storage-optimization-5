import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки на замер на email студии ГРАНЬ"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    to_email = os.environ.get('SMTP_EMAIL', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')

    if not to_email or not smtp_password:
        return {
            'statusCode': 500,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Email не настроен'})
        }

    smtp_host, smtp_port = _get_smtp_settings(to_email)

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая заявка на замер от {name}'
    msg['From'] = to_email
    msg['To'] = to_email

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #1a2744;">Новая заявка на замер — Студия ГРАНЬ</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
        <tr><td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Имя:</td>
            <td style="padding: 8px;">{name}</td></tr>
        <tr><td style="padding: 8px; background: #f5f5f5; font-weight: bold;">Телефон:</td>
            <td style="padding: 8px;"><a href="tel:{phone}">{phone}</a></td></tr>
        {"<tr><td style='padding: 8px; background: #f5f5f5; font-weight: bold;'>Комментарий:</td><td style='padding: 8px;'>" + comment + "</td></tr>" if comment else ""}
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(to_email, smtp_password)
        server.sendmail(to_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }


def _get_smtp_settings(email: str):
    domain = email.split('@')[-1].lower()
    if 'yandex' in domain or 'ya.ru' in domain:
        return 'smtp.yandex.ru', 465
    elif 'mail.ru' in domain or 'bk.ru' in domain or 'list.ru' in domain or 'inbox.ru' in domain:
        return 'smtp.mail.ru', 465
    elif 'gmail' in domain:
        return 'smtp.gmail.com', 465
    return 'smtp.yandex.ru', 465
