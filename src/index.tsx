import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/canvas.scss";
import "./styles/sided.scss";
import { Canvas } from './components/canvas/canvas';
import { Sided } from "./components/sided/sided";
import { createContext, useContext } from "react"

export type AffContectContent = {
    activeAff: number
    setActiveAff: (i: number) => void
}
export const AffContext = createContext<AffContectContent>({
    activeAff: -1,
    setActiveAff: () => { },
})

// for demonstration purposes only

class App extends React.Component<any, AffContectContent> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeAff: -1,
            setActiveAff: this.setActiveAff
        };
    }

    private setActiveAff = (i: number) => {
        this.setState({ activeAff: i });
    }

    render() {
        return (
            <React.StrictMode>
                <AffContext.Provider value={this.state}>
                    <Canvas />
                    <Sided />
                </AffContext.Provider>
            </React.StrictMode>
        );
    }
}


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

