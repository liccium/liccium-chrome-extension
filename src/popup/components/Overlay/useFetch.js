const fetchingData = async (srcUrl, serverUrl) => {
    
    // Erstelle einen neuen AbortController
    const newAbortController = new AbortController(); // Erstellen Sie einen neuen AbortController
    //setAbortController(newAbortController); // Aktualisieren Sie den AbortController im State
    const signal = newAbortController.signal;

    // CONVERT SIGNS IN URL TO READABLE SIGNS
    let srcUrlReadable = srcUrl.replaceAll("%", "%25");
    srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
    srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
    srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
    srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
    srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

    //setnoDecOrNoAiOrGenAi(0);
    const currentPageUrl = window.location.href;
    let jsonAssets = [];
    let isccJsonArray = [];
    let loading = true;
    
    try {
        // Verwende das Abort-Signal in deinem fetch Aufruf
        isccJsonArray = await fetch(serverUrl + "/iscc/create?sourceUrl=" + srcUrlReadable, { signal }).then(response => response.json());
        let jsonExplain = await fetch(serverUrl + "/iscc/explain?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A"), { signal }).then(response => response.json());

        // Put sourceUrl and units from explained ISCC in jsonIscc
        isccJsonArray[0].isccMetadata.name = getModeCapitalLetter(isccJsonArray[0].isccMetadata.mode) + " from " + getISCCName(currentPageUrl);
        isccJsonArray[0].isccMetadata.sourceUrl = srcUrl;
        isccJsonArray[0].isccMetadata.units = jsonExplain.units;
        console.log(isccJsonArray[0]);
        jsonAssets = await fetch(serverUrl + "/asset/nns?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A") + "&mode=" + isccJsonArray[0].isccMetadata.mode + "&isMainnet=false", { signal }).then(response => response.json());

        jsonAssets = sortVCs(jsonAssets);
        console.log(jsonAssets);
        // ADD iscc and assets to CHROME STORAGE
        chrome.storage.local.set({ pageUrl: currentPageUrl });
        chrome.storage.local.set({ srcUrl: srcUrl });
        chrome.storage.local.set({ iscc: isccJsonArray });
        chrome.storage.local.set({ assets: jsonAssets });
        chrome.storage.local.set({ renderType: "Assets" });
        
    } catch (err) {
        if (err.name === 'AbortError') {
            console.log('Fetch abgebrochen');
        } else {
            console.error(err);
            window.alert("Request to " + serverUrl + " failed.");
            chrome.storage.local.remove(["srcUrl"]);
            /*setSrcUrl(""); */
        }
    } finally {
        loading = false;
        console.log("finally");
    }

    return {isccJsonArray, jsonAssets, loading};
}


const getISCCName = (pageUrl) => {

    let pageUrlSplit = pageUrl.split("/");
    let pageUrlName = "";

    if (pageUrlSplit.length === 4 && pageUrlSplit[3] === "") {
        pageUrlName = pageUrlSplit[2];
    } else {
        for (let i = 2; i < pageUrlSplit.length; i++) {
            // console.log("before: " + pageUrlName);
            if (i === pageUrlSplit.length - 1) {
                pageUrlName = pageUrlName + pageUrlSplit[i];
            } else {
                pageUrlName = pageUrlName + pageUrlSplit[i] + "/";
            }
            // console.log("after: " + pageUrlName);
        }
    }
    let www = pageUrlName.substring(0, 4);

    if (www === "www.") {
        pageUrlName = pageUrlName.substring(4, pageUrlName.length);
    }
    return pageUrlName;
}


const getModeCapitalLetter = (mode) => {
    return String.fromCharCode((mode.charCodeAt(0) - 32)) + mode.substring(1, mode.length);
}


const sortVCs = (assets) => {
    let assetsSortedVCs = [];
    let assetVCs = [];

    // First: insert assets with VCs
    for (let i = 0; i < assets.length; i++) {
        if (assets[i].credentials !== null) {
            assetVCs.push(assets[i]);
        }
    }

    // Second: sort VCs by length
    let index = 0;
    let maxLength = 0;
    let maxIndex = 0;
    while (assetVCs.length > 0) {
        if (assetVCs[index].credentials.length >= maxLength) {
            maxLength = assetVCs[index].credentials.length;
            maxIndex = index;
        }
        index++;

        if (index === assetVCs.length) {
            assetsSortedVCs.push(assetVCs[maxIndex]);
            assetVCs.splice(maxIndex, 1);
            index = 0;
            maxIndex = 0;
            maxLength = 0;
        }
    }

    // Thired: insert assets without VCs
    for (let i = 0; i < assets.length; i++) {
        if (assets[i].credentials === null) {
            assetsSortedVCs.push(assets[i]);
        }
    }
    return assetsSortedVCs;
}

export default fetchingData;