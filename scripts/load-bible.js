import { getBookChapterVerse, setTextContent } from "./dom-utils.js";

function extractRangeInclusive(text, startRef, endRef) {
    const startIndex = text.indexOf(startRef);
    const endIndex   = text.indexOf(endRef);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Could not find one of the references.");
    }

    // this will find the absolute index of the next C:V pair
    const regex = /\d+:\d+/g; // g = global so we can use lastIndex
    regex.lastIndex = endIndex + endRef.length;
    const match = regex.exec(text);
    const afterEnd = match ? match.index : -1;

    return text.slice(startIndex, afterEnd);
}

export function loadHebrewText(callback) {
    const { book, startCV, endCV } = getBookChapterVerse();
    fetch(`bible/${book}.txt`)
        .then(response => response.text())
        .then(text => {
            setTextContent('hebrew-text', extractRangeInclusive (
                text,
                startCV,
                endCV
            ));
            if (callback) callback();
        })
        .catch(err => console.error(err));
}

export function loadEnglishText() {
    const { book, startCV, endCV } = getBookChapterVerse();
    fetch(`bible/${book}-en.txt`)
        .then(response => response.text())
        .then(text => {
            setTextContent('english-text', extractRangeInclusive (
                text, 
                startCV, 
                endCV
            ));
        })
        .catch(err => console.error(err));
}
