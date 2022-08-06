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


export type ActiveAff = {
    id: number,
    clicked: boolean
}

export type AffContent = {
    activeAff: ActiveAff
    setActiveAff: (i: number, clicked: boolean) => void
}

export const AffContext = createContext<AffContent>({
    activeAff: { id: -1, clicked: false },
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
                activeAff: { id: -1, clicked: false },
                setActiveAff: this.setActiveAff
            },
            woContext: {
                wo: { p: undefined, trade: undefined },
                setWo: this.setWo
            }
        };
    }

    private setActiveAff = (i: number, clicked: boolean) => {
        const affContext = { ...this.state.affContext };
        affContext.activeAff = { id: i, clicked: clicked };
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

