import React, { FC, useState } from 'react';
import { CanvasRenderer } from './canvas-renderer';
import { HexagonInner } from './hexagon-inner';
import { HexType, HexProps, CanvasState } from './models';

export const Hexagon: FC<HexProps> = (props) => {
    const [clicked, setClicked] = useState(false);



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
            setClicked(!clicked);
        }
    }

    const createWo = () => {

    }

    const outerClasses = CanvasRenderer.getOuterClasses(props.affs, clicked);
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
                //onWoCreated={createWo}
                affs={props.affs} />
        </a>);
}