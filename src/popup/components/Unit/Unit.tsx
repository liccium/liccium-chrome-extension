import React, { useEffect } from 'react';
import './Unit.css';

const Unit = ({ unit, iscc, asset }) => {

    const createComparison = (unitType, base, compare) => {

        let baseUnit = null;
        let compareUnit = null;

        if (unitType === "META") {
            baseUnit = base.units[0].hash_bits;
            compareUnit = compare.units[0].hash_bits;
        }
        if (unitType === "CONTENT") {
            baseUnit = base.units[1].hash_bits;
            compareUnit = compare.units[1].hash_bits;
        }
        if (unitType === "DATA") {
            baseUnit = base.units[2].hash_bits;
            compareUnit = compare.units[2].hash_bits;
        }
        if (unitType === "INSTANCE") {
            baseUnit = base.units[3].hash_bits;
            compareUnit = compare.units[3].hash_bits;
        }

        let comparisonDiv = [];

        let rows = 16;

        let matches = 0;
        let distance = 0;

        let rowsStart = 0;
        let rowsEnd = 0;
        let charIndex = 0;
        for (let i = 0; i < compareUnit.length / rows; i++) {

            rowsStart = rowsEnd;
            rowsEnd = rowsEnd + rows;

            let row = compareUnit.substring(rowsStart, rowsEnd);
            console.log(row);

            let divRows = [];
            let ps = [];

            for (let r = 0; r < row.length; r++) {

                console.log("charIndex: " + charIndex);
                if (baseUnit.charAt(charIndex) === compareUnit.charAt(charIndex)) {
                    ps.push(
                        <p key={"p" + charIndex} className="match">{compareUnit.charAt(charIndex)}</p>
                    );
                    matches++;
                } else {
                    ps.push(
                        <p key={"p" + charIndex} className="no-match">{compareUnit.charAt(charIndex)}</p>
                    );
                    distance++;
                }
                charIndex++;
            }

            divRows.push(
                <div key={"row" + i} className="row">
                    {ps}
                </div>
            );

            comparisonDiv.push(divRows);
        }


        let simularityPercentageText = null;
        let simularityValueText = null;
        if (unitType === "INSTANCE") {
            simularityPercentageText = ((Math.ceil(matches * 100 / 64)) === 100) ? "Exact same cryptographic hash" : "Entirely uncorrelated";
        } else {
            simularityPercentageText = (Math.ceil(matches * 100 / 64)) + "% similarity";
            simularityValueText = "(" + distance + " bits of difference of the 64 bit hash)";
        }

        comparisonDiv.push(
            <span key="tooltiptext" className="tooltiptext">
                {simularityPercentageText}
                <br></br>
                {simularityValueText}
            </span>
        );

        return comparisonDiv;
    }

    useEffect(() => {
        console.log("useEffekt Unit");
    }, []);

    return (
        <div className="Unit">
            <div className="tooltip comparison">
                {createComparison(unit, iscc.isccMetadata, asset.isccMetadata)}
            </div>
        </div>
    );
};

export default Unit;