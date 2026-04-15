import { Sparkles, FileText, Calendar, CreditCard } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Escolha sua tiragem",
    description: "Navegue pelos serviços disponíveis e escolha a tiragem que mais combina com sua necessidade.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    number: "02",
    title: "Preencha seus dados",
    description: "Informe seus dados de contato, a pergunta ou tema que deseja explorar e outras informações importantes.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    number: "03",
    title: "Escolha um horário",
    description: "Selecione a data e horário de sua preferência para receber sua leitura personalizada.",
    icon: <Calendar className="w-6 h-6" />,
  },
  {
    number: "04",
    title: "Faça o pagamento",
    description: "Finalize seu pedido com o pagamento seguro e aguarde a confirmação por e-mail ou WhatsApp.",
    icon: <CreditCard className="w-6 h-6" />,
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4 text-accent" />
            <span>Processo Simples</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Como Funciona
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Agendar sua tiragem é simples e rápido. Siga os passos abaixo
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="relative group"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[calc(100%-20%)] h-px bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="bg-mystical-card border border-border/50 rounded-2xl p-6 h-full hover:border-primary/50 transition-all duration-300 group-hover:-translate-y-1">
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-[var(--font-cinzel)] text-4xl font-bold text-primary/30">
                    {step.number}
                  </span>
                  <div className="p-3 rounded-xl bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="font-[var(--font-cinzel)] text-xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-pretty">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
