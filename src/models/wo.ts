import { Affiliate, affiliates } from "./affiliate";
import { P, Trade } from "./types";

export type Wo = {
    p: P | undefined;
    trade: Trade | undefined;
};

export type WoAff = {
    id: number,
    wo12Mo: number;
    hasZipCodeOn: boolean;
    tieredthisTradeAnotherMarket: boolean;
    tieredAnotherTradeAnotherMarket: boolean;
    isServiceEssential: boolean;
}

export abstract class WoCalculator {
    public static GetAffs = (wo: Wo): WoAff[] => {
        let calculated: WoAff[] = [];
        if (wo !== undefined && wo.p !== undefined && wo.trade !== undefined && wo.trade !== Trade.NotYet) {
            affiliates.list.forEach(aff => {
                const pKey = `${wo.p?.col},${wo.p?.row}`
                let woAff: WoAff = {
                    id: aff.Id,
                    wo12Mo: aff.Wo12Mo[pKey] ?? 0,
                    hasZipCodeOn: aff.ServicingAreas.includes(wo.p!),
                    tieredthisTradeAnotherMarket: this.tieredthisTradeAnotherMarket(aff, wo),
                    tieredAnotherTradeAnotherMarket: false,
                    isServiceEssential: false
                };
                calculated.push(woAff);
            });
        }

        let result: WoAff[] = [];
        result.push(...(calculated.filter(x => x.tieredthisTradeAnotherMarket)));
        result.push(...(calculated.filter(x => !x.tieredthisTradeAnotherMarket)));

        return result;
    }

    private static tieredthisTradeAnotherMarket = (aff: Affiliate, wo: Wo): boolean => {
        return aff.TieringAreas.map(x => x.p).some(x => x.col === wo.p?.col && x.row === wo.p.row)
    }
}