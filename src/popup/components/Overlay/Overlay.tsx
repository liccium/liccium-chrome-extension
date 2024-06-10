import React, { useEffect, useState } from 'react';
import { GenAISvg } from './GenAISvg';
import { LicciumIconSvg } from './LicciumIconSvg';
import './Overlay.css';
import useFetch from './useFetch';

export const Overlay = () => {

    const [abortController, setAbortController] = useState(new AbortController());
    //const abortController = new AbortController();
    const signal = abortController.signal;

    // chrome states
    const [displayOverlay, setDisplayOverlay] = useState();

    const [hoveredImg, setHoveredImg] = useState<string>("");
    const [fetchedImg, setFetchedImg] = useState<string>("");
    const [fetchFuerUrlSwitch, setFetchFuerUrlSwitch] = useState(false);

    // overlay states
    const [mediaType, setMediaType] = useState<string>("");
    const [generateStatText, setGenerateStatText] = useState<string>("");
    const [boolOverlay, setBoolOverlay] = useState(false);
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
            display: "block",
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

    const isBase64Image = (src) => {
        return src.startsWith('data:image/');
    }

    const toggleOverlayVisibility = () => {
        if (!boolOverlay) {
            setBoolOverlay(true);
        } else {
            clear();
            setBoolOverlay(false);
            setFetchedImg("");
            collapseOverlay();
            setIconBackground();

            setMediaType("");
            setGenerateMiddle(false);
        }
    }

    const refetch = () => {
        if (isLoading) {
            abortController.abort();
            setAbortController(new AbortController());
        }
        clear();
        setBoolOverlay(false);
        collapseOverlay();
        setIconBackground();
        setFetchedImg("");

        setMediaType("");
        setGenerateMiddle(false);

        // Kurze Verzögerung, bevor das Overlay wieder angezeigt wird und das Fetching gestartet wird
        setTimeout(() => {
            startFetching();
        }, 10); // Ändern Sie die Zeit nach Bedarf

    }

    const clickAbort = () => {
        abortController.abort();
        setAbortController(new AbortController());
        clear();
        setBoolOverlay(false);
        setFetchedImg("");
        collapseOverlay();
        setIconBackground();

        setMediaType("");
        setGenerateMiddle(false);
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

    const isEqualAndhasCredential = (assets, iscc) => {
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

    const showOverlayOne = () => {
        if (!signal.aborted) {
            showOverlay();
            hideIconBackground();
            //isEqualAndhasCredential(jsonAssets, isccJsonArray);
            chrome.storage.local.get(
                [
                    "iscc",
                    "assets"
                ]
            ).then((storage) => {
                if (storage.iscc !== undefined && storage.assets !== undefined) {
                    isEqualAndhasCredential(storage.assets, storage.iscc);
                }
            });
        }
    }

    const generateMiddleDiv = () => {
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

    const generateHeadline = () => {
        if (jsonAssets.length == 0) {
            return <>
                <p>Declaration(s) <span className='red-circle'>{jsonAssets.length}</span> </p>
            </>
        } else {
            return <>
                <p><a id="openpopup" onClick={openPopupTab} >Declaration(s)</a> <span className='red-circle'>{jsonAssets.length}</span> </p>
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

    const renderOverlayContent = () => {
        return (
            <div className="ausklapp_overlay"
                style={overlayStyle}>
                {isLoading
                    ? (<> </>)
                    : renderOverlayComponents()}
            </div>
        )
    }

    const renderIconLoading = () => {
        return (
            <div
                className="icon-liccium-loading"
                style={{ ...iconLicciumStyle, transform: `rotate(${0}deg)` }}
                onClick={clickAbort}
            >
                <LicciumIconSvg />
            </div>
        )
    }

    const renderIcon = () => {
        return (
            <div
                id='icon1'
                className="icon-liccium"
                style={iconLicciumStyle}
                onClick={startFetching}
            >
                <LicciumIconSvg />

            </div>
        )
    }

    const renderNewIcon = () => {
        return (
            <div
                id='icon2'
                className="icon-liccium"
                style={newIconLicciumStyle}
                onClick={refetch}
            >
                <LicciumIconSvg />

            </div>
        )
    }

    const renderOverlay = () => {
        return (
            <>
                {
                    renderOverlayContent()
                }

                {
                    isLoading ? (renderIconLoading())
                        : (hoveredImg || fetchedImg ? (renderIcon())
                            : (<></>))
                }

                {
                    boolOverlay && hoveredImg ? (
                        renderNewIcon()
                    ) : (<></>)
                }
            </>
        )
    }

    const openPopupTab = () => {
        /* chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { openPopupTab: true }).then(response => {
            });
        }); */
        chrome.runtime.sendMessage({ action: 'openPopup' });
    }

    const {jsonAssets, isLoading, fetchingData } = useFetch(fetchedImg, signal);

    const startFetching = () => {
        setFetchedImg(hoveredImg);
        setHoveredImg("");
        setFetchFuerUrlSwitch(true);

    }

    useEffect(() => {
        console.log("---- useEffect ----");

        if (fetchFuerUrlSwitch) {
            if (!boolOverlay) {
                fetchingData()
                    .then(showOverlayOne);
            }
            toggleOverlayVisibility();
            setFetchFuerUrlSwitch(false);
        }

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
            console.log("---------- CHROME STORAGE -------->");
            console.log(storage);

            if (storage.displayOverlay !== undefined) {
                setDisplayOverlay(storage.displayOverlay);
            }
        });

        const handleMouseOver = (event) => {
             if (!boolOverlay) {
                if (event.target.tagName === 'IMG'
                    && event.target.width >= 100
                    && event.target.height >= 100
                    && !isBase64Image(event.target.src)) {

                    let rect = event.target.getBoundingClientRect();
                    updateOverlayPos(rect);
                    setHoveredImg(event.target.src);
                }
            } else if (event.target.tagName === 'IMG'
                && !isBase64Image(event.target.src)) {

                if (event.target.src !== fetchedImg) {
                    let rect = event.target.getBoundingClientRect();
                    updateNewIconPos(rect);
                    setHoveredImg(event.target.src);
                }
            } 
        };

        const handleMouseOut = (event) => {
            if (event.toElement) {
                if (event.toElement.className !== null
                    && event.toElement.className != "icon-liccium") {
                    setHoveredImg("");
                }
            }
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        return () => {
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseout', handleMouseOut);
        };
    }, [boolOverlay, fetchFuerUrlSwitch]);

    return (
        <>
            {displayOverlay && (
                renderOverlay()
            )}
        </>
    );

}
