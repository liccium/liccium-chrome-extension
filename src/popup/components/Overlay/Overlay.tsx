import React, { useEffect, useState } from 'react';
import { GenAISvg } from './GenAISvg';
import { LicciumIconSvg } from './LicciumIconSvg';
import './Overlay.css';
import { WarningSvg } from './WarningSvg';
import Processing from '../Processing/Processing';

export const Overlay = () => {

    const [boolOverlay, setBoolOverlay] = useState(false);
    const [imgSrc, setImageSrc] = useState();
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [assets, setAssets] = useState([]);
    const [overlayStyle, setOverlayStyle] = useState(
        {
            height: 156 + "px",
            width: 232 + "px",
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
        } as React.CSSProperties
    );

    //update Div-Position
    const updateDivPosition = (event) => {
        console.log("(update) Show overlay: " + boolOverlay);
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
                setImageSrc(event.target.src);
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

    const displayOverlay = () => {
        console.log('click ' + imgSrc);
        /* overlayElement.classList.toggle('transition'); */
        console.log("Show overlay: " + boolOverlay);
        if (!boolOverlay) {
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "block"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                background: "none"
            }));
            setBoolOverlay(true);
            setIsFetchingData(true);
            fetchingData(imgSrc).then(assets => {
                setAssets(assets);
                setIsFetchingData(false);
            });

        } else {
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "none"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                background: "rgba(255, 255, 255, 0.65)"
            }));
            setBoolOverlay(false);
        }
    };

    const fetchingData = async (srcUrl) => {
        // CONVERT SIGNS IN URL TO READABLE SIGNS
        let srcUrlReadable = srcUrl.replaceAll("%", "%25");
        srcUrlReadable = srcUrlReadable.replaceAll(":", "%3A");
        srcUrlReadable = srcUrlReadable.replaceAll("/", "%2F");
        srcUrlReadable = srcUrlReadable.replaceAll("?", "%3F");
        srcUrlReadable = srcUrlReadable.replaceAll("&", "%26");
        srcUrlReadable = srcUrlReadable.replaceAll("=", "%3D");

        console.log("Fetching with Readable src url: " + srcUrlReadable);
        let assets = [];
        try {
            let isccJsonArray = await fetch("https://iscc.if-is.net" + "/iscc/create?sourceUrl=" + srcUrlReadable).then(response => response.json());
            assets = await fetch("https://iscc.if-is.net" + "/asset/nns?iscc=" + isccJsonArray[0].isccMetadata.iscc.replace(":", "%3A") + "&mode=" + isccJsonArray[0].isccMetadata.mode + "&isMainnet=false").then(response => response.json());
        } catch {
            window.alert("Request failed");
            setIsFetchingData(false);
        }
        return assets;
    }

    const renderResults = () => {
        return (
            <>
                <div className="top">
                    <div className="headline">
                        <p>Caution advised</p>
                    </div>
                    <div className="icon-warning">
                        <WarningSvg />
                    </div>
                </div>
                <div className="middle">
                    <div className="genAITag">
                        <div className="genAITag-icon">
                            <GenAISvg />
                        </div>
                        <div className="genAITag-text">
                            <p className="tagText">GEN AI</p>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div className="link">
                        <a href="http://google.de">Verify content details</a>
                    </div>
                </div>
            </>
        );
    }


    useEffect(() => {

        //listener für hover-in über bilder
        document.addEventListener('mouseover', updateDivPosition);
        //listener für hover-out von bilder
        document.addEventListener('mouseout', hideDiv);
        console.log(assets);

        return () => {
            console.log('cleanUp');
            document.removeEventListener('mouseover', updateDivPosition);
            document.removeEventListener('mouseout', hideDiv);
        }
    }, [boolOverlay, isFetchingData]);

    return (
        <>
            <div className="ausklapp_overlay" style={overlayStyle} onMouseOver={() => setOverlayStyle((prevState) => ({
                ...prevState,
                display: "block"
            }))}>
                {isFetchingData ? <Processing /> : renderResults()}
            </div>
            <div
                className="icon-liccium" style={iconLicciumStyle} onMouseOver={() => setIconLicciumStyle((prevState) => ({
                    ...prevState,
                    display: "block"
                }))}
                onClick={displayOverlay}>
                <LicciumIconSvg />
            </div >

        </>
    );
}
