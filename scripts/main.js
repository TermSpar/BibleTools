import { calculateGematriaValue } from "./gematria.js";
import { getStartCVOptions } from "./dom-utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("calculate-button");
    btn.addEventListener("click", calculateGematriaValue);
});

document.addEventListener("DOMContentLoaded", getStartCVOptions);

const bibleBookField = document.getElementById("book-select");
bibleBookField.addEventListener("change", getStartCVOptions);