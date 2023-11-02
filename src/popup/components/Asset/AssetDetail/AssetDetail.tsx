import React, { useEffect, useState } from 'react';
import './AssetDetail.css';
import RendererISCCRegistryDetail from './Renderer/RendererISCCRegistryDetail';

const AssetDetail = ({ iscc, asset, createThumbnail, onItemClickHadler }) => {

    const [data, setData] = useState([]);

    const [rendererISCCRegistryDetail, setRendererISCCRegistryDetail] = useState(new RendererISCCRegistryDetail({ data, setData }));

    const renderControlButtons = (asset) => {

        let elements = [];
        elements = rendererISCCRegistryDetail.renderControlButtons(iscc, asset);

        return elements;
    }

    const darkSvg = (event) => {
        let backBtn = document.getElementsByClassName("backBtn")[0];
        let svg = backBtn.getElementsByTagName("svg")[0];
        let g = svg.getElementsByTagName("g")[0];
        let path = g.getElementsByTagName("path")[0];
        path.setAttribute("fill", "#46475d");
    }
    const lightSvg = (event) => {
        let backBtn = document.getElementsByClassName("backBtn")[0];
        let svg = backBtn.getElementsByTagName("svg")[0];
        let g = svg.getElementsByTagName("g")[0];
        let path = g.getElementsByTagName("path")[0];
        path.setAttribute("fill", "#ffffff");
    }

    const renderRedirectBtn = (asset) => {
        let redirectBtn = [];
        if (asset.isccMetadata.redirect !== null
            && asset.isccMetadata.redirect !== undefined) {
            redirectBtn.push(
                <button key="redirectBtn" onClick={() => window.open(asset.isccMetadata.redirect)}>Redirect</button>
            );
        }
        return redirectBtn;
    }

    useEffect(() => {
        console.log("useEffekt AssetDetail");
        rendererISCCRegistryDetail.renderMetadataData(asset);
    }, []);

    return (
        <div className="AssetDetail">
            <div className="head">
                {createThumbnail("imgBoxDetails", asset.isccMetadata, 70)}
                {/* <img className="thumbnail" src={asset.isccMetadata.thumbnail} alt="image" /> */}
                <div className="detailsBanner">
                    <p className="title">{asset.isccMetadata.name}</p>
                    {renderRedirectBtn(asset)}
                </div>
                <div className="divBack">
                    <button className="backBtn" onClick={() => onItemClickHadler("")} onMouseOver={lightSvg} onMouseOut={darkSvg}>
                        <svg width="16" height="17" fill="#46475d" xmlns="http://www.w3.org/2000/svg" role="img">
                            <g clipPath="url(#arrow-back_svg__a)">
                                <path d="M7.78 3.08 6.6 1.9 0 8.5l6.6 6.6 1.18-1.18L2.36 8.5l5.42-5.42Z" fill="#46475d">
                                </path>
                            </g>
                            <defs>
                                <clipPath id="arrow-back_svg__a">
                                    <path fill="#fff" transform="translate(0 .5)" d="M0 0h16v16H0z">
                                    </path>
                                </clipPath>
                            </defs>
                        </svg>
                        Back
                    </button>
                </div>
            </div>
            <div className="controls">
                {renderControlButtons(asset)}
            </div>
            <div className="content">
                <div className="scrollBox">
                    {data}
                </div>
            </div>
        </div>
    );
};

export default AssetDetail;