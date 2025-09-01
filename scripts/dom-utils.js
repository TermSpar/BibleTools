export function getBookChapterVerse() {
    const book = document.getElementById('book-select').value;
    const chapter = document.getElementById('chapter-select').value;
    const verseStart = document.getElementById('verse-start').value;
    const verseEnd = document.getElementById('verse-end').value;

    return { book, chapter, verseStart, verseEnd };
}

export function setTextContent(id, text) {
    document.getElementById(id).textContent = text;
}

export function getTextContent(id) {
    return document.getElementById(id).textContent;
}

export function getValue(id) {
    return document.getElementById(id).value;
}

let cvList = []; // cache

async function loadCVs() {
    if (cvList.length > 0) return cvList;

    const response = await fetch("bible/Genesis.txt");
    const text = await response.text();
    const lines = text.split("\n");

    cvList = lines
        .map(line => {
            const match = line.match(/^\s*\d+:\d+/);
            return match ? match[0] : null;
        })
        .filter(Boolean); 

    return cvList;
}

export async function getStartCVOptions() {
    const select = document.getElementById('start-select');
    const cvs = await loadCVs();

    select.innerHTML = "";

    const fragment = document.createDocumentFragment();
    cvs.forEach(cv => {
        const option = document.createElement('option');
        option.value = cv;
        option.textContent = cv;
        fragment.appendChild(option);
    });

    select.appendChild(fragment);
}

export async function getEndCVOptions() {
    const startCV = getTextContent('start-select');
    const select = document.getElementById('end-select');
    const cvs = await loadCVs();

    select.innerHTML = "";

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
