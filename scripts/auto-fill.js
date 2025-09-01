import { getValue } from "./dom-utils.js";

let cvList = []; // chapter-verse cache

async function loadCVs(book) {
    if (cvList.length > 0) return cvList;

    const response = await fetch(`bible/${book}.txt`);
    const text = await response.text();

    // break the text up by new lines
    const lines = text.split("\n");

    cvList = lines
        .map(line => {
            // ^\s* means any whitespace at the start of the line
            // \d+ means one or more digits
            // : is just a :
            const match = line.match(/^\s*\d+:\d+/);
            // returns a list of chapter:verse strings
            return match ? match[0].trim() : null;
        })
        // filter out any nulls (shouldn't be needed?)
        .filter(Boolean); 

    return cvList;
}

export async function getStartCVOptions(book) {
    const select = document.getElementById('start-select');
    const cvs = await loadCVs(book);

    select.innerHTML = "";

    // DocumentFragment is more efficient than creating a new Element
    const fragment = document.createDocumentFragment();
    cvs.forEach(cv => {
        const option = document.createElement('option');
        option.value = cv;
        option.textContent = cv;
        fragment.appendChild(option);
    });

    select.appendChild(fragment);
}

export async function getEndCVOptions(book) {
    const startCV = getValue('start-select');
    const select = document.getElementById('end-select');
    const cvs = await loadCVs(book);

    // make it so the only options are after the startIndex
    // if no startIndex, just give the full list
    const startIndex = cvs.indexOf(startCV);
    const filtered = startIndex >= 0 ? cvs.slice(startIndex + 1) : cvs;

    const fragment = document.createDocumentFragment();
    filtered.forEach(cv => {
        const option = document.createElement('option');
        option.value = cv;
        option.textContent = cv;
        fragment.appendChild(option);
    });

    select.appendChild(fragment);
}
