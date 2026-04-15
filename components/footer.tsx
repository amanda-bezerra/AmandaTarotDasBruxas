import { Moon, Sparkles, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 bg-secondary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Moon className="w-6 h-6 text-primary" />
            <span className="font-[var(--font-cinzel)] text-xl font-semibold tracking-wider text-foreground">
              Amanda Bezerra
            </span>
            <Sparkles className="w-4 h-4 text-accent opacity-60" />
          </div>
          
          {/* Spiritual Quote */}
          <p className="text-muted-foreground italic max-w-md text-pretty">
            &quot;As cartas revelam o que a alma já sabe. Eu apenas traduzo a mensagem.&quot;
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/5500000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 border border-border/50 text-muted-foreground hover:text-accent hover:border-accent/50 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-6 border-t border-border/30 w-full">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Amanda Bezerra - Tarot das Bruxas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
