import { setTextContent, getTextContent, getValue } from "./dom-utils.js ";
import { loadHebrewText, loadEnglishText } from "./load-bible.js";

export function calculateGematriaValue(){
    // the function below is the callback for loadHebrewText
    // needed this because of async stuff
    loadHebrewText(() => {
        const hebrewText = getTextContent('hebrew-text');
        const gematriaType = getValue('gematria-type');
        let total = 0;
        for (let char of hebrewText) {
            total += getGematriaValue(char, gematriaType);
        }
        setTextContent('gematria-value-label', "Gematria Value: " + total);
    });
    loadEnglishText();
}

export function getGematriaValue(char, absOrOrd) {
   const gematriaMapAbsolute = {
        'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5,
        'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10,
        'כ': 20, 'ך': 20, 'ל': 30, 'מ': 40, 'ם': 40,
        'נ': 50, 'ן': 50, 'ס': 60, 'ע': 70, 'פ': 80,
        'ף': 80, 'צ': 90, 'ץ': 90, 'ק': 100, 'ר': 200,
        'ש': 300, 'ת': 400
    };

   const gematriaMapOrdinal = {
        'א': 1,  'ב': 2,  'ג': 3,  'ד': 4,  'ה': 5,
        'ו': 6,  'ז': 7,  'ח': 8,  'ט': 9,  'י': 10,
        'כ': 11, 'ך': 11, 'ל': 12, 'מ': 13, 'ם': 13,
        'נ': 14, 'ן': 14, 'ס': 15, 'ע': 16, 'פ': 17,
        'ף': 17, 'צ': 18, 'ץ': 18, 'ק': 19, 'ר': 20,
        'ש': 21, 'ת': 22
    };

    return absOrOrd === "absolute" ? gematriaMapAbsolute[char] || 0 : gematriaMapOrdinal[char] || 0;
}