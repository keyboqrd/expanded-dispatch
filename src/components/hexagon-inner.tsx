import React from "react";
import { HexType, InnerParams } from "./models";

export class HexagonInner extends React.Component<InnerParams>{
    render(): React.ReactNode {
        if (this.props.hex === HexType.plain) {
            return (
                <span className="content">
                    <strong>Hello!</strong>
                    <small>"ddduh"</small>
                </span>
            );
        }
        if (this.props.hex === HexType.affed) {
            return (
                <span className="content">
                    999999999999999999999
                </span>
            );
        }

    }
}