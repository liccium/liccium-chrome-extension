const storeEnvironmentVariables = () => {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;

  if (API_URL) {
    chrome.storage.local.set({ API_URL });
    console.log("loaded API_URL from env file ", API_URL);
  }
    else {
        console.error("API_URL not found in env file");
    }

  if (API_KEY) {
    chrome.storage.local.set({ API_KEY});
    console.log("loaded API_KEY from env file", API_KEY);
  }
  else {
    console.error("API_KEY not found in env file");
  }
}

chrome.runtime.onInstalled.addListener(() => {

    // chrome.storage.local.clear();
    console.log('I come from Background-Script.');
   storeEnvironmentVariables(); 
   chrome.storage.local.set({ legacySearchServer: "https://search.liccium.app" });


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
    chrome.storage.local.set({ displayOverlay: false });
    chrome.storage.local.set({ renderType: "" });

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
            isPopupopen = false;
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
        //chrome.action.openPopup();
    }

    if (info.menuItemId === "link") {
        let pageUrl = info.pageUrl;
        let linkUrl = info.linkUrl;
        chrome.storage.local.remove(["pageUrl", "srcUrl", "iscc", "assets"]);
        chrome.storage.local.set({ pageUrl: pageUrl });
        chrome.storage.local.set({ srcUrl: linkUrl });
        chrome.tabs.create({ url: "popup.html" });
        //chrome.action.openPopup();
    }



    // Not supported yet
    //chrome.action.setPopup({ tabId: tab.id, popup: "popup.html" });

    /* chrome.action.openPopup(); */


});


let isPopupopen = false;

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request);
    console.log(sender);
    if (request.action === 'openPopup') {
        if (typeof chrome.action.openPopup === 'function') {
            if(!isPopupopen){
                console.log("Open the popup");
                await chrome.action.openPopup();
                isPopupopen = true;
            }
          }
          else {
            console.log("chrome.action.openPopup() not supported");
          }
    }
});

