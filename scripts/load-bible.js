import { getBookChapterVerse, setTextContent } from "./dom-utils.js";

function extractRangeInclusive(text, startRef, endRef) {
    const startIndex = text.indexOf(startRef);
    const endIndex   = text.indexOf(endRef);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Could not find one of the references.");
    }

    const afterEnd = text.indexOf(":", endIndex + endRef.length);
    const cutIndex = afterEnd === -1 ? text.length : afterEnd - 1;

    return text.slice(startIndex, cutIndex);
}

export function loadHebrewText(callback) {
    const { book, chapter, verseStart, verseEnd } = getBookChapterVerse();
    const vs_formatted = ` ${chapter}:${verseStart} `;
    const ve_formatted = ` ${chapter}:${verseEnd} `;
    fetch(`bible/${book}.txt`)
        .then(response => response.text())
        .then(text => {
            setTextContent('hebrew-text', extractRangeInclusive (
                text, 
                vs_formatted, 
                ve_formatted
            ));
            if (callback) callback();
        })
        .catch(err => console.error(err));
}

export function loadEnglishText() {
    const { book, chapter, verseStart, verseEnd } = getBookChapterVerse();
    const vs_formatted = ` ${chapter}:${verseStart} `;
    const ve_formatted = ` ${chapter}:${verseEnd} `;
    fetch(`bible/${book}-en.txt`)
        .then(response => response.text())
        .then(text => {
            setTextContent('english-text', extractRangeInclusive (
                text, 
                vs_formatted, 
                ve_formatted
            ));
        })
        .catch(err => console.error(err));
}
