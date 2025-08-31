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