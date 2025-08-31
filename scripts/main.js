import { calculateGematriaValue } from "./gematria.js";

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("calculate-button");
    btn.addEventListener("click", calculateGematriaValue);
});
