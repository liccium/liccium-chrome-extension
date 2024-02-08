import React, { useEffect, useState } from 'react';
import { GenAISvg } from './GenAISvg';
import { LicciumIconSvg } from './LicciumIconSvg';
import './Overlay.css';
import { ProcessingOverlay } from './ProcessingOverlay';
import { WarningSvg } from './WarningSvg';
import { ShieldSvg } from './ShieldSvg';

export const Overlay = () => {


    const [iconRotation, setIconRotation] = useState(0);

    // chrome states
    const [serverUrl, setServerUrl] = useState("");
    const [displayOverlay, setDisplayOverlay] = useState();
    const [pageUrl, setPageUrl] = useState("");
    const [srcUrl, setSrcUrl] = useState("");
    const [iscc, setIscc] = useState([]);
    const [assets, setAssets] = useState([]);
    // const [matchedAssets, setMatchedAssets] = useState([]);
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
            width: 190 + "px",
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
            display: "none",
            // border: "1px solid red"
        } as React.CSSProperties
    );

    const [middleContent, setMiddleContent] = useState(
        {
            position: "absolute",
            width: 105 + "px",
            height: 25 + "px",
            borderRadius: 25 + "px",
            border: "1px solid var(--white, #FFF)",
            display: "flex",

            alignItems: "center",
            background: "rgba(0, 0, 0, 1)"
            // border: "1px solid red",
            /* background: "#B3151B", 
            justifyContent: "center",
            marginLeft: 22 + "px",
            marginTop: 10 + "px",*/

            // border: "1px solid red"
        } as React.CSSProperties
    )
    //update Div-Position
    const updateDivPosition = (event) => {
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
        if (!boolOverlay) {
            setBoolOverlay(true);
            setIsFetchingData(true);
        } else {
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "none",
                height: 36.75 + "px"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                background: "rgba(255, 255, 255, 0.65)",
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset"
            }));
            setBoolOverlay(false);
            setIsFetchingData(false);
            setnoDecOrNoAiOrGenAi(4);
            setMediaType("");
        }
    };




    const isEqualAndhasCredential = (assets) => {
        let matchedAssets = [];
        console.log("Es folgt unser Bild");
        console.log(iscc);
        console.log("Es folgen die Assets");
        console.log(assets);

        // console.log(iscc[0].isccMetadata.units[1].iscc_unit);
        // console.log(assets[0].isccMetadata.isccContentCode);
        // console.log(assets[1].isccMetadata.isccContentCode);


        if (assets.length >= 1) {
            for (let i = 0; i < assets.length; i++) {
                if (assets[i].isccMetadata.isccContentCode == iscc[0].isccMetadata.units[1].iscc_unit
                    && assets[i].credentials != undefined
                    && assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype != undefined) {
                    console.log("is equal");
                    console.log("has credentials");
                    console.log("has tag");
                    matchedAssets.push(assets[i]);
                } else {
                    console.log(i + "declaration not matched");

                }
            }

            if (matchedAssets.length != 0) {
                let matchedAssetsEqual = true;
                if (matchedAssets.length > 1) {
                    for (let i = 1; i < matchedAssets.length; i++) {
                        console.log("TEST!!!!!");
                        if (matchedAssets[0].isccMetadata.liccium_plugins.iptc.digitalsourcetype !=
                            matchedAssets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype) {
                            console.log("tags for matched assets not equal");
                            matchedAssetsEqual = false;
                            break;
                        }
                    }
                }
                let allAssetsEquals = true;
                if (matchedAssetsEqual) {
                    for (let i = 0; i < assets.length; i++) {
                        if (matchedAssets[0].isccMetadata.liccium_plugins.iptc.digitalsourcetype !=
                            assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype) {
                            console.log("tags for all assets not euqal");
                            allAssetsEquals = false;
                            break;
                        }
                    }
                    if (allAssetsEquals) {
                        console.log("show tag");
                        isGenaiOrNoAi(matchedAssets[0].isccMetadata.liccium_plugins.iptc.digitalsourcetype);
                    }
                }
            }

        } else {
            console.log("n==0");
            setnoDecOrNoAiOrGenAi(0);
        }

        console.log("matchedAssets " + matchedAssets.length);
    }


    //proof if at least one asset is genai
    const isGenaiOrNoAi = (digitalsourcetypeString) => {
        if (digitalsourcetypeString === "trainedAlgorithmicMedia"
            || digitalsourcetypeString === "compositeSynthetic"
            || digitalsourcetypeString === "algorithmicMedia") {
            setGenerateStatText("Gen-AI");
            setMiddleContent((prevState) => ({
                ...prevState,
                background: "rgba(179, 21, 27, 1)"
            }));
            console.log("####");
            setOverlayStyle((prevState) => ({
                ...prevState,
                height: 73.5 + 'px',
            }));
            setnoDecOrNoAiOrGenAi(1);
            setMediaType(digitalsourcetypeString);

        } else if (digitalsourcetypeString === "digitalCapture"
            || digitalsourcetypeString === "minorHumanEdits") {
            setGenerateStatText("NO AI");
            setMiddleContent((prevState) => ({
                ...prevState,
                background: "rgba(126, 92, 126, 1)"
            }));
            setnoDecOrNoAiOrGenAi(2);
            setMediaType("Human generated content");
            setOverlayStyle((prevState) => ({
                ...prevState,
                height: 73.5 + 'px',
            }));

        } else {
            setnoDecOrNoAiOrGenAi(3);
        }
    }


    const fetchingData = async (srcUrl) => {
        // CONVERT SIGNS IN URL TO READABLE SIGNS
        let srcUrlReadable = srcUrl.replaceAll("%", "%25");
        srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
        srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
        srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
        srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
        srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

        setnoDecOrNoAiOrGenAi(0);
        let currentPageUrl = window.location.href;
        let jsonAssets = [];
        let isccJsonArray = [];
        try {
            isccJsonArray = await fetch(serverUrl + "/iscc/create?sourceUrl=" + srcUrlReadable).then(response => response.json());
            let jsonExplain = await fetch(serverUrl + "/iscc/explain?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A")).then(response => response.json());



            // Put sourceUrl and units from explained ISCC in jsonIscc
            isccJsonArray[0].isccMetadata.name = getModeCapitalLetter(isccJsonArray[0].isccMetadata.mode) + " from " + getISCCName(currentPageUrl);
            isccJsonArray[0].isccMetadata.sourceUrl = srcUrl;
            isccJsonArray[0].isccMetadata.units = jsonExplain.units;
            console.log(isccJsonArray[0]);
            jsonAssets = await fetch(serverUrl + "/asset/nns?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A") + "&mode=" + isccJsonArray[0].isccMetadata.mode + "&isMainnet=false").then(response => response.json());



            jsonAssets = sortVCs(jsonAssets);
            console.log(jsonAssets);
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

        } catch (err) {
            console.error(err);
            setIsFetchingData(false);
            window.alert("Request to " + serverUrls[serverUrl] + " failed.");
            chrome.storage.local.remove(["srcUrl"]);
            setSrcUrl("");
        } finally {
            setIsFetchingData(false);
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
        // if (noDecOrNoAiOrGenAi == 1) {
        return <>
            <div className="generateStat" style={middleContent}>
                <div className="generateStat-icon">
                    <GenAISvg />
                </div>
                <div className="generateStat-text">
                    <p className="tagText">{generateStatText}</p>
                </div>
                {/* <span className="tagtooltiptext">{mediaType}</span> */}
            </div>
        </>
        // }
    }

    const generateHeadline = () => {
        if (assets.length == 0) {
            return <>
                <p>Declaration(s) <span className='red-circle'>{assets.length}</span> </p>
            </>
        } else {
            return <>
                <p><a href='#'>Declaration(s)</a> <span className='red-circle'>{assets.length}</span> </p>
            </>
        }

    }

    // const generateWarningIcon = () => {
    //     if (noDecOrNoAiOrGenAi == 1) {
    //         return <>
    //             <WarningSvg />
    //         </>
    //     }
    // }

    // const generateBotttomDiv = () => {
    //     if (noDecOrNoAiOrGenAi == 0 || noDecOrNoAiOrGenAi == 3) {
    //         return <>
    //         </>
    //     } else {
    //         return <>
    //             <div className="link">
    //                 <a href="#" onClick={() => openPopupTab()}>Verify content details</a>
    //             </div>
    //         </>
    //     }
    // }

    const renderOverlayComponents = () => {
        return (
            <>
                <div className="top">
                    <div className="headline">
                        {generateHeadline()}
                    </div>
                </div>
                <div className="middle">
                    {generateMiddleDiv()}
                </div>
                {/* <div className="bottom">
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
        console.log("ASSETS:" + assets);

        if (isFetchingData) {
            fetchingData(srcUrl);
        } else if (boolOverlay) {
            isEqualAndhasCredential(assets);
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "block"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                background: "none",
                boxShadow: "none"
            }));
        }

        return () => {
            // console.log('cleanUp');
            document.removeEventListener('mouseover', updateDivPosition);
            document.removeEventListener('mouseout', hideDiv);
        }
    }, [boolOverlay, isFetchingData]);

    return (
        <>
            {displayOverlay && (
                <>
                    <div className="ausklapp_overlay" style={overlayStyle} onMouseOver={() => setOverlayStyle((prevState) => ({
                        ...prevState,
                        display: "block"
                    }))}>
                        {isFetchingData ? <ProcessingOverlay /> : renderOverlayComponents()}
                    </div>

                    {/* Conditionally render the icon based on isFetchingData */}
                    {isFetchingData ? (
                        <div
                            className="icon-liccium-loading"
                            style={{ ...iconLicciumStyle, transform: `rotate(${iconRotation}deg)` }}
                        >
                            <LicciumIconSvg />
                        </div>
                    ) : (
                        <div
                            className="icon-liccium"
                            style={iconLicciumStyle}
                            onMouseOver={() => setIconLicciumStyle((prevState) => ({
                                ...prevState,
                                display: "block"
                            }))}
                            onClick={toggleOverlayVisibility}
                        >
                            <LicciumIconSvg />
                        </div>
                    )}
                </>
            )}
        </>
    );

}
