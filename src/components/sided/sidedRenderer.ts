import { Affiliates } from "../../models/affiliate"
import { SidedAff } from "../canvas/models"

export enum CardType {
    plain = 0,
    highlighted = 1
}


export abstract class SidedRenderer {
    public static init = (affiliates: Affiliates): SidedAff[] => {
        return affiliates.list.map(aff => {
            return {
                affId: aff.Id,
                name: aff.Name,
                type: CardType.plain
            }
        });
    }

    public static updateAff(affiliates: Affiliates, affId: number) {
        return affiliates.list.map(aff => {
            const type = aff.Id === affId ? CardType.highlighted : CardType.plain;
            console.log(type);
            return {
                affId: aff.Id,
                name: aff.Name,
                type: type
            }
        });
    }
}