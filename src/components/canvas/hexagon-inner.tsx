import React from "react";
import { Trade } from "../../models/types";
import { HexAff, HexParams, HexType, InnerParams } from "./models";

export class HexagonInner extends React.Component<HexParams>{
    render(): React.ReactNode {
        return (
            <span className="content">
                {this.getContent(this.props.aff, this.props.trade)}
            </span>
        );
    }
    private getContent = (aff: HexAff | undefined, trade: Trade | undefined) => {
        if (aff !== undefined && aff.hexType === HexType.affCenter) {
            return this.getAffContent(aff);
        }
        if (aff !== undefined && aff.hexType === HexType.plain) {

        }
        if (trade === undefined || trade === Trade.NotYet) {
            return (this.getWoCreateContent())
        }
    }
    private getWoCreateContent = () => {
        return (
            <>
                <strong>Click to select location</strong>
            </>);
    }

    private getWoClickedContent = () => {
        return (
            <>
                <strong>Select a trade to create WO</strong>
                <small><a>HVAC</a></small>
                <small><a>Flooring</a></small>
                <small><a>Pool</a></small>
            </>);
    }



    private getAffContent = (aff: HexAff) => {
        return (
            <>
                <strong>Affiliate</strong>
                <small>{aff.affId}</small>
            </>);
    }

}