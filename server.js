const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const ACCESS_TOKEN = "S-Vq3R6l4e3aJtIWjhnTmj4EJkwGIH3XG24QwGf8BusIynzdf2lgeaMNPL_glOF0";

app.post("/api/qrcode", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    console.error("⚠️ URL não informada");
    return res.status(400).send("URL é obrigatória");
  }

  try {
    const response = await fetch(`https://api.qr-code-generator.com/v1/create?access-token=${ACCESS_TOKEN}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        frame_name: "no-frame",
        qr_code_text: url,
        image_format: "SVG",
        background_color: "#ffffff",
        foreground_color: "#fa6e79",
        marker_left_inner_color: "#2d7cda",
        marker_left_outer_color: "#00bfff",
        marker_right_inner_color: "#2d7cda",
        marker_right_outer_color: "#00bfff",
        marker_bottom_inner_color: "#2d7cda",
        marker_bottom_outer_color: "#00bfff",
        marker_left_template: "version10",
        marker_right_template: "version10",
        marker_bottom_template: "version10"
      })
    });

    const resultText = await response.text();

    if (!response.ok) {
      console.error("Erro da API:", resultText);
      return res.status(500).send("Erro ao gerar QR Code");
    }

    res.set("Content-Type", "image/svg+xml");
    res.send(resultText);
  } catch (err) {
    console.error("Erro no servidor:", err);
    res.status(500).send("Erro no servidor");
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));