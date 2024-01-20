import React from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';

let serverUrls = null;
let selectedServerUrl = null;
let displayOverlay = null;

const save = () => {
    chrome.storage.local.set({
        selectedServerUrl: selectedServerUrl,
        displayOverlay: displayOverlay
    }).then(() => {
        window.alert("Settings saved.");
    });
}


const getSelectedServerUrl = (event) => {
    selectedServerUrl = event.target.value;
}

const toggleDisplayOverlay = (event) => {
    displayOverlay = event.target.checked;
}

const renderElements = (storage) => {

    let elements = [];

    elements.push(
        <div key={"settingInfo"} className={"settingInfo"}>
            <p key={"settingInfoText"} className={"settingInfoText"}>Settings:</p>
        </div>
    );

    elements.push(
        <div key={"settingServer"} className={"setting settingFirst"}>
            <div className="settingKey">
                <label>Server</label>
            </div>
            <div className="settingValue">
                <select className="serverUrls" onChange={getSelectedServerUrl} defaultValue={selectedServerUrl}>
                    <option value={storage.serverUrls[0].url}>{storage.serverUrls[0].name}</option>
                    <option value={storage.serverUrls[1].url}>{storage.serverUrls[1].name}</option>
                    <option value={storage.serverUrls[2].url}>{storage.serverUrls[2].name}</option>
                </select>
            </div>

        </div>
    );

    elements.push(
        <div key={"settingDisplayOverlay"} className={"setting"}>
            <div className="settingKey">
                <label>Display Overlay</label>
            </div>
            <div className="settingValue">
                <label className="switch">
                    {displayOverlay
                        ? <input type="checkbox" onChange={toggleDisplayOverlay} defaultChecked />
                        : <input type="checkbox" onChange={toggleDisplayOverlay} />}
                    <span className="slider round" />
                </label>
            </div>
        </div>
    )

    elements.push(
        <div className="about">
            <a href="https://github.com/liccium/liccium-chrome-extension/tree/main#liccium-browser-plugin---terms-of-service-tos" target="_blank">Terms of Service</a>
            <a href="https://liccium.com/contact/" target="_blank">Contact</a>
        </div>
    );

    return elements;
}

chrome.storage.local.get(["selectedServerUrl", "serverUrls", "displayOverlay"]).then((storage) => {

    console.log("---------- CHROME STORAGE -------->");
    console.log(storage);

    if (storage.selectedServerUrl !== undefined
        && storage.serverUrls !== undefined
        && storage.displayOverlay !== undefined) {
        serverUrls = storage.serverUrls;
        selectedServerUrl = storage.selectedServerUrl;
        displayOverlay = storage.displayOverlay;
        const options = (
            <div className="Options">
                <div className="optionsBanner">
                    <a href="https://liccium.com/app/" target="_blank">
                        <img className="optionsLicciumLogo" src="liccium-logo.png" alt="Liccium Logo" />
                    </a>
                    {/* <p className="settingsText">Select one image to generate the ISCC and search for declarations</p> */}
                    <button className="saveBtn" onClick={() => save()} >Save</button>
                </div>
                <div className="settings">
                    {renderElements(storage)}
                </div>
            </div>
        );

        const container = document.createElement('div');
        document.body.appendChild(container);
        const root = createRoot(container);
        root.render(options);
        document.title = "Liccium Trust Engine - Settings";
    }
});