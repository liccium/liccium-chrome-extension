import React, { useEffect, useState } from 'react';
import { GenAISvg } from './GenAISvg';
import { LicciumIconSvg } from './LicciumIconSvg';
import './Overlay.css';
import { ProcessingOverlay } from './ProcessingOverlay';
import { WarningSvg } from './WarningSvg';
import { ShieldSvg } from './ShieldSvg';

export const Overlay = () => {


    const [iconRotation, setIconRotation] = useState(0);
    const [newIcon, setNewIcon] = useState(false);

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
    const [generateStatText, setGenerateStatText] = useState("");
    const [boolOverlay, setBoolOverlay] = useState(false);
    const [boolNoAi, setBoolNoAi] = useState(false);
    const [boolGenAi, setBoolGenaAi] = useState(false);
    const [boolNoDeclaration, setBoolNoDeclaration] = useState(false);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [generateMiddle, setGenerateMiddle] = useState(false);
    const [dokumentRect, setDokumentRect] = useState();
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
            overflow: "visible",
            textAlign: "center"
        } as React.CSSProperties
    )
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
    )

    const [newIconLicciumStyle, setNewIconLicciumStyle] = useState({});


    const [middleContent, setMiddleContent] = useState(
        {
            position: "absolute",
            width: 74 + "px",
            height: 28 + "px",
            borderRadius: 25 + "px",
            // border: "1px solid var(--white, #FFF)",
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 1)"
            // border: "1px solid red"
        } as React.CSSProperties
    )


    //update Div-Position
    const checkMediaElement = (event) => {
        console.log("check 1");
        if (!boolOverlay) {
            if (event.target.tagName.toLowerCase() === 'img'
                && event.target.width >= 100
                && event.target.height >= 100
                && !isBase64Image(event.target.src)) {
                console.log("check 2");
                let rect = event.target.getBoundingClientRect();
                setDokumentRect(rect);
                updateOverlayPos(rect);
                setSrcUrl(event.target.src);
            }
        } else if (event.target.tagName.toLowerCase() === 'img'
            && srcUrl !== event.target.src
            && !isBase64Image(event.target.src)) {
            console.log("schliess dich");
            // if (abortController) {
            //     abortController.abort();
            // }
            // toggleOverlayVisibility();
            setSrcUrl(event.target.src);
            let rect = event.target.getBoundingClientRect();
            // Erstelle ein neues Icon und positioniere es entsprechend
            const newIconLicciumStyle: React.CSSProperties = {
                position: "absolute",
                margin: 0,
                width: 35 + "px",
                left: (rect.left + window.scrollX + 10) + 'px', // Position entsprechend dem Bild
                top: (rect.top + window.scrollY + 10) + 'px', // Position entsprechend dem Bild
                borderRadius: "5px",
                background: "rgba(255, 255, 255, 0.65)",
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset",
                zIndex: 10001,
                display: "block",
            };
            // Setzen Sie den neuen Style für das Icon
            setNewIconLicciumStyle(newIconLicciumStyle);
            setNewIcon(true);
            console.log(newIcon);
        }



    }

    const isBase64Image = (src) => {
        return src.startsWith('data:image/');
    }


    let abortController;

    const updateOverlayPos = (rect) => {
        console.log("UPDATE!!!");
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
    }

    // const setDocumentPos = (event) => {
    //     let rect = event.target.getBoundingClientRect();
    //     setDokumentRect(rect);
    // }

    const toggleOverlayVisibility = () => {
        console.log('click ' + srcUrl);
        if (!boolOverlay) {
            setBoolOverlay(true);
            setIsFetchingData(true);
        } else {
            clear();
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
            setMediaType("");
            setGenerateMiddle(false);
        }
    }

    const clear = () => {
        chrome.storage.local.remove(["selectedServerUrl",
            "pageUrl",
            "srcUrl",
            "iscc",
            "assets"
        ]);
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
    }

    const isEqualAndhasCredential2 = (assets) => {
        setGenerateMiddle(false);
        let matchedAssets = [];

        let i;
        for (i = 0; i < assets.length; i++) {
            if (assets[i].isccMetadata.liccium_plugins.iptc !== undefined // Überprüfen, ob iptc definiert ist
                && assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype !== undefined
                && isGenAi(assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype)) {
                if (assets[i].isccMetadata.isccContentCode == iscc[0].isccMetadata.units[1].iscc_unit
                    && assets[i].credentials !== undefined) {
                        matchedAssets.push(assets[i]); 
                }
            } else {
                break;
            }
        }
        if (matchedAssets.length != 0 && i == assets.length) {
            console.log("show tag");
            setGenerateMiddle(true);
            createMiddleContent(matchedAssets[0].isccMetadata.liccium_plugins.iptc.digitalsourcetype);
        }
    }

    const isEqualAndhasCredential = (assets) => {
        setGenerateMiddle(false);
        let matchedAssets = [];

        if (assets.length >= 1) {
            for (let i = 0; i < assets.length; i++) {
                if (assets[i].isccMetadata.isccContentCode == iscc[0].isccMetadata.units[1].iscc_unit
                    && assets[i].credentials !== undefined
                    && assets[i].isccMetadata.liccium_plugins.iptc !== undefined // Überprüfen, ob iptc definiert ist
                    && assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype !== undefined // Überprüfen, ob digitalsourcetype definiert ist
                    && isGenAi(assets[i].isccMetadata.liccium_plugins.iptc.digitalsourcetype)) { // Überprüfen, ob digitalsourcetype nicht null ist
                    matchedAssets.push(assets[i]);
                } else {
                    console.log(i + " declaration not matched");
                }
            }

            if (matchedAssets.length != 0) {
                let matchedAssetsEqual = true;
                if (matchedAssets.length > 1) {
                    for (let i = 1; i < matchedAssets.length; i++) {
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
                            console.log("tags for all assets not equal");
                            allAssetsEquals = false;
                            break;
                        }
                    }
                    if (allAssetsEquals) {
                        console.log("show tag");
                        setGenerateMiddle(true);
                        createMiddleContent(matchedAssets[0].isccMetadata.liccium_plugins.iptc.digitalsourcetype);
                    }
                }
            }
        }
    }

    const isGenAi = (digitalsourcetypeString) => {
        return digitalsourcetypeString === "trainedAlgorithmicMedia"
        || digitalsourcetypeString === "compositeSynthetic"
        || digitalsourcetypeString === "algorithmicMedia";
    }


    //proof if at least one asset is genai
    const createMiddleContent = (digitalsourcetypeString) => {
        /* if (isGenAi(digitalsourcetypeString)) { */

            setGenerateStatText("Gen·AI");
            confMiddleContent(1);
            let tooltipText = (digitalsourcetypeString === "trainedAlgorithmicMedia")
                ? "Trained algorithmic media"
                : (digitalsourcetypeString === "compositeSynthetic")
                    ? "Composite including synthetic elements"
                    : (digitalsourcetypeString === "algorithmicMedia")
                        ? "Pure algorithmic media" : "";
            setMediaType(tooltipText);

       /* }  else if (digitalsourcetypeString === "digitalCapture"
            || digitalsourcetypeString === "minorHumanEdits") {
            setGenerateStatText("No·AI");
            confMiddleContent(2);
            setMediaType("Human generated content");
        } else {

        } */
    }

    const confMiddleContent = (sourceType) => {

        if (sourceType == 1) {    //GEN AI
            setMiddleContent((prevState) => ({
                ...prevState,
                background: "rgba(179, 21, 27, 1)"
            }));
        } /* else if (sourceType == 2) {  //NO AI
            setMiddleContent((prevState) => ({
                ...prevState,
                background: "rgba(126, 92, 126, 1)"
            }));
        } */
        setOverlayStyle((prevState) => ({
            ...prevState,
            height: 73.5 + 'px',
        }));
    }


    const fetchingData = async (srcUrl) => {
        // Erstelle einen neuen AbortController
        abortController = new AbortController();
        const signal = abortController.signal;

        // CONVERT SIGNS IN URL TO READABLE SIGNS
        let srcUrlReadable = srcUrl.replaceAll("%", "%25");
        srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
        srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
        srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
        srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
        srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

        //setnoDecOrNoAiOrGenAi(0);
        let currentPageUrl = window.location.href;
        let jsonAssets = [];
        let isccJsonArray = [];
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
            setIscc(isccJsonArray);
            setAssets(jsonAssets);
            setPageUrl(currentPageUrl);
            setSrcUrl(srcUrl);

        } catch (err) {
            if (err.name === 'AbortError') {
                console.log('Fetch abgebrochen');
            } else {
                console.error(err);
                window.alert("Request to " + serverUrls[serverUrl] + " failed.");
                chrome.storage.local.remove(["srcUrl"]);
                setSrcUrl("");
            }
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

    const showOverlayOne = () => {
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

    //Div hiden beim mouse-out
    const hideDiv = () => {
        if (!boolOverlay) {
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                display: "none"
            }));
        }
    };

    const generateMiddleDiv = () => {
        // if (noDecOrNoAiOrGenAi == 1) {
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

    const renderOverlayComponents = () => {
        return (
            <>
                <div className="top">
                    <div className="headline">
                        {generateHeadline()}
                    </div>
                </div>
                {generateMiddle ? (
                    <div className="middle">
                        {generateMiddleDiv()}
                    </div>
                ) : (
                    <></>
                )}
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
        document.addEventListener('mouseover', checkMediaElement);
        //listener für hover-out von bilder
        document.addEventListener('mouseout', hideDiv);
        console.log("ASSETS:" + assets);

        if (isFetchingData) {
            fetchingData(srcUrl);
        } else if (boolOverlay) {
            isEqualAndhasCredential2(assets);
            showOverlayOne();
        }

        return () => {
            // console.log('cleanUp');
            document.removeEventListener('mouseover', checkMediaElement);
            document.removeEventListener('mouseout', hideDiv);
        }
    }, [boolOverlay, isFetchingData]);

    const clicked = () => {
        clear();
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
        setMediaType("");
        setGenerateMiddle(false);
        setNewIconLicciumStyle((prevState) => ({
            ...prevState,
            display: "none"
        }));

        // Kurze Verzögerung, bevor das Overlay wieder angezeigt wird und das Fetching gestartet wird
        setTimeout(() => {
            setBoolOverlay(true);
            setIsFetchingData(true);
        }, 1); // Ändern Sie die Zeit nach Bedarf
    }


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
                    {newIcon ? (
                        <div
                            className="icon-liccium"
                            style={newIconLicciumStyle}
                            onMouseOver={() => setNewIconLicciumStyle((prevState) => ({
                                ...prevState,
                                display: "block"
                            }))}
                            onClick={clicked}
                        >
                            <LicciumIconSvg />

                        </div>
                    ) : (<></>)}
                </>
            )}
        </>
    );

}
