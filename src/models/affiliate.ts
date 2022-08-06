import { count } from "console";
import { Trade, P, Dir1, Dir2 } from "./types";
import { Utils } from "./utils";



export class Affiliate {
    constructor(
        id: number,
        name: string,
        center: P,
        trades: Trade[],
        tieringRadius: number = 3,
        servicingRadius: number = 5,
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
    Wo12Mo: Record<string, number>;

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

    private calculateWo12Mo = (): Record<string, number> => {
        let result: Record<string, number> = {};
        this.Wo12MoCRs.forEach(cr => {
            let areas = this.calculateAreas(cr.c, cr.r)
                .map(x => {
                    return {
                        p: `${x.p.col},${x.p.row}`,
                        count: Math.floor(Math.random() * 10)
                    }
                });
            areas.forEach(a => {
                result[a.p] = a.count;
            })
        });
        return result;

    }
}

export class Affiliates {
    constructor() {
        this._list.push(
            new Affiliate(0, 'ABA', { col: 3, row: 3 }, [Trade.HVAC], 3, 5, []),
            new Affiliate(1, 'BBA', { col: 9, row: 6 }, [Trade.Flooring], 3, 5, []),
            new Affiliate(2, 'CCC', { col: 12, row: 2 }, [Trade.Pool], 3, 5, []),
            new Affiliate(3, 'DED', { col: 6, row: 1 }, [Trade.Pool], 3, 5, [])
        );
    }
    public get list(): Affiliate[] { return this._list; }
    private _list: Affiliate[] = [];
}

export const affiliates = new Affiliates();
