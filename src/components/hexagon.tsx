import React from 'react';
import { HexagonInner } from './hexagon-inner';
import { Hex, ColumnStates, HexParams, InnerParams } from './models';

export class Hexagon extends React.Component<HexParams>{
    render(): React.ReactNode {
        let color = this.getColor();
        const classes = `hexagon ${color}`
        return (
            <a className="hex" >
                <div className="wrapper">
                    <div className={classes}></div>
                </div>
                <HexagonInner hex={this.props.hex} />
            </a>);

    }
    getColor(): string{
        switch (this.props.hex) {
            case Hex.none:
                return 'color-none';
            case Hex.plain:
                return 'color-plain';
            case Hex.affed:
                return 'color-affed';
            default:
                return '';
        }
    }
}