const fs = require("fs");
const path = require("path");

const svgFolder = "./svg";
const outputMarkdownFile = "./README.md";

let markdownContent = `# Devfest 2024 - Sticker Pack

![Banner](./assets/banner.png)

Bu tabloda stickerları görebilir ve tıklayarak linkine ulaşabilirsiniz. Kullanmak istediğiniz sticker linkini bize iletebilirsiniz!

Original repo link: [free-gophers-pack](https://github.com/MariaLetta/free-gophers-pack)\n\n`;

fs.readdir(svgFolder, (err, files) => {
  if (err) {
    console.error("Klasörü okurken bir hata oluştu:", err);
    return;
  }

  const svgFiles = files.filter((file) => path.extname(file) === ".svg");

  markdownContent +=
    "| " + " -------------------------------- |".repeat(4) + "\n";
  markdownContent += "| " + "---------- |".repeat(4) + "\n";

  for (let i = 0; i < svgFiles.length; i++) {
    const imagePath = `${svgFolder}/${svgFiles[i]}`;
    markdownContent += `| ![${svgFiles[i]}](${imagePath}) `;
    if ((i + 1) % 4 === 0) markdownContent += "|\n";
  }

  const remainingCells = svgFiles.length % 4;
  if (remainingCells > 0) {
    markdownContent += "| ".repeat(4 - remainingCells) + "|\n";
  }

  fs.writeFile(outputMarkdownFile, markdownContent, (err) => {
    if (err) {
      console.error("Markdown dosyasını yazarken bir hata oluştu:", err);
    } else {
      console.log(
        "Markdown dosyası başarıyla oluşturuldu:",
        outputMarkdownFile
      );
    }
  });
});
