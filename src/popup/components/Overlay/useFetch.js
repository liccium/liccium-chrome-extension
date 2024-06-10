import { useState, useEffect } from "react";

const useFetch = (srcUrl, signal) => {
    const [jsonAssets, setJsonAssets] = useState([]);
    const [isccJsonArray, setIsccJsonArray] = useState([]);
     /*    let jsonAssets = [];
        let isccJsonArray = []; */
    const [isLoading, setLoading] = useState(false);
    /* const [error, setError] = useState(null); */

    const [serverUrl, setServerUrl] = useState("");
    const [srcUrls, setSrcUrl] = useState();
    const [pageUrl, setPageUrl] = useState("");
    const [displayOverlay, setDisplayOverlay] = useState(false);


    const fetchingData = async () => {
        console.log("start fetching Data with src URL: ", srcUrl);
        setLoading(true);
        //setError(null);

        // Erstelle einen neuen AbortController
        const newAbortController = new AbortController(); // Erstellen Sie einen neuen AbortController
        //setAbortController(newAbortController); // Aktualisieren Sie den AbortController im State
        //const signal = newAbortController.signal;

        // CONVERT SIGNS IN URL TO READABLE SIGNS
        let srcUrlReadable = srcUrl.replaceAll("%", "%25");
        srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
        srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
        srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
        srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
        srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

        //setnoDecOrNoAiOrGenAi(0);
        const currentPageUrl = window.location.href;
        let assets = [];
        let iscc = [];

        try {
            //console.log(srcUrl);
            // Verwende das Abort-Signal in deinem fetch Aufruf
            iscc = await fetch(serverUrl + "/iscc/create?sourceUrl=" + srcUrlReadable, { signal }).then(response => response.json());
            //console.log(serverUrl + "/iscc/create?sourceUrl=" + srcUrlReadable);
            let jsonExplain = await fetch(serverUrl + "/iscc/explain?iscc=" + iscc[0].isccMetadata.iscc.replace(":", "%3A"), { signal }).then(response => response.json());

            // Put sourceUrl and units from explained ISCC in jsonIscc
            iscc[0].isccMetadata.name = getModeCapitalLetter(iscc[0].isccMetadata.mode) + " from " + getISCCName(currentPageUrl);
            iscc[0].isccMetadata.sourceUrl = srcUrl;
            iscc[0].isccMetadata.units = jsonExplain.units;
            //console.log(iscc[0]);
            assets = await fetch(serverUrl + "/asset/nns?iscc=" + iscc[0].isccMetadata.iscc.replace(":", "%3A") + "&mode=" + iscc[0].isccMetadata.mode + "&isMainnet=false", { signal }).then(response => response.json());

            assets = sortVCs(assets);
            //console.log(assets);


            setJsonAssets(assets);
            //setIsccJsonArray(iscc);
            /* jsonAssets = assets;
            isccJsonArray = iscc; */

        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Fetch abgebrochen');
            } else {
                console.error(err);
                window.alert("Request to " + serverUrl + " failed.");
                //chrome.storage.local.remove(["srcUrl"]);
                /*setSrcUrl(""); */
            }
        } finally {
            // ADD iscc and assets to CHROME STORAGE
            chrome.storage.local.set({ pageUrl: currentPageUrl });
            chrome.storage.local.set({ srcUrl: srcUrl });
            chrome.storage.local.set({ iscc: iscc });
            chrome.storage.local.set({ assets: assets });
            chrome.storage.local.set({ renderType: "Assets" });

            setLoading(false);
            console.log("end fetching Data");
        }

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

    useEffect(() => {

        chrome.storage.local.get(
            [
                "selectedServerUrl",
                "displayOverlay",
                "pageUrl",
                "srcUrl",
                "iscc",
                "assets"
            ]
        ).then((storage) => {

            // console.log("---------- CHROME STORAGE -------->");
            // console.log(storage);

            if (storage.selectedServerUrl !== undefined) {
                setServerUrl(storage.selectedServerUrl);
            }
            if (storage.displayOverlay !== undefined) {
                setDisplayOverlay(storage.displayOverlay);
            }
            if (storage.pageUrl !== undefined) {
                setPageUrl(storage.pageUrl);
            }
            if (storage.srcUrl !== undefined) {
                setSrcUrl(storage.srcUrl);
            }
            if (storage.iscc !== undefined) {
                setIsccJsonArray(storage.iscc);
            }
            if (storage.assets !== undefined) {
                setJsonAssets(storage.assets);
            }
        });

    }, []);

    return {jsonAssets, isLoading, fetchingData };
};

export default useFetch;