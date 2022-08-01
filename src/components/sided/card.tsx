import React, { FC, useState } from "react";
import { SidedAff } from "../canvas/models";
import { CardType } from "./sidedRenderer";

export type CardProps = {
    aff: SidedAff;
    updateAff(aff: number): any;
}

export const Card: FC<CardProps> = (props) => {
    const getCardClassName = (type: CardType) => {
        return type === CardType.plain ? "card" : "card-highlighted-" + props.aff.affId;
    }

    const hover = () => {
        props.updateAff(props.aff.affId);
    }

    const deHover = () => {
        props.updateAff(-1);
    }

    return (
        <div className="card-wrap"
            //ref="card"
            onMouseEnter={hover}
            onMouseLeave={deHover}>
            <div className={getCardClassName(props.aff.type)} >
                <div className="card-bg"></div>
                <div className="card-info">
                    <h1>{props.aff.name}</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
    )




}