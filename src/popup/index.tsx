import React from 'react';
import { createRoot } from 'react-dom/client';
import Popup from './popup';
import './index.css';

const init = (() => {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute("class", "root");
    document.body.appendChild(rootContainer);
    if (!rootContainer) {
        throw new Error("Can not find RootContainer");
    }
    const root = createRoot(rootContainer);
    root.render(<Popup />);//hallo
});

init();