import { Heart, Camera, FileText, Sparkles, Eye } from "lucide-react"

const benefits = [
  {
    title: "Atendimento Intuitivo e Acolhedor",
    description: "Leituras feitas com sensibilidade, respeito e conexão espiritual verdadeira.",
    icon: <Heart className="w-6 h-6" />,
  },
  {
    title: "Fotos Reais das Cartas",
    description: "Receba imagens autênticas das cartas que saíram na sua tiragem.",
    icon: <Camera className="w-6 h-6" />,
  },
  {
    title: "Explicação Detalhada",
    description: "Interpretação completa e aprofundada de cada carta e sua mensagem.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    title: "Leitura Profunda e Personalizada",
    description: "Cada consulta é única, focada na sua situação e nas suas perguntas específicas.",
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    title: "Respostas com Clareza Espiritual",
    description: "Orientações claras e objetivas para te ajudar a tomar decisões conscientes.",
    icon: <Eye className="w-6 h-6" />,
  },
]

export function Benefits() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-mystical opacity-30" />
      <div className="bokeh-overlay opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Diferenciais</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Por Que Escolher o Tarot das Bruxas?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Uma experiência completa de autoconhecimento e orientação espiritual
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className={`bg-mystical-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 group ${
                index === benefits.length - 1 && benefits.length % 3 !== 0 
                  ? "sm:col-span-2 lg:col-span-1" 
                  : ""
              }`}
            >
              <div className="p-3 rounded-xl bg-accent/20 text-accent w-fit mb-4 group-hover:bg-accent/30 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-[var(--font-cinzel)] text-lg font-semibold mb-2 text-foreground">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
