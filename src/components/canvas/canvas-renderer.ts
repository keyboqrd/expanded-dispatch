import { ActiveAff } from "../..";
import { Trade } from "../../models/types";
import { Wo } from "../../models/wo";
import { HexAff, HexAffType } from "./models";

export abstract class CanvasRenderer {
    public static getHexClasses = (col: number, row: number, aff: HexAff | undefined, wo: Wo, activeAff: ActiveAff): string => {
        let result = 'hex ';
        if (aff !== undefined) {
            if (aff.hexAffType === HexAffType.affCenter && aff.affId === activeAff.id && activeAff.clicked) {
                result += `hovered `;
            } else if (aff.hexAffType === HexAffType.affIllumed) {
                result += `hex-aff-illumed-${aff.affId} `;
            } else if (aff.hexAffType === HexAffType.affOthered) {
                result += `hex-aff-othered-${aff.affId} `;
            } else if (aff.hexAffType === HexAffType.servicingOnly) {
                result += `hex-aff-servicing-${aff.affId} `;
            }
        }

        if (wo.p !== undefined && wo.p.col === col && wo.p.row === row) {
            result += `hovered `
        }
        return result;
    }

    public static getWrappedClasses1 = (aff: HexAff | undefined): string => {
        let result = 'hexagon ';
        if (aff !== undefined) {
            switch (aff.hexAffType) {
                case HexAffType.plain:
                    result += 'hex-color-plain ';
                    break;
                case HexAffType.affCenter:

                    result += `hex-aff-center-${aff.affId} `;
                    break;
                case HexAffType.affIllumed:
                    result += `hex-aff-illumed-${aff.affId} `;
                    break;
                case HexAffType.affOthered:
                case HexAffType.servicingOnly:
                    result += `hex-aff-othered-${aff.affId} `;
                    break;
                default:
                    break;
            }
        }
        return result;
    }

    public static getWrappedClasses2 = (aff: HexAff | undefined): string => {
        let result = 'hexagon ';
        if (aff !== undefined) {
            switch (aff.hexAffType) {
                case HexAffType.servicingOnly:
                    result += `hex-aff-servicing-${aff.affId} `;
                    break;
                default:
                    result += `hex-aff-transparent `
                    break;
            }
        }
        return result;
    }
}