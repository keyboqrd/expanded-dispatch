import { HexType, HexParams } from "../components/models";
import { Trade, P, Dir1, Dir2 } from "./types";
import { Utils } from "./utils";



class Affiliate {
    constructor(
        center: P,
        trades: Trade[],
        serviced: P[],
        radius: number = 3
    ) {
        this.Center = center;
        this.Trades = trades;
        this.Radius = radius;
        this.Areas = this.calculateAreas();
        this.Serviced = serviced;
    }

    Center: P;
    Trades: Trade[];
    Radius: number;
    Areas: { p: P, step: number }[];
    Serviced: P[];
    CurStep: number = 0;

    private calculateAreas(): { p: P, step: number }[] {
        let result: { p: P, step: number }[] = [];
        const r = this.Radius;
        let cursor = 0;
        result.push({ p: this.Center, step: 0 });
        while (cursor < result.length) {
            let i = result[cursor];
            if (i.step < r) {
                let nexts = [
                    Utils.move(i.p, Dir1.U, undefined),
                    Utils.move(i.p, Dir1.U, Dir2.R),
                    Utils.move(i.p, Dir1.D, Dir2.R),
                    Utils.move(i.p, Dir1.D, undefined),
                    Utils.move(i.p, Dir1.D, Dir2.L),
                    Utils.move(i.p, Dir1.U, Dir2.L),
                ];
                nexts.forEach(next => {
                    if (next !== undefined
                        && !result.some(x => x.p.col === next.col && x.p.row === next.row))
                        result.push({ p: next, step: i.step + 1 });
                });
            }
            cursor++;
        }

        return result;
    }

}

export class Affiliates {
    constructor() {
        this._affiliates.push(
            new Affiliate({ col: 3, row: 3 }, [Trade.HVAC], [], 3),
            new Affiliate({ col: 9, row: 6 }, [Trade.Flooring], [], 4),
            new Affiliate({ col: 12, row: 2 }, [Trade.Pool], [], 3),
            new Affiliate({ col: 6, row: 1 }, [Trade.Pool], [], 2)
        );
    }
    public get affiliates(): Affiliate[] { return this._affiliates; }
    private _affiliates: Affiliate[] = [];

    public fill = (params: HexParams[][]): HexParams[][] => {
        /*this._affiliates.forEach((aff, index) => {
            aff.Areas.forEach(area => {
                let p = params[area.p.col][area.p.row];
                p.type = HexType.affIllumed;
                let current = { aff: index, step: area.step };
                if (p.affs === undefined) {
                    p.affs = [current]
                } else {
                    p.affs.push(current);
                }
            })
        });*/
        this._affiliates.forEach((aff, index) => {

            params[aff.Center.col][aff.Center.row].affs = [{ affId: index, step: 0, hexType: HexType.affCenter }];
            if (aff.CurStep !== 0) {
                aff.Areas.forEach(area => {
                    let col = area.p.col;
                    let row = area.p.row;
                    let step = area.step;
                    if (area.step === aff.CurStep) {
                        params[col][row].affs.push({ affId: index, step: step, hexType: HexType.affIllumed });
                    } else {
                        params[col][row].affs.push({ affId: index, step: step, hexType: HexType.affOthered });
                    }
                });
            }
        });
        return params;
    }

    public update = (affId: number, curStep: number) => {
        this._affiliates[affId].CurStep = curStep;
    }
}