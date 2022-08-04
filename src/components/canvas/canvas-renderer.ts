import { Trade } from "../../models/types";
import { HexAff, HexType } from "./models";

export abstract class CanvasRenderer {
    public static getOuterClasses = (aff: HexAff | undefined, trade: Trade | undefined): string => {
        let result = 'hex ';
        if (aff !== undefined) {
            if (aff.hexType === HexType.affCenter) {
            } else if (aff.hexType === HexType.affIllumed) {
                result += `hex-aff-illumed-${aff.affId} `;
            } else if (aff.hexType === HexType.affOthered) {
                result += `hex-aff-othered-${aff.affId} `;
            }
        }
        if (trade !== undefined) {
            result += `hovered`
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