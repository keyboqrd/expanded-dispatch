import React from 'react';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexParams } from './models';

export class Hexagon extends React.Component<HexParams>{
    render(): React.ReactNode {
        let color = this.getClasses();
        const classes = `hexagon ${color}`
        return (
            <a className="hex"
                onMouseEnter={this.mouseEnter}
                onMouseLeave={this.mouseLeave}
            >
                <div className="wrapper">
                    <div className={classes}></div>
                </div>
                <HexagonInner hex={this.props.type} />
            </a>);

    }

    private getClasses(): string{
        switch (this.props.type) {
            case HexType.plain:
                return 'hex-color-plain';
            case HexType.aff:
                return `hex-aff-center-${this.props.affs![0].aff+1}`;
            case HexType.affed:
                return this.getAffedClasses();
            default:
                return '';
        }
    }

    private getAffedClasses(): string{
        let result = '';
        this.props.affs?.forEach(a => {
            result = result.concat(`hex-affiliate-${a.aff}-${a.step} `);
        });
        return result;
    }

    private mouseEnter() {
        if (this.props.type === HexType.aff) {
            this.props.affHover(this.props.affs![0].aff);
        }
    }

    private mouseLeave() {
        
    }
}