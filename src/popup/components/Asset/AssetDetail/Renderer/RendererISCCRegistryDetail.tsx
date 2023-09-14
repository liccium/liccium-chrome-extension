import React from 'react';
import Unit from '../../../Unit/Unit';

class RendererISCCRegistryDetail {

    data = null;
    setData = null;

    constructor({ data, setData }) {
        this.data = data;
        this.setData = setData;
    }

    copyToClipboard(value) {
        console.log("copyToClipboard: " + value)
        navigator.clipboard.writeText(value);
    }

    clearControlsButtonStyle() {
        let btns = document.getElementsByClassName("controlsButton");
        for (let i = 0; i < btns.length; i++) {
            btns[i].removeAttribute("style");
        }
    }
    setControlsButtonStyle(btn) {
        /* console.log("BUTTON: ");
        console.log(btn); */
        btn.setAttribute("style", "color: #cd1848; border-bottom: 3px solid #cd1848;");
    }

    getFullDate(timestamp) {

        timestamp = "" + timestamp;

        console.log("timestamp: " + timestamp + " length: " + timestamp.length + " result: " + ((timestamp.length === 10) ? parseInt(timestamp, 10) * 1000 : parseInt(timestamp, 10)));

        timestamp = (("" + timestamp).length === 10) ? (parseInt(timestamp, 10) * 1000) : parseInt(timestamp, 10);
        let date = new Date(parseInt(timestamp, 10)).toISOString();

        return date.replace("T", " ").substring(0, date.length - 5);
    }

    renderControlButtons(iscc, asset) {

        let controlButtons = [];
        let credentials = asset.credentials;
        let origin = asset.origin;

        controlButtons.push(<button key="MetadataBtn" id="metadataBtn" className="controlsButton" onClick={() => this.renderMetadataData(asset)}>Metadata</button>);
        if (origin === "iscc-registry") {
            controlButtons.push(<button key="declarationsBtn" id="declarationsBtn" className="controlsButton" onClick={() => this.renderDeclarationData(asset)}>Declaration</button>);
        }
        //console.log("CREDENTIALS: " + credentials);
        if (credentials !== null && credentials !== undefined) {
            controlButtons.push(<button key="credentialsBtn" id="credentialsBtn" className="controlsButton" onClick={() => this.renderCredentialsData(asset)}>Credentials</button>);
        }
        controlButtons.push(<button key="assetBtn" id="assetBtn" className="controlsButton" onClick={() => this.renderAssetData(asset)} autoFocus>Asset</button>);
        controlButtons.push(<button key="isccBtn" id="isccBtn" className="controlsButton" onClick={() => this.renderISCCData(asset)}>ISCC</button>);
        controlButtons.push(<button key="compareBtn" id="compareBtn" className="controlsButton" onClick={() => this.renderCompareData(iscc, asset)}>Compare</button>);

        return controlButtons;
    }

    renderMetadataData(asset) {
        let metadataBtn = document.getElementById("metadataBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(metadataBtn);
        let rowCounter = 0;
        let data = [];
        let origin = asset.origin;
        if (origin === "iscc-registry") {
            data.push(
                <div key="cro0" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyMetadata" className="pRowKey">Metadata</p>
                    <p key="keyMetadataValue" className="pRowValue">
                        <a href={asset.resourceMetadata.meta_url} target="_blank">{asset.resourceMetadata.meta_url}</a>
                    </p>
                </div>
            );
            rowCounter++;
        }
        if (asset.resourceMetadata === undefined) {
            let splittedTitle = asset.isccMetadata.name.split(" ");
            data.push(
                <div key="cro1" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyTitle" className="pRowKey">Title</p>
                    <p key="keyTitleValue" className="pRowValue">
                        {splittedTitle[0] + " " + splittedTitle[1] + " "}
                        <a href={"https://www." + splittedTitle[2]} target="_blank">{splittedTitle[2]}</a>
                    </p>
                </div>
            );
        } else {
            data.push(
                <div key="cro1" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyTitle" className="pRowKey">Title</p>
                    <p key="keyTitleValue" className="pRowValue">{asset.isccMetadata.name}</p>
                </div>
            );
        }
        rowCounter++;
        data.push(
            <div key="cro2" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                <p key="keyDescription" className="pRowKey">Description</p>
                <p key="keyDescriptionValue" className="pRowValue">{asset.isccMetadata.description}</p>
            </div>
        );
        rowCounter++;
        data.push(
            <div key="cro3" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                <p key="keySourceUrl" className="pRowKey">Source URL</p>
                <p key="keySourceUrlValue" className="pRowValue"><a href={asset.isccMetadata.sourceUrl} target="_blank">{asset.isccMetadata.sourceUrl}</a></p>
            </div>
        );
        rowCounter++;
        data.push(
            <div key="cro4" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                <p key="keyRedirect" className="pRowKey">Redirect URL</p>
                <p key="keyRedirectValue" className="pRowValue"><a href={asset.isccMetadata.redirect} target="_blank">{asset.isccMetadata.redirect}</a></p>
            </div>
        );
        rowCounter++;
        data.push(
            <div key="cro5" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                <p key="keyAquire" className="pRowKey">Acquire URL</p>
                <p key="keyAquireValue" className="pRowValue"><a href={asset.isccMetadata.acquire} target="_blank">{asset.isccMetadata.acquire}</a></p>
            </div>
        );
        rowCounter++;
        data.push(
            <div key="cro6" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                <p key="keyLicence" className="pRowKey">Licence URL</p>
                <p key="keyLicenceValue" className="pRowValue"><a href={asset.isccMetadata.license} target="_blank">{asset.isccMetadata.license}</a></p>
            </div>
        );
        rowCounter++;
        if (Object.keys(asset.isccMetadata.liccium_plugins).length !== 0) {
            if (asset.isccMetadata.liccium_plugins.iptc !== undefined) {
                data.push(
                    <div key="cro7" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyKeywords" className="pRowKey">Keywords</p>
                        <p key="keyKeywordsValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.keywords}</p>
                    </div>
                );
                rowCounter++;
                data.push(
                    <div key="cro8" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyCreatorName" className="pRowKey">Creator name</p>
                        <p key="keyCreatorNameValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.creator}</p>
                    </div>
                );
                rowCounter++;
                data.push(
                    <div key="cro9" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyCreditLineName" className="pRowKey">Credit line</p>
                        <p key="keyCreditLineNameValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.creditText}</p>
                    </div>
                );
                rowCounter++;
                data.push(
                    <div key="cro10" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyCopyrightNotice" className="pRowKey">Copyright Notice</p>
                        <p key="keyCopyrightNoticeValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.copyrightNotice}</p>
                    </div>
                );
                rowCounter++;
                data.push(
                    <div key="cro11" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyDigitalSourceType" className="pRowKey">Digital Source Type</p>
                        <p key="keyDigitalSourceTypeValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype}</p>
                    </div>
                );
                rowCounter++;
            }
            if (asset.isccMetadata.liccium_plugins.tdmai !== undefined) {
                data.push(
                    <div key="cro12" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyTDMAISummary" className="pRowKey">TDMAI Summary</p>
                        <p key="keyTDMAISummaryValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.tdmai.TDMAI ? "Content may be used as AI training data." : "Content must not be used for AI training purposes."}</p>
                    </div>
                );
                rowCounter++;
                data.push(
                    <div key="cro13" className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyTDMAIPolicyURL" className="pRowKey">TDMAI policy URL</p>
                        <p key="keyTDMAIPolicyURLValue" className="pRowValue"><a href={asset.isccMetadata.liccium_plugins.tdmai.TDMAI_policy_URL} target="_blank">{asset.isccMetadata.liccium_plugins.tdmai.TDMAI_policy_URL}</a></p>
                    </div>
                );
                rowCounter++;
            }
        }
        this.setData(data);
    }
    renderDeclarationData(asset) {
        let declarationsBtn = document.getElementById("declarationsBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(declarationsBtn);
        let data = [];
        data.push(
            <div key="cro0" className="contentRowOdd">
                <p key="keyISCC" className="pRowKey">ISCC</p>
                <button onClick={() => this.copyToClipboard(asset.isccMetadata.iscc)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyISCCValue" className="pRowValue">{asset.isccMetadata.iscc}</p>
            </div>
        );
        data.push(
            <div key="cro1" className="contentRowEven">
                <p key="keyDeclarer" className="pRowKey">Metadata</p>
                <p key="keyDeclarerValue" className="pRowValue">
                    <a href={asset.resourceMetadata.meta_url} target="_blank">{asset.resourceMetadata.meta_url}</a>
                </p>
            </div>
        );
        data.push(
            <div key="cro3" className="contentRowOdd">
                <p key="keyDeclarationDate" className="pRowKey">Declaration Date</p>
                <p key="keyDeclarationDateValue" className="pRowValue">{this.getFullDate(asset.resourceMetadata.timestamp)}</p>
            </div>
        );
        data.push(
            <div key="cro4" className="contentRowEven">
                <p key="keyMessage" className="pRowKey">Ledger</p>
                <p key="keyMessageValue" className="pRowValue">Ethereum Goerli (eip155:5)</p>
            </div>
        );
        let href = "https://goerli.etherscan.io/tx/" + asset.resourceMetadata.txHash;
        data.push(
            <div key="cro5" className="contentRowOdd">
                <p key="keyLedgerExplorer" className="pRowKey">Ledger explorer</p>
                <p key="keyLedgerExplorerValue" className="pRowValue"><a href={href} target="_blank">{href}</a></p>
            </div>
        );
        data.push(
            <div key="cro6" className="contentRowEven">
                <p key="keyISCCId" className="pRowKey">ISCC-Registry</p>
                <p key="keyISCCIdValue" className="pRowValue">
                    <a href={"https://testnet.iscc.id/registry/iscc_registry/isccid/?q=" + asset.resourceMetadata.isccId} target="_blank">{"https://testnet.iscc.id/registry/iscc_registry/isccid/?q=" + asset.resourceMetadata.isccId}</a>
                </p>
            </div>
        );
        data.push(
            <div key="cro7" className="contentRowOdd">
                <p key="keyRevision" className="pRowKey">Revision</p>
                <p key="keyRevisionValue" className="pRowValue">{asset.resourceMetadata.revison}</p>
            </div>
        );
        data.push(
            <div key="cro8" className="contentRowEven">
                <p key="keyDeclarer" className="pRowKey">Declarer</p>
                <button onClick={() => this.copyToClipboard(asset.resourceMetadata.declarer)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyDeclarerValue" className="pRowValue">{asset.resourceMetadata.declarer}</p>
            </div>
        );
        data.push(
            <div key="cro9" className="contentRowOdd">
                <p key="keyRegistrar" className="pRowKey">Registrar</p>
                <button onClick={() => this.copyToClipboard(asset.resourceMetadata.registrar)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyRegistrarValue" className="pRowValue">{asset.resourceMetadata.registrar}</p>
            </div>
        );
        data.push(
            <div key="cro10" className="contentRowEven">
                <p key="keyISCCId" className="pRowKey">ISCC-ID</p>
                <button onClick={() => this.copyToClipboard(asset.resourceMetadata.isccId)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyISCCIdValue" className="pRowValue">{asset.resourceMetadata.isccId}</p>
            </div>
        );
        let didIscc = "did:iscc:" + asset.resourceMetadata.isccId.toLowerCase();
        data.push(
            <div key="cro11" className="contentRowOdd">
                <p key="keyISCCId" className="pRowKey">did:iscc</p>
                <button onClick={() => this.copyToClipboard(didIscc)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyISCCIdValue" className="pRowValue">{didIscc}</p>
            </div>
        );
        this.setData(data);
    }
    renderCredentialsData(asset) {
        let credentialsBtn = document.getElementById("credentialsBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(credentialsBtn);
        let data = [];
        console.log("CREDENTIAL LENGTH: " + asset.credentials.length);
        console.log(asset.credentials);
        for (let i = 0; i < asset.credentials.length; i++) {
            let verificationType = asset.credentials[i].type[1];
            let handle = asset.credentials[i].evidence.handle;
            let href = "";
            if (verificationType === "TwitterVerification") {
                href = "https://www.twitter.com/" + handle.substring(1, handle.length);
            } else {
                href = "https://www." + handle + "/";
            }
            data.push(
                <div key={"cro0" + i} className={i % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key={"keyVerify" + i} className="pRowKey">{verificationType}</p>
                    <p key={"keyVerifyValue" + i} className="pRowValue">
                        <a href={href} target="_blank">{handle}</a> &#8594; {asset.resourceMetadata.owner}
                    </p>
                </div>
            );
            data.push(
                <div key={"cro1" + i} className={i % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key={"keyIssuanceDate" + i} className="pRowKey">Issuance Date</p>
                    <p key={"keyIssuanceDateValue" + i} className="pRowValue">{asset.credentials[i].issuanceDate.replace("T", " ").substring(0, asset.credentials[i].issuanceDate.length - 5)}</p> {/* convert utc string */}
                </div>
            );
            let did = asset.credentials[i].issuer.id.split(":");
            data.push(
                <div key={"cro2" + i} className={i % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key={"keyIssuer" + i} className="pRowKey">Issuer</p>
                    <p key={"keyIssuerValue" + i} className="pRowValue"><a href={"https://" + did[did.length - 1] + "/.well-known/did.json"} target="_blank">{asset.credentials[i].issuer.id}</a></p>
                </div>
            );
            data.push(
                <div key={"cro3" + i} className={i % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key={"keyHolder" + i} className="pRowKey">Holder</p>
                    <p key={"keyHolderValue" + i} className="pRowValue">{asset.credentials[i].credentialSubject.id}</p>
                </div>
            );
            data.push(
                <div key={"cro4" + i} className={i % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key={"keyCredentials" + i} className="pRowKey">Credentials</p>
                    <p key={"keyCredentialsValue" + i} className="pRowValue"><a href={asset.isccMetadata.credentials} target="_blank">{asset.isccMetadata.credentials}</a></p>
                </div>
            );
        }
        this.setData(data);
    }
    renderAssetData(asset) {
        let assetBtn = document.getElementById("assetBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(assetBtn);
        let data = [];
        data.push(
            <div key="cro0" className="contentRowOdd">
                <p key="keyFilename" className="pRowKey">Filename</p>
                <p key="keyFilenameValue" className="pRowValue">{asset.isccMetadata.filename}</p>
            </div>
        );
        data.push(
            <div key="cro1" className="contentRowEven">
                <p key="keyMediatype" className="pRowKey">Mediatype</p>
                <p key="keyMediatypeValue" className="pRowValue">{asset.isccMetadata.mediatype}</p>
            </div>
        );
        data.push(
            <div key="cro2" className="contentRowOdd">
                <p key="keyWidth" className="pRowKey">Width</p>
                <p key="keyWidthValue" className="pRowValue">{asset.isccMetadata.width}</p>
            </div>
        );
        data.push(
            <div key="cro3" className="contentRowEven">
                <p key="keyHeight" className="pRowKey">Height</p>
                <p key="keyHeightValue" className="pRowValue">{asset.isccMetadata.height}</p>
            </div>
        );
        data.push(
            <div key="cro4" className="contentRowOdd">
                <p key="keyFilesize" className="pRowKey">Filesize</p>
                <p key="keyFilesizeValue" className="pRowValue">{asset.isccMetadata.filesize}</p>
            </div>
        );
        this.setData(data);
    }
    renderISCCData(asset) {
        let isccBtn = document.getElementById("isccBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(isccBtn);
        let data = [];
        data.push(
            <div key="cro0" className="contentRowOdd">
                <p key="keyISCC" className="pRowKey">ISCC</p>
                <button onClick={() => this.copyToClipboard(asset.isccMetadata.iscc)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyISCCValue" className="pRowValue">{asset.isccMetadata.iscc}</p>
            </div>
        );
        data.push(
            <div key="cro2" className="contentRowEven">
                <p key="keyMode" className="pRowKey">Mode</p>
                <p key="keyModeValue" className="pRowValue">{asset.isccMetadata.mode}</p>
            </div>
        );
        data.push(
            <div key="cro3" className="contentRowOdd">
                <p key="keyMetahash" className="pRowKey">Metahash</p>
                <button onClick={() => this.copyToClipboard(asset.isccMetadata.metahash)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyMetahashValue" className="pRowValue">{asset.isccMetadata.metahash}</p>
            </div>
        );
        data.push(
            <div key="cro4" className="contentRowEven">
                <p key="keyDatahash" className="pRowKey">Datahash</p>
                <button onClick={() => this.copyToClipboard(asset.isccMetadata.datahash)}>
                    <svg viewBox="64 64 896 896" focusable="false" data-icon="copy" width="12px" height="12px" fill="#000000" aria-hidden="true">
                        <path d="M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z">
                        </path>
                    </svg>
                </button>
                <p key="keyDatahashValue" className="pRowValue">{asset.isccMetadata.datahash}</p>
            </div>
        );
        this.setData(data);
    }
    renderCompareData(iscc, asset) {
        let compareBtn = document.getElementById("compareBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(compareBtn);
        let data = [];
        data.push(
            <div key="cro0" className="contentRowOdd">
                <p key="keyDatahash" className="pRowKey">Meta</p>
                <Unit
                    key="MetaUnit"
                    unit="META"
                    iscc={iscc}
                    asset={asset} />
            </div>
        );
        data.push(
            <div key="cro1" className="contentRowEven">
                <p key="keyDatahash" className="pRowKey">Content</p>
                <Unit
                    key="ContentUnit"
                    unit="CONTENT"
                    iscc={iscc}
                    asset={asset} />
            </div>
        );
        data.push(
            <div key="cro2" className="contentRowOdd">
                <p key="keyDatahash" className="pRowKey">Data</p>
                <Unit
                    key="DataUnit"
                    unit="DATA"
                    iscc={iscc}
                    asset={asset} />
            </div>
        );
        data.push(
            <div key="cro3" className="contentRowEven">
                <p key="keyDatahash" className="pRowKey">Instance</p>
                <Unit
                    key="InstanceUnit"
                    unit="INSTANCE"
                    iscc={iscc}
                    asset={asset} />
            </div>
        );
        this.setData(data);
    }

}

export default RendererISCCRegistryDetail;