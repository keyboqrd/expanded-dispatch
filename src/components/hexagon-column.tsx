import React from "react";
import { Hexagon } from "./hexagon";
import { ColumnParams, ColumnStates, HexParams } from "./models";

export class HexagonColumn extends React.Component<ColumnParams, ColumnStates>{
    render(): React.ReactNode {
        return (
            <div className={`column`}>
                <>
                    {this.props.hexeParams.map((x, index) =>
                        <Hexagon hex={x.hex} key={index} />
                    )}
                </>
            </div>
        )
    }
}