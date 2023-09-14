import React from 'react';
import { useState, useEffect } from 'react';
import './popup.css';
import Selection from './components/Selection/Selection';
import Processing from './components/Processing/Processing';
import AssetList from './components/Asset/AssetList/AssetList';
import AssetDetail from './components/Asset/AssetDetail/AssetDetail';


const Popup = () => {

    const [pageUrl, setPageUrl] = useState<string>("");

    const [serverUrl, setServerUrl] = useState<string>("");

    const [srcUrl, setSrcUrl] = useState<string>("");

    const [renderer, setRenderer] = useState([]);
    const [renderType, setRenderType] = useState<string>("");

    const [iscc, setIscc] = useState([]);
    const [assets, setAssets] = useState([]); // new Entries().data
    const [selectedItemId, setSelectedItemId] = useState<string>("");

    const clearStorage = () => {
        console.log("Clearing storage");
        chrome.storage.local.remove(["pageUrl", "srcUrl", "iscc", "assets"]);
        setSrcUrl("");
        setIscc([]);
        setAssets([]);
        /* setRenderType("Selection");
        setRenderer([<Selection key="Selection0" setSrcUrl={setSrcUrl} setDomain={setDomain} />]); */
        //window.close(); // close popup
    }

    const renderThumbnailWidth = (iscc, renderSize) => {
        let width = iscc.width;
        let height = iscc.height;
        return Math.ceil(width / (height / renderSize));
    }

    const renderThumbnailHeight = (iscc, renderSize) => {
        let width = iscc.width;
        let height = iscc.height;
        return Math.ceil(height / (width / renderSize));
    }

    const cropThumbnail = (size, renderSize) => {
        // console.log(size + " - " + renderSize + " = " + (size - renderSize) + " / 2 = " + ((size - renderSize) / 2));
        return (size - renderSize) / 2;
    }

    const createThumbnail = (className, iscc, renderSize) => {
        let thumbnail = [];

        if (iscc.thumbnail !== undefined) {
            let height = iscc.height;
            let width = iscc.width;

            let heightStyle = null;
            let widthStyle = null;
            let clipPath = null;
            let margin = null;

            if (height > width) {
                heightStyle = renderThumbnailHeight(iscc, renderSize);
                widthStyle = renderSize;
                // console.log("rheight: " + heightStyle + ", rwidth: " + widthStyle);
                // console.log("clip-path: inset(" + cropThumbnail(heightStyle, renderSize) + "px 0px)");
                clipPath = "inset(" + cropThumbnail(heightStyle, renderSize) + "px 0px)" // top right bottom left
                margin = "margin: -" + cropThumbnail(heightStyle, renderSize) + "px 0px";
            } else {
                heightStyle = renderSize;
                widthStyle = renderThumbnailWidth(iscc, renderSize);
                // console.log("rheight: " + heightStyle + ", rwidth: " + widthStyle);
                // console.log("clip-path: inset(0px " + cropThumbnail(widthStyle, renderSize) + "px)");
                clipPath = "inset(0px " + cropThumbnail(widthStyle, renderSize) + "px)" // top right bottom left
                margin = "0px -" + cropThumbnail(widthStyle, renderSize) + "px";
            }

            let imgStyle = {
                height: heightStyle + "px",
                width: widthStyle + "px",
                clipPath: clipPath,
                margin: margin
            }

            thumbnail.push(
                <div key={className + new Date()} className={className}>
                    <img src={iscc.thumbnail} className="thumbnail" style={imgStyle} />
                </div>
            );

        } else {

            let imgStyle = {
                height: 70 + "px",
                width: 70 + "px"
            }

            thumbnail.push(
                <div key={className + new Date()} className={className}>
                    <img src="no_thumbnail_black.png" className="thumbnail" style={imgStyle} />
                </div>
            );
        }

        return thumbnail;
    }

    const sortVCs = (assets) => {

        console.log("UNSORTED ASSETS:");
        console.log(assets);

        let assetsSortedVCs = [];

        let assetVCs = [];

        // First: insert assets with VCs
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].credentials !== null) {
                assetVCs.push(assets[i]);
            }
        }

        // Second: sort VCs by length
        console.log("VC ASSETS:");
        console.log(assetVCs);
        let index = 0;
        let maxLength = 0;
        let maxIndex = 0;
        while(assetVCs.length > 0) {
            if(assetVCs[index].credentials.length >= maxLength) {
                maxLength = assetVCs[index].credentials.length;
                maxIndex = index;
            }
            index++;

            if(index === assetVCs.length) {
                assetsSortedVCs.push(assetVCs[maxIndex]);
                assetVCs.splice(maxIndex, 1);
                index = 0;
                maxIndex = 0;
                maxLength = 0;
            }
        }
        console.log("SORTED VCS ASSETS:");
        console.log(assetsSortedVCs);

        // Thired: insert assets without VCs
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].credentials === null) {
                assetsSortedVCs.push(assets[i]);
            }
        }

        console.log("SORTED ASSETS:");
        console.log(assetsSortedVCs);

        return assetsSortedVCs;
    }

    const getModeCapitalLetter = (mode) => {
        return String.fromCharCode((mode.charCodeAt(0) - 32)) + mode.substring(1, mode.length);
    }

    const getISCCName = (pageUrl) => {

        //    https://www.spiegel.de/geschichte/herfried-muenkler-zum-wagner-aufstand-ich-gehe-davon-aus-dass-die-russen-prigoschin-liquidieren-werden-a-0b45cd9c-c6de-4854-88c4-4cf9f5ac1ecf
        //    https://www.amazon.de/Popul%C3%A4re-Kultur-Anhang-Schriften-Popkultur-ebook/dp/B08L3ZYSNH/ref=tmm_kin_swatch_0?_encoding=UTF8&qid=1688415204&sr=8-3
        //    https://www.w-hs.de/
        //    https://www.w-hs.de/forschungsinstitute/institut-fuer-internet-sicherheit/

        /* 
        // FIRST VISION
        let pageUrlName = pageUrl.split("/")[2];
        pageUrlName = pageUrlName.split(".");
        pageUrlName = pageUrlName[pageUrlName.length - 2] + "." + pageUrlName[pageUrlName.length - 1];

        let firstPath = pageUrl.split("/");
        if (firstPath.length > 4) {
            firstPath = "/" + firstPath[3];
        } else {
            firstPath = "";
        }
        return pageUrlName + firstPath;
        */

        // SECOND VISION

        let pageUrlSplit = pageUrl.split("/");
        let pageUrlName = "";

        console.log("TESTING SHIT");
        console.log(pageUrlSplit);

        if (pageUrlSplit.length === 4 && pageUrlSplit[3] === "") {
            pageUrlName = pageUrlSplit[2];
        } else {
            for (let i = 2; i < pageUrlSplit.length; i++) {
                console.log("before: " + pageUrlName);
                if (i === pageUrlSplit.length - 1) {
                    pageUrlName = pageUrlName + pageUrlSplit[i];
                } else {
                    pageUrlName = pageUrlName + pageUrlSplit[i] + "/";
                }
                console.log("after: " + pageUrlName);
            }
        }
        let www = pageUrlName.substring(0, 4);

        console.log("TESTING SHIT");
        console.log(pageUrlName);
        console.log(www);
        if (www === "www.") {
            pageUrlName = pageUrlName.substring(4, pageUrlName.length);
        }
        console.log(pageUrlName);


        return pageUrlName;
    }

    const render = () => {

        let element = [];

        if (srcUrl === "") {
            element.push(
                <Selection
                    key="Selection0"
                    setSrcUrl={setSrcUrl}
                    setPageUrl={setPageUrl}
                />
            );
            setRenderType("Selection");
        }

        if (srcUrl !== "" && iscc.length === 0) {
            element.push(
                <Processing key="Processing0" />
            );
        }

        if (iscc.length !== 0) {

            if (selectedItemId === "") {
                element.push(
                    <AssetList
                        key="AssetList0"
                        iscc={iscc}
                        assets={assets}
                        createThumbnail={createThumbnail}
                        onItemClickHadler={onItemClickHadler}
                        clearStorage={clearStorage}
                    />
                );
            } else {
                if (selectedItemId === "iscc") {
                    element.push(
                        <AssetDetail
                            key="AssetDetail0"
                            iscc={iscc[0]}
                            asset={iscc[0]}
                            createThumbnail={createThumbnail}
                            onItemClickHadler={onItemClickHadler} />
                    );
                } else {
                    element.push(
                        <AssetDetail
                            key="AssetDetail0"
                            iscc={iscc[0]}
                            asset={assets[selectedItemId]}
                            createThumbnail={createThumbnail}
                            onItemClickHadler={onItemClickHadler} />
                    );
                }
            }
            setRenderType("Assets");

        }
        setRenderer(element);
    }

    const sendRequest = async (srcUrl) => {

        // CONVERT SIGNS IN URL TO READABLE SIGNS
        let srcUrlReadable = srcUrl.replaceAll("%", "%25");
        srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
        srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
        srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
        srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
        srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

        console.log("Fetching with Readable src url: " + srcUrlReadable);

        // FETCH ISCC DATA
        let jsonIscc = [];
        let jsonAssets = [];
        try {
            jsonIscc = await fetch("http://localhost:8080/iscc/create?sourceUrl=" + srcUrlReadable).then(response => response.json());
            let jsonExplain = await fetch("http://localhost:8080/iscc/explain?iscc=" + jsonIscc[0].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
            // jsonIscc = await fetch(serverUrl + "iscc/create?sourceUrl=" + srcUrlReadable).then(response => response.json());
            // let jsonExplain = await fetch(serverUrl + "iscc/explain?iscc=" + jsonIscc[0].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
            // Put sourceUrl and units from explained ISCC in jsonIscc
            jsonIscc[0].isccMetadata.name = getModeCapitalLetter(jsonIscc[0].isccMetadata.mode) + " from " + getISCCName(pageUrl);
            jsonIscc[0].isccMetadata.sourceUrl = srcUrl;
            jsonIscc[0].isccMetadata.units = jsonExplain.units;

            // FETCH ASSET DATA
            jsonAssets = await fetch("http://localhost:8080/asset/nns?iscc=" + jsonIscc[0].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
            // jsonAssets = await fetch(serverUrl + "asset/nns?iscc=" + jsonIscc[0].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
            // Put units from explained ISCC in jsonAssets
            for (let i = 0; i < jsonAssets.length; i++) {
                let jsonExplain = await fetch("http://localhost:8080/iscc/explain?iscc=" + jsonAssets[i].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
                // let jsonExplain = await fetch(serverUrl + "iscc/explain?iscc=" + jsonAssets[i].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
                let assetUnits = jsonExplain.units;
                jsonAssets[i].isccMetadata.units = assetUnits;
            }

            jsonAssets = sortVCs(jsonAssets);

            // ADD iscc and assets to CHROME STORAGE
            chrome.storage.local.set({ iscc: jsonIscc }); // use callback in then to check if saved
            chrome.storage.local.set({ assets: jsonAssets }); // use callback in then to check if saved

            setIscc(jsonIscc);
            setAssets(jsonAssets);

            setRenderType("Assets");

        } catch (err) {

            console.error(err);

            window.alert("Reuqest with url http://localhost:8080 failed.");
            //window.alert("Reuqest with url " + serverUrl + " failed.");
            chrome.storage.local.remove(["srcUrl"]);
            setSrcUrl("");
        }

    }

    function onItemClickHadler(id: string): void {
        console.log("clicked " + id);
        setSelectedItemId(id);
    }

    useEffect(() => {

        document.title = "Liccium Trust Engine";

        chrome.runtime.connect({ name: "popup" }); // connect to content script

        chrome.storage.local.get(
            [
                // "serverUrl",
                "pageUrl",
                "srcUrl", 
                "iscc",
                "assets"]
            ).then((storage) => {

            console.log("---------- CHROME STORAGE -------->");
            console.log(storage);

            /* if (storage.serverUrl !== undefined) {
                setServerUrl(storage.serverUrl);
            } */
            if (storage.pageUrl !== undefined) {
                setPageUrl(storage.pageUrl);
            }
            if (storage.srcUrl !== undefined) {
                setSrcUrl(storage.srcUrl);
            }
            if (storage.iscc !== undefined) {
                setIscc(storage.iscc);
            }
            if (storage.assets !== undefined) {
                setAssets(storage.assets);
            }
        });

        console.log("############## useEffekt Popup ############## ");
        console.log("serverUrl: " + serverUrl);
        console.log("pageUrl: " + pageUrl);
        // console.log("srcUrl: " + srcUrl);
        console.log("iscc: " + iscc.length);
        console.log(iscc);
        console.log("assets: " + assets.length);
        console.log(assets);
        console.log("renderer: " + renderType);

        if (srcUrl !== "" && iscc.length === 0 && renderType === "Selection") {
            setRenderType("Processing");
            sendRequest(srcUrl);
        }

        render();

    }, [srcUrl, renderType, selectedItemId]);

    return (
        <div className="Popup">
            {renderer}
        </div>
    );
};

export default Popup;