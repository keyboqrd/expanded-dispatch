import React, { FC, useContext, useState } from 'react';
import { AffContext, WoContext } from '../..';
import { Trade } from '../../models/types';
import { CanvasRenderer } from './canvas-renderer';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexProps } from './models';

export const Hexagon: FC<HexProps> = (props) => {
    const { wo, setWo } = useContext(WoContext);
    const { activeAff, setActiveAff } = useContext(AffContext);

    const mouseEnter = () => {
        if (props.aff !== undefined && props.aff.hexType === HexType.affCenter && !activeAff.clicked) {
            props.setAff(props.aff.affId);
        }
    }

    const mouseLeave = () => {
        if (props.aff !== undefined && props.aff.hexType === HexType.affCenter && !activeAff.clicked) {
            props.unsetAff();
        }
    }

    const canSelectLocation = () => {
        return props.aff === undefined || props.aff.hexType === HexType.plain || props.aff.hexType === HexType.affIllumed || props.aff.hexType === HexType.affOthered;
    }
    const otherLocationSelected = () => {
        return wo.p === undefined || wo.p.col !== props.col || wo.p.row !== props.row;
    }
    const thisLocationSelectedCreated = () => {
        return wo.p !== undefined && wo.p.col === props.col && wo.p.row === props.row && wo.trade !== undefined && wo.trade !== Trade.NotYet;
    }



    const mouseClick = () => {
        if (canSelectLocation()) {
            if (otherLocationSelected()) {
                setWo({ col: props.col, row: props.row }, Trade.NotYet);
            }
            else if (thisLocationSelectedCreated()) {
                setWo(undefined, undefined);
            }
        }


        if (props.aff !== undefined && props.aff.hexType === HexType.affCenter && !activeAff.clicked) {
            props.setAff(props.aff.affId);
            setActiveAff(props.aff.affId, true);
        }
        else if (props.aff !== undefined && props.aff.hexType === HexType.affCenter && activeAff.clicked && props.aff.affId === activeAff.id) {
            props.unsetAff();
            setActiveAff(-1, false);
        }
        else if (props.aff !== undefined && props.aff.hexType === HexType.affCenter && activeAff.clicked && props.aff.affId !== activeAff.id) {
            props.setAff(props.aff.affId);
            setActiveAff(props.aff.affId, true)
        }
    }

    const createWo = () => {

    }

    const outerClasses = CanvasRenderer.getHexClasses(props.col, props.row, props.aff, wo, activeAff);
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
                //trade={props.trade}
                col={props.col}
                row={props.row}
            />
        </a>);
}

