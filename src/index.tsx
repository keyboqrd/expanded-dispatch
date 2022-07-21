import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";
import { Canvas } from './components/canvas';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
    <Canvas />
    </React.StrictMode>
);
