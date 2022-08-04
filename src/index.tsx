import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import "./styles/canvas.scss";
import "./styles/sided.scss";
import { Canvas } from './components/canvas/canvas';
import { Sided } from "./components/sided/sided";
import { createContext, useContext } from "react"
import { Wo } from "./models/wo";
import { P, Trade } from "./models/types";

export type AffContent = {
    activeAff: number
    setActiveAff: (i: number) => void
}
export const AffContext = createContext<AffContent>({
    activeAff: -1,
    setActiveAff: () => { },
})

export type WoContent = {
    wo: Wo,
    setWo: (p: P | undefined, trade: Trade | undefined) => void
}

export const WoContext = createContext<WoContent>({
    wo: { p: undefined, trade: undefined },
    setWo: () => { }
})

// for demonstration purposes only

type AppProp = {
    affContext: AffContent;
    woContext: WoContent;
}

class App extends React.Component<any, AppProp> {
    constructor(props: any) {
        super(props);
        this.state = {
            affContext: {
                activeAff: -1,
                setActiveAff: this.setActiveAff
            },
            woContext: {
                wo: { p: undefined, trade: undefined },
                setWo: this.setWo
            }
        };
    }

    private setActiveAff = (i: number) => {
        const affContext = { ...this.state.affContext };
        affContext.activeAff = i;
        this.setState({ affContext });
    }

    private setWo = (p: P | undefined, trade: Trade | undefined) => {
        const woContext = { ...this.state.woContext };
        woContext.wo = { p: p, trade: trade };
        this.setState({ woContext });
    }

    render() {
        return (
            <React.StrictMode>
                <AffContext.Provider value={this.state.affContext}>
                    <WoContext.Provider value={this.state.woContext}>
                        <Canvas />
                        <Sided />
                    </WoContext.Provider>
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

