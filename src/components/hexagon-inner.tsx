import React from "react";
import { HexAff, HexParams, HexType, InnerParams } from "./models";

export class HexagonInner extends React.Component<HexParams>{
    render(): React.ReactNode {
        return (
            <span className="content">
                <>
                    {this.props.affs.map(aff =>
                        this.getContent(aff)
                    )}
                </>
            </span>
        );
    }
    private getContent = (aff: HexAff) => {
        if (aff.hexType === HexType.plain) {
            return (
                <>
                    <strong>Hello!</strong>
                    <small>"ddduh"</small>
                </>);
        }
        if (aff.hexType === HexType.affCenter) {
            return (
                <>
                    <strong>Affiliate</strong>
                    <small>{aff.affId}</small>
                </>);
        }
    }

}