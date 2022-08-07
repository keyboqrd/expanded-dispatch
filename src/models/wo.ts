import { Affiliate, affiliates } from "./affiliate";
import { P, Trade } from "./types";

export type Wo = {
    p: P | undefined;
    trade: Trade | undefined;
};

export type WoAff = {
    id: number,

    hasWo12Mo: boolean;
    locWo12Mo: number;
    hasZipCodeOn: boolean;
    tieredThisMarketThisTrade: boolean;
    tieredAnotherMarketThisTrade: boolean;
    tieredAnotherMarketAnotherTrade: boolean;
    //isServiceEssential: boolean;
    reason: Reason | undefined
}
export const pKey = (wo: Wo) => {
    return `${wo.p?.col},${wo.p?.row}`;
}

export enum Reason {
    Recommended = 0,
    LocWo12Mo = 1,
    ElsewhereThisTradeZipOn = 2,
    ElsewhereThisTradeZipOff = 3,
    ElsewhereOtherTradeZipOn = 4,
    ElsewhereOtherTradeZipOff = 5,
    NoTierZipOn = 6,
    NoTierZipOff = 7,

    _ElsewhereThisTradeZipOn_ = 12,
    _ElsewhereThisTradeZipOff_ = 13,
    _ElsewhereOtherTradeZipOn_ = 14,
    _ElsewhereOtherTradeZipOff_ = 15,
    _NoTierZipOn_ = 16,
    _NoTierZipOff_ = 17,
}

export abstract class WoCalculator {
    public static GetAffs = (wo: Wo): WoAff[] => {
        let calculated: WoAff[] = [];
        if (wo !== undefined && wo.p !== undefined && wo.trade !== undefined && wo.trade !== Trade.NotYet) {
            affiliates.list.forEach(aff => {
                let woAff: WoAff = {
                    id: aff.Id,
                    hasWo12Mo: this.hasWo12Mo(aff, wo),
                    locWo12Mo: this.locWo12Mo(aff, wo),
                    hasZipCodeOn: this.hasZipCodeOn(aff, wo),
                    tieredThisMarketThisTrade: this.tieredThisMarketThisTrade(aff, wo),
                    tieredAnotherMarketThisTrade: this.tieredAnotherMarketThisTrade(aff, wo),
                    tieredAnotherMarketAnotherTrade: this.tieredAnotherOrThisMarketAnotherTrade(aff, wo),
                    reason: undefined,
                };
                calculated.push(woAff);
            });
        }
        console.log(calculated);
        let result: WoAff[] = [];
        //0
        const recommended = calculated
            .filter(x => x.tieredThisMarketThisTrade)
            .map(x => { return { ...x, reason: Reason.Recommended } });
        let remaining = calculated.filter(x => !x.tieredThisMarketThisTrade);
        result.push(...recommended);
        //1
        const locWo12Mo = remaining
            .filter(x => x.locWo12Mo)
            .map(x => { return { ...x, reason: Reason.LocWo12Mo } });
        remaining = remaining.filter(x => !x.locWo12Mo);
        result.push(...locWo12Mo);
        //2
        const elsewhereThisTradeZipOn = remaining
            .filter(x => x.hasZipCodeOn && x.tieredAnotherMarketThisTrade)
            .map(x => { return { ...x, reason: Reason.ElsewhereThisTradeZipOn } });
        remaining = remaining.filter(x => !(x.hasZipCodeOn && x.tieredAnotherMarketThisTrade));
        result.push(...elsewhereThisTradeZipOn);
        //3
        const elsewhereThisTradeZipOff = remaining
            .filter(x => !x.hasZipCodeOn && x.tieredAnotherMarketThisTrade)
            .map(x => { return { ...x, reason: Reason.ElsewhereThisTradeZipOff } });
        remaining = remaining.filter(x => !(!x.hasZipCodeOn && x.tieredAnotherMarketThisTrade));
        result.push(...elsewhereThisTradeZipOff);
        //4
        const elsewhereOtherTradeZipOn = remaining
            .filter(x => x.hasZipCodeOn && x.tieredAnotherMarketAnotherTrade)
            .map(x => { return { ...x, reason: Reason.ElsewhereOtherTradeZipOn } });
        remaining = remaining.filter(x => !(x.hasZipCodeOn && x.tieredAnotherMarketAnotherTrade));
        result.push(...elsewhereOtherTradeZipOn);
        //5
        const elsewhereOtherTradeZipOff = remaining
            .filter(x => !x.hasZipCodeOn && x.tieredAnotherMarketAnotherTrade)
            .map(x => { return { ...x, reason: Reason.ElsewhereOtherTradeZipOff } });
        remaining = remaining.filter(x => !(!x.hasZipCodeOn && x.tieredAnotherMarketAnotherTrade));
        result.push(...elsewhereOtherTradeZipOff);
        //6
        const noTierZipOn = remaining.filter(x => x.hasZipCodeOn && !x.tieredAnotherMarketAnotherTrade)
            .map(x => { return { ...x, reason: Reason.NoTierZipOn } });
        remaining = remaining.filter(x => !(x.hasZipCodeOn && !x.tieredAnotherMarketAnotherTrade));
        result.push(...noTierZipOn);
        //7
        const noTierZipOff = remaining.filter(x => !x.hasZipCodeOn && !x.tieredAnotherMarketAnotherTrade)
            .map(x => { return { ...x, reason: Reason.NoTierZipOff } });
        remaining = remaining.filter(x => !(!x.hasZipCodeOn && !x.tieredAnotherMarketAnotherTrade));
        result.push(...noTierZipOff);

        result.forEach(x => {
            if (x.reason !== Reason.Recommended && !(x.hasWo12Mo)) {
                x.reason = x.reason! + 10;
            }
        });
        result = result.sort((x, y) => x.reason! - y.reason!);
        return result;
    }



    private static hasWo12Mo = (aff: Affiliate, wo: Wo) => {
        let result = false;
        if (aff.Trades.includes(wo.trade!)) {
            aff.Wo12Mo.forEach((value, key) => {
                if (value > 0) {
                    result = true;
                }
            })
        }
        return result;
    }

    private static locWo12Mo = (aff: Affiliate, wo: Wo) => {
        if (!aff.Trades.includes(wo.trade!)) {
            return 0;
        }
        return aff.Wo12Mo.get(pKey(wo)) ?? 0;
    }

    private static hasZipCodeOn = (aff: Affiliate, wo: Wo) => {
        if (!aff.Trades.includes(wo.trade!)) {
            return false;
        }
        return aff.ServicingAreas.some(x => x.col === wo.p!.col && x.row === wo.p!.row);
    }

    private static tieredThisMarketThisTrade = (aff: Affiliate, wo: Wo): boolean => {
        if (!aff.Trades.includes(wo.trade!)) {
            return false;
        }
        return aff.TieringAreas
            .filter(x => x.step !== 0)
            .map(x => x.p)
            .some(x => x.col === wo.p!.col && x.row === wo.p!.row)
    }

    private static tieredAnotherMarketThisTrade = (aff: Affiliate, wo: Wo): boolean => {
        if (!aff.Trades.includes(wo.trade!)) {
            return false;
        }
        return aff.TieringAreas
            .filter(x => x.step !== 0)
            .map(x => x.p)
            .some(x => x.col !== wo.p?.col || x.row !== wo.p.row)
    }

    private static tieredAnotherOrThisMarketAnotherTrade = (aff: Affiliate, wo: Wo): boolean => {
        return aff.TieringAreas
            .filter(x => x.step !== 0)
            .some(x => x.p !== undefined);
    }
}