// app/api/report/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extrair dados do formulário de sinistro
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const policyNumber = formData.get("policyNumber") as string;
    const sinistroType = formData.get("sinistroType") as string;
    const sinistroDate = formData.get("sinistroDate") as string;
    const sinistroLocation = formData.get("sinistroLocation") as string;
    const terceirosEnvolvidos = formData.get("terceirosEnvolvidos") === "true";
    const description = formData.get("description") as string;

    // Extrair arquivos
    const documentFiles: File[] = [];
    const documents = formData.getAll("documents");
    for (const doc of documents) {
      if (doc instanceof File && doc.size > 0) {
        documentFiles.push(doc);
      }
    }

    // Validação básica
    if (
      !name ||
      !email ||
      !phone ||
      !policyNumber ||
      !sinistroType ||
      !sinistroDate ||
      !sinistroLocation
    ) {
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

    // Mapear tipos de sinistro para nomes legíveis
    const sinistroTypes: Record<string, string> = {
      automovel: "Acidente Automóvel",
      incendio: "Incêndio",
      roubo: "Roubo",
      outros: "Outros",
    };

    const sinistroTypeName = sinistroTypes[sinistroType] || sinistroType;

    // Preparar anexos
    const attachments = await Promise.all(
      documentFiles.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
        contentType: file.type,
      }))
    );

    // 1. Email de confirmação para o cliente (sem anexos)
    await transporter.sendMail({
      from: `"MALEseguros" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Confirmação de Comunicação de Sinistro`,
      html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: "Roboto", sans-serif;
            background-color: #F7FAFC;
            color: #1A202C;
            padding: 20px;
            line-height: 1.6;
          }
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 8px;
            overflow: hidden;
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
          }
          .content highlight-box p {
            font-size: 16px;
            margin-bottom: 18px;
            font-weight: 600;
          }
          .content p {
            font-size: 16px;
            margin-bottom: 18px;
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
            <h2>Email de Confirmação</h2>
          </div>

          <div class="content">
            <p>Olá <strong>${name}</strong>,</p>
            
            <p>Agradecemos por comunicar o seu sinistro connosco. Confirmamos que recebemos a sua comunicação e informamos que será cuidadosamente analisada pela nossa equipa especializada.</p>
            
            <div class="highlight-box">
              <p><strong>Detalhes da sua comunicação:</strong></p>
              <p>Tipo de Sinistro: ${sinistroTypeName}</p>
              <p>Data do Sinistro: ${sinistroDate}</p>
              <p>Local: ${sinistroLocation}</p>
              <p>Nº Apólice: ${policyNumber}</p>
              <p>Data da Comunicação: ${new Date().toLocaleString("pt-PT")}</p>
            </div>
            
            <p>Em breve entraremos em contacto consigo com um retorno ou eventuais orientações adicionais.</p>
            
            <div class="divider"></div>
            
            <p><strong>Importante:</strong> Em caso de emergência, contacte as autoridades competentes.</p>
            
            <p>Agradecemos pela confiança em nossos serviços.</p>

            <p>Atenciosamente,</p>
            
            <p><strong>Equipa MALEseguros</strong></p>
          </div> 

          <div class="footer">
            <img 
              src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL0koEs8xewhJ52yAl46XqojKWgfYBi8F79rOb" 
              alt="MALEseguros Logo"
              class="footer-logo"
            />
            <p>Este é um e-mail automático, por favor não responda.</p>
            <p>© ${new Date().getFullYear()} MALEseguros. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>`,
    });

    // 2. Email de notificação para a empresa (com anexos)
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER || "seu-email@exemplo.com",
      subject: `🚨 COMUNICAÇÃO DE SINISTRO: ${sinistroTypeName} - ${name}`,
      html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Nova Comunicação de Sinistro</title>
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
            color: #1A202C;
          }

          .details-table td {
            background-color: #FFFFFF;
            color: #1A202C;
            font-weight: 400;
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

          .urgent {
            background-color: #FEF2F2;
            color: #DC2626;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            font-weight: 600;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Nova Comunicação de Sinistro</h1>
          </div>

          <div class="content">
            <div class="urgent">
              ⚠️ COMUNICAÇÃO DE SINISTRO - ATENÇÃO IMEDIATA REQUERIDA
            </div>

            <p>Foi recebida uma nova comunicação de sinistro através do formulário do website.</p>

            <table class="details-table">
              <tr>
                <th>Segurado:</th>
                <td>${name}</td>
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
                <th>Apólice:</th>
                <td>${policyNumber}</td>
              </tr>
              <tr>
                <th>Tipo de Sinistro:</th>
                <td><span class="highlight">${sinistroTypeName}</span></td>
              </tr>
              <tr>
                <th>Data do Sinistro:</th>
                <td>${new Date(sinistroDate).toLocaleDateString("pt-PT")}</td>
              </tr>
              <tr>
                <th>Local do Sinistro:</th>
                <td>${sinistroLocation}</td>
              </tr>
              <tr>
                <th>Terceiros Envolvidos:</th>
                <td>${terceirosEnvolvidos ? "Sim" : "Não"}</td>
              </tr>
              <tr>
                <th>Data da Comunicação:</th>
                <td>${new Date().toLocaleString("pt-BR")}</td>
              </tr>
            </table>

            ${
              description
                ? `
            <div class="message-container">
              <h3 class="message-title">Descrição do Ocorrido:</h3>
              <p>${description.replace(/\n/g, "<br>")}</p>
            </div>
            `
                : ""
            }

            ${
              documentFiles.length > 0
                ? `
            <div class="message-container">
              <h3 class="message-title">Documentos Anexados (${
                documentFiles.length
              }):</h3>
              <ul>
                ${documentFiles.map((file) => `<li>${file.name}</li>`).join("")}
              </ul>
            </div>
            `
                : ""
            }

            <p class="action-text">
              Para contactar o segurado, utilize os contactos fornecidos acima.
            </p>
          </div>

          <div class="footer">
            <img
              src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL0koEs8xewhJ52yAl46XqojKWgfYBi8F79rOb"
              alt="Logo"
              class="logo"
            />
            <p>Este e-mail foi enviado automaticamente através do sistema de comunicação de sinistros.</p>
            <p>© ${new Date().getFullYear()} ${
        process.env.COMPANY_NAME || "MALEseguros"
      }. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
      </html>
      `,
      attachments: attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao processar comunicação de sinistro:", error);
    return NextResponse.json(
      { error: "Erro ao enviar comunicação de sinistro" },
      { status: 500 }
    );
  }
}
