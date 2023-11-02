import React, { useState } from 'react';
import './Selection.css';

const Selection = ({ setSrcUrl, setPageUrl }) => {

    const [disabled, setDisabled] = useState(true);

    const [imagesData, setImagesData] = useState([]);

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "getDOM" }).then(response => {
            setPageUrl(response.pageUrl);
            setImagesData(response.imageData);
        });
    });

    const search = () => {
        let pics = document.getElementsByClassName("pic");
        let selectedPic = null;
        for (let i = 0; i < pics.length; i++) {
            let style = pics[i].getAttribute("style");
            if (style === "margin: 2px; box-sizing: border-box; border: 3px solid #cd1848; padding: 2px; cursor: pointer;") {
                selectedPic = pics[i];
            }
        }

        console.log("search for " + selectedPic.src);

        setSrcUrl(selectedPic.src);

        chrome.storage.local.set({ srcUrl: selectedPic.src });
    }

    const clearImageSelection = () => {
        let pics = document.getElementsByClassName("pic");
        for (let i = 0; i < pics.length; i++) {
            pics[i].setAttribute("style", "margin: 2px; border-radius: 7px 7px 7px 7px;");
        }
    }

    const getImageSrcUrl = (event) => {

        let img = event.target;
        console.log("Selecteted image: " + img.src);

        clearImageSelection();
        img.setAttribute("style", "margin: 2px; box-sizing: border-box; border: 3px solid #cd1848; padding: 2px; cursor: pointer;");

        setDisabled(false);
    }

    const renderImages = () => {
        let elements = [];

        let renderHeight = 120;
        for (let i = 0; i < imagesData.length; i++) {
            let img = (
                <img key={"img" + i} className="pic" src={imagesData[i].currentSrc} crossOrigin="anonymous" alt={"img" + i} width={"" + (rerenderWith(imagesData[i].with, imagesData[i].height, renderHeight))} height={renderHeight} onClick={getImageSrcUrl} />
            );
            elements.push(img);
        };

        return elements;
    }

    const rerenderWith = (width, height, renderHeight) => {
        return width / (height / renderHeight);
    }

    return (
        <div className="Selection">
            <div className="selectionBanner">
                <a href="https://liccium.com/app/" target="_blank">
                    <img className="selectionLicciumLogo" src="liccium-logo.png" alt="Liccium Logo" />
                </a>
                <p className="selectionText">Select one image to generate the ISCC and search for declarations</p>
                <button className="searchBtn" onClick={() => search()} disabled={disabled}>Go</button>
            </div>
            <div className="imageSelection">
                {renderImages()}
            </div>
        </div>
    );
};

export default Selection;