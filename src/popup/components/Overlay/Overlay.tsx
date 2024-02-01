import React, { useEffect, useState } from 'react';
import { GenAISvg } from './GenAISvg';
import { LicciumIconSvg } from './LicciumIconSvg';
import './Overlay.css';
import { ProcessingOverlay } from './ProcessingOverlay';
import { WarningSvg } from './WarningSvg';

export const Overlay = () => {




    // chrome states
    const [serverUrl, setServerUrl] = useState("");
    const [displayOverlay, setDisplayOverlay] = useState();
    const [pageUrl, setPageUrl] = useState("");
    const [srcUrl, setSrcUrl] = useState("");
    const [iscc, setIscc] = useState([]);
    const [assets, setAssets] = useState([]);
    const serverUrls = {
        "https://search.liccium.app": "Liccium",  // plugin.liccium.app
        "https://iscc.if-is.net": "if(is)",
        "http://localhost": "Development"
    }

    // overlay states
    const [mediaType, setMediaType] = useState("");
    const [noDecOrNoAiOrGenAi, setnoDecOrNoAiOrGenAi] = useState(4);
    const [generateStatText, setGenerateStatText] = useState("");
    const [boolOverlay, setBoolOverlay] = useState(false);
    const [boolNoAi, setBoolNoAi] = useState(false);
    const [boolGenAi, setBoolGenaAi] = useState(false);
    const [boolNoDeclaration, setBoolNoDeclaration] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [overlayStyle, setOverlayStyle] = useState(
        {
            height: 36.75 + "px",
            width: 200 + "px",
            borderRadius: 5 + "px",
            background: "rgba(255, 255, 255, 0.65)",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0",
            position: "absolute",
            zIndex: 10000,
            pointerEvents: "auto",
            display: "none",
            opacity: "0.8",
            overflow: "hidden",
            textAlign: "center"
        } as React.CSSProperties
    );
    const [iconLicciumStyle, setIconLicciumStyle] = useState(
        {
            position: "absolute",
            margin: 0,
            width: 35 + "px",
            left: "0",
            borderRadius: "5px",
            background: "rgba(255, 255, 255, 0.65)",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset",
            zIndex: "10001",
            display: "none"
            // border: "1px solid red"
        } as React.CSSProperties
    );

    const [middleContent, setMiddleContent] = useState(
        {
            width: 125 + "px",
            height: 40 + "px",
            borderRadius: 25 + "px",
            border: "1px solid var(--white, #FFF)",
            /* background: "#B3151B", */
            display: "flex",
            marginLeft: 20 + "px",
            marginTop: 10 + "px",
            alignItems: "center"
        } as React.CSSProperties
    )
    //update Div-Position
    const updateDivPosition = (event) => {
        //console.log("(update) Show overlay: " + boolOverlay);
        if (!boolOverlay) {
            if (event.target.tagName.toLowerCase() === 'img'
                && event.target.width >= 100
                && event.target.height >= 100) {
                let rect = event.target.getBoundingClientRect();
                let paddingFromTop = 10;
                let paddingFromLeft = 10;
                setOverlayStyle((prevState) => ({
                    ...prevState,
                    top: (rect.top + window.scrollY + paddingFromTop) + 'px',
                    left: (rect.left + window.scrollX + paddingFromLeft) + 'px'
                }));
                setIconLicciumStyle((prevState) => ({
                    ...prevState,
                    top: (rect.top + window.scrollY + paddingFromTop) + 'px',
                    left: (rect.left + window.scrollX + paddingFromLeft) + 'px',
                    display: 'block'
                }));
                setSrcUrl(event.target.src);
            }
        }
    };
    //Div hiden beim mouse-out
    const hideDiv = () => {
        if (!boolOverlay) {
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                display: "none"
            }));
        }
    };

    const toggleOverlayVisibility = () => {
        console.log('click ' + srcUrl);
        /* overlayElement.classList.toggle('transition'); */
        //console.log("Show overlay: " + boolOverlay);
        if (!boolOverlay) {
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "block"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                background: "none",
                boxShadow: "none"
            }));
            console.log("in toggleOverlay: " + boolOverlay);
            setBoolOverlay(true);
            console.log("in toggleOverlay: " + boolOverlay);
            setIsFetchingData(true);
            //console.log("fetching");
            //fetchingData(srcUrl);
        } else {
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "none"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                background: "rgba(255, 255, 255, 0.65)",
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset"
            }));
            console.log("in toggleOverlay: " + boolOverlay);
            setBoolOverlay(false);
            console.log("in toggleOverlay: " + boolOverlay);
            setIsFetchingData(false);
            setnoDecOrNoAiOrGenAi(4);
            setMediaType("");
            console.log("################");
            console.log(mediaType);
            console.log("############");
        }
    };



    //proof if at least one asset is genai
    const isGenaiOrNoAi = (assets) => {
        console.log("LÄNGGEEEEEEEEEE: " + assets.length);
        if (assets.length === 0) {
            // setBoolNoDeclaration(true);
            setnoDecOrNoAiOrGenAi(0);
            console.log("###########fweffwef###########");
        }
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype === "trainedAlgorithmicMedia"
                || assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype === "compositeSynthetic"
                || assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype === "algorithmicMedia") {
                // setBoolGenaAi(true);
                setGenerateStatText("GEN AI");
                setMiddleContent((prevState) => ({
                    ...prevState,
                    backgroundColor: "#B3151B"
                }));
                setnoDecOrNoAiOrGenAi(1);
                setMediaType(assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype);
                console.log(assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype);
                break;
            } else if (assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype === "digitalCapture"
                || assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype === "minorHumanEdits") {
                // setBoolNoAi(true);
                setGenerateStatText("NO AI");
                setMiddleContent((prevState) => ({
                    ...prevState,
                    backgroundColor: "#7E5C7E"
                }));
                setnoDecOrNoAiOrGenAi(2);
                setMediaType("Human generated content");
                break;
            } else {
                setnoDecOrNoAiOrGenAi(3);
                break;
            }
        }
    }


    const fetchingData = async (srcUrl) => {
        // console.log('in fetchingData' + srcUrl);
        // CONVERT SIGNS IN URL TO READABLE SIGNS
        let srcUrlReadable = srcUrl.replaceAll("%", "%25");
        srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
        srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
        srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
        srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
        srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

        // console.log("Fetching with Readable src url: " + srcUrlReadable);
        console.log("in fetch: " + boolGenAi);
        // setBoolGenaAi(false);
        console.log("in fetch: " + boolGenAi);
        // setBoolNoAi(false);
        // setBoolNoDeclaration(false);
        setnoDecOrNoAiOrGenAi(0);
        let currentPageUrl = window.location.href;
        let jsonAssets = [];
        let isccJsonArray = [];
        try {
            isccJsonArray = await fetch(serverUrl + "/iscc/create?sourceUrl=" + srcUrlReadable).then(response => response.json());
            // console.log(isccJsonArray);
            let jsonExplain = await fetch(serverUrl + "/iscc/explain?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());
            // console.log(jsonExplain);
            // Put sourceUrl and units from explained ISCC in jsonIscc
            isccJsonArray[0].isccMetadata.name = getModeCapitalLetter(isccJsonArray[0].isccMetadata.mode) + " from " + getISCCName(currentPageUrl);
            isccJsonArray[0].isccMetadata.sourceUrl = srcUrl;
            isccJsonArray[0].isccMetadata.units = jsonExplain.units;
            jsonAssets = await fetch(serverUrl + "/asset/nns?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A") + "&mode=" + isccJsonArray[0].isccMetadata.mode + "&isMainnet=false").then(response => response.json());

            jsonAssets = sortVCs(jsonAssets);

            // ADD iscc and assets to CHROME STORAGE
            chrome.storage.local.set({ pageUrl: currentPageUrl });
            chrome.storage.local.set({ srcUrl: srcUrl });
            chrome.storage.local.set({ iscc: isccJsonArray });
            chrome.storage.local.set({ assets: jsonAssets });
            chrome.storage.local.set({ renderType: "Assets" });
            setIscc(isccJsonArray);
            setAssets(jsonAssets);
            setPageUrl(currentPageUrl);
            setSrcUrl(srcUrl);
            //isGenaiOrNoAi(jsonAssets);



        } catch (err) {
            console.error(err);
            setIsFetchingData(false);
            window.alert("Request to " + serverUrls[serverUrl] + " failed.");
            chrome.storage.local.remove(["srcUrl"]);
            setSrcUrl("");
        } finally {
            setIsFetchingData(false);
            /* setBoolGenaAi(true); */
            /* console.log("assets: " + jsonAssets.length)
            isGenaiOrNoAi(jsonAssets); */
        }

    }

    const getISCCName = (pageUrl) => {

        let pageUrlSplit = pageUrl.split("/");
        let pageUrlName = "";

        // console.log("TESTING SHIT");
        // console.log(pageUrlSplit);

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

        // console.log("TESTING SHIT");
        // console.log(pageUrlName);
        // console.log(www);
        if (www === "www.") {
            pageUrlName = pageUrlName.substring(4, pageUrlName.length);
        }
        // console.log(pageUrlName);


        return pageUrlName;
    }

    const getModeCapitalLetter = (mode) => {
        return String.fromCharCode((mode.charCodeAt(0) - 32)) + mode.substring(1, mode.length);
    }

    const sortVCs = (assets) => {

        // console.log("UNSORTED ASSETS:");
        // console.log(assets);

        let assetsSortedVCs = [];

        let assetVCs = [];

        // First: insert assets with VCs
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].credentials !== null) {
                assetVCs.push(assets[i]);
            }
        }

        // Second: sort VCs by length
        // console.log("VC ASSETS:");
        // console.log(assetVCs);
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
        // console.log("SORTED VCS ASSETS:");
        // console.log(assetsSortedVCs);

        // Thired: insert assets without VCs
        for (let i = 0; i < assets.length; i++) {
            if (assets[i].credentials === null) {
                assetsSortedVCs.push(assets[i]);
            }
        }

        // console.log("SORTED ASSETS:");
        // console.log(assetsSortedVCs);

        return assetsSortedVCs;
    }




    const generateMiddleDiv = () => {

        console.log(noDecOrNoAiOrGenAi)
        if (noDecOrNoAiOrGenAi == 0) {
            return <>
                <p className='noDec'>no Declaration found</p>
            </>
        } else if (noDecOrNoAiOrGenAi == 3) {
            return <>
            </>
        } else {
            return <>
                <div className="generateStat tagTooltip" style={middleContent}>
                    <div className="generateStat-icon">
                        <GenAISvg />
                    </div>
                    <div className="generateStat-text">
                        <p className="tagText">{generateStatText}</p>
                    </div>
                    <span className="tagtooltiptext">{mediaType}</span>
                </div>
            </>

        }
    }
    const generateHeadline = () => {
        if (noDecOrNoAiOrGenAi == 0) {
            return <>
                <p><span className='red-circle'>0</span> Declaration(s)</p>
            </>
        }
        else if (noDecOrNoAiOrGenAi == 1) {
            return <>
                <p>Caution advised</p>
            </>
        } else {
            return <>
                <p>Human-Gen</p>
            </>
        }
    }

    const generateWarningIcon = () => {
        if (noDecOrNoAiOrGenAi == 1) {
            return <>
                <WarningSvg />
            </>
        }
    }

    const generateBotttomDiv = () => {

        if (noDecOrNoAiOrGenAi == 0 || noDecOrNoAiOrGenAi == 3) {
            return <>
            </>
        } else {
            return <>
                <div className="link">
                    <a href="#" onClick={() => openPopupTab()}>Verify content details</a>
                </div>
            </>
        }
    }


    const renderOverlayComponents = () => {
        return (
            <>
                <div className="top">
                    <div className="headline">
                        {generateHeadline()}
                    </div>
                </div>
                {/* <div className="middle">
                    {generateMiddleDiv()}
                </div>
                <div className="bottom">
                    {generateBotttomDiv()}
                </div> */}
            </>
        );
    }

    const openPopupTab = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { openPopupTab: true }).then(response => {
            });
        });
    }


    useEffect(() => {


        // console.log("overlay useeffect");
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
                setIscc(storage.iscc);
            }
            if (storage.assets !== undefined) {
                setAssets(storage.assets);
            }

        });

        //listener für hover-in über bilder
        document.addEventListener('mouseover', updateDivPosition);
        //listener für hover-out von bilder
        document.addEventListener('mouseout', hideDiv);
        console.log("ASSETS:");
        console.log(assets);

        if (isFetchingData) {
            console.log("fetching2");
            fetchingData(srcUrl);
        } else if (boolOverlay && assets.length != 0) {
            console.log("assets: " + assets.length)
            isGenaiOrNoAi(assets);
        }


        return () => {
            // console.log('cleanUp');
            document.removeEventListener('mouseover', updateDivPosition);
            document.removeEventListener('mouseout', hideDiv);
        }
    }, [boolOverlay, isFetchingData]);

    return (
        <>
            {displayOverlay && <>
                <div className="ausklapp_overlay" style={overlayStyle} onMouseOver={() => setOverlayStyle((prevState) => ({
                    ...prevState,
                    display: "block"
                }))}>
                    {/* <ProcessingOverlay /> */}
                    {isFetchingData ? <ProcessingOverlay /> : renderOverlayComponents()}
                </div>
                <div
                    className="icon-liccium" style={iconLicciumStyle} onMouseOver={() => setIconLicciumStyle((prevState) => ({
                        ...prevState,
                        display: "block"
                    }))}
                    onClick={toggleOverlayVisibility}>
                    <LicciumIconSvg />
                </div >
            </>}
        </>
    );
}
