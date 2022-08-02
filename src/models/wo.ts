import { affiliates } from "./affiliate";
import { P, Trade } from "./types";

export class Wo {
    constructor(
        p: P,
        trade: Trade
    ) {
        this.p = p;
        this.trade = trade;
    }
    public p: P;
    public trade: Trade;
}

export type WoAff = {
    hasServiced12Mo: boolean;
    hasServiced24Mo: boolean;
    hasZipCodeOn: boolean;
    tieredthisTradeAnotherMarket: boolean;
    tieredAnotherTradeAnotherMarket: boolean;
    isServiceEssential: boolean;
}

export abstract class WoCalculator {
    public static GetAffs(wo: Wo): WoAff[] {
        let result: WoAff[] = [];
        affiliates.list.forEach(aff => {
            let woAff: WoAff;
            if (aff.Wo12Mo.includes(wo.p))
                if (aff.Trades.includes(wo.trade)) {

                }
        });

        return result;
    }
}