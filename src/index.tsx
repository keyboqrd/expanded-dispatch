import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/canvas.scss";
import "./styles/sided.scss";
import { Canvas } from './components/canvas/canvas';
import { Sided } from "./components/sided/sided";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <>
        <React.StrictMode>
            <Canvas />
            <Sided />
        </React.StrictMode>
    </>
);
