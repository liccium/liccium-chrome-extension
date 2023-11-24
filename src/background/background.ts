chrome.runtime.onInstalled.addListener(() => {
    console.log('I come from Background-Script.');

    chrome.storage.local.clear();
    chrome.storage.local.set({ selectedServerUrl: "https://search.liccium.app" });
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
        id: "image",
        title: "Verify image",
        contexts: ["image"],
    });

    chrome.contextMenus.create({
        id: "link",
        title: "Verify linked content",
        contexts: ["link"],
    });

    /* chrome.contextMenus.create({
        title: "Liccium Trust Engine",
        id: "parent",
        contexts: ["selection"]
    });

    chrome.contextMenus.create({
        title: "Search image on Liccium",
        id: "image",
        parentId: "parent",
        contexts: ["image"]
    });

    chrome.contextMenus.create({
        title: "Search link on Liccium",
        id: "link",
        parentId: "parent",
        contexts: ["link"]
    }); */
});

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === "popup") {
        port.onDisconnect.addListener(function () {
            console.log("Popup closed.");
        });
    }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {

    console.log(info);

    if (info.menuItemId === "image") {
        let pageUrl = info.pageUrl;
        let srcUrl = info.srcUrl;
        chrome.storage.local.remove(["pageUrl", "srcUrl", "iscc", "assets"]);
        chrome.storage.local.set({ pageUrl: pageUrl });
        chrome.storage.local.set({ srcUrl: srcUrl });
        chrome.tabs.create({ url: "popup.html" });
        /* chrome.action.openPopup(); */
    }

    if (info.menuItemId === "link") {
        let pageUrl = info.pageUrl;
        let linkUrl = info.linkUrl;
        chrome.storage.local.remove(["pageUrl", "srcUrl", "iscc", "assets"]);
        chrome.storage.local.set({ pageUrl: pageUrl });
        chrome.storage.local.set({ srcUrl: linkUrl });
        chrome.tabs.create({ url: "popup.html" });
        /* chrome.action.openPopup(); */
    }



    // Not supported yet
    //chrome.action.setPopup({ tabId: tab.id, popup: "popup.html" });

    /* chrome.action.openPopup(); */
});

