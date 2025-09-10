/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/app/[locale]/utils/formatCurrency";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      vehicleType,
      vehicleYear,
      vehicleValue,
      vehicleUse,
      driverAge,
      province,
      coverageType,
      extras,
      paymentFrequency,
      premium,
      consentimento,
    } = await request.json();

    // Validação básica
    if (!name || !email || !phone || !premium) {
      return NextResponse.json(
        { error: "Dados obrigatórios não fornecidos" },
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

    // Mapear tipos de cobertura para nomes legíveis
    const coverageTypes: Record<string, string> = {
      thirdParty: "Responsabilidade Civil (Obrigatório)",
      comprehensive: "Cobertura Completa",
    };

    const coverageTypeName = coverageTypes[coverageType] || coverageType;

    // Mapear extras para nomes legíveis
    const extrasNames: Record<string, string> = {
      assistance: "Assistência 24h",
      glass: "Quebra de Vidros",
      natural: "Fenómenos Naturais",
    };

    const selectedExtras = extras.map(
      (extra: string) => extrasNames[extra] || extra
    );

    // 1. Email de confirmação para o cliente
    await transporter.sendMail({
      from: `"MALEseguros" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `📋 Sua Simulação de Seguro Auto - ${formatCurrency(premium)}`,
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
            background: linear-gradient(135deg, #e22e18 0%, #c22512 100%);
            padding: 30px 20px;
            color: #FFFFFF;
            text-align: center;
          }
          
          .header h2 {
            font-weight: 600;
            font-size: 24px;
            margin: 0 0 10px 0;
          }
          
          .header p {
            opacity: 0.9;
            font-size: 14px;
          }
          
          .content {
            padding: 35px 30px;
            background-color: #FFFFFF;
          }
          
          .premium-display {
            text-align: center;
            padding: 20px 0;
            margin: 20px 0;
            border-bottom: 2px dashed #E2E8F0;
          }
          
          .premium-amount {
            font-size: 36px;
            font-weight: 700;
            color: #e22e18;
            margin-bottom: 5px;
          }
          
          .premium-frequency {
            color: #718096;
            font-size: 14px;
          }
          
          .coverage-section {
            background-color: #F8FAFC;
            border-left: 4px solid #e22e18;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .section-title {
            font-weight: 600;
            color: #1A202C;
            margin-bottom: 15px;
            font-size: 18px;
          }
          
          .feature-list {
            list-style: none;
            padding: 0;
          }
          
          .feature-item {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 10px;
            font-size: 14px;
          }
          
          .feature-icon {
            color: #e22e18;
            margin-top: 2px;
            flex-shrink: 0;
          }
          
          .exclusions {
            background-color: #FEF2F2;
            border-left: 4px solid #DC2626;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .next-steps {
            background-color: #FFFBEB;
            border-left: 4px solid #D97706;
            padding: 20px;
            margin: 25px 0;
            border-radius: 0 8px 8px 0;
          }
          
          .steps-list {
            list-style: decimal;
            padding-left: 20px;
            margin-top: 10px;
          }
          
          .steps-list li {
            margin-bottom: 8px;
            font-size: 14px;
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
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h2>Sua simulação está pronta!</h2>
            <p>Seguro Auto adaptado às suas necessidades</p>
          </div>

          <div class="content">
            <div class="premium-display">
              <div class="premium-amount">${formatCurrency(premium)}</div>
              <div class="premium-frequency">${
                paymentFrequency === "annual"
                  ? "por ano"
                  : "em 12 parcelas mensais"
              }</div>
            </div>

            <div class="coverage-section">
              <h3 class="section-title">Detalhes da Cobertura</h3>
              
              <div class="feature-item">
                <span class="feature-icon">✔</span>
                <span><strong>Tipo de Cobertura:</strong> ${coverageTypeName}</span>
              </div>
              
              <div class="feature-item">
                <span class="feature-icon">✔</span>
                <span><strong>O que está incluído:</strong></span>
              </div>
              
              <ul class="feature-list">
                ${
                  coverageType === "thirdParty"
                    ? `
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Danos a terceiros (obrigatório)</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Responsabilidade civil</span>
                </li>
                `
                    : `
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Danos a terceiros</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Colisão e capotagem</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Roubo e furto qualificado</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Incêndio e explosão</span>
                </li>
                `
                }
                
                ${selectedExtras
                  .map(
                    (extra: any) => `
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>${extra}</span>
                </li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            <div class="exclusions">
              <h3 class="section-title">O que não cobre</h3>
              <ul class="feature-list">
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Danos por má condução deliberada</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Uso não autorizado do veículo</span>
                </li>
                <li class="feature-item">
                  <span class="feature-icon">•</span>
                  <span>Danos mecânicos sem colisão</span>
                </li>
              </ul>
            </div>

            <div class="next-steps">
              <h3 class="section-title">Próximos Passos</h3>
              <ol class="steps-list">
                <li>Validação dos documentos</li>
                <li>Vistoria do veículo (se necessário)</li>
                <li>Pagamento da primeira prestação</li>
                <li>Emissão da apólice digital</li>
              </ol>
            </div>

            <p style="text-align: center; margin-top: 30px;">
              <strong>Interessado nesta proposta?</strong><br>
              Entre em contacto connosco para formalizar a sua apólice.
            </p>
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
      subject: `🚗 NOVA SIMULAÇÃO: Seguro Auto - ${name} - ${formatCurrency(
        premium
      )}`,
      html: `
      <!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Nova Simulação de Seguro Auto</title>
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
            background: linear-gradient(135deg, #e22e18 0%, #c22512 100%);
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
            font-size: 14px;
          }

          .details-table th,
          .details-table td {
            padding: 12px 16px;
            text-align: left;
            vertical-align: top;
            border: 1px solid #E2E8F0;
          }

          .details-table th {
            width: 35%;
            background-color: #F7FAFC;
            font-weight: 600;
            color: #718096;
          }

          .details-table td {
            background-color: #FFFFFF;
            color: #1A202C;
          }

          .highlight {
            color: #e22e18;
            font-weight: 600;
          }

          .premium-box {
            background-color: #FFFBEB;
            border: 2px solid #FCD34D;
            border-radius: 12px;
            padding: 20px;
            text-align: center;
            margin: 20px 0;
          }

          .premium-amount {
            font-size: 28px;
            font-weight: 700;
            color: #e22e18;
            margin-bottom: 5px;
          }

          .premium-frequency {
            color: #718096;
            font-size: 14px;
          }

          .coverage-list {
            background-color: #F8FAFC;
            border-left: 4px solid #e22e18;
            padding: 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
          }

          .coverage-list ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .coverage-list li {
            padding: 5px 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .coverage-list li:before {
            content: "✔";
            color: #e22e18;
            font-weight: bold;
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

          .priority {
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
            <h1>Nova Simulação de Seguro Auto</h1>
          </div>

          <div class="content">
            <div class="priority">
              🚗 SIMULAÇÃO DE SEGURO AUTO - CLIENTE INTERESSADO
            </div>

            <p>Foi realizada uma nova simulação de seguro auto através do simulador online.</p>

            <table class="details-table">
      <tr>
        <th>Cliente:</th>
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
        <th>Idade do Condutor:</th>
        <td>${driverAge} anos</td>
      </tr>
      <tr>
        <th>Província:</th>
        <td>${province}</td>
      </tr>
      <tr>
        <th>Tipo de Veículo:</th>
        <td>${vehicleType}</td>
      </tr>
      <tr>
        <th>Ano do Veículo:</th>
        <td>${vehicleYear}</td>
      </tr>
      <tr>
        <th>Valor do Veículo:</th>
        <td>${formatCurrency(vehicleValue)}</td>
      </tr>
      <tr>
        <th>Uso do Veículo:</th>
        <td>${vehicleUse}</td>
      </tr>
      <tr>
        <th>Consentimento:</th>
        <td>${consentimento ? "✅ Sim" : "❌ Não"}</td>
      </tr>
      <tr>
        <th>Data da Simulação:</th>
        <td>${new Date().toLocaleString("pt-BR")}</td>
      </tr>
    </table>

            <div class="premium-box">
              <div class="premium-amount">${formatCurrency(premium)}</div>
              <div class="premium-frequency">${
                paymentFrequency === "annual"
                  ? "Prémio anual"
                  : "12 parcelas mensais"
              }</div>
            </div>

            <div class="coverage-list">
              <h3 style="margin-top: 0; margin-bottom: 15px; color: #1A202C;">
                Coberturas Selecionadas:
              </h3>
              <ul>
                <li><strong>Tipo:</strong> ${coverageTypeName}</li>
                ${selectedExtras
                  .map((extra: any) => `<li>${extra}</li>`)
                  .join("")}
              </ul>
            </div>

            <p style="text-align: center; margin-top: 30px; font-weight: 600;">
              Cliente visualizou a simulação completa e demonstrou interesse.
            </p>

            <p style="text-align: center; color: #718096; font-size: 14px;">
              Para contactar o cliente, utilize os contactos fornecidos acima.
            </p>
          </div>

          <div class="footer">
            <img
              src="https://dbmib2q8rj.ufs.sh/f/Lm6xK3J7O1CL0koEs8xewhJ52yAl46XqojKWgfYBi8F79rOb"
              alt="Logo"
              class="logo"
            />
            <p>Este e-mail foi enviado automaticamente através do simulador de seguros auto.</p>
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
    console.error("Erro ao processar simulação de seguro auto:", error);
    return NextResponse.json(
      { error: "Erro ao enviar simulação de seguro auto" },
      { status: 500 }
    );
  }
}
