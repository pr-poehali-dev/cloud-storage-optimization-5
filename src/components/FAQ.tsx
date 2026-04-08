import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Как происходит процесс заказа?",
    answer:
      "Всё начинается с выезда замерщика — бесплатно. Мы измеряем объект, обсуждаем ваши пожелания, подбираем материалы и предоставляем расчёт стоимости. После согласования заключаем договор и приступаем к изготовлению.",
  },
  {
    question: "Сколько времени занимает изготовление и монтаж?",
    answer:
      "Сроки зависят от сложности и объёма. Стеклянная перегородка в квартиру — от 7 до 14 дней. Зимний сад или беседка — от 3 до 6 недель. Точные сроки фиксируем в договоре.",
  },
  {
    question: "Какое стекло вы используете?",
    answer:
      "Используем только закалённое стекло толщиной от 6 до 12 мм, а также двойные и тройные стеклопакеты. Для декоративных элементов — матовое, тонированное, триплекс и витражное стекло. Все материалы сертифицированы.",
  },
  {
    question: "Делаете ли вы перегородки в съёмных квартирах или без перепланировки?",
    answer:
      "Да. Большинство наших перегородок монтируются без сверления несущих конструкций и не требуют согласования. Устанавливаем системы в аренду или на временной основе — при переезде легко демонтируются.",
  },
  {
    question: "Даёте ли вы гарантию?",
    answer:
      "Даём письменную гарантию на все конструкции — 3 года на монтаж и фурнитуру, 5 лет на стеклопакеты. При любых вопросах после сдачи объекта приезжаем и устраняем бесплатно.",
  },
  {
    question: "Как с вами связаться?",
    answer:
      "Позвоните или напишите нам — ответим в течение 15 минут в рабочее время. Выезд замерщика по Новосибирску и области организуем в удобный для вас день, включая выходные.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}