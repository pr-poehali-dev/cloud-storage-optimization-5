import { ArrowRight } from "lucide-react"
import { HighlightedText } from "./HighlightedText"
import { useState } from "react"

const SEND_ORDER_URL = "https://functions.poehali.dev/e92e40fb-dcfb-48aa-91e7-904593fdc895"

export function CallToAction() {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [comment, setComment] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(SEND_ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, comment }),
      })
      if (res.ok) {
        setStatus("success")
        setName("")
        setPhone("")
        setComment("")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-32 md:py-29 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary-foreground/60 text-sm tracking-[0.3em] uppercase mb-8">Начать проект</p>

          <h2 className="text-3xl md:text-4xl lg:text-6xl font-medium leading-[1.1] tracking-tight mb-8 text-balance">
            Хотите больше
            <br />
            света в доме? <HighlightedText>Позвоните нам.</HighlightedText>
          </h2>

          <p className="text-primary-foreground/70 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
            Выезжаем на замер бесплатно. Рассчитаем стоимость в день обращения. Работаем по Москве и области.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="tel:+79231072101"
              className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 group"
            >
              +7 923 107 21 01
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="max-w-xl mx-auto">
            <p className="text-primary-foreground/60 text-sm tracking-[0.2em] uppercase mb-8">Или оставьте заявку на замер</p>

            {status === "success" ? (
              <div className="bg-primary-foreground/10 border border-primary-foreground/20 px-8 py-10 text-center">
                <p className="text-2xl mb-3">✓</p>
                <p className="text-primary-foreground text-lg font-medium mb-2">Заявка отправлена!</p>
                <p className="text-primary-foreground/70">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors"
                />
                <textarea
                  placeholder="Комментарий (необязательно)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  className="bg-transparent border border-primary-foreground/30 px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/70 transition-colors resize-none"
                />
                {status === "error" && (
                  <p className="text-red-400 text-sm">Ошибка отправки. Пожалуйста, позвоните нам напрямую.</p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-3 bg-primary-foreground text-foreground px-8 py-4 text-sm tracking-wide hover:bg-primary-foreground/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {status === "loading" ? "Отправляем..." : "Записаться на замер"}
                  {status !== "loading" && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
