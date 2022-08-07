import React, { FC, useContext, useState } from 'react';
import { AffContext, WoContext } from '../..';
import { affiliates } from '../../models/affiliate';
import { Trade } from '../../models/types';
import { CanvasCalculator } from './canvas-calculator';
import { CanvasRenderer } from './canvas-renderer';
import { HexagonInner } from './hexagon-inner';
import { HexAffType, HexProps } from './models';

export const Hexagon: FC<HexProps> = (props) => {
    const { wo, setWo } = useContext(WoContext);
    const { activeAff, setActiveAff } = useContext(AffContext);

    const mouseEnter = () => {
        if (props.aff !== undefined && props.aff.hexAffType === HexAffType.affCenter && !activeAff.clicked) {
            props.setAff(props.aff.affId);
        }
    }

    const mouseLeave = () => {
        if (props.aff !== undefined && props.aff.hexAffType === HexAffType.affCenter && !activeAff.clicked) {
            props.unsetAff();
        }
    }

    const canSelectLocation = () => {
        return props.aff === undefined || props.aff.hexAffType !== HexAffType.affCenter;
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


        if (props.aff !== undefined && props.aff.hexAffType === HexAffType.affCenter && !activeAff.clicked) {
            props.setAff(props.aff.affId);
            setActiveAff(props.aff.affId, true);
        }
        else if (props.aff !== undefined && props.aff.hexAffType === HexAffType.affCenter && activeAff.clicked && props.aff.affId === activeAff.id) {
            props.unsetAff();
            setActiveAff(-1, false);
        }
        else if (props.aff !== undefined && props.aff.hexAffType === HexAffType.affCenter && activeAff.clicked && props.aff.affId !== activeAff.id) {
            props.setAff(props.aff.affId);
            setActiveAff(props.aff.affId, true)
        }
    }

    const outerClasses = CanvasRenderer.getHexClasses(props.col, props.row, props.aff, wo, activeAff);
    const wrappedClasses1 = CanvasRenderer.getWrappedClasses1(props.aff);
    const wrappedClasses2 = CanvasRenderer.getWrappedClasses2(props.aff);
    const woCount = CanvasCalculator.getWoCount(affiliates, activeAff, props.col, props.row);//affiliates.list[props.aff!.affId].Wo12Mo[`${props.col},${props.row}`]
    return (
        <a className={outerClasses}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseLeave}
            onClick={mouseClick}>
            <div className="wrapper">
                <div className={wrappedClasses1}></div>
                <div className={wrappedClasses2}></div>
                {woCount === 0 ? `` : <small className='wo-count'>
                    <i>{woCount}</i>
                </small>}
            </div>
            <HexagonInner
                aff={props.aff}
                col={props.col}
                row={props.row}
            />
        </a>);
}

