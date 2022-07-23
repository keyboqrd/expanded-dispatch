import { Hex, HexParams } from "../components/models";
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
    Areas: P[];
    Serviced: P[];

    private calculateAreas(): P[] {
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
                    if (next != undefined
                        && !result.some(x => x.p.col === next.col && x.p.row === next.row))
                        result.push({ p: next, step: i.step + 1 });
                });
            }
            cursor++;
        }

        return result.map(i => i.p);
    }

}

export class Affiliates {
    constructor() {
        this.affiliates.push(
            new Affiliate({ col: 3, row: 3 }, [Trade.HVAC], []),
            new Affiliate({ col: 11, row: 6 }, [Trade.Flooring], []),
        );
    }

    private affiliates: Affiliate[] = [];
    public Fill(params: HexParams[][]) {
        this.affiliates.forEach(aff => {
            aff.Areas.forEach(p => {
                params[p.col][p.row].hex = Hex.affed;
            })
        });
        return params;
    }
}