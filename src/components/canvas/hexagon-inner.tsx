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
        if (aff?.hexType !== undefined && aff.hexType === HexType.plain) {
            return (
                <>
                    <strong>Hello!</strong>
                    <small>"ddduh"</small>
                </>);
        }
        if (aff?.hexType === HexType.affCenter) {
            return this.getAffContent(aff);
        }
    }

    private getWoContent = () => {

    }



    private getAffContent = (aff: HexAff) => {
        return (
            <>
                <strong>Affiliate</strong>
                <small>{aff.affId}</small>
            </>);
    }

}