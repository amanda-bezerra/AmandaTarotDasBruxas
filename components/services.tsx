"use client"

import type React from "react"

import { Sparkles, Heart, Clock, Star, HelpCircle, Package, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Service {
  id: string
  name: string
  description: string
  price: number
  priceSuffix?: string
  includes?: string[]
  icon: React.ReactNode
  featured?: boolean
}

const services: Service[] = [
  {
    id: "pergunta-objetiva",
    name: "Pergunta Objetiva ao Tarô",
    description:
      "Faça uma pergunta objetiva e receba seu direcionamento com uma leitura intuitiva e clara.",
    price: 25,
    priceSuffix: "cada",
    includes: ["Resposta por áudio", "Foto das cartas", "Carta do dia gratuita"],
    icon: <HelpCircle className="w-6 h-6" />,
  },
  {
    id: "tiragem-completa",
    name: "1 Tiragem Completa",
    description:
      "Leitura completa com interpretação das cartas e direcionamento espiritual sobre a sua situação. Escolha o tema: amor, profissional, financeiro, espiritual ou qualquer tema.",
    price: 75,
    includes: ["Resposta por áudio", "Imagens das cartas"],
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: "proximo-amor",
    name: "Meu Próximo Amor",
    description:
      "Descubra como e onde vão se conhecer, possível aparência e personalidade, data aproximada, se será um relacionamento rápido ou duradouro, o que terão em comum e o conselho dos guias.",
    price: 45,
    includes: ["Leitura intuitiva e detalhada", "Orientação dos guias", "Conselho gratuito"],
    icon: <Heart className="w-6 h-6" />,
  },
  {
    id: "templo-afrodite",
    name: "Templo de Afrodite",
    description:
      "Tiragem especial de 8 cartas para descobrir tudo sobre uma conexão: sentimentos, pensamentos e intenções de ambos, o que une os dois e o conselho de Afrodite.",
    price: 50,
    includes: [
      "Leitura completa e detalhada",
      "Energia do amor e da intuição",
      "Respostas profundas e claras",
    ],
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: "pacote-completo",
    name: "Pacote Completo com Todas",
    description:
      "Leitura das cartas em todas as áreas da sua vida em uma única consulta. A opção mais completa para quem busca clareza total.",
    price: 150,
    includes: ["Todas as áreas da vida", "Resposta por áudio", "Imagens das cartas"],
    icon: <Package className="w-6 h-6" />,
    featured: true,
  },
  {
    id: "consulta-1h",
    name: "Consulta Completa (1 hora)",
    description:
      "Uma hora inteira dedicada a você, com aprofundamento em cada pergunta e direcionamento espiritual detalhado sobre sua situação.",
    price: 200,
    includes: ["1 hora de atendimento", "Resposta por áudio", "Imagens das cartas"],
    icon: <Clock className="w-6 h-6" />,
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
            <Moon className="w-4 h-4 text-accent" />
            <span>Valores</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Tiragens Disponíveis
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Leituras feitas com o Tarô Rider Waite Deck, com intuição, respeito e responsabilidade
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`bg-mystical-card border-border/50 hover:border-primary/50 transition-all duration-300 group flex flex-col ${
                service.featured ? "md:col-span-2 ring-1 ring-accent/30" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div
                    className={`p-3 rounded-xl bg-primary/20 text-primary group-hover:bg-primary/30 transition-colors ${
                      service.featured ? "bg-accent/20 text-accent" : ""
                    }`}
                  >
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

              <CardContent className="space-y-4 mt-auto">
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

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-2xl font-semibold text-foreground">
                    {formatPrice(service.price)}
                    {service.priceSuffix && (
                      <span className="text-sm text-muted-foreground font-normal ml-1">
                        {service.priceSuffix}
                      </span>
                    )}
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
