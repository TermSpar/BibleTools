import { calculateGematriaValue } from "./gematria.js";
import { getStartCVOptions, getEndCVOptions } from "./auto-fill.js";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("calculate-button");
    btn.addEventListener("click", calculateGematriaValue);
});

const bibleBookField = document.getElementById("book-select");
document.addEventListener("DOMContentLoaded", () => {
    getStartCVOptions(bibleBookField.value);
});
bibleBookField.addEventListener("change", () => {
    const selectedBook = bibleBookField.value;
    getStartCVOptions(selectedBook);
});

const startCVField = document.getElementById("start-select");
startCVField.addEventListener("change", () => {
    const selectedBook = bibleBookField.value;
    getEndCVOptions(selectedBook);
});