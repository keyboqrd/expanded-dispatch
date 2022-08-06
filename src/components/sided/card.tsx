import React, { FC, useContext, useState } from "react";
import { AffContext, WoContext } from "../..";
import { affiliates } from "../../models/affiliate";


export type CardProps = {
    affId: number;
}

export const Card: FC<CardProps> = (props) => {
    const { wo, setWo } = useContext(WoContext);
    const { activeAff, setActiveAff } = useContext(AffContext);

    const getCardClassName = () => {
        return props.affId === activeAff.id ? "card-highlighted-" + props.affId : "card";
    }

    const hover = () => {
        if (!activeAff.clicked) {
            setActiveAff(props.affId, false);
        }
    }

    const deHover = () => {
        if (!activeAff.clicked) {
            setActiveAff(-1, false);
        }
    }

    const clicked = () => {
        if (activeAff.clicked && activeAff.id === props.affId) {
            setActiveAff(-1, false);
        } else {
            setActiveAff(props.affId, true);
        }
    }

    return (
        <div className="card-wrap"
            //ref="card"
            onMouseEnter={hover}
            onMouseLeave={deHover}
            onClick={clicked}>
            <div className={getCardClassName()} >
                <div className="card-bg"></div>
                <div className="card-info">
                    <h1>{affiliates.list[props.affId].Name}</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    )




}