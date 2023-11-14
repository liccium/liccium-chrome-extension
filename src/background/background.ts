chrome.runtime.onInstalled.addListener(() => {
    console.log('I come from Background-Script.');

    chrome.storage.local.clear();
    chrome.storage.local.set({ selectedServerUrl: "http://search.liccium.app" });
    chrome.storage.local.set(
        {
            serverUrls: [
                {
                    name: "Liccium",
                    url: "https://search.liccium.app"
                },
                {
                    name: "if(is)",
                    url: "https://iscc.if-is.net"
                },
                {
                    name: "Development",
                    url: "http://localhost"
                }
            ]
        }
    );

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

