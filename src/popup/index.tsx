import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './popup';
import './index.css';


const storeEnvironmentVariables = () => {
  const API_URL = process.env.API_URL;
  const API_KEY = process.env.API_KEY;

  if (API_URL) {
    localStorage.setItem('API_URL', API_URL);
    console.log("loaded API_URL from env file ");
  }
    else {
        console.error("API_URL not found in env file");
    }

  if (API_KEY) {
    localStorage.setItem('API_KEY', API_KEY);
    console.log("loaded API_KEY from env file");
  }
  else {
    console.error("API_KEY not found in env file");
  }
}


const init = (() => {
    storeEnvironmentVariables(); 
    alert(process.env.API_URL)
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute("class", "root");
    document.body.appendChild(rootContainer);
    if (!rootContainer) {
        throw new Error("Can not find RootContainer");
    }
    const root = createRoot(rootContainer);
    root.render(<Popup />);
});

init();