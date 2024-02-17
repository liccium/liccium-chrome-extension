import React, { useEffect } from 'react';
import './Processing.css';

const Processing = () => {

    useEffect(() => {
        console.log("useEffekt Processing");
    }, []);

    return (
        <div className="Processing">
            <div className="loading">
                <img src="liccium-icon.png" className="licciumIcon" alt="Liccium Icon" />
                <p className="loadingText">Generating ISCC, searching for declarations.</p>
                <div className="divClearBtn">
                    <button className="clearBtn">Abbrechen</button>
                </div>
            </div>
        </div>
    );
};

export default Processing;