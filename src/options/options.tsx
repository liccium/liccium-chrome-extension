import React from 'react';
import { createRoot } from 'react-dom/client';
import './options.css';

let serverUrlSetting = "";

const save = () => {

    /* let regex = /[A-Z]/g; */ // Create a RegEx for all types of URLs
    let regex = "";

    if(serverUrlSetting.match(regex)) {

        if(serverUrlSetting.charAt(serverUrlSetting.length-1) !== "/") {
            serverUrlSetting = serverUrlSetting + "/";
        }
    
        chrome.storage.local.set({ serverUrl: serverUrlSetting })
            .then(result => {
                console.log(result)
                window.alert("Settings saved.");
            }); // use callback in then to check if saved

    } else {
        window.alert("ServerUrl is not a valid URL.");
    }

}

const change = (event) => {
    serverUrlSetting = event.target.value;
    console.log(serverUrlSetting);
}

const renderElements = (settings) => {

    serverUrlSetting = settings;

    let elements = [];

    elements.push(
        <div key={"settingInfo"} className={"settingInfo"}>
            <p key={"settingInfoText"} className={"settingInfoText"}>Settings:</p>
        </div>
    );

    elements.push(
        <div key={"settingServer"} className={"setting settingFirst"}>
            <div className="settingKey">
                <label>Server Url</label>
            </div>
            <div className="settingValue">
                <input id="serverSetting" type="text" defaultValue={settings} onChange={change} />
            </div>
        </div>
    );

    return elements;
}

chrome.storage.local.get(["serverUrl"]).then((storage) => {

    console.log("---------- CHROME STORAGE -------->");
    console.log(storage);

    if (storage.serverUrl !== undefined) {
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
                    {renderElements(storage.serverUrl)}
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