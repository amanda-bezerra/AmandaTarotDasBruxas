"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { HowItWorks } from "@/components/how-it-works"
import { Benefits } from "@/components/benefits"
import { BookingForm } from "@/components/booking-form"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | undefined>(undefined)

  const handleSelectService = (serviceId: string, option?: string) => {
    // Map service options to form values
    let formServiceId = serviceId
    if (serviceId === "tarot-bruxas" && option) {
      formServiceId = option === "30 minutos" ? "tarot-bruxas-30" : "tarot-bruxas-60"
    }
    
    setSelectedService(formServiceId)
    
    // Scroll to booking form
    setTimeout(() => {
      const element = document.getElementById("agendamento")
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services onSelectService={handleSelectService} />
      <HowItWorks />
      <Benefits />
      <BookingForm preselectedService={selectedService} />
      <FAQ />
      <Footer />
    </main>
  )
}
