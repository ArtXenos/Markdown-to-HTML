const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
    let markdown = markdownInput.value;

    // Convert headings
    markdown = markdown.replace(
        /^[ \t]*(#{3}) (.+)$/gm,
        "<h3>$2</h3>"
    );

    markdown = markdown.replace(
        /^[ \t]*(#{2}) (.+)$/gm,
        "<h2>$2</h2>"
    );

    markdown = markdown.replace(
        /^[ \t]*(#) (.+)$/gm,
        "<h1>$2</h1>"
    );

    // Convert images
    markdown = markdown.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img alt="$1" src="$2">'
    );

    // Convert links
    markdown = markdown.replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2">$1</a>'
    );

    // Convert bold text
    markdown = markdown.replace(
        /\*\*(.+?)\*\*/g,
        "<strong>$1</strong>"
    );

    markdown = markdown.replace(
        /__(.+?)__/g,
        "<strong>$1</strong>"
    );

    // Convert italic text
    markdown = markdown.replace(
        /\*(.+?)\*/g,
        "<em>$1</em>"
    );

    markdown = markdown.replace(
        /_(.+?)_/g,
        "<em>$1</em>"
    );

    // Convert blockquotes
    markdown = markdown.replace(
        /^[ \t]*> (.+)$/gm,
        "<blockquote>$1</blockquote>"
    );

    return markdown.replace(/\r?\n/g, "");
}

// Update the output whenever the user types
markdownInput.addEventListener("input", function () {
    const html = convertMarkdown();

    // Show the raw HTML code
    htmlOutput.textContent = html;

    // Render the converted HTML
    preview.innerHTML = html;
});