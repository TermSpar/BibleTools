function loadHebrewText() {
    fetch('bible/Genesis.txt')
        .then(response => response.text())
        .then(text => {
            document.getElementById('hebrew-text').textContent = text;
        })
        .catch(err => console.error(err));
}
