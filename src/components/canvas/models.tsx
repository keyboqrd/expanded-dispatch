import { P, Trade } from "../../models/types";
import { CardType } from "../sided/sidedRenderer";

export type HexParams = {
    affs: HexAff[];
    col: number;
    row: number;
}

export type SidedAff = {
    affId: number;
    name: string;
    type: CardType
}



//used by Hexagon.tsx
export type HexProps = {
    affs: HexAff[];
    col: number;
    row: number
    setAff(aff: number): any;
    unsetAff(aff: number): any;
    updateWo(p: P, trade: Trade): any;
}

export type HexAff = {
    affId: number;
    hexType: HexType;
}

export type InnerParams = {
    affs: HexAff[];
}

export enum HexType {
    //none = 1,
    plain = 2,
    affCenter = 3,
    affIllumed = 4,
    affOthered = 5,
}

export enum CanvasState {
    default = 0,
    hexClicked = 1,
    woOn = 2
}