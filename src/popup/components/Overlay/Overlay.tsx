import React, { useEffect, useState } from 'react';
import './Overlay.css';

export const Overlay = () => {

    const [boolOverlay, setBoolOverlay] = useState(false);
    const [overlayStyle, setOverlayStyle] = useState({});
    const [iconLicciumStyle, setIconLicciumStyle] = useState({});
    const [imgSrc, setImageSrc] = useState('');

    //update Div-Position
    const updateDivPosition = (event) => {
        if (!boolOverlay) {
            if (event.target.tagName.toLowerCase() === 'img') {
                let rect = event.target.getBoundingClientRect();
                let paddingFromTop = 10;
                let paddingFromLeft = 10;
                setOverlayStyle({ top: (rect.top + window.scrollY + paddingFromTop) + 'px' });
                setOverlayStyle({ left: (rect.left + window.scrollX + paddingFromLeft) + 'px' });
                setIconLicciumStyle({ top: (rect.top + window.scrollY + paddingFromTop) + 'px' });
                setIconLicciumStyle({ left: (rect.left + window.scrollX + paddingFromLeft) + 'px' });
                setIconLicciumStyle({ display: 'block' })
                setImageSrc(event.target.src);
            }
        }
    };
    //Div hiden beim mouse-out
    const hideDiv = () => {
        if (!boolOverlay) {
            setIconLicciumStyle({ display: "none" });
        }
    };

    const displayOverlay = () => {
        console.log('click ' + imgSrc);
        /* overlayElement.classList.toggle('transition'); */
        if (!boolOverlay) {
            setOverlayStyle({ display: "block" });
            setIconLicciumStyle({ display: "none" });
            setBoolOverlay(true);
        } else {
            setOverlayStyle({ display: "none" });
            setIconLicciumStyle({ background: "rgba(255, 255, 255, 0.65)" });
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
            <div className="ausklapp_overlay" style={overlayStyle} onMouseOver={() => setOverlayStyle({ display: "block" })}>
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
                className="icon-liccium" style={iconLicciumStyle} onMouseOver={() => setIconLicciumStyle({ display: "block" })} onClick={() => displayOverlay()}>
                <object type="image/svg+xml" data="chrome-extension://aoimmhoeflcknmcgapnpigjchoafhjpb/images/Liccium-Logo-black-on-transparent-1400.svg">
                </object>
            </div>
        </>
    );
}
