import { Affiliate, Affiliates } from "../../models/affiliate";
import { COLS, ROWS } from "../../models/consts";
import { Trade } from "../../models/types";
import { Wo } from "../../models/wo";
import { HexAff, HexParams, HexType } from "./models";

export abstract class CanvasCalculator {
    public static affCurSteps: { [affId: number]: number } = {};


    public static Calculate = (affiliates: Affiliates,
        activeAff: number,
        wo: Wo): HexParams[][] => {
        let paramss = CanvasCalculator.init(affiliates)
        if (activeAff !== -1) {
            const aff = affiliates.list[activeAff];
            CanvasCalculator.refreshAff(aff);
            paramss = CanvasCalculator.affsFill(paramss, affiliates.list[activeAff]);
        }
        else {
            CanvasCalculator.resetAff();
        }
        if (wo.p !== undefined) {
            paramss[wo.p.col][wo.p.row].trade = wo.trade
        }

        return paramss
    }

    public static refreshAff = (aff: Affiliate) => {
        let curStep = this.affCurSteps[aff.Id];
        if (curStep < aff.Radius) {
            curStep++
        } else {
            curStep = 1;
        }
        this.affCurSteps[aff.Id] = curStep
    }

    public static resetAff = () => {
        this.affCurSteps = {}
    }

    public static init = (affs: Affiliates): HexParams[][] => {
        let params: HexParams[][] = [];
        for (var i = 0; i < COLS; i++) {
            params.push([]);
            for (var j = 0; j < ROWS; j++) {
                let hexParams: HexParams = {
                    aff: undefined,
                    col: i,
                    row: j,
                    trade: undefined
                };
                params[i].push(hexParams);
            }
        }
        affs.list.forEach(aff => {
            params[aff.Center.col][aff.Center.row].aff = { affId: aff.Id, hexType: HexType.affCenter };
        });
        return params;
    }

    public static affsFill = (params: HexParams[][], aff: Affiliate): HexParams[][] => {
        if (this.affCurSteps[aff.Id] !== 0) {
            aff.Areas.forEach(area => {
                let col = area.p.col;
                let row = area.p.row;
                if (area.step === this.affCurSteps[aff.Id]) {
                    params[col][row].aff = { affId: aff.Id, hexType: HexType.affIllumed };
                } else {
                    params[col][row].aff = { affId: aff.Id, hexType: HexType.affOthered };
                }
            });
        }
        return params;
    }


}