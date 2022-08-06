import { ActiveAff } from "../..";
import { Trade } from "../../models/types";
import { Wo } from "../../models/wo";
import { HexAff, HexType } from "./models";

export abstract class CanvasRenderer {
    public static getHexClasses = (col: number, row: number, aff: HexAff | undefined, wo: Wo, activeAff: ActiveAff): string => {
        let result = 'hex ';
        if (aff !== undefined) {
            if (aff.hexType === HexType.affCenter && aff.affId === activeAff.id && activeAff.clicked) {
                result += `hovered `;
            } else if (aff.hexType === HexType.affIllumed) {
                result += `hex-aff-illumed-${aff.affId} `;
            } else if (aff.hexType === HexType.affOthered) {
                result += `hex-aff-othered-${aff.affId} `;
            }
        }

        if (wo.p !== undefined && wo.p.col === col && wo.p.row === row) {
            result += `hovered `
        }
        return result;
    }

    public static getWrapperClasses = (aff: HexAff | undefined): string => {
        let result = 'hexagon ';
        if (aff !== undefined) {
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