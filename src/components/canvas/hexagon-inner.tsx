import React, { FC, useContext } from "react";
import { WoContext } from "../..";
import { affiliates } from "../../models/affiliate";
import { Trade } from "../../models/types";
import { HexAff, HexParams, HexAffType } from "./models";

export const HexagonInner: FC<HexParams> = (props) => {
    const { wo, setWo } = useContext(WoContext);
    const getContent = (aff: HexAff | undefined) => {
        if (aff !== undefined && (aff.hexAffType === HexAffType.affCenter)) {
            return getAffCenterContent(aff);
        }
        if (aff !== undefined && aff.hexAffType === HexAffType.plain) {

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
                <strong>选择新WO的Location</strong>
            </>);
    }

    let trades: string[] = [];
    for (let trade in Trade) {
        trades.push(trade);
    }

    const getWoClickedContent = () => {
        return (
            <>
                <strong>选择Trade以创建WO</strong>
                <>
                    {Object.keys(Trade).filter(key => Number(key) > 0).map(x => Number(x)).map(t =>
                        <small className="trade-selector"
                            key={t}
                            onClick={() => selectTrade(t)}>
                            {Trade[t]}
                        </small>
                    )}
                </>
            </>);
    }

    const getAffCenterContent = (aff: HexAff) => {
        const x = affiliates.list[aff.affId];
        return (
            <>
                <strong>{x.Name}</strong>
                <small className="small-left">Tier / ZipCode 的 Trades:&nbsp;
                    <b>{x.Trades.map(t => Trade[t]).join(', ')}</b>
                </small>
                <br />
                <small className={`small-left aff-center-icon-${aff.affId}`}>
                    <div className={`small-hex-${aff.affId}`}></div><span> : 该 Trade 下有 Tier 值的区域范围</span>
                </small>
                <small className={`small-left aff-center-icon-${aff.affId}`}>
                    <div className={`small-outer-hex-${aff.affId}`}></div>
                    <div className={`small-inner-hex-${aff.affId}`}></div>
                    /&nbsp;
                    <div className={`small-hex-${aff.affId}`}></div>
                    <span> : 该 Trade 下 Zip Code 开启的区域范围</span>
                </small>
                <small className={`small-left aff-center-icon-${aff.affId}`}>
                    <span><i className="wo-count">n</i> : 该 Trade 下 Location 近12个月 WO 数量</span>
                </small>

            </>);
    }

    const getTradeSelectedContent = () => {
        return (
            <>
                <strong>WO已创建</strong>
                <small>
                    Trade: {wo.trade === undefined ? '' : Trade[wo.trade]}
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