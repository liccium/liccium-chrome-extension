import React, { useEffect, useState } from 'react';
import './Overlay.css';

export const Overlay = () => {

    const [boolOverlay, setBoolOverlay] = useState(false);
    const [imgSrc, setImageSrc] = useState('');
    const [overlayStyle, setOverlayStyle] = useState(
        {
            "height": 156 + "px",
            "width": 232 + "px",
            "border-radius": 5 + "px",
            "background": "rgba(255, 255, 255, 0.65)",
            "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset",
            "flex-direction": "column",
            "align-items": "center",
            "justify-content": "center",
            "margin": "0",
            "position": "absolute",
            "z-index": 10000,
            "pointer-events": "auto",
            "display": "none",
            "opacity": "0.8",
            "overflow": "hidden",
            "text-align": "center"
        } as React.CSSProperties
    );
    const [iconLicciumStyle, setIconLicciumStyle] = useState(
        {
            "position": "absolute",
            "margin": 0,
            "width": 35 + "px",
            "left": "0",
            "border-radius": "5px",
            "background": "rgba(255, 255, 255, 0.65)",
            "box-shadow": "0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset",
            "z-index": "10001",
            "display": "none"
        } as React.CSSProperties
    );

    //update Div-Position
    const updateDivPosition = (event) => {
        if (!boolOverlay) {
            if (event.target.tagName.toLowerCase() === 'img') {
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
        if (!boolOverlay) {
            setOverlayStyle((prevState) => ({
                ...prevState,
                display: "block"
            }));
            setIconLicciumStyle((prevState) => ({
                ...prevState,
                display: "none"
            }));
            setBoolOverlay(true);
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


    useEffect(() => {
        //listener für hover-in über bilder
        document.addEventListener('mouseover', updateDivPosition);
        //listener für hover-out von bilder
        document.addEventListener('mouseout', hideDiv);
    }, []);

    return (
        <>
            <div className="ausklapp_overlay" style={overlayStyle} onMouseOver={() => setOverlayStyle((prevState) => ({
                ...prevState,
                display: "block"
            }))}>
                <div className="top">
                    <div className="headline">
                        <p>Caution advised</p>
                    </div>
                    <div className="icon-warning">
                        <object type="image/svg+xml" data="chrome-extension://aoimmhoeflcknmcgapnpigjchoafhjpb/images/warning.svg"></object>
                    </div>
                </div>
                <div className="middle">
                    <div className="genAITag">
                        <div className="genAITag-icon">
                            <img src="chrome-extension://aoimmhoeflcknmcgapnpigjchoafhjpb/images/noai.png" />
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
            </div>

            <div
                className="icon-liccium" style={iconLicciumStyle} onMouseOver={() => setIconLicciumStyle((prevState) => ({
                    ...prevState,
                    display: "block"
                }))}
                onClick={() => displayOverlay()}>
                <object type="image/svg+xml" data="chrome-extension://aoimmhoeflcknmcgapnpigjchoafhjpb/images/Liccium-Logo-black-on-transparent-1400.svg">
                </object>
            </div >
        </>
    );
}
