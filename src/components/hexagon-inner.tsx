import React from "react";
import { Hex, InnerParams } from "./models";

export class HexagonInner extends React.Component<InnerParams>{
    render(): React.ReactNode {
        if (this.props.hex === Hex.plain) {
            return (
                <span className="content">
                    <strong>Hello!</strong>
                    <small>"ddduh"</small>
                </span>
            );
        }
        if (this.props.hex === Hex.affed) {
            return (
                <span className="content">
                    999999999999999999999
                </span>
            );
        }

    }
}