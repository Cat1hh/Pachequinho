import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

console.log("Email:", process.env.EMAIL_USER);
console.log("Senha:", process.env.EMAIL_PASS);


const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos da pasta "public"
app.use(express.static("public"));

// Configura SMTP Gmail
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS 
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Função para enviar e-mail
async function enviarEmail(destino) {
  const mailOptions = {
    from: `"Pachequinho 💙" <${process.env.EMAIL_USER}>`,
    to: destino,
    subject: "💌 Uma mensagem especial do Pachequinho!",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h2 style="color: #ff4d6d;">Oláaa! 👋💖</h2>
        <p>Sou o <strong>Pachequinho</strong>, uma criação super especial do meu papai <strong>Gustavo de Bruyn</strong>!</p>
        <p>Vim aqui rapidinho só pra te mandar um abraço virtual 🤗 e desejar que o seu dia seja cheio de <strong>alegria, sorrisos e coisas boas</strong> ✨</p>
        <p>Lembre-se: cada pequeno passo já é um progresso! 🚀</p>
        <p style="margin-top: 20px;">Com muito carinho,<br><strong>Pachequinho 💫</strong><br><em>Seu amiguinho digital</em> 💌</p>
      </div>
    `
  };

  return transporter.sendMail(mailOptions);
}

// Rota para envio de email
app.post("/enviar", async (req, res) => {
  const { email } = req.body;
  try {
    await enviarEmail(email);
    res.json({ ok: true, msg: "E-mail enviado com sucesso!" });
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ ok: false, erro: "Falha no envio" });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log("✅ Pachequinho ativo!");
  console.log(`🌐 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`📬 Endpoint de e-mail: POST http://localhost:${PORT}/enviar`);
});
