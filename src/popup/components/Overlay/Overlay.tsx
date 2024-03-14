import React, { useEffect, useState } from 'react';
import { GenAISvg } from './GenAISvg';
import { LicciumIconSvg } from './LicciumIconSvg';
import './Overlay.css';

export const Overlay = () => {


    const [iconRotation, setIconRotation] = useState(0);
    const [newIcon, setNewIcon] = useState(false);

    const [abortController, setAbortController] = useState(new AbortController());

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
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [generateMiddle, setGenerateMiddle] = useState(false);
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
        } as React.CSSProperties
    )


    const [newIconLicciumStyle, setNewIconLicciumStyle] = useState(
        {
            position: "absolute",
            margin: 0,
            width: 35 + "px",
            borderRadius: "5px",
            background: "rgba(255, 255, 255, 0.65)",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset",
            zIndex: "10001",
            display: "none"
        } as React.CSSProperties
    );


    const [middleContent, setMiddleContent] = useState(
        {
            position: "absolute",
            width: 74 + "px",
            height: 28 + "px",
            borderRadius: 25 + "px",
            display: "flex",
            alignItems: "center",
            background: "rgba(0, 0, 0, 1)"
        } as React.CSSProperties
    )

    const expandOverlay = () => {
        setOverlayStyle((prevState) => ({
            ...prevState,
            //display: 'block',
            height: 73.5 + 'px'
        }));
    }
    const collapseOverlay = () => {
        setOverlayStyle((prevState) => ({
            ...prevState,
            display: "none",
            height: 36.75 + "px"
        }));
    }

    const showOverlay = () => {
        setOverlayStyle((prevState) => ({
            ...prevState,
            display: "block"
        }));
    }

    const hideIcon = () => {
        setIconLicciumStyle((prevState) => ({
            ...prevState,
            display: "none"
        }));
    }

    const showIcon = () => {
        setIconLicciumStyle((prevState) => ({
            ...prevState,
            display: "block"
        }));
    }

    const hideIconBackground = () => {
        setIconLicciumStyle((prevState) => ({
            ...prevState,
            background: "none",
            boxShadow: "none"
        }));
    }

    const setIconBackground = () => {
        setIconLicciumStyle((prevState) => ({
            ...prevState,
            background: "rgba(255, 255, 255, 0.65)",
            boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset"
        }));
    }

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

    const showNewIcon = () => {
        setNewIconLicciumStyle((prevState) => ({
            ...prevState,
            display: "block"
        }));
    }

    const hideNewIcon = () => {
        setNewIconLicciumStyle((prevState) => ({
            ...prevState,
            display: "none"
        }));
    }

    const updateNewIconPos = (rect) => {
        setNewIconLicciumStyle((prevState) => ({
            ...prevState,
            left: (rect.left + window.scrollX + 10) + 'px', // Position entsprechend dem Bild
            top: (rect.top + window.scrollY + 10) + 'px', // Position entsprechend dem Bild
            display: "block"
        }));
    }

    const setMiddleContentToGenAi = () => {
        setMiddleContent((prevState) => ({
            ...prevState,
            background: "rgba(179, 21, 27, 1)"
        }));
    }

    const setMiddleContentToNoAi = () => {
        setMiddleContent((prevState) => ({
            ...prevState,
            background: "rgba(126, 92, 126, 1)"
        }));
    }


    //update Div-Position
    const createIconContainer = (event) => {
        if (!boolOverlay) { //wenn overlay nicht ausgeklappt ist
            if (event.target.tagName.toLowerCase() === 'img'
                && event.target.width >= 100
                && event.target.height >= 100
                && !isBase64Image(event.target.src)) { //wenn event ein IMG ist
                let rect = event.target.getBoundingClientRect();
                updateOverlayPos(rect);
                setSrcUrl(event.target.src);
            }
        } else if (event.target.tagName.toLowerCase() === 'img'
            && !isBase64Image(event.target.src)){ //Wenn overlay ausgeklappt ist und event ein anderes IMG ist
                if(srcUrl !== event.target.src){
                    let rect = event.target.getBoundingClientRect();
                    updateNewIconPos(rect);
                    setNewIcon(true);   
                }
                setSrcUrl(event.target.src);       
        } else if (event.target.className != 'icon-liccium') { //hoverOut für newIcon
            setNewIcon(false);
        }
    }


    const isBase64Image = (src) => {
        return src.startsWith('data:image/');
    }


    const toggleOverlayVisibility = () => {
        console.log('click ' + srcUrl);
        if (!boolOverlay) {
            setBoolOverlay(true);
            setIsFetchingData(true);
        } else {
            clear();
            collapseOverlay();
            setIconBackground();
            setBoolOverlay(false);
            setMediaType("");
            setGenerateMiddle(false);
        }
    }


    const clicked = () => {
        /* if(isFetchingData){
            console.log("##### Hier vor dem fetch abbruch ######");
            abortController.abort();
            
        }  */
        console.log("isFetching: " + isFetchingData);
        clear();
        collapseOverlay();
        setIconBackground();
        setBoolOverlay(false);
        setMediaType("");
        setGenerateMiddle(false);
        hideNewIcon();

        // Kurze Verzögerung, bevor das Overlay wieder angezeigt wird und das Fetching gestartet wird
        setTimeout(() => {
            setBoolOverlay(true);
            setIsFetchingData(true);
        }, 1); // Ändern Sie die Zeit nach Bedarf

    }


    const clickAbort = () => {
        abortController.abort();
        clear();
        setBoolOverlay(false);
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


    const isGenAi = (digitalsourcetypeString) => {
        return digitalsourcetypeString === "trainedAlgorithmicMedia"
        || digitalsourcetypeString === "compositeSynthetic"
        || digitalsourcetypeString === "algorithmicMedia";
    }


    //proof if at least one asset is genai
    const createMiddleContent = (digitalsourcetypeString) => {
            setGenerateStatText("Gen·AI");
            setMiddleContentToGenAi();
            expandOverlay();
            let tooltipText = (digitalsourcetypeString === "trainedAlgorithmicMedia")
                ? "Trained algorithmic media"
                : (digitalsourcetypeString === "compositeSynthetic")
                    ? "Composite including synthetic elements"
                    : (digitalsourcetypeString === "algorithmicMedia")
                        ? "Pure algorithmic media" : "";
            setMediaType(tooltipText);
    }


    const fetchingData = async (srcUrl) => {

        // Erstelle einen neuen AbortController
        const newAbortController = new AbortController(); // Erstellen Sie einen neuen AbortController
        setAbortController(newAbortController); // Aktualisieren Sie den AbortController im State
        const signal = newAbortController.signal;

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
        showOverlay();
        hideIconBackground();
    }


    //Div hiden beim mouse-out
    const hideDiv = () => {
        if (!boolOverlay) {
            hideIcon();
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
        document.addEventListener('mouseover', createIconContainer);
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
            document.removeEventListener('mouseover', createIconContainer);
            document.removeEventListener('mouseout', hideDiv);
        }
    }, [boolOverlay, isFetchingData]);

    return (
        <>
            {displayOverlay && (
                <>
                    <div className="ausklapp_overlay" style={overlayStyle} onMouseOver={showOverlay}>
                        {isFetchingData ? (<> </>) : renderOverlayComponents()}
                    </div>

                    {/* Conditionally render the icon based on isFetchingData */}
                    {isFetchingData ? (
                        <div
                            className="icon-liccium-loading"
                            style={{ ...iconLicciumStyle, transform: `rotate(${iconRotation}deg)` }}
                            onClick={clickAbort}
                        >
                            <LicciumIconSvg />
                        </div>
                    ) : (
                        <div
                            className="icon-liccium"
                            style={iconLicciumStyle}
                            onMouseOver={showIcon}
                            onClick={toggleOverlayVisibility}
                        >
                            <LicciumIconSvg />

                        </div>

                    )}
                    {newIcon ? (
                        <div
                            className="icon-liccium"
                            style={newIconLicciumStyle}
                            onMouseOver={showNewIcon}
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
