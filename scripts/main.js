import { calculateGematriaValue } from "./gematria.js";
import { getStartCVOptions, getEndCVOptions, bookChange } from "./auto-fill.js";

const bibleBookField = document.getElementById("book-select");
const startCVField = document.getElementById("start-select");
const calculateBtn = document.getElementById("calculate-button");

// initialize the app once the DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
    calculateBtn.addEventListener("click", calculateGematriaValue);

    await getStartCVOptions(bibleBookField.value);

    await getEndCVOptions(bibleBookField.value);
});

// when the book changes, repopulate start (and then end)
bibleBookField.addEventListener("change", async () => {
    bookChange(bibleBookField.value);
});

// when the start CV changes, update the end options
startCVField.addEventListener("change", async () => {
    await getEndCVOptions(bibleBookField.value);
});
