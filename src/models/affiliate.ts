import { count } from "console";
import { Trade, P, Dir1, Dir2 } from "./types";
import { Utils } from "./utils";



export class Affiliate {
    constructor(
        id: number,
        name: string,
        center: P,
        trades: Trade[],
        tieringRadius: number = 2,
        servicingRadius: number = 4,
        wo12MoCRs: { c: P, r: number }[],
    ) {
        this.Id = id;
        this.Name = name;
        this.Center = center;
        this.Trades = trades;
        this.TieringRadius = tieringRadius;
        this.TieringAreas = this.calculateAreas(this.Center, this.TieringRadius);
        this.ServicingRadius = servicingRadius;
        this.ServicingAreas = this.calculateAreas(this.Center, this.ServicingRadius).map(x => x.p);

        this.Wo12MoCRs = wo12MoCRs;
        this.Wo12Mo = this.calculateWo12Mo();
    }
    Id: number;
    Name: string;
    Center: P;
    Trades: Trade[];
    TieringRadius: number;
    TieringAreas: { p: P, step: number }[];
    ServicingRadius: number;
    ServicingAreas: P[];
    Wo12MoCRs: { c: P, r: number }[];
    Wo12Mo: Map<string, number>;

    private calculateAreas = (c: P, r: number): { p: P, step: number }[] => {
        let result: { p: P, step: number }[] = [];
        let cursor = 0;
        result.push({ p: c, step: 0 });
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

    private calculateWo12Mo = (): Map<string, number> => {
        let result: Map<string, number> = new Map<string, number>();
        this.Wo12MoCRs.forEach(cr => {
            let areas = this.calculateAreas(cr.c, cr.r)
                .map(x => {
                    return {
                        p: `${x.p.col},${x.p.row}`,
                        count: Math.floor(Math.random() * 4) * 3
                    }
                });
            areas.forEach(a => {
                result.set(a.p, a.count);
            })
        });
        return result;

    }
}

export class Affiliates {
    constructor() {
        this._list.push(

            new Affiliate(0,
                'Air-Borne Inc',
                { col: 3, row: 3 },
                [Trade.HVAC],
                2, 4,
                [{ c: { col: 5, row: 5 }, r: 1 }]),

            new Affiliate(1,
                'Wiping the Floor Co.,Ltd',
                { col: 9, row: 6 },
                [Trade.Flooring],
                0, 4,
                [{ c: { col: 7, row: 6 }, r: 1 }]),


            new Affiliate(2,
                'Dunder Mifflin',
                { col: 12, row: 2 },
                [Trade.HVAC, Trade.Flooring, Trade.Pool], 2, 4,
                [{ c: { col: 14, row: 3 }, r: 1 }]),

            new Affiliate(3, 'Drunken Quahog Co.,Ltd',
                { col: 6, row: 1 },
                [Trade.Pool],
                2, 4,
                [{ c: { col: 4, row: 1 }, r: 1 }]),

            new Affiliate(4, 'Pooling & Flooring but No Tier Company',
                { col: 2, row: 7 },
                [Trade.Pool, Trade.Flooring],
                0, 3,
                [])
        );
    }
    public get list(): Affiliate[] { return this._list; }
    private _list: Affiliate[] = [];
}

export const affiliates = new Affiliates();
