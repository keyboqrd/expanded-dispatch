import React, { FC, useContext, useState } from "react";
import { AffContext, WoContext } from "../..";
import { affiliates } from "../../models/affiliate";
import { Reason } from "../../models/wo";


export type CardProps = {
    affId: number;
    reason: Reason | undefined;
}

export const Card: FC<CardProps> = (props) => {
    const { wo, setWo } = useContext(WoContext);
    const { activeAff, setActiveAff } = useContext(AffContext);

    const getCardClassName = () => {
        return props.affId === activeAff.id ? `card-highlighted-${props.affId}` : `card card-no-hightlight-${props.affId}`;
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
    const getReason = () => {
        switch (props.reason) {
            case Reason.Recommended:
                return <>
                    <small className="card-badge-1">Recommended: </small>
                    <small className="card-badge-4">Tiered in this market for this trade</small>
                </>;
            case Reason.LocWo12Mo:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-3">Serviced location last 12 Month</small>
                </>;
            case Reason.ElsewhereThisTradeZipOn:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at another market for this trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-on</small>
                </>;
            case Reason.ElsewhereThisTradeZipOff:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at another market for this trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-off</small>
                </>;
            case Reason.ElsewhereOtherTradeZipOn:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at this/another market for another trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-on</small>
                </>;
            case Reason.ElsewhereOtherTradeZipOff:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at this/another market for another trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-off</small>
                </>;
            case Reason.NoTierZipOn:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Not tiered anywhere</small>
                    <small className="card-badge-5">Zip code for this trade turned-on</small>
                </>;
            case Reason.NoTierZipOff:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Not tiered anywhere</small>
                    <small className="card-badge-5">Zip code for this trade turned-off</small>
                </>;

            case Reason._ElsewhereThisTradeZipOn_:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at another market for this trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-on</small>
                    <small className="card-badge-6">Hasn't worked for this trade in the last year</small>
                </>;
            case Reason._ElsewhereThisTradeZipOff_:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at another market for this trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-off</small>
                    <small className="card-badge-6">Hasn't worked for this trade in the last year</small>
                </>;
            case Reason._ElsewhereOtherTradeZipOn_:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at this/another market for another trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-on</small>
                    <small className="card-badge-6">Hasn't worked for this trade in the last year</small>
                </>;
            case Reason._ElsewhereOtherTradeZipOff_:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Tiered at this/another market for another trade</small>
                    <small className="card-badge-5">Zip code for this trade turned-off</small>
                    <small className="card-badge-6">Hasn't worked for this trade in the last year</small>
                </>;
            case Reason._NoTierZipOn_:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Not tiered anywhere</small>
                    <small className="card-badge-5">Zip code for this trade turned-on</small>
                    <small className="card-badge-6">Hasn't worked for this trade in the last year</small>
                </>;
            case Reason._NoTierZipOff_:
                return <>
                    <small className="card-badge-2">Expanded Dispatch: </small>
                    <small className="card-badge-4">Not tiered anywhere</small>
                    <small className="card-badge-5">Zip code for this trade turned-off</small>
                    <small className="card-badge-6">Hasn't worked for this trade in the last year</small>
                </>;


            default:
                return <></>;
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
                        {getReason()}
                    </p>
                </div>
            </div>
        </div>
    )




}