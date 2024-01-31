import React from 'react';
import { LoadCycleSvg } from './LoadCycleSvg';
import './ProcessingOverlay.css';

export const ProcessingOverlay = () => {

    return (
        <div className="ProcessingOverlay">
            <div className="processingOverlayloading">
                <div className="processingOverlaylicciumIcon">
                    {/* <LoadCycleSvg /> */}
                    <section>
                        <div className="circle0 circle"></div>
                        <div className="circle1 circle"></div>
                        <div className="circle2 circle"></div>
                        <div className="circle3 circle"></div>
                        <div className="circle4 circle"></div>
                        <div className="circle5 circle"></div>
                        <div className="circle6 circle"></div>
                        <div className="circle7 circle"></div>
                        <div className="circle8 circle"></div>
                        <div className="circle9 circle"></div>
                    </section>
                </div>
                <p className="processingOverlayloadingText">Generating ISCC,<br />searching for declarations.</p>
            </div>
        </div>
    );
};