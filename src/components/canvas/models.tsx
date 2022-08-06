import { P, Trade } from "../../models/types";
import { Wo } from "../../models/wo";

export type HexParams = {
    aff: HexAff | undefined;
    col: number;
    row: number;
}

//used by Hexagon.tsx
export type HexProps = {
    aff: HexAff | undefined;
    col: number;
    row: number;
    setAff(aff: number): any;
    unsetAff(): any;
    updateWo(p: P, trade: Trade): any;
}

export type HexAff = {
    affId: number;
    hexType: HexType;
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