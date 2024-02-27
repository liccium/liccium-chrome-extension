import React, { useEffect } from 'react';
import './AssetList.css';

const AssetList = ({ iscc, assets, createThumbnail, onItemClickHadler, clearStorage }) => {
    const renderCertificateTags = (asset, index) => {
        let certificateTagElements = [];

        if (asset.credentials) {
            for (let i = 0; i < asset.credentials.length; i++) {
                const credential = asset.credentials[i];
                if (
                    credential.credentialSubject &&
                    credential.credentialSubject.id &&
                    credential.credentialSubject.id.includes(asset.resourceMetadata.declarer) &&
                    credential.evidence &&
                    credential.evidence.type &&
                    credential.evidence.type[0] === "DidKey509CertificateVerification"
                ) {
                    certificateTagElements.push(
                        <div className="tagTooltip" key={`certificateTag_${index}_${i}`}>
                            <div className="c2paTag">
                                <img className="tagIcon" src="contentCredential-white.png" alt="verified" />
                                <p className="handle">content c.</p>
                            </div>
                            <span className="tagtooltiptext">Content Credential</span>
                        </div>
                    );
                }
            }
        }

        return certificateTagElements;
    };


    const renderElements = () => {

        let elements = [];

        let renderSize = 70;

        elements.push(
            <div key={"iscc"} className={"asset assetFirst"} onClick={(() => onItemClickHadler("iscc"))}>
                {createThumbnail("imgBoxList", iscc[0].isccMetadata, renderSize)}
                <div key={"itemIscc"} className={"item"}>
                    <div key={"dataIscc"} className={"data"}>
                        <div key={"textIscc"} className={"text"}>
                            <p key={"titleIscc"} className={"title"}>{iscc[0].isccMetadata.name}</p>
                            <p key={"descriptionIscc"} className={"assetInfo"}>{iscc[0].isccMetadata.description}</p>
                        </div>
                        <div key={"infoIscc"} className={"info"}>
                            <p key={"infoRow0"} className={"date"}>{getDate(iscc[0].isccMetadata.filename.split(".")[0])}</p>
                            <div key={"infoRow1"} className={"infoTagEmpty"}></div>
                        </div>
                    </div>
                    <div key={"vcIscc"} className={"vc"}>
                        <div key={"infoRow2"} className={"infoTagEmpty"}></div>
                    </div>
                </div>
            </div>);

        elements.push(
            <div key={"searchInfo"} className={"searchInfo"}>
                <p key={"searchInfoText"} className={"searchInfoText"}>Liccium found {assets.length} declarations:</p>
            </div>
        );

        Array.prototype.map.call(assets, (asset, index) => {
            elements.push(
                <div key={"asset" + index} className={index === 0 ? "asset assetFirst" : "asset"} onClick={(() => onItemClickHadler("" + index))}>
                    {createThumbnail("imgBoxList", asset.isccMetadata, renderSize)}
                    <div key={"item"} className={"item"}>
                        <div key={"dataIscc"} className={"data"}>
                            <div key={"text" + index} className={"text"}>
                                <p key={"title" + index} className={"title"}>{asset.isccMetadata.name}</p>
                                <p key={"description" + index} className={"assetInfo"}>{asset.isccMetadata.description}</p>
                                <p key={"empty" + index} className={"empty"}></p>
                            </div>
                            <div key={"info" + index} className={"info"}>
                                <p key={"date" + index} className={"date"}>{getDate(asset.resourceMetadata.timestamp)}</p>
                                <div className="tagTooltip">
                                    <div key={"address" + index} className={"infoTag"}>{getAddress(asset.resourceMetadata.declarer)}</div>
                                    <span className="tagtooltiptext">Declaring wallet</span>
                                </div>
                            </div>
                        </div>
                        <div key={"vcIscc"} className={"vc"}>
                            {renderTags(asset, index)}
                        </div>
                    </div>
                </div>
            );
        });

        return elements;
    }

    const renderTags = (asset, index) => {

        let tagElements = [];

        console.log(asset.isccMetadata.liccium_plugins);

        if (asset.isccMetadata.liccium_plugins !== undefined) {
            if (asset.isccMetadata.liccium_plugins.iptc !== undefined) {
                if (asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype !== undefined) {
                    if (asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "digitalCapture"
                        || asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "minorHumanEdits") {
                        tagElements.push(
                            <div className="tagTooltip">
                                <div key={"divNoAITag" + index} className={"noAITag"}>
                                    <img className="tagIcon" src="noai.png" alt="NoAI" />
                                    <p key={"tagNameTrue" + index} className="handle">Authentic</p>
                                </div>
                                <span className="tagtooltiptext">Human generated content</span>
                            </div>
                        );
                    }
                    if (asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "trainedAlgorithmicMedia"
                        || asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "compositeSynthetic"
                        || asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "algorithmicMedia") {
                        tagElements.push(
                            <div className="tagTooltip">
                                <div key={"divGenAITag" + index} className={"genAITag"}>
                                    <img className="tagIcon" src="noai.png" alt="GenAI" />
                                    <p key={"tagNameTrue" + index} className="handle">Gen·AI</p>
                                </div>
                                <span className="tagtooltiptext">
                                    {(asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "trainedAlgorithmicMedia")
                                        ? "Trained algorithmic media"
                                        : (asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "compositeSynthetic")
                                            ? "Composite including synthetic elements"
                                            : (asset.isccMetadata.liccium_plugins.iptc.digitalsourcetype === "algorithmicMedia")
                                                ? "Pure algorithmic media" : ""}
                                </span>
                            </div>
                        );
                    }

                }
            }
        }


        // if (asset.credentials) {
        //     let hasCertificateVerification = false;

        //     for (let i = 0; i < asset.credentials.length; i++) {
        //         const credential = asset.credentials[i];
        //         if (
        //             credential.credentialSubject &&
        //             credential.credentialSubject.id &&
        //             credential.credentialSubject.id.includes(asset.resourceMetadata.declarer) &&
        //             credential.evidence &&
        //             credential.evidence.type &&
        //             credential.evidence.type[0] === "DidKey509CertificateVerification"
        //         ) {
        //             hasCertificateVerification = true;
        //             break; // Wir haben die Bedingung erfüllt, also brechen wir die Schleife ab
        //         }
        //     }

        //     if (hasCertificateVerification) {
        //         // Zertifikat-Tags rendern
        //         tagElements = tagElements.concat(renderCertificateTags(asset, index));
        //     }
        // }

        // Zertifikats-Tags rendern, wenn vorhanden
        const certificateTags = renderCertificateTags(asset, index);
        if (certificateTags.length > 0) {
            tagElements = tagElements.concat(certificateTags);
        }


        if (asset.isccMetadata.original !== undefined) {
            if (asset.isccMetadata.original === true) {
                tagElements.push(
                    <div className="tagTooltip">
                        <div key={"divOriginalCreator" + index} className={"originalCreator"}>
                            <img className="tagIcon" src="creator-icon-white.png" alt="Original Creator" />
                            <p key={"tagNameTrue" + index} className="handle">Original</p>
                        </div>
                        <span className="tagtooltiptext">Declared by original creator or rightsholder</span>
                    </div>
                );
            }
        }

        /* if (asset.isccMetadata.liccium_plugins !== undefined) {
            if (asset.isccMetadata.liccium_plugins.tdmai !== undefined) {
                if (asset.isccMetadata.liccium_plugins.tdmai.TDMAI) {
                    tagElements.push(
                        <div className="tagTooltip">
                            <div key={"divTDMAITrue" + index} className={"verified"}>
                                <img className="tagIcon" src="check_circle_FILL0_wght600_GRAD0_opsz48.png" alt="TDMAITrue" />
                                <p key={"tagNameTrue" + index} className="handle">TDM·AI</p>
                            </div>
                            <span className="tagtooltiptext">Content may be used as AI training data</span>
                        </div>
                    );
                } else {
                    tagElements.push(
                        <div className="tagTooltip">
                            <div key={"divTDMAIFalse" + index} className={"unverified"}>
                                <img className="tagIcon" src="cancel_FILL0_wght600_GRAD0_opsz48.png" alt="TDMAIFalse" />
                                <p key={"tagNameFalse" + index} className="handle">TDM·AI</p>
                            </div>
                            <span className="tagtooltiptext">Content must not be used for AI training purposes</span>
                        </div>
                    );
                }
            }
        } */




        // for (let i = 0; i < assets.length; i++) {
        //     for (let j = 0; j < assets[i].credentials.length; j++) {
        //         if (assets[i].credentials[j].credentialSubject.id.includes(assets[i].resourceMetadata.declarer)
        //             && assets[i].credentials[j].evidence.type[0] == "DidKey509CertificateVerification") {
        //             console.log("TAG ERZEUGEN");
        //             tagElements.push(
        //                 <div className="tagTooltip">
        //                     <div key={"div" + index + "" + i} className={"verified"}>
        //                         <img className="tagIcon" src="certificate-icon-stripped-white-100.png" alt="verified" />
        //                         <p key={"verified" + index + "" + i} className="handle">c2pa</p>
        //                     </div>
        //                     <span className="tagtooltiptext">{assets[i].credentials[j].evidence.type[0] === "DomainVerificationTXTRecord" ? "Verified domain" : "Verified Twitter/X account"}</span>
        //                 </div>
        //             );
        //         }
        //     }
        // }


        let credentials = asset.credentials;
        if (credentials !== null) {
            for (let i = 0; i < credentials.length; i++) {
                if (credentials[i].evidence.type[0] != "DidKey509CertificateVerification") {
                    tagElements.push(
                        <div className="tagTooltip">
                            <div key={"div" + index + "" + i} className={"verified"}>
                                <img className="tagIcon" src="certificate-icon-stripped-white-100.png" alt="verified" />
                                <p key={"verified" + index + "" + i} className="handle">{credentials[i].evidence.handle}</p>
                            </div>
                            <span className="tagtooltiptext">{credentials[i].evidence.type[0] === "DomainVerificationTXTRecord" ? "Verified domain" : "Verified Twitter/X account"}</span>
                        </div>
                    );
                }
                // else if (credentials[i].evidence.type[0] == "DidKey509CertificateVerification") {
                //     tagElements.push(
                //         <div className="tagTooltip">
                //             <div key={"div" + index + "" + i} className={"verified"}>
                //                 <img className="tagIcon" src="certificate-icon-stripped-white-100.png" alt="verified" />
                //                 <p key={"verified" + index + "" + i} className="handle">c2pa</p>
                //             </div>
                //             <span className="tagtooltiptext">{credentials[i].evidence.type[0] === "DomainVerificationTXTRecord" ? "Verified domain" : "Verified Twitter/X account"}</span>
                //         </div>
                //     );
                // }
            }
        } else {
            tagElements.push(
                <div className="tagTooltip">
                    <p key={"verified" + index} className={"infoTag"}>Unverified</p>
                    <span className="tagtooltiptext">No certification provided</span>
                </div>
            );
        }

        return tagElements;
    }



    const getDate = (timestamp) => {

        console.log(timestamp);

        timestamp = "" + timestamp;

        timestamp = (("" + timestamp).length === 10) ? (parseInt(timestamp, 10) * 1000) : parseInt(timestamp, 10);
        let date = new Date(parseInt(timestamp, 10)).toISOString();
        let utcString = date.split("T");
        let time = utcString[1].split(":");

        return utcString[0] + " " + time[0] + ":" + time[1] + " (UTC)";
    }

    const getAddress = (address) => {
        return address.substring(0, 6) + " ... " + address.substring(36, 42);
    }

    useEffect(() => {
        console.log("useEffekt AssetList");
    }, []);

    return (
        <div className="AssetList">
            <div className="banner">
                <a href="https://liccium.com/app/" target="_blank">
                    <img className="licciumLogo" src="liccium-logo.png" alt="Liccium Logo" />
                </a>
                <div className="divClearBtn">
                    <button className="clearBtn" onClick={clearStorage}>Clear</button>
                </div>

                {/* DELETE BUTTON ABOVE BEFORE SETTING PAGE */}
                {/* <div className="paging">
                    <button>
                        
                            scrollbar:  #ebebf2

                            page:  #b2b3c5
                            arrows: #dddddd

                            light grey: #7c7d91 
                            dark grey:  #46475d

                            light red:  #efcbd6
                            dark red:   #cd1848

                            text---->
                            green: #67923a
                            light grey: #eeeeee
                            dark grey: #5c5c5c
                        
                        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-left" width="30px" height="30px" fill="#efcbd6" aria-hidden="true">
                            <path d="M689 165.1L308.2 493.5c-10.9 9.4-10.9 27.5 0 37L689 858.9c14.2 12.2 35 1.2 35-18.5V183.6c0-19.7-20.8-30.7-35-18.5z"></path>
                        </svg>
                    </button>
                    <p className="page">397</p>
                    <button>
                        <svg viewBox="0 0 1024 1024" focusable="false" data-icon="caret-right" width="30px" height="30px" fill="#efcbd6" aria-hidden="true">
                            <path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path>
                        </svg>
                    </button>
                </div> */}
            </div>
            <div className="list">
                {renderElements()}
            </div>
        </div>
    );
};

export default AssetList;