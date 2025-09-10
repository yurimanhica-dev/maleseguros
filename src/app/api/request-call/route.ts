import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message } = await request.json();

    // Validação básica
    if (!name || !email || !phone || !subject) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos" },
        { status: 400 }
      );
    }

    // Configuração do transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // 1. Email de confirmação para o cliente
    await transporter.sendMail({
      from: `"MALEseguros" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmação de recebimento - ${subject}`,
      html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <link href="https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Funnel Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #F7FAFC;
            color: #1A202C;
            padding: 20px;
            line-height: 1.6;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 0.65rem;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
            border: 1px solid #E2E8F0;
          }
          
          .header {
            background-color: #e22e18;
            padding: 30px 20px;
            color: #FFFFFF;
            text-align: center;
          }
          
          .header h2 {
            font-weight: 600;
            font-size: 24px;
            margin: 0;
          }
          
          .content {
            padding: 35px 30px;
            background-color: #FFFFFF;
          }
          
          .content p {
            font-size: 16px;
            margin-bottom: 18px;
            color: #2D3748;
          }
          
          .content strong {
            color: #e22e18;
            font-weight: 600;
          }
          
          .divider {
            height: 1px;
            background-color: #E2E8F0;
            margin: 25px 0;
          }
          
          .footer {
            text-align: center;
            padding: 25px 25px 15px;
            font-size: 14px;
            color: #718096;
            background-color: #F7FAFC;
            border-top: 1px solid #E2E8F0;
          }
          
          .footer-logo {
            max-height: 40px;
            display: block;
            margin: 0 auto 15px;
            filter: grayscale(100%) brightness(70%);
          }
          
          .footer p {
            margin-bottom: 10px;
          }
          
          .highlight-box {
            background-color: #F8FAFC;
            border-left: 4px solid #e22e18;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>Equipe MALEseguros</h2>
          </div>

          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            
            <p>Agradecemos por entrar em contacto connosco. Confirmamos que recebemos a sua solicitação de retorno e informamos que será cuidadosamente analisada pela nossa equipa.</p>
            
            <div class="highlight-box">
              <p><strong>Detalhes do seu contacto:</strong></p>
              <p>Assunto: ${subject}</p>
              <p>Data: ${new Date().toLocaleString("pt-PT")}</p>
            </div>
            
            <p>Em breve entraremos em contacto consigo com um retorno ou eventuais orientações adicionais.</p>
            
            <div class="divider"></div>
            
            <p>Agradecemos pela confiança em nossos serviços e pelo tempo dedicado a nos contactar.</p>
            
            <p>Atenciosamente,</p>
            
          </div> 

          <div class="footer">
            <img 
              src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL0koEs8xewhJ52yAl46XqojKWgfYBi8F79rOb" 
              alt="${process.env.COMPANY_NAME || "MALEseguros"} Logo"
              class="footer-logo"
            />
            <p>Este é um e-mail automático, por favor não responda.</p>
            <p>© ${new Date().getFullYear()} ${
        process.env.COMPANY_NAME || "MALEseguros"
      }. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    // 2. Email de notificação para a empresa
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER || "seu-email@exemplo.com",
      subject: `Nova solicitação de retorno: ${subject}`,
      html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Nova Solicitação de Retorno</title>
        <link href="https://fonts.googleapis.com/css2?family=Funnel+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: "Funnel Sans", sans-serif;
            font-size: 15px;
            line-height: 1.6;
            color: #1A202C;
            background-color: #F7FAFC;
            margin: 0;
            padding: 24px 12px;
          }

          .email-container {
            max-width: 640px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 0.65rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            border: 1px solid #E2E8F0;
          }

          .header {
            background-color: #e22e18;
            color: white;
            padding: 32px 20px;
            text-align: center;
          }

          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }

          .content {
            padding: 32px;
          }

          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin: 24px 0;
            font-size: 15px;
          }

          .details-table th,
          .details-table td {
            padding: 12px 16px;
            text-align: left;
            vertical-align: top;
            border: 1px solid #E2E8F0;
          }

          .details-table th {
            width: 30%;
            background-color: #F7FAFC;
            font-weight: 600;
            color: #718096;
          }

          .details-table td {
            background-color: #FFFFFF;
            color: #1A202C;
          }

          .message-container {
            background-color: #F7FAFC;
            border-left: 4px solid #e22e18;
            padding: 20px;
            margin: 28px 0;
            border-radius: 0 0.65rem 0.65rem 0;
          }

          .message-title {
            font-weight: 600;
            font-size: 17px;
            margin: 0 0 12px;
            color: #1A202C;
          }

          .action-text {
            margin-top: 24px;
            font-size: 14px;
            color: #718096;
            text-align: center;
          }

          .footer {
            text-align: center;
            padding: 24px;
            font-size: 14px;
            color: #718096;
            background-color: #F7FAFC;
            border-top: 1px solid #E2E8F0;
          }

          .logo {
            height: 48px;
            margin-top: 16px;
            filter: grayscale(100%) brightness(70%);
          }

          a {
            color: #e22e18;
            text-decoration: none;
            font-weight: 500;
          }

          .highlight {
            color: #e22e18;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Nova Solicitação de Retorno</h1>
          </div>

          <div class="content">
            <p>Olá,</p>
            <p>Você recebeu uma nova solicitação de retorno através do formulário de contacto do website.</p>

            <table class="details-table">
              <tr>
                <th>Nome:</th>
                <td><span class="highlight">${name}</span></td>
              </tr>
              <tr>
                <th>E-mail:</th>
                <td><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <th>Telefone:</th>
                <td>${phone}</td>
              </tr>
              <tr>
                <th>Assunto:</th>
                <td>${subject}</td>
              </tr>
              <tr>
                <th>Data:</th>
                <td>${new Date().toLocaleString("pt-BR")}</td>
              </tr>
            </table>

            <div class="message-container">
              <h3 class="message-title">Mensagem:</h3>
              <p>${
                message
                  ? message.replace(/\n/g, "<br>")
                  : "Nenhuma mensagem fornecida."
              }</p>
            </div>

            <p class="action-text">
              Para responder a esta solicitação, basta clicar no endereço de e-mail acima ou responder diretamente a este e-mail.
            </p>
          </div>

          <div class="footer">
            <img
              src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL0koEs8xewhJ52yAl46XqojKWgfYBi8F79rOb"
              alt="Logo"
              class="logo"
            />
            <p>Este e-mail foi enviado automaticamente através do sistema de contacto do website.</p>
            <p>© ${new Date().getFullYear()} ${
        process.env.COMPANY_NAME || "MALEseguros"
      }. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json(
      { error: "Erro ao enviar mensagem" },
      { status: 500 }
    );
  }
}
