const marked = require('marked');
const fs = require('fs');

function parseMarkdown(markdown) {
    markdown = markdown.replace(/## (.+)/g, '<h2 id="$1"><button class="copy-button" onclick="copy(\'$1\')"><i class="material-icons">content_copy</i></button>$1</h2>');
    markdown = markdown.replace(/# (.+)/g, '<h1 id="$1"><button class="copy-button" onclick="copy(\'$1\')"><i class="material-icons">content_copy</i></button>$1</h1>');
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');
    markdown = markdown.replace(/- (.+)/g, '<li>$1</li>');
    markdown = markdown.replace(/<\/li><li>/g, '</li>\n<li>');
    markdown = markdown.replace(/<\/li> <li>/g, '</li>\n<li>');
    markdown = `<p>${markdown}</p>`;

    return markdown;
}

const markdownFilePath = './markdown.md';
const markdownText = fs.readFileSync(markdownFilePath, 'utf-8');


const header = `<!DOCTYPE html>\n<html>\n<head>\n<title>Markdown Writer</title>\n<link rel="stylesheet" type="text/css" href="styles.css">\n<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">\n</head>\n<body>`;
const body = parseMarkdown(markdownText);
const footer = `\n<script>\nfunction copy(id) {\nwindow.location.hash = '';navigator.clipboard.writeText(\`\${window.location.href}\${id}\`)\nalert('コピーしました!');\n}</script>\n</body>\n</html>`;
const html = `${header}\n${body}\n${footer}`;
console.log(`Successfully converted markdown to HTML!`);
fs.writeFileSync('./markdown.html', html);
