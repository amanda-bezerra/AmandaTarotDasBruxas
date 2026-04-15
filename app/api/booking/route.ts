import { NextResponse } from "next/server"

interface BookingData {
  name: string
  email: string
  whatsapp: string
  service: string
  serviceName: string
  servicePrice: number
  date: string
  time: string
  question: string
  personName?: string
  observations?: string
}

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email || !data.whatsapp || !data.service || !data.date || !data.time || !data.question) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      )
    }

    // Format the email content
    const emailContent = `
NOVO AGENDAMENTO DE TIRAGEM
============================

📋 DADOS DA CLIENTE
Nome: ${data.name}
E-mail: ${data.email}
WhatsApp: ${data.whatsapp}

🔮 DETALHES DA TIRAGEM
Serviço: ${data.serviceName}
Valor: R$ ${data.servicePrice.toFixed(2)}
Data: ${data.date}
Horário: ${data.time}

💭 PERGUNTA/TEMA
${data.question}

${data.personName ? `❤️ PESSOA ENVOLVIDA\n${data.personName}\n` : ""}
${data.observations ? `📝 OBSERVAÇÕES\n${data.observations}\n` : ""}

💳 STATUS DO PAGAMENTO
Aguardando pagamento

============================
Agendamento recebido em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}
`

    // Log the booking data (in production, this would send an actual email)
    console.log("[v0] New booking received:")
    console.log(emailContent)
    
    // In production, integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Nodemailer with Gmail
    // - Amazon SES
    
    // Example with Resend (uncomment and add RESEND_API_KEY env var):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'agendamento@seudominio.com',
      to: 'disseacigana@gmail.com', // Admin email
      subject: `Novo Agendamento - ${data.name} - ${data.serviceName}`,
      text: emailContent,
    })
    */

    // For now, return success
    return NextResponse.json({ 
      success: true, 
      message: "Agendamento recebido com sucesso!",
      booking: {
        id: `BK${Date.now()}`,
        status: "pending_payment"
      }
    })
    
  } catch (error) {
    console.error("[v0] Error processing booking:", error)
    return NextResponse.json(
      { error: "Erro ao processar agendamento" },
      { status: 500 }
    )
  }
}
