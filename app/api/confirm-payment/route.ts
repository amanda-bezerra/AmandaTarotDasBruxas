import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface PaymentData {
  name: string
  instagram: string
  serviceName: string
  servicePrice: number
  question?: string
  personName?: string
}

export async function POST(request: Request) {
  try {
    const data: PaymentData = await request.json()
    
    // Validate required fields
    if (!data.name || !data.instagram || !data.serviceName) {
      return NextResponse.json(
        { error: "Campos obrigatorios nao preenchidos" },
        { status: 400 }
      )
    }

    const dataHora = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })

    // Format the email content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; background-color: #1a1a2e; color: #ffffff; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 100%); border-radius: 16px; padding: 32px; border: 1px solid #6b21a8; }
    .header { text-align: center; margin-bottom: 24px; }
    .title { color: #c084fc; font-size: 24px; margin: 0; }
    .badge { display: inline-block; background: #22c55e; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 12px; }
    .section { background: rgba(139, 92, 246, 0.1); border-radius: 12px; padding: 16px; margin: 16px 0; border: 1px solid rgba(139, 92, 246, 0.3); }
    .label { color: #a78bfa; font-size: 12px; text-transform: uppercase; margin-bottom: 4px; }
    .value { color: #ffffff; font-size: 16px; font-weight: 600; }
    .price { color: #22c55e; font-size: 24px; font-weight: bold; }
    .footer { text-align: center; margin-top: 24px; color: #9ca3af; font-size: 12px; }
    .question-box { background: rgba(168, 85, 247, 0.15); border-left: 4px solid #a855f7; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 class="title">Novo Pagamento Confirmado!</h1>
      <span class="badge">PAGAMENTO PIX CONFIRMADO</span>
    </div>
    
    <div class="section">
      <div class="label">Nome</div>
      <div class="value">${data.name}</div>
    </div>
    
    <div class="section">
      <div class="label">Instagram</div>
      <div class="value">@${data.instagram}</div>
    </div>
    
    <div class="section">
      <div class="label">Tiragem Escolhida</div>
      <div class="value">${data.serviceName}</div>
    </div>
    
    <div class="section">
      <div class="label">Valor Pago</div>
      <div class="price">R$ ${data.servicePrice.toFixed(2)}</div>
    </div>
    
    ${data.personName ? `
    <div class="section">
      <div class="label">Pessoa Envolvida na Tiragem</div>
      <div class="value">${data.personName}</div>
    </div>
    ` : ""}
    
    ${data.question ? `
    <div class="question-box">
      <div class="label">Pergunta / Tema</div>
      <div class="value" style="font-weight: normal; font-style: italic;">"${data.question}"</div>
    </div>
    ` : ""}
    
    <div class="footer">
      <p>Recebido em: ${dataHora}</p>
      <p>Entre em contato pelo Instagram para realizar a tiragem!</p>
    </div>
  </div>
</body>
</html>
`

    // Send email notification
    const { error } = await resend.emails.send({
      from: "Tarot das Bruxas <onboarding@resend.dev>",
      to: "amandagbezerra0611@gmail.com",
      subject: `PAGAMENTO CONFIRMADO - @${data.instagram} - ${data.serviceName}`,
      html: emailHtml,
    })

    if (error) {
      console.error("[v0] Error sending email:", error)
      return NextResponse.json(
        { error: "Erro ao enviar notificacao" },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Pagamento confirmado e notificacao enviada!",
    })
    
  } catch (error) {
    console.error("[v0] Error processing payment confirmation:", error)
    return NextResponse.json(
      { error: "Erro ao processar confirmacao" },
      { status: 500 }
    )
  }
}
