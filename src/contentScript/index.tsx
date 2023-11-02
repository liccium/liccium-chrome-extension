import React from 'react';
import { createRoot } from 'react-dom/client';
import ContentScript from './contentScript';

const init = (() => {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute("class", "licciumContentScript");
    document.body.appendChild(rootContainer);
    if (!rootContainer) {
        throw new Error("Can not find RootContainer");
    }
    const root = createRoot(rootContainer);
    console.log(rootContainer);
    root.render(<ContentScript />);

    chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
        // If the received message has the expected format...
        if (msg.action === 'getDOM') {
            // Call the specified callback, passing
            // the web-page's DOM content as argument
            // IMAGES
            let imagesMap = new Map();
            let imgTags = document.body.getElementsByTagName("img");
            for (let i = 0; i < imgTags.length; i++) {
                if (
                    imgTags[i].currentSrc !== ""
                    && imgTags[i].currentSrc.substring(0, 4) !== "data"
                    && (imgTags[i].height >= 100 || imgTags[i].width >= 100)) {
                    imagesMap.set(imgTags[i].currentSrc, { "currentSrc": imgTags[i].currentSrc, "alt": imgTags[i].alt, "height": imgTags[i].height, "width": imgTags[i].width });
                }
            }

            let pageUrl = window.location.href;
            let imagesArray = [];
            imagesMap.forEach((value, key) => {
                imagesArray.push(value);
            });

            sendResponse({ pageUrl: pageUrl, imageData: imagesArray });
        }
    });
});

init();