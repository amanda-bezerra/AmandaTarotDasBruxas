"use client"

import Image from "next/image"
import { Sparkles, Moon, Stars } from "lucide-react"

export function About() {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-secondary/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 animate-sparkle">
        <Stars className="w-4 h-4 text-accent/40" />
      </div>
      <div className="absolute bottom-20 left-10 animate-sparkle" style={{ animationDelay: "0.5s" }}>
        <Moon className="w-5 h-5 text-primary/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div className="relative flex justify-center lg:justify-start order-1">
            <div className="relative">
              {/* Glow Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-transparent blur-2xl" />
              
              {/* Tarot Deck Image */}
              <div className="relative w-64 h-80 md:w-80 md:h-96">
                <Image
                  src="/images/tarot-deck.png"
                  alt="Tarot das Bruxas - Baralho de 22 cartas"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
              
              {/* Badge */}
              <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium text-foreground">22 Cartas</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Side */}
          <div className="space-y-6 order-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground">
              <Moon className="w-4 h-4 text-accent" />
              <span>Sobre Mim</span>
            </div>
            
            <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold text-balance">
              Ola, eu sou a{" "}
              <span className="text-primary">Amanda</span>
            </h2>
            
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p className="text-pretty">
                Uso o <span className="text-foreground font-medium">Tarot das Bruxas</span>, 
                um baralho especial de 22 cartas, para te ajudar a encontrar as respostas que voce busca.
              </p>
              
              <p className="text-pretty">
                Cada carta carrega uma energia unica e profunda, conectada a sabedoria ancestral das bruxas. 
                Atraves das tiragens, trago clareza para suas duvidas sobre amor, trabalho, caminhos e decisoes.
              </p>
              
              <p className="text-pretty">
                Meu atendimento e acolhedor e personalizado. Voce recebe fotos reais das cartas 
                e uma leitura completa, feita com carinho e dedicacao.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-semibold text-primary">22</p>
                <p className="text-sm text-muted-foreground">Cartas Magicas</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-accent">100%</p>
                <p className="text-sm text-muted-foreground">Personalizado</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-semibold text-primary">DM</p>
                <p className="text-sm text-muted-foreground">Atendimento</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
