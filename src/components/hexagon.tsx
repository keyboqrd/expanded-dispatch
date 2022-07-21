import React from 'react';
import { Cell, ColumnParams, ColumnStates, HexParams, InnerParams } from './models';

export class HexagonColumn extends React.Component<ColumnParams, ColumnStates>{
    render(): React.ReactNode {
        return (
            <div className={`column`}>
                {Hexagon({ cell: this.props.hexes[0], id: 0 })}
                {Hexagon({ cell: this.props.hexes[1], id: 1 })}
                {Hexagon({ cell: this.props.hexes[2], id: 2 })}
                {Hexagon({ cell: this.props.hexes[3], id: 3 })}
                {Hexagon({ cell: this.props.hexes[4], id: 4 })}
                {Hexagon({ cell: this.props.hexes[5], id: 5 })}
            </div>
        )
    }
}


export const Hexagon: React.FC<HexParams> = ({ cell, id }) => (
    <a className={cell === Cell.none ? "nohex" : "hex"}>
        <HexagonInner cell={cell} id={id} />
    </a>
);

export class HexagonInner extends React.Component<InnerParams, ColumnStates>{
    render(): React.ReactNode {
        if (this.props.cell === Cell.none) {
            return (<></>);
        }
        if (this.props.cell === Cell.show) {
            return (
                <>
                    <div className="wrapper">
                        <div className="hexagon color-1"></div>
                    </div>
                    <span className="content">
                        <strong>Hello!</strong>
                        <small>{this.props.id}</small>
                    </span>
                </>
            );
        }
        if (this.props.cell === Cell.wo) {
            return (
                <>
                    <div className="wrapper">
                        <div className="hexagon color-1"></div>
                    </div>
                    <span className="content">
                        999999999999999999999
                    </span>
                </>
            );
        }

    }
}