import React, { FC, useContext, useState } from 'react';
import { WoContext } from '../..';
import { CanvasRenderer } from './canvas-renderer';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexProps } from './models';

export const Hexagon: FC<HexProps> = (props) => {

    const { wo, setWo } = useContext(WoContext);


    const mouseEnter = () => {
        if (props.affs.length > 0 && props.affs[0].hexType === HexType.affCenter) {
            props.setAff(props.affs[0].affId);
        }
    }

    const mouseLeave = () => {
        if (props.affs.length > 0 && props.affs[0].hexType === HexType.affCenter) {
            props.unsetAff(props.affs[0].affId);
        }
    }

    const mouseClick = () => {
        if (props.affs.length === 0 || props.affs[0].hexType === HexType.plain) {
            //setWo();
        }
    }

    const createWo = () => {

    }

    const outerClasses = CanvasRenderer.getOuterClasses(props.affs);
    const wrapperClasses = CanvasRenderer.getWrapperClasses(props.affs);
    return (
        <a className={outerClasses}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={mouseClick}
        >
            <div className="wrapper">
                <div className={wrapperClasses}></div>
            </div>
            <HexagonInner
                affs={props.affs}
                col={props.col}
                row={props.row}
            />
        </a>);
}