import { affiliates } from "./affiliate";
import { P, Trade } from "./types";

export type Wo = {
    p: P | undefined;
    trade: Trade | undefined;
};

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
        if (wo !== undefined) {
            affiliates.list.forEach(aff => {
                let woAff: WoAff;
                if (wo.p !== undefined && aff.Wo12Mo.includes(wo.p))
                    if (wo.trade !== undefined && aff.Trades.includes(wo.trade)) {

                    }
            });
        }
        return result;
    }
}