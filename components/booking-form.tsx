"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Heart, Sparkles, Check, Send, User, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const serviceOptions = [
  { id: "pergunta-tarot", name: "Pergunte ao Tarot das Bruxas", price: 10, isLove: false },
  { id: "pessoa-esconde", name: "O que a pessoa esconde?", price: 30, isLove: true },
  { id: "tarot-bruxas-30", name: "Tarot das Bruxas - 30 minutos", price: 90, isLove: false },
  { id: "tarot-bruxas-60", name: "Tarot das Bruxas - 1 hora", price: 140, isLove: false },
  { id: "templo-afrodite", name: "Templo de Afrodite", price: 50, isLove: true },
]

interface FormData {
  name: string
  service: string
  question: string
  personName: string
}

const PIX_KEY = "disseacigana@gmail.com"
const WHATSAPP_NUMBER = "5565992849828"

interface BookingFormProps {
  preselectedService?: string
}

export function BookingForm({ preselectedService }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    service: preselectedService || "",
    question: "",
    personName: "",
  })
  const [pixCopied, setPixCopied] = useState(false)

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  const selectedService = serviceOptions.find(s => s.id === formData.service)
  const isLoveReading = selectedService?.isLove || false

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const isFormValid = formData.name && formData.service

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setPixCopied(true)
      setTimeout(() => setPixCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleConfirmPayment = () => {
    // Monta a mensagem para o WhatsApp
    let message = `Ola Amanda! Acabei de fazer o Pix para a tiragem.\n\n`
    message += `*Nome:* ${formData.name}\n`
    message += `*Tiragem:* ${selectedService?.name}\n`
    message += `*Valor:* ${formatPrice(selectedService?.price || 0)}\n`
    
    if (formData.personName) {
      message += `*Pessoa envolvida:* ${formData.personName}\n`
    }
    
    if (formData.question) {
      message += `\n*Minha pergunta:*\n${formData.question}`
    }
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message)
    
    // Abre o WhatsApp com a mensagem pronta
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank")
    
    // Mostra a tela de confirmacao
    setIsPaymentConfirmed(true)
  }

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  // Tela final - Pagamento confirmado
  if (isPaymentConfirmed) {
    return (
      <section id="agendamento" className="py-20 md:py-28 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-lg mx-auto bg-mystical-card border-border/50 text-center">
            <CardContent className="py-12">
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-green-400" />
              </div>
              <h3 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-4 text-foreground">
                Obrigada pelo seu pagamento!
              </h3>
              <p className="text-muted-foreground mb-6 text-pretty text-lg">
                Ja te respondo!
              </p>
              <div className="bg-secondary/30 rounded-xl p-6 text-left space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="text-foreground font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tiragem:</span>
                  <span className="text-foreground font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-t border-border/50 pt-3 mt-3">
                  <span className="text-muted-foreground">Valor pago:</span>
                  <span className="text-green-400 font-semibold text-lg">{formatPrice(selectedService?.price || 0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  // Tela do Pix - Aguardando pagamento
  if (isSubmitted) {
    return (
      <section id="agendamento" className="py-20 md:py-28 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-lg mx-auto bg-mystical-card border-border/50 text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-4 text-foreground">
                Agora faca o pagamento via Pix
              </h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Copie a chave Pix abaixo, faca o pagamento e clique em confirmar.
              </p>
              <div className="bg-secondary/30 rounded-xl p-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nome:</span>
                  <span className="text-foreground font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Servico:</span>
                  <span className="text-foreground font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between border-t border-border/50 pt-3 mt-3">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="text-accent font-semibold text-lg">{formatPrice(selectedService?.price || 0)}</span>
                </div>
              </div>
              
              {/* PIX Payment Info */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mt-6">
                <p className="text-sm text-foreground font-medium mb-2">Chave Pix para pagamento:</p>
                <div className="flex items-center gap-2 bg-background/50 rounded-lg p-3">
                  <code className="text-accent text-sm flex-1">{PIX_KEY}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyPixKey}
                    className="h-8 px-2 hover:bg-accent/20"
                  >
                    {pixCopied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Amanda Goncalves Bezerra
                </p>
              </div>
              
              {/* Confirm Payment Button */}
              <Button
                onClick={handleConfirmPayment}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white h-12 text-base"
              >
                <Check className="w-5 h-5 mr-2" />
                Ja fiz o Pix, enviar comprovante
              </Button>
              
              <p className="text-xs text-muted-foreground mt-4">
                Clique acima apos realizar o pagamento
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="agendamento" className="py-20 md:py-28 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Quero uma tiragem</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Solicite Sua Tiragem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Escolha sua tiragem e faca o pagamento via Pix
          </p>
        </div>

        <Card className="max-w-lg mx-auto bg-mystical-card border-border/50">
          <CardHeader>
            <CardTitle className="font-[var(--font-cinzel)] text-xl text-foreground">
              Preencha seus dados
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Escolha o servico e preencha seu nome
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Seu nome
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Como posso te chamar?"
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                Qual tiragem você quer?
              </Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
              >
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Selecione a tiragem" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {serviceOptions.map((service) => (
                    <SelectItem 
                      key={service.id} 
                      value={service.id}
                      className="text-popover-foreground"
                    >
                      {service.name} - {formatPrice(service.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Person Name for Love Readings */}
            {isLoveReading && (
              <div className="space-y-2 p-4 rounded-xl bg-accent/10 border border-accent/30">
                <Label htmlFor="personName" className="text-foreground flex items-center gap-2">
                  <Heart className="w-4 h-4 text-accent" />
                  Nome da pessoa sobre quem sera a tiragem
                </Label>
                <Input
                  id="personName"
                  value={formData.personName}
                  onChange={(e) => handleInputChange("personName", e.target.value)}
                  placeholder="Nome da pessoa"
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                  Importante para leituras amorosas ou sobre terceiros
                </p>
              </div>
            )}

            {/* Question (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="question" className="text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Sobre o que quer saber? (opcional)
              </Label>
              <Textarea
                id="question"
                value={formData.question}
                onChange={(e) => handleInputChange("question", e.target.value)}
                placeholder="Se quiser, ja pode adiantar sua pergunta ou tema..."
                rows={3}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
              />
            </div>

            {/* Selected Service Summary */}
            {selectedService && (
              <div className="bg-secondary/30 rounded-xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Servico selecionado</p>
                  <p className="text-foreground font-medium">{selectedService.name}</p>
                </div>
                <p className="text-accent font-semibold text-lg">
                  {formatPrice(selectedService.price)}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-primary h-12 text-base"
            >
              <Send className="w-4 h-4 mr-2" />
              Quero essa tiragem
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Apos o pagamento, voce sera redirecionada para o WhatsApp
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
