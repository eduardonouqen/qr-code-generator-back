const input = document.querySelector("input");

input.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    await genQRCode();
  }
});

async function genQRCode() {
  if (!input.value.trim()) return;

  const response = await fetch("/api/qrcode", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: input.value.trim() })
  });

  if (!response.ok) {
    const msg = await response.text();
    console.error("Erro do servidor:", msg);
    alert("Erro ao gerar QR Code");
    return;
  }

  const svg = await response.text();
  document.querySelector(".qrCodeContent").innerHTML = svg;
}