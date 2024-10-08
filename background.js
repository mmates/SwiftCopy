// Spracovanie kliknutia na ikonu addonu
chrome.action.onClicked.addListener((tab) => {
  toggleExtension();  // Vypnúť alebo zapnúť rozšírenie
});

// Funkcia na prepnutie stavu rozšírenia a zmenu ikony
function toggleExtension() {
  chrome.storage.sync.get('enabled', function (data) {
    const newState = !data.enabled;  // Prepnutie stavu
    chrome.storage.sync.set({ enabled: newState }, function () {
      const message = newState ? "SwiftCopy is now ON! Get ready to copy text faster than a cheetah on roller skates! 🐆🛼" 
                               : "SwiftCopy is now OFF. Looks like your text will have to wait for its moment of glory! 💤";

      const iconPaths = newState ? {
        16: "icons/icon_enabled_16.png",
        48: "icons/icon_enabled_48.png",
        128: "icons/icon_enabled_128.png",
        256: "icons/icon_enabled_256.png"
      } : {
        16: "icons/icon_disabled_16.png",
        48: "icons/icon_disabled_48.png",
        128: "icons/icon_disabled_128.png",
        256: "icons/icon_disabled_256.png"
      };

      // Nastavenie ikonky pre rôzne veľkosti
      chrome.action.setIcon({ path: iconPaths });

      // Vytvorenie notifikácie
      chrome.notifications.create({
        type: "basic",
        iconUrl: iconPaths[256],  // Používaj ikonu s veľkosťou 48x48 pre notifikáciu
        title: "SwiftCopy",
        message: message
      });

      console.log(message);
    });
  });
}

// Počúvanie na klávesovú skratku
chrome.commands.onCommand.addListener(function(command) {
  if (command === "toggle-swiftcopy") {
    toggleExtension();
  }
});

// Spustenie po inštalácii alebo reštarte
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ enabled: true }, function() {
    console.log("SwiftCopy initialized and enabled by default.");
  });
});
