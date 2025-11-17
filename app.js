const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// serwujemy pliki statyczne (HTML, CSS, IMG)
app.use(express.static(path.join(__dirname, "public")));

// API zwracające losowy obrazek
app.get("/random-image", (req, res) => {
  const imagesPath = path.join(__dirname, "public/images");
  const images = fs.readdirSync(imagesPath).filter(file =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  if (images.length === 0) {
    return res.status(404).json({ error: "Brak obrazków w katalogu /public/images" });
  }

  const randomImage = images[Math.floor(Math.random() * images.length)];
  res.json({ image: `/images/${randomImage}` });
});

// start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa: http://localhost:${PORT}`);
});