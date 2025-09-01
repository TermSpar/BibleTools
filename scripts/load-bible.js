import { getBookChapterVerse, setTextContent } from "./dom-utils.js";

function extractRangeInclusive(text, startRef, endRef) {
    const startIndex = text.indexOf(startRef);
    const endIndex   = text.indexOf(endRef);

    if (startIndex === -1 || endIndex === -1) {
        throw new Error("Could not find one of the references.");
    }

    // don't want to include the next C:V pair
    const afterEnd = text.indexOf(":", endIndex + endRef.length);
    //     const afterEnd = text.slice(endIndex + endRef.length).search(/\d+:\d+/); ?
    const cutIndex = afterEnd === -1 ? text.length : afterEnd - 1;

    return text.slice(startIndex, cutIndex);
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
