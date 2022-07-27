import React from 'react';
import { CanvasRenderer } from './canvas-renderer';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexProps } from './models';

export class Hexagon extends React.Component<HexProps>{
    render = (): React.ReactNode => {
        const outerClasses = CanvasRenderer.getOuterClasses(this.props.affs);
        const wrapperClasses = CanvasRenderer.getWrapperClasses(this.props.affs);

        return (
            <a className={outerClasses}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                <div className="wrapper">
                    <div className={wrapperClasses}></div>
                </div>
                <HexagonInner affs={this.props.affs} />
            </a>);

    }

    private mouseEnter = () => {
        if (this.props.affs.length > 0 && this.props.affs[0].hexType === HexType.affCenter) {
            this.props.affHover(this.props.affs[0].affId);
        }
    }

    private mouseLeave = () => {
        if (this.props.affs.length > 0 && this.props.affs[0].hexType === HexType.affCenter) {
            this.props.affDeHover(this.props.affs[0].affId);
        }
    }
}