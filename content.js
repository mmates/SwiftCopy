document.addEventListener("mouseup", function () {
    chrome.storage.sync.get('enabled', function (data) {
      if (data.enabled !== false) {  // Predvolene je zapnuté
        const selectedText = window.getSelection().toString();
        if (selectedText) {
          // Získať rozsah označeného textu
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
  
            // Prebliknutie textu (rýchle odstránenie a vrátenie označenia)
            flashSelection();
  
            // Skopírovanie textu
            copyToClipboard(selectedText);
          }
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
      const selectedRange = range.cloneRange();
  
      let blinkCount = 0; // Počet prebliknutí
  
      // Funkcia pre jedno prebliknutie
      function toggleSelection() {
        if (blinkCount < 3) {  // Nastavené na 3 prebliknutia
          selection.removeAllRanges();
          setTimeout(() => {
            selection.addRange(selectedRange);
            blinkCount++;
            setTimeout(toggleSelection, 10);  // 10 ms pauza medzi prebliknutiami
          }, 10);  // 10 ms pauza po odstránení výberu
        }
      }
  
      toggleSelection();  // Spusti prebliknutie
    }
  }
  