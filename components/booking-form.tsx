"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Heart, Sparkles, ArrowRight, ArrowLeft, Check } from "lucide-react"
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

const timeSlots = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
]

interface FormData {
  name: string
  email: string
  whatsapp: string
  service: string
  date: string
  time: string
  question: string
  personName: string
  observations: string
}

interface BookingFormProps {
  preselectedService?: string
}

export function BookingForm({ preselectedService }: BookingFormProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    whatsapp: "",
    service: preselectedService || "",
    date: "",
    time: "",
    question: "",
    personName: "",
    observations: "",
  })

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

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }

  const isStep1Valid = formData.name && formData.email && formData.whatsapp
  const isStep2Valid = formData.service && formData.date && formData.time
  const isStep3Valid = formData.question

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          serviceName: selectedService?.name,
          servicePrice: selectedService?.price,
        }),
      })
      
      if (!response.ok) {
        throw new Error("Erro ao enviar agendamento")
      }
      
      const result = await response.json()
      console.log("[v0] Booking submitted:", result)
      
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting booking:", error)
      alert("Erro ao enviar agendamento. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="agendamento" className="py-20 md:py-28 bg-secondary/20 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <Card className="max-w-2xl mx-auto bg-mystical-card border-border/50 text-center">
            <CardContent className="py-12">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-[var(--font-cinzel)] text-2xl font-semibold mb-4 text-foreground">
                Agendamento Recebido!
              </h3>
              <p className="text-muted-foreground mb-6 text-pretty">
                Obrigada por agendar sua tiragem, {formData.name.split(" ")[0]}! 
                Você receberá a confirmação por e-mail e WhatsApp em breve.
              </p>
              <div className="bg-secondary/30 rounded-xl p-6 text-left space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviço:</span>
                  <span className="text-foreground font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data:</span>
                  <span className="text-foreground font-medium">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Horário:</span>
                  <span className="text-foreground font-medium">{formData.time}</span>
                </div>
                <div className="flex justify-between border-t border-border/50 pt-3 mt-3">
                  <span className="text-muted-foreground">Valor:</span>
                  <span className="text-accent font-semibold text-lg">{formatPrice(selectedService?.price || 0)}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                Aguarde o link de pagamento que será enviado para seu WhatsApp.
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
            <Calendar className="w-4 h-4 text-accent" />
            <span>Agendamento</span>
          </div>
          <h2 className="font-[var(--font-cinzel)] text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Agende Sua Tiragem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-pretty">
            Preencha o formulário abaixo para agendar sua consulta
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-12 md:w-20 h-1 mx-2 rounded-full transition-colors ${
                    step > s ? "bg-primary" : "bg-secondary"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="max-w-2xl mx-auto bg-mystical-card border-border/50">
          <CardHeader>
            <CardTitle className="font-[var(--font-cinzel)] text-xl text-foreground">
              {step === 1 && "Seus Dados"}
              {step === 2 && "Escolha a Tiragem"}
              {step === 3 && "Sua Pergunta"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {step === 1 && "Informe seus dados de contato"}
              {step === 2 && "Selecione o serviço, data e horário"}
              {step === 3 && "Conte-me sobre o que você quer saber"}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Seu nome completo"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsapp" className="text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    WhatsApp
                  </Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", formatWhatsApp(e.target.value))}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </>
            )}

            {/* Step 2: Service Selection */}
            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label className="text-foreground flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-muted-foreground" />
                    Tipo de tiragem
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
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-foreground flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Data desejada
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-foreground flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      Horário desejado
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => handleInputChange("time", value)}
                    >
                      <SelectTrigger className="bg-input border-border text-foreground">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-popover-foreground">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Question */}
            {step === 3 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="question" className="text-foreground flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    Tema ou pergunta
                  </Label>
                  <Textarea
                    id="question"
                    value={formData.question}
                    onChange={(e) => handleInputChange("question", e.target.value)}
                    placeholder="Descreva sua pergunta ou o tema que deseja explorar na tiragem..."
                    rows={4}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>
                
                {isLoveReading && (
                  <div className="space-y-2 p-4 rounded-xl bg-accent/10 border border-accent/30">
                    <Label htmlFor="personName" className="text-foreground flex items-center gap-2">
                      <Heart className="w-4 h-4 text-accent" />
                      Nome da pessoa sobre quem será a tiragem
                    </Label>
                    <Input
                      id="personName"
                      value={formData.personName}
                      onChange={(e) => handleInputChange("personName", e.target.value)}
                      placeholder="Nome da pessoa"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                    <p className="text-xs text-muted-foreground">
                      Este campo é importante para leituras amorosas ou sobre terceiros
                    </p>
                  </div>
                )}

                {!isLoveReading && (
                  <div className="space-y-2">
                    <Label htmlFor="personName" className="text-foreground flex items-center gap-2">
                      <Heart className="w-4 h-4 text-muted-foreground" />
                      Nome da pessoa envolvida (opcional)
                    </Label>
                    <Input
                      id="personName"
                      value={formData.personName}
                      onChange={(e) => handleInputChange("personName", e.target.value)}
                      placeholder="Se a tiragem envolver outra pessoa"
                      className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="observations" className="text-foreground">
                    Observações adicionais (opcional)
                  </Label>
                  <Textarea
                    id="observations"
                    value={formData.observations}
                    onChange={(e) => handleInputChange("observations", e.target.value)}
                    placeholder="Alguma informação adicional que considere importante..."
                    rows={3}
                    className="bg-input border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                {/* Order Summary */}
                <div className="bg-secondary/30 rounded-xl p-6 space-y-3">
                  <h4 className="font-semibold text-foreground mb-4">Resumo do Pedido</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cliente:</span>
                    <span className="text-foreground">{formData.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Serviço:</span>
                    <span className="text-foreground">{selectedService?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data:</span>
                    <span className="text-foreground">{formData.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Horário:</span>
                    <span className="text-foreground">{formData.time}</span>
                  </div>
                  <div className="flex justify-between border-t border-border/50 pt-3 mt-3">
                    <span className="text-foreground font-medium">Total:</span>
                    <span className="text-accent font-semibold text-lg">
                      {formatPrice(selectedService?.price || 0)}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="border-border hover:bg-secondary/50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              ) : (
                <div />
              )}
              
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 ? !isStep1Valid : !isStep2Valid}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!isStep3Valid || isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground glow-gold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Confirmar Agendamento
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
