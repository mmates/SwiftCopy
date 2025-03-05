document.addEventListener("mouseup", function () {
  chrome.storage.sync.get('enabled', function (data) {
      if (data.enabled !== false) {  // Predvolene zapnuté
          const selectedText = window.getSelection().toString();
          if (selectedText) {
              // Overíme, či stránka nie je Google Docs
              if (!window.location.hostname.includes("docs.google.com")) {
                  flashSelection();
              }

              copyToClipboard(selectedText);
          }
      }
  });
});

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
      const selectedText = range.toString();

      // Vytvoríme nový span element na vizuálny efekt
      const highlightSpan = document.createElement("span");
      highlightSpan.style.backgroundColor = "yellow";
      highlightSpan.style.color = "black";
      highlightSpan.textContent = selectedText;

      range.deleteContents();
      range.insertNode(highlightSpan);

      setTimeout(() => {
          highlightSpan.style.backgroundColor = "transparent"; // Prebliknutie
          setTimeout(() => {
              range.selectNode(highlightSpan);
              selection.removeAllRanges();
              selection.addRange(range);
          }, 100);
      }, 100);
  }
}