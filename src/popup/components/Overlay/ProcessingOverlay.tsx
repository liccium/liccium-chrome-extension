import React from 'react';
import { LicciumIconSvg } from './LicciumIconSvg';
import './ProcessingOverlay.css';

export const ProcessingOverlay = () => {

    return (
        <div className="ProcessingOverlay">
            <div className="processingOverlayloading">
                <div className="processingOverlaylicciumIcon">
                    <LicciumIconSvg />
                </div>
                <p className="processingOverlayloadingText">Generating ISCC,<br />searching for declarations.</p>
            </div>
        </div>
    );
};