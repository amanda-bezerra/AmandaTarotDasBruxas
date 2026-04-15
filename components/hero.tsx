"use client"

import Image from "next/image"
import { Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToAgendamento = () => {
    const element = document.getElementById("agendamento")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mystical">
      {/* Bokeh Effect */}
      <div className="bokeh-overlay" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 animate-sparkle">
        <Star className="w-3 h-3 text-accent/60" fill="currentColor" />
      </div>
      <div className="absolute top-40 right-20 animate-sparkle" style={{ animationDelay: "0.5s" }}>
        <Sparkles className="w-4 h-4 text-primary/60" />
      </div>
      <div className="absolute bottom-40 left-20 animate-sparkle" style={{ animationDelay: "1s" }}>
        <Star className="w-2 h-2 text-lilac/60" fill="currentColor" />
      </div>
      <div className="absolute top-60 left-1/4 animate-sparkle" style={{ animationDelay: "1.5s" }}>
        <Sparkles className="w-3 h-3 text-accent/40" />
      </div>
      
      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Tarot das Bruxas</span>
            </div>
            
            <h1 className="font-[var(--font-cinzel)] text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-balance">
              Descubra as{" "}
              <span className="text-primary">Respostas</span>{" "}
              que Você Busca
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 text-pretty">
              Leituras intuitivas e acolhedoras para iluminar seu caminho. 
              Encontre clareza, orientação e conexão espiritual através do Tarot das Bruxas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                onClick={scrollToAgendamento}
                size="lg"
                className="glow-primary bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium"
              >
                Agendar Minha Tiragem
              </Button>
              <Button 
                onClick={() => document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth" })}
                variant="outline"
                size="lg"
                className="border-border hover:bg-secondary/50 px-8 py-6 text-lg"
              >
                Ver Serviços
              </Button>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span>Atendimento Personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>Fotos Reais das Cartas</span>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px]">
              {/* Glow Background */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-violet-deep/20 to-transparent blur-3xl animate-pulse" />
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-primary/30 glow-primary animate-float">
                <Image
                  src="/images/amanda.jpg"
                  alt="Amanda Bezerra - Taróloga"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating Card Badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Moon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">A Bruxa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
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
