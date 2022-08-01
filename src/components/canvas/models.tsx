import { CardType } from "../sided/sidedRenderer";

export type HexParams = {
    affs: HexAff[];
}

export type SidedAff = {
    affId: number;
    name: string;
    type: CardType
}



//used by Hexagon.tsx
export type HexProps = {
    affs: HexAff[];
    affHover(aff: number): any;
    affDeHover(aff: number): any;
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