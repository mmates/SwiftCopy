document.addEventListener("mouseup", function () {
    chrome.storage.sync.get('enabled', function (data) {
        if (data.enabled !== false) {  // Predvolene je zapnuté
            const selectedText = window.getSelection().toString();
            if (selectedText && !isInsideInputOrTextarea()) {  // Kontrola, či nie je v boxe
                // Získať rozsah označeného textu
                const selection = window.getSelection();
                if (selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0);

                    // Prebliknutie textu
                    flashSelection();

                    // Skopírovanie textu
                    copyToClipboard(selectedText);
                }
            }
        }
    });
});

// Funkcia na kontrolu, či je výber v input alebo textarea
function isInsideInputOrTextarea() {
    const activeElement = document.activeElement;
    return activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA");
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        console.log("Text copied to clipboard: " + text);
    }).catch(function (err) {
        console.error("Could not copy text: ", err);
    });
}

function flashSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedRange = range.cloneRange();

        let blinkCount = 0; // Počet prebliknutí

        function toggleSelection() {
            if (blinkCount < 3) {  // Nastavené na 3 prebliknutia
                selection.removeAllRanges();
                setTimeout(() => {
                    selection.addRange(selectedRange);
                    blinkCount++;
                    setTimeout(toggleSelection, 10);
                }, 10);
            }
        }

        toggleSelection();
    }
}
