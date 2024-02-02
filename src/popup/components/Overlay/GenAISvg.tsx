import React from "react";

export const GenAISvg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            // viewBox="0 0 300 300"
            style={
                {
                    shapeRendering: "geometricPrecision",
                    textRendering: "geometricPrecision",
                    fillRule: "evenodd",
                    clipRule: "evenodd",
                }
            }
        >
            <g transform="scale(0.07)">
                <path
                    style={{ opacity: 1 }}
                    fill="#fefffe"
                    d="M 84.5,32.5 C 107.146,54.8122 129.812,77.1455 152.5,99.5C 170.653,81.8473 188.653,64.014 206.5,46C 214.167,41.3333 221.833,41.3333 229.5,46C 237.698,53.8634 245.531,62.03 253,70.5C 258.13,79.8547 257.13,88.5214 250,96.5C 233.319,113.014 216.819,129.681 200.5,146.5C 221.956,169.457 243.956,191.957 266.5,214C 248.319,232.347 229.986,250.514 211.5,268.5C 189.167,246.5 166.833,224.5 144.5,202.5C 126.347,220.153 108.347,237.986 90.5,256C 74.5035,256.5 58.5035,256.667 42.5,256.5C 42.3334,240.497 42.5001,224.497 43,208.5C 61.014,190.653 78.8473,172.653 96.5,154.5C 74.5,132.167 52.5,109.833 30.5,87.5C 48.5212,69.1459 66.5212,50.8125 84.5,32.5 Z M 84.5,60.5 C 90.8123,66.1457 96.8123,72.1457 102.5,78.5C 97.9814,83.1843 93.6481,88.0176 89.5,93C 94.0148,97.6819 98.6815,102.182 103.5,106.5C 108.167,102.167 112.833,97.8333 117.5,93.5C 124.5,99.8333 131.167,106.5 137.5,113.5C 128.848,122.652 120.014,131.652 111,140.5C 93.3194,122.986 75.8194,105.319 58.5,87.5C 67.1881,78.4794 75.8547,69.4794 84.5,60.5 Z M 183.5,96.5 C 190.076,101.57 196.243,107.237 202,113.5C 202.667,114.167 202.667,114.833 202,115.5C 161.833,155.667 121.667,195.833 81.5,236C 75.1754,236.5 68.8421,236.666 62.5,236.5C 62.3338,230.158 62.5005,223.825 63,217.5C 103.368,177.299 143.535,136.965 183.5,96.5 Z M 184.5,161.5 C 192.091,167.421 199.091,174.088 205.5,181.5C 201.167,186.167 196.833,190.833 192.5,195.5C 196.818,200.319 201.318,204.985 206,209.5C 210.667,204.833 215.333,200.167 220,195.5C 226.167,201.667 232.333,207.833 238.5,214C 229.652,223.014 220.652,231.848 211.5,240.5C 193.681,223.181 176.014,205.681 158.5,188C 167.369,179.298 176.036,170.465 184.5,161.5 Z"
                />
            </g>
        </svg>
    );
}