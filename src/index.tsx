import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/canvas.scss";
import "./styles/sided.scss";
import { Canvas } from './components/canvas/canvas';
import { Sided } from "./components/sided/sided";
import { createContext, useContext } from "react"

export type GlobalContent = {
    activeAff: number
    update: (c: number) => void
}
export const GlobalContext = createContext<GlobalContent>({
    activeAff: -1,
    update: () => { },
})


function App() {
    const [activeAff, update] = useState<number>(-1);
    return (
        <React.StrictMode>
            <GlobalContext.Provider value={{ activeAff, update }}>
                <Canvas />
                <Sided />
            </GlobalContext.Provider>
        </React.StrictMode>
    );
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

