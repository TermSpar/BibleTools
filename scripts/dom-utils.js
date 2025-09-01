export function getBookChapterVerse() {
    const book = getValue("book-select");
    const startCV = getValue("start-select");
    const endCV = getValue("end-select");

    return { book, startCV, endCV };
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
