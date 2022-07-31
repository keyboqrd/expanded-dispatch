import { Affiliate, Affiliates } from "../../models/affiliate";
import { COLS, ROWS } from "../../models/consts";
import { HexAff, HexParams, HexType } from "./models";

export abstract class CanvasRenderer {
    public static affCurSteps: { [affId: number]: number } = {};
    public static updateAff = (aff: Affiliate) => {
        let curStep = this.affCurSteps[aff.Id];
        if (curStep < aff.Radius) {
            curStep++
        } else {
            curStep = 1;
        }
        this.affCurSteps[aff.Id] = curStep;
    }

    public static resetAff = () => {
        this.affCurSteps = {}
    }

    private static _init = (): HexParams[][] => {
        let params: HexParams[][] = [];
        for (var i = 0; i < COLS; i++) {
            params.push([]);
            for (var j = 0; j < ROWS; j++) {
                let hexParams: HexParams = {
                    affs: [],
                };
                params[i].push(hexParams);
            }
        }
        return params;
    }

    public static init = (affs: Affiliates): HexParams[][] => {
        let params = this._init();
        affs.list.forEach(aff => {
            params[aff.Center.col][aff.Center.row].affs = [{ affId: aff.Id, hexType: HexType.affCenter }];
        });
        return params;

    }

    public static affsFill = (params: HexParams[][], aff: Affiliate): HexParams[][] => {
        if (this.affCurSteps[aff.Id] !== 0) {
            aff.Areas.forEach(area => {
                let col = area.p.col;
                let row = area.p.row;
                if (area.step === this.affCurSteps[aff.Id]) {
                    params[col][row].affs.push({ affId: aff.Id, hexType: HexType.affIllumed });
                } else {
                    params[col][row].affs.push({ affId: aff.Id, hexType: HexType.affOthered });
                }
            });
        }
        return params;
    }

    public static getOuterClasses = (affs: HexAff[]): string => {
        let result = 'hex ';
        if (affs.length > 0) {
            const aff = affs[0];
            if (aff.hexType === HexType.affCenter) {

            } else if (aff.hexType === HexType.affIllumed) {
                result += `hex-aff-illumed-${aff.affId} `;
            } else if (aff.hexType === HexType.affOthered) {
                result += `hex-aff-othered-${aff.affId} `;
            }
        }

        return result;
    }

    public static getWrapperClasses = (affs: HexAff[]): string => {
        let result = 'hexagon ';
        if (affs.length > 0) {
            const aff = affs[0];
            switch (aff.hexType) {
                case HexType.plain:
                    result += 'hex-color-plain ';
                    break;
                case HexType.affCenter:
                    result += `hex-aff-center-${aff.affId} `;
                    break;
                case HexType.affIllumed:
                    result += `hex-aff-illumed-${aff.affId} `;
                    break;
                case HexType.affOthered:
                    result += `hex-aff-othered-${aff.affId} `;
                    break;
                default:
                    break;
            }
        }
        return result;
    }
}