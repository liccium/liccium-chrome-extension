chrome.runtime.onInstalled.addListener(() => {
    console.log('I come from Background-Script.');

    chrome.storage.local.clear();
    // chrome.storage.local.set({ serverUrl: "http://localhost:8080/" });

    chrome.contextMenus.create({
        id: "nns",
        title: "Search image on Liccium",
        contexts: ["image"],
    });
});

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function () {
            console.log("Popup closed.");
        });
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    /* console.log(info);
    console.log(tab); */

    let pageUrl = info.pageUrl;
    let srcUrl = info.srcUrl;
    chrome.storage.local.remove(["pageUrl", "srcUrl", "iscc", "assets"]);
    chrome.storage.local.set({ pageUrl: pageUrl });
    chrome.storage.local.set({ srcUrl: srcUrl });
    chrome.tabs.create({ url: "popup.html" });

    // Not supported yet
    /* chrome.action.setPopup({ tabId: tab.id, popup: "popup.html" });
    chrome.action.openPopup(); */
});

/* 
// GEHT MIR AUF DEN PISS
chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  }); */

