const fs = require("fs");
const path = require("path");

const svgFolder = "./svg";
const outputMarkdownFile = "./README.md";

let markdownContent = `# Devfest 2024 - Sticker Pack

![Banner](./assets/banner.png)

Bu tabloda stickerları görebilir ve tıklayarak linkine ulaşabilirsiniz. Kullanmak istediğiniz sticker linkini bize iletebilirsiniz!

Original repo link: [free-gophers-pack](https://github.com/MariaLetta/free-gophers-pack)\n\n`;

markdownContent +=
  '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px;">\n';

fs.readdir(svgFolder, (err, files) => {
  if (err) {
    console.error("Klasörü okurken bir hata oluştu:", err);
    return;
  }

  const svgFiles = files.filter((file) => path.extname(file) === ".svg");

  svgFiles.forEach((file) => {
    const filePath = path.join(svgFolder, file);
    const imagePath = `${svgFolder}/${file}`;
    markdownContent += `
  <a href="${imagePath}" target="_blank" style="text-align: center; text-decoration: none;">
    <img src="${imagePath}" alt="${file}" style="width: 100px; height: 100px; object-fit: contain;" />
    <p style="font-size: 12px; color: #333;">${file}</p>
  </a>\n`;
  });

  markdownContent += "</div>\n";

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
