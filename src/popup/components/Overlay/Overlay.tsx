import React from 'react';

export const Overlay = () => {

    //update Div-Position
    let imgSrc;
    const updateDivPosition = (event) => {
        if (!boolOverlay) {
            if (event.target.tagName.toLowerCase() === 'img') {
                let rect = event.target.getBoundingClientRect();
                let paddingFromTop = 10;
                let paddingFromLeft = 10;
                overlayElement.style.top = (rect.top + window.scrollY + paddingFromTop) + 'px';
                overlayElement.style.left = (rect.left + window.scrollX + paddingFromLeft) + 'px';
                icon_liccium.style.top = (rect.top + window.scrollY + paddingFromTop) + 'px';
                icon_liccium.style.left = (rect.left + window.scrollX + paddingFromLeft) + 'px';
                icon_liccium.style.display = 'block';
                imgSrc = event.target.src;
            }
        }
    };
    //Div hiden beim mouse-out
    const hideDiv = () => {
        if (!boolOverlay) {
            icon_liccium.style.display = 'none';
            //overlayElement.style.display = 'none';
        }
    };
    var boolOverlay = false;
    //listener für clicks
    icon_liccium.addEventListener('click', function () {
        console.log('click ' + imgSrc);

        /* overlayElement.classList.toggle('transition'); */


        if (!boolOverlay) {
            overlayElement.style.display = 'block';
            icon_liccium.style.background = 'none';
            boolOverlay = true;
        } else {
            overlayElement.style.display = 'none';
            icon_liccium.style.background = 'rgba(255, 255, 255, 0.65)';
            boolOverlay = false;
        }
    });

    //listener für hover-in über bilder
    document.addEventListener('mouseover', updateDivPosition);
    //listener für hover-out von bilder
    document.addEventListener('mouseout', hideDiv);

    overlayElement.addEventListener('mouseover', function () {
        overlayElement.style.display = 'block';
        //console.log('hover over div');
    });

    icon_liccium.addEventListener('mouseover', function () {
        icon_liccium.style.display = 'block';
        //console.log('hover over div');
    });
    return (
        <>
            <div className="ausklapp_overlay">
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

            <div className="icon-liccium">
                <object type="image/svg+xml" data="chrome-extension://aoimmhoeflcknmcgapnpigjchoafhjpb/images/Liccium-Logo-black-on-transparent-1400.svg">
                </object>
            </div>
        </>
    );
}
