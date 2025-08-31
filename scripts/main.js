function getBookChapterVerse() {
    const book = document.getElementById('book-select').value;
    const chapter = document.getElementById('chapter-select').value;
    const verseStart = document.getElementById('verse-start').value;
    const verseEnd = document.getElementById('verse-end').value;

    return { book, chapter, verseStart, verseEnd };
}

function extractRangeInclusive(text, startRef, endRef) {
    const startIndex = text.indexOf(startRef);
    const endIndex   = text.indexOf(endRef);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Could not find one of the references.");
    }

    const afterEnd = text.indexOf(":", endIndex + endRef.length);
    const cutIndex = afterEnd === -1 ? text.length : afterEnd + 1;

    return text.slice(startIndex, cutIndex - 3);
}

function loadHebrewText() {
    const { book, chapter, verseStart, verseEnd } = getBookChapterVerse();
    vs_formatted = ` ${chapter}:${verseStart} `
    ve_formatted = ` ${chapter}:${verseEnd} `
    fetch(`bible/${book}.txt`)
        .then(response => response.text())
        .then(text => {
            document.getElementById('hebrew-text').textContent = extractRangeInclusive (
                text, 
                vs_formatted, 
                ve_formatted
            )
        })
        .catch(err => console.error(err));
}

function loadEnglishText() {
    const { book, chapter, verseStart, verseEnd } = getBookChapterVerse();
    vs_formatted = ` ${chapter}:${verseStart} `
    ve_formatted = ` ${chapter}:${verseEnd} `
    fetch(`bible/${book}-en.txt`)
        .then(response => response.text())
        .then(text => {
            document.getElementById('english-text').textContent = extractRangeInclusive (
                text, 
                vs_formatted, 
                ve_formatted
            )
        })
        .catch(err => console.error(err));
}

function loadSelectedTexts() {
    loadHebrewText();
    loadEnglishText();
}
