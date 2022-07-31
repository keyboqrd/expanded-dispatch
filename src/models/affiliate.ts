import { Trade, P, Dir1, Dir2 } from "./types";
import { Utils } from "./utils";



export class Affiliate {
    constructor(
        id: number,
        name: string,
        center: P,
        trades: Trade[],
        serviced: P[],
        radius: number = 3
    ) {
        this.Id = id;
        this.Name = name;
        this.Center = center;
        this.Trades = trades;
        this.Radius = radius;
        this.Areas = this.calculateAreas();
        this.Serviced = serviced;
    }
    Id: number;
    Name: string;
    Center: P;
    Trades: Trade[];
    Radius: number;
    Areas: { p: P, step: number }[];
    Serviced: P[];

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
        this._list.push(
            new Affiliate(0, 'AAA', { col: 3, row: 3 }, [Trade.HVAC], [], 3),
            new Affiliate(1, 'BBB', { col: 9, row: 6 }, [Trade.Flooring], [], 4),
            new Affiliate(2, 'CCC', { col: 12, row: 2 }, [Trade.Pool], [], 3),
            new Affiliate(3, 'DDD', { col: 6, row: 1 }, [Trade.Pool], [], 2)
        );
    }
    public get list(): Affiliate[] { return this._list; }
    private _list: Affiliate[] = [];
}

export const affiliates = new Affiliates();
