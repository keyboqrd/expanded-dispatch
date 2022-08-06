import React, { FC, useContext } from "react";
import { WoContext } from "../..";
import { Trade } from "../../models/types";
import { HexAff, HexParams, HexType } from "./models";

export const HexagonInner: FC<HexParams> = (props) => {
    const { wo, setWo } = useContext(WoContext);


    const getContent = (aff: HexAff | undefined) => {
        if (aff !== undefined && (aff.hexType === HexType.affCenter)) {
            return getAffContent(aff);
        }
        if (aff !== undefined && aff.hexType === HexType.plain) {

        }

        const trade = wo.p !== undefined && wo.p.col === props.col && wo.p.row === props.row ?
            wo.trade : undefined;
        switch (trade) {
            case undefined:
                return getWoCreateContent();
            case Trade.NotYet:
                return getWoClickedContent();
            default:
                return getTradeSelectedContent();


        }
    }

    const getWoCreateContent = () => {
        return (
            <>
                <strong>Click to select new WO location</strong>
            </>);
    }

    let trades: string[] = [];
    for (let trade in Trade) {
        trades.push(trade);
    }

    const getWoClickedContent = () => {
        return (
            <>
                <strong>Select a trade to create WO</strong>
                <>
                    {Object.keys(Trade).filter(key => Number(key) > 0).map(x => Number(x)).map(t =>
                        <small
                            key={t}
                            onClick={() => selectTrade(t)}>
                            {Trade[t]}
                        </small>
                    )}
                </>
            </>);
    }

    const getAffContent = (aff: HexAff) => {
        return (
            <>
                <strong>Affiliate</strong>
                <small>{aff.affId}</small>
            </>);
    }

    const getTradeSelectedContent = () => {
        return (
            <>
                <strong>WO Created</strong>
                <small>
                    {wo.trade === undefined ? '' : Trade[wo.trade]}
                </small>
            </>
        );
    }

    const selectTrade = (t: number) => {
        setWo(wo.p, t);
        //console.log(wo.trade);
    }

    return (
        <div className="content"
            onMouseEnter={() => {
                //console.log(`Content hover?: ${props.col} ${props.row}`)
            }}>
            {getContent(props.aff)}
        </div>
    );
}