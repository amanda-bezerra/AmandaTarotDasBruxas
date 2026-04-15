import { NextResponse } from "next/server"

interface BookingData {
  name: string
  instagram: string
  serviceName: string
  servicePrice: number
  question?: string
  personName?: string
}

export async function POST(request: Request) {
  try {
    const data: BookingData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.instagram || !data.serviceName) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos" },
        { status: 400 }
      )
    }

    // Format the email content
    const emailContent = `
NOVO INTERESSE EM TIRAGEM
============================

👤 NOME
${data.name}

📱 INSTAGRAM
@${data.instagram}

🔮 TIRAGEM ESCOLHIDA
${data.serviceName}
Valor: R$ ${data.servicePrice.toFixed(2)}

${data.personName ? `❤️ PESSOA ENVOLVIDA NA TIRAGEM\n${data.personName}\n` : ""}
${data.question ? `💭 PERGUNTA/TEMA\n${data.question}\n` : ""}

============================
Recebido em: ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}

➡️ Entre em contato pelo Instagram para combinar data e pagamento!
`

    // Log the booking data (in production, this would send an actual email)
    console.log("[v0] New booking interest received:")
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
      to: 'disseacigana@gmail.com',
      subject: `Novo Interesse - @${data.instagram} - ${data.serviceName}`,
      text: emailContent,
    })
    */

    return NextResponse.json({ 
      success: true, 
      message: "Interesse recebido com sucesso!",
    })
    
  } catch (error) {
    console.error("[v0] Error processing booking:", error)
    return NextResponse.json(
      { error: "Erro ao processar solicitação" },
      { status: 500 }
    )
  }
}
