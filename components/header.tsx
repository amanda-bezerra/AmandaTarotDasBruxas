"use client"

import { useState } from "react"
import { Menu, X, Moon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
          >
            <Moon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
            <span className="font-[var(--font-cinzel)] text-lg md:text-xl font-semibold tracking-wider text-foreground">
              Amanda Bezerra
            </span>
            <Sparkles className="w-4 h-4 text-accent opacity-60" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("servicos")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Tiragens
            </button>
            <button 
              onClick={() => scrollToSection("como-funciona")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              Como Funciona
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              FAQ
            </button>
            <Button 
              onClick={() => scrollToSection("agendamento")}
              className="glow-primary bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              Agendar Tiragem
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => scrollToSection("servicos")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest py-2"
              >
                Tiragens
              </button>
              <button 
                onClick={() => scrollToSection("como-funciona")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest py-2"
              >
                Como Funciona
              </button>
              <button 
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest py-2"
              >
                FAQ
              </button>
              <Button 
                onClick={() => scrollToSection("agendamento")}
                className="glow-primary bg-primary hover:bg-primary/90 text-primary-foreground w-full"
              >
                Agendar Tiragem
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
