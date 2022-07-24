import React from 'react';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexParams, HexAff } from './models';

export class Hexagon extends React.Component<HexParams>{
    render = (): React.ReactNode => {
        const outerClasses = this.getOuterClasses();
        const classes = this.getWrapperClasses();
        return (
            <a className={outerClasses}
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                <div className="wrapper">
                    <div className={classes}></div>
                </div>
                <HexagonInner affs={this.props.affs} />
            </a>);

    }

    private getOuterClasses = (): string => {
        let result = 'hex ';
        this.props.affs.forEach(aff => {
            if (aff.hexType === HexType.affIllumed) {
                result += `hex-aff-${aff.affId}-illumed `;
            }
        })
        return result;
    }

    private getWrapperClasses = (): string => {
        let result = 'hexagon ';
        this.props.affs.forEach(aff => {
            switch (aff.hexType) {
                case HexType.plain:
                    result += 'hex-color-plain ';
                    break;
                case HexType.affCenter:
                    result += `hex-aff-center-${this.props.affs[0].affId} `;
                    break;
                case HexType.affIllumed:
                    result += `hex-aff-${aff.affId}-illumed `;
                    break;
                case HexType.affOthered:
                    result += `hex-aff-${aff.affId}-othered `;
                    break;
                default:
                    break;
            }
        });
        return result;
    }

    private mouseEnter = () => {
        if (this.props.affs.length > 0
            && this.props.affs.some(a => a.hexType === HexType.affCenter)) {
            this.props.affHover(this.props.affs[0].affId);
        }
    }

    private mouseLeave = () => {

    }
}