import React, { FC, useContext, useState } from 'react';
import { WoContext } from '../..';
import { Trade } from '../../models/types';
import { CanvasRenderer } from './canvas-renderer';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexProps } from './models';

export const Hexagon: FC<HexProps> = (props) => {

    const { wo, setWo } = useContext(WoContext);


    const mouseEnter = () => {
        if (props.aff !== undefined && props.aff.hexType === HexType.affCenter) {
            props.setAff(props.aff.affId);
        }
    }

    const mouseLeave = () => {
        if (props.aff !== undefined && props.aff.hexType === HexType.affCenter) {
            props.unsetAff(props.aff.affId);
        }
    }

    const mouseClick = () => {
        if (props.aff === undefined || props.aff.hexType === HexType.plain) {
            if (wo.p === undefined || wo.p.col !== props.col || wo.p.row !== props.row) {
                setWo({ col: props.col, row: props.row }, Trade.NotYet);
            }
            else if (wo.p !== undefined && wo.p.col === props.col || wo.p?.row === props.row) {
                setWo(undefined, undefined);
            }
        }
    }

    const createWo = () => {

    }

    const outerClasses = CanvasRenderer.getOuterClasses(props.aff, props.trade);
    const wrapperClasses = CanvasRenderer.getWrapperClasses(props.aff);
    return (
        <a className={outerClasses}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={mouseClick}>
            <div className="wrapper">
                <div className={wrapperClasses}></div>
            </div>
            <HexagonInner
                aff={props.aff}
                trade={props.trade}
                col={props.col}
                row={props.row}
            />
        </a>);
}

