import React from 'react';
import Unit from '../../../Unit/Unit';

class RendererISCCRegistryDetail {

    data = null;
    setData = null;

    digitalSourceTypes = null;
    verificationTypes = null;

    constructor({ data, setData }) {
        this.data = data;
        this.setData = setData;
        this.digitalSourceTypes = {
            trainedAlgorithmicMedia: "Trained algorithmic media",
            compositeSynthetic: "Composite including synthetic elements",
            algorithmicMedia: "Pure algorithmic media",
            digitalCapture: "Original digital capture sampled from real life",
            minorHumanEdits: "Original media with minor human edits",
            digitalArt: "Digital art"
        }
        this.verificationTypes = {
            DomainVerification: "Domain verification",
            TwitterVerification: "Twitter verification"
        }
    }

    checkValue(value) {
        return value !== undefined && value !== null && value !== ""
    }

    calculateFileSize(fileSize) {
        let byte = fileSize;
        let kiloByte = fileSize / 1000;
        let megaByte = kiloByte / 1000;
        let gigaByte = megaByte / 1000;
        let terraByte = gigaByte / 1000;

        if (Math.round(terraByte) === 0) {
            if (Math.round(gigaByte) === 0) {
                if (Math.round(megaByte) === 0) {
                    if (Math.round(kiloByte) === 0) {
                        fileSize = byte + " B";
                    } else {
                        fileSize = kiloByte.toFixed(2) + " KB";
                    }
                } else {
                    fileSize = megaByte.toFixed(2) + " MB";
                }
            } else {
                fileSize = gigaByte.toFixed(2) + " GB";
            }
        } else {
            fileSize = terraByte.toFixed(2) + " TB";
        }

        return fileSize;
    }

    getDigitalSourceTypeName(digitalSourceType) {
        return this.digitalSourceTypes[digitalSourceType];
    }

    getVerificationType(verificationType) {
        return this.verificationTypes[verificationType];
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
        if (origin === "isccRegistry" || origin === "testnetIsccRegistry") {
            controlButtons.push(<button key="declarationsBtn" id="declarationsBtn" className="controlsButton" onClick={() => this.renderDeclarationData(asset)}>Declaration</button>);
        }
        //console.log("CREDENTIALS: " + credentials);
        if (credentials !== null && credentials !== undefined) {
            controlButtons.push(<button key="credentialsBtn" id="credentialsBtn" className="controlsButton" onClick={() => this.renderCredentialsData(asset)}>Credentials</button>);
        }
        controlButtons.push(<button key="assetBtn" id="assetBtn" className="controlsButton" onClick={() => this.renderAssetData(asset)} autoFocus>Asset</button>);
        controlButtons.push(<button key="isccBtn" id="isccBtn" className="controlsButton" onClick={() => this.renderISCCData(asset)}>ISCC</button>);
        if (origin === "isccRegistry" || origin === "testnetIsccRegistry") {
            controlButtons.push(<button key="compareBtn" id="compareBtn" className="controlsButton" onClick={() => this.renderCompareData(iscc, asset)}>Compare</button>);
        }

        return controlButtons;
    }

    renderMetadataData(asset) {
        let metadataBtn = document.getElementById("metadataBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(metadataBtn);
        let rowCounter = 0;
        let data = [];
        if (asset.resourceMetadata === undefined) {
            let splittedTitle = asset.isccMetadata.name.split(" ");
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyTitle" className="pRowKey">Title</p>
                    <p key="keyTitleValue" className="pRowValue">
                        {splittedTitle[0] + " " + splittedTitle[1] + " "}
                        <a href={"https://www." + splittedTitle[2]} target="_blank">{splittedTitle[2]}</a>
                    </p>
                </div>
            );
        } else {
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyTitle" className="pRowKey">Title</p>
                    <p key="keyTitleValue" className="pRowValue">{asset.isccMetadata.name}</p>
                </div>
            );
        }
        rowCounter++;
        if (this.checkValue(asset.isccMetadata.description)) {
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyDescription" className="pRowKey">Description</p>
                    <p key="keyDescriptionValue" className="pRowValue">{asset.isccMetadata.description}</p>
                </div>
            );
            rowCounter++;
        }
        if (this.checkValue(asset.isccMetadata.sourceUrl)) {
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keySourceUrl" className="pRowKey">Source</p>
                    <p key="keySourceUrlValue" className="pRowValue"><a href={asset.isccMetadata.sourceUrl} target="_blank">{asset.isccMetadata.sourceUrl}</a></p>
                </div>
            );
            rowCounter++;
        }
        if (this.checkValue(asset.isccMetadata.redirect)) {
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyRedirect" className="pRowKey">Redirect</p>
                    <p key="keyRedirectValue" className="pRowValue"><a href={asset.isccMetadata.redirect} target="_blank">{asset.isccMetadata.redirect}</a></p>
                </div>
            );
            rowCounter++;
        }
        if (this.checkValue(asset.isccMetadata.original)) {
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyOriginal" className="pRowKey">Claim</p>
                    <p key="keyOriginalValue" className="pRowValue">{asset.isccMetadata.original ? "Declared by original creator or rightsholder" : "Declarer doesn't claim to be the original creator or rightsholder"}</p>
                </div>
            );
            rowCounter++;
        }

        if (asset.isccMetadata.liccium_plugins !== undefined) {
            if (asset.isccMetadata.liccium_plugins.iptc !== undefined) {
                if (asset.isccMetadata.liccium_plugins.iptc.acquireLicensePage !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.acquireLicensePage !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyAquire" className="pRowKey">Acquire</p>
                            <p key="keyAquireValue" className="pRowValue"><a href={asset.isccMetadata.liccium_plugins.iptc.acquireLicensePage} target="_blank">{asset.isccMetadata.liccium_plugins.iptc.acquireLicensePage}</a></p>
                        </div>
                    );
                    rowCounter++;
                }
            } else {
                if (asset.isccMetadata.acquire !== undefined
                    && asset.isccMetadata.acquire !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyAquire" className="pRowKey">Acquire</p>
                            <p key="keyAquireValue" className="pRowValue"><a href={asset.isccMetadata.acquire} target="_blank">{asset.isccMetadata.acquire}</a></p>
                        </div>
                    );
                    rowCounter++;
                }
            }
        } else {
            if (asset.isccMetadata.acquire !== undefined
                && asset.isccMetadata.acquire !== null) {
                data.push(
                    <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyAquire" className="pRowKey">Acquire</p>
                        <p key="keyAquireValue" className="pRowValue"><a href={asset.isccMetadata.acquire} target="_blank">{asset.isccMetadata.acquire}</a></p>
                    </div>
                );
                rowCounter++;
            }
        }
        if (asset.isccMetadata.liccium_plugins !== undefined) {
            if (asset.isccMetadata.liccium_plugins.iptc !== undefined) {
                if (asset.isccMetadata.liccium_plugins.iptc.webstatementRights !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.webstatementRights !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyLicence" className="pRowKey">Licence</p>
                            <p key="keyLicenceValue" className="pRowValue"><a href={asset.isccMetadata.liccium_plugins.iptc.webstatementRights} target="_blank">{asset.isccMetadata.liccium_plugins.iptc.webstatementRights}</a></p>
                        </div>
                    );
                    rowCounter++;
                }
            } else {
                if (asset.isccMetadata.license !== undefined
                    && asset.isccMetadata.license !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyLicence" className="pRowKey">Licence</p>
                            <p key="keyLicenceValue" className="pRowValue"><a href={asset.isccMetadata.license} target="_blank">{asset.isccMetadata.license}</a></p>
                        </div>
                    );
                    rowCounter++;
                }
            }
        } else {
            if (asset.isccMetadata.license !== undefined
                && asset.isccMetadata.license !== null) {
                data.push(
                    <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                        <p key="keyLicence" className="pRowKey">Licence</p>
                        <p key="keyLicenceValue" className="pRowValue"><a href={asset.isccMetadata.license} target="_blank">{asset.isccMetadata.license}</a></p>
                    </div>
                );
                rowCounter++;
            }
        }

        if (asset.isccMetadata.liccium_plugins !== undefined) {
            if (asset.isccMetadata.liccium_plugins.iptc !== undefined) {
                if (asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyDigitalSourceType" className="pRowKey">Digital source type</p>
                            <p key="keyDigitalSourceTypeValue" className="pRowValue">{this.getDigitalSourceTypeName(asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype)}</p>
                        </div>
                    );
                    rowCounter++;
                }
                if (asset.isccMetadata.liccium_plugins.iptc.keywords !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.keywords !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyKeywords" className="pRowKey">Keywords</p>
                            <p key="keyKeywordsValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.keywords}</p>
                        </div>
                    );
                    rowCounter++;
                }
                if (asset.isccMetadata.liccium_plugins.iptc.creator !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.creator !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyCreatorName" className="pRowKey">Creator name</p>
                            <p key="keyCreatorNameValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.creator}</p>
                        </div>
                    );
                    rowCounter++;
                }
                if (asset.isccMetadata.liccium_plugins.iptc.creditText !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.creditText !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyCreditLineName" className="pRowKey">Credit line</p>
                            <p key="keyCreditLineNameValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.creditText}</p>
                        </div>
                    );
                    rowCounter++;
                }
                if (asset.isccMetadata.liccium_plugins.iptc.rights !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.rights !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyRights" className="pRowKey">Rights</p>
                            <p key="keyRightsValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.rights}</p>
                        </div>
                    );
                    rowCounter++;
                }
                if (asset.isccMetadata.liccium_plugins.iptc.copyrightNotice !== undefined
                    && asset.isccMetadata.liccium_plugins.iptc.copyrightNotice !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyCopyrightNotice" className="pRowKey">Copyright notice</p>
                            <p key="keyCopyrightNoticeValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.iptc.copyrightNotice}</p>
                        </div>
                    );
                    rowCounter++;
                }
            }
            if (asset.isccMetadata.liccium_plugins.tdmai !== undefined) {
                if (asset.isccMetadata.liccium_plugins.tdmai.TDMAI !== undefined
                    && asset.isccMetadata.liccium_plugins.tdmai.TDMAI !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyTDMAISummary" className="pRowKey">AI opt-out</p> {/* TDM·AI Summary */}
                            <p key="keyTDMAISummaryValue" className="pRowValue">{asset.isccMetadata.liccium_plugins.tdmai.TDMAI ? "Content may be used as AI training data." : "Content must not be used for AI training purposes."}</p>
                        </div>
                    );
                    rowCounter++;
                }
                if (asset.isccMetadata.liccium_plugins.tdmai.TDMAI_policy_URL !== undefined
                    && asset.isccMetadata.liccium_plugins.tdmai.TDMAI_policy_URL !== null) {
                    data.push(
                        <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                            <p key="keyTDMAIPolicyURL" className="pRowKey">AI opt-out policy</p> {/* TDM·AI policy */}
                            <p key="keyTDMAIPolicyURLValue" className="pRowValue"><a href={asset.isccMetadata.liccium_plugins.tdmai.TDMAI_policy_URL} target="_blank">{asset.isccMetadata.liccium_plugins.tdmai.TDMAI_policy_URL}</a></p>
                        </div>
                    );
                    rowCounter++;
                }
            }
        }
        this.setData(data);
    }
    renderDeclarationData(asset) {
        let declarationsBtn = document.getElementById("declarationsBtn");
        this.clearControlsButtonStyle();
        this.setControlsButtonStyle(declarationsBtn);
        let rowCounter = 0;
        let data = [];
        let origin = asset.origin;
        if (origin === "isccRegistry" || origin === "testnetIsccRegistry") {
            data.push(
                <div key={"cro" + rowCounter} className={rowCounter % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key="keyMetadata" className="pRowKey">Metadata</p>
                    <p key="keyMetadataValue" className="pRowValue">
                        <a href={asset.resourceMetadata.meta_url} target="_blank">{asset.resourceMetadata.meta_url}</a>
                    </p>
                </div>
            );
            rowCounter++;
        }
        data.push(
            <div key="cro1" className="contentRowEven">
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
            <div key="cro2" className="contentRowOdd">
                <p key="keyDeclarationDate" className="pRowKey">Declaration date</p>
                <p key="keyDeclarationDateValue" className="pRowValue">{this.getFullDate(asset.resourceMetadata.timestamp)}</p>
            </div>
        );
        data.push(
            <div key="cro3" className="contentRowEven">
                <p key="keyMessage" className="pRowKey">Ledger</p>
                <p key="keyMessageValue" className="pRowValue">{asset.resourceMetadata.chain.type + " " + asset.resourceMetadata.chain.name}</p>
            </div>
        );
        let href = "https://goerli.etherscan.io/tx/" + asset.resourceMetadata.txHash;
        data.push(
            <div key="cro4" className="contentRowOdd">
                <p key="keyLedgerExplorer" className="pRowKey">Ledger explorer</p>
                <p key="keyLedgerExplorerValue" className="pRowValue"><a href={href} target="_blank">{href}</a></p>
            </div>
        );
        data.push(
            <div key="cro5" className="contentRowEven">
                <p key="keyISCCId" className="pRowKey">ISCC-Registry</p>
                <p key="keyISCCIdValue" className="pRowValue">
                    <a href={"https://testnet.iscc.id/registry/iscc_registry/isccid/?q=" + asset.resourceMetadata.isccId} target="_blank">{"https://testnet.iscc.id/registry/iscc_registry/isccid/?q=" + asset.resourceMetadata.isccId}</a>
                </p>
            </div>
        );
        data.push(
            <div key="cro6" className="contentRowOdd">
                <p key="keyRevision" className="pRowKey">Revision</p>
                <p key="keyRevisionValue" className="pRowValue">{asset.resourceMetadata.revison}</p>
            </div>
        );
        data.push(
            <div key="cro7" className="contentRowEven">
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
            <div key="cro8" className="contentRowOdd">
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
            <div key="cro9" className="contentRowEven">
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
            <div key="cro10" className="contentRowOdd">
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
                    <p key={"keyVerify" + i} className="pRowKey">{this.getVerificationType(verificationType)}</p>
                    <p key={"keyVerifyValue" + i} className="pRowValue">
                        <a href={href} target="_blank">{handle}</a> &#8594; {asset.resourceMetadata.owner}
                    </p>
                </div>
            );
            data.push(
                <div key={"cro1" + i} className={i % 2 === 0 ? "contentRowOdd" : "contentRowEven"}>
                    <p key={"keyIssuanceDate" + i} className="pRowKey">Issuance date</p>
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
                <p key="keyFilename" className="pRowKey">File name</p>
                <p key="keyFilenameValue" className="pRowValue">{asset.isccMetadata.filename}</p>
            </div>
        );
        data.push(
            <div key="cro1" className="contentRowEven">
                <p key="keyMediatype" className="pRowKey">Media type</p>
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
                <p key="keyFilesize" className="pRowKey">File size</p>
                <p key="keyFilesizeValue" className="pRowValue">{this.calculateFileSize(asset.isccMetadata.filesize)}</p>
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