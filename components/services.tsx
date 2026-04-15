"use client"

import { Sparkles, Heart, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ServiceOption {
  duration: string
  price: number
}

interface Service {
  id: string
  name: string
  description: string
  price?: number
  options?: ServiceOption[]
  includes?: string[]
  icon: React.ReactNode
  featured?: boolean
}

const services: Service[] = [
  {
    id: "pergunta-tarot",
    name: "Pergunte ao Tarot das Bruxas",
    description: "Faça uma pergunta objetiva e receba uma leitura intuitiva com orientação clara.",
    price: 10,
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "pessoa-esconde",
    name: "O que a pessoa esconde?",
    description: "Uma leitura para entender sentimentos ocultos, intenções, segredos energéticos e o que ainda não foi revelado.",
    price: 30,
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: "tarot-bruxas",
    name: "Tarot das Bruxas",
    description: "Consulta mais profunda para quem deseja respostas claras em áreas da vida, com interpretação detalhada.",
    options: [
      { duration: "30 minutos", price: 90 },
      { duration: "1 hora", price: 140 },
    ],
    icon: <Moon className="w-6 h-6" />,
  },
  {
    id: "templo-afrodite",
    name: "Templo de Afrodite",
    description: "Leitura amorosa profunda para analisar pensamentos, sentimentos verdadeiros, expectativas, energia da conexão e tendência futura.",
    price: 50,
    includes: [
      "Foto real das cartas",
      "Explicação detalhada",
      "Orientação clara",
      "Direito a 2 perguntas adicionais",
    ],
    icon: <Heart className="w-6 h-6" />,
    featured: true,
  },
]

interface ServicesProps {
  onSelectService: (serviceId: string, option?: string) => void
}

export function Services({ onSelectService }: ServicesProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  return (
    <section id="servicos" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-mystical opacity-50" />
      <div className="bokeh-overlay opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-4">
            <Star className="w-4 h-4 text-accent" />
            <span>Nossos Serviços</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Tiragens Disponíveis
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Escolha a tiragem que mais combina com a sua necessidade e permita-se receber orientação espiritual
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Card 
              key={service.id}
              className={`bg-mystical-card border-border/50 hover:border-primary/50 transition-all duration-300 group ${
                service.featured ? "md:col-span-2 ring-1 ring-accent/30" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors ${
                    service.featured ? "bg-accent/20 text-accent" : ""
                  }`}>
                    {service.icon}
                  </div>
                  {service.featured && (
                    <span className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full border border-accent/30">
                      Mais Completo
                    </span>
                  )}
                </div>
                <CardTitle className="font-[var(--font-cinzel)] text-xl md:text-2xl pt-4 text-foreground">
                  {service.name}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-base leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {service.includes && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Inclui:</p>
                    <ul className="space-y-1">
                      {service.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {service.price && (
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-2xl font-semibold text-foreground">
                      {formatPrice(service.price)}
                    </span>
                    <Button 
                      onClick={() => onSelectService(service.id)}
                      className={`${
                        service.featured 
                          ? "bg-accent hover:bg-accent/90 text-accent-foreground glow-gold" 
                          : "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                      }`}
                    >
                      Selecionar
                    </Button>
                  </div>
                )}

                {service.options && (
                  <div className="space-y-3 pt-4 border-t border-border/50">
                    {service.options.map((option, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border/30">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-foreground">{option.duration}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-foreground">
                            {formatPrice(option.price)}
                          </span>
                          <Button 
                            size="sm"
                            onClick={() => onSelectService(service.id, option.duration)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground"
                          >
                            Selecionar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function Moon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}
