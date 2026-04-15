"use client"

import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Como funciona a tiragem?",
    answer: "Após o agendamento e pagamento, realizo a tiragem de cartas focando na sua pergunta ou situação. Você receberá fotos reais das cartas e uma interpretação detalhada por texto ou áudio, dependendo do serviço escolhido.",
  },
  {
    question: "Como recebo minha leitura?",
    answer: "A leitura é enviada pelo WhatsApp no horário agendado. Você receberá fotos das cartas acompanhadas de explicação completa, interpretação e orientação clara sobre a situação consultada.",
  },
  {
    question: "Em quanto tempo recebo retorno?",
    answer: "Após a confirmação do pagamento, você receberá sua leitura no horário agendado. Caso escolha um horário no mesmo dia e o pagamento seja confirmado a tempo, recebe no mesmo dia.",
  },
  {
    question: "Posso fazer pergunta sobre amor?",
    answer: "Sim! Tenho tiragens específicas para assuntos amorosos, como o 'Templo de Afrodite' e 'O que a pessoa esconde?'. São leituras profundas focadas em relacionamentos, sentimentos e conexões.",
  },
  {
    question: "O pagamento é feito antes?",
    answer: "Sim, o pagamento é feito antes da tiragem para garantir seu horário. Após a confirmação do pagamento, você receberá a confirmação do agendamento e a leitura no horário marcado.",
  },
  {
    question: "Posso mandar mais de uma pergunta?",
    answer: "Depende do serviço escolhido. Na tiragem 'Pergunte ao Tarot das Bruxas' é uma pergunta objetiva. No 'Templo de Afrodite', você tem direito a 2 perguntas adicionais após a leitura. Nas consultas de 30 minutos ou 1 hora, você pode explorar mais questões.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-mystical opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-4">
            <HelpCircle className="w-4 h-4 text-accent" />
            <span>Dúvidas</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Tire suas dúvidas sobre as tiragens e o processo de agendamento
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-mystical-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/50 transition-colors"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <span className="font-[var(--font-cinzel)] text-lg font-medium text-foreground">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-pretty">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
