import React from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';

let serverUrls = null;
let selectedServerUrl = null;

const save = () => {
    chrome.storage.local.set({ selectedServerUrl: selectedServerUrl })
        .then(() => {
            window.alert("Settings saved.");
        }); // use callback in then to check if saved
}

const getSelectedServerUrl = (event) => {
    selectedServerUrl = event.target.value;
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
                </select>
            </div>
        </div>
    );

    return elements;
}

chrome.storage.local.get(["selectedServerUrl", "serverUrls"]).then((storage) => {

    console.log("---------- CHROME STORAGE -------->");
    console.log(storage);

    if (storage.selectedServerUrl !== undefined && storage.serverUrls !== undefined) {
        serverUrls = storage.serverUrls;
        selectedServerUrl = storage.selectedServerUrl;
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