export function getBookChapterVerse() {
    const book = document.getElementById('book-select').value;
    const chapter = document.getElementById('chapter-select').value;
    const verseStart = document.getElementById('verse-start').value;
    const verseEnd = document.getElementById('verse-end').value;

    return { book, chapter, verseStart, verseEnd };
}

export function setTextContent(id, text) {
    document.getElementById(id).textContent = text;
}

export function getTextContent(id) {
    return document.getElementById(id).textContent;
}

export function getValue(id) {
    return document.getElementById(id).value;
}

export function getStartCVOptions() {
    const select = document.getElementById('start-select');
    fetch("bible/Genesis.txt")
        .then(response => response.text())
        .then(text => {
            const lines = text.split("\n");
            lines.forEach(line => {
                const match = line.match(/^\s*\d+:\d+/);
                if (match) {
                    const cv = match[0];
                    let option = document.createElement('option');
                    option.value = cv;
                    option.textContent = cv;
                    select.appendChild(option);
                }
            });
        })
        .catch(err => console.error(err));
}