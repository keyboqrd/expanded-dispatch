import { Affiliates } from "../../models/affiliate";

export type CanvasParams = {

}

export type CanvasStatus = {
    //affiliates: Affiliates;
    //runInterval: number | undefined;
    hexParamss: HexParams[][];
}

export type HexParams = {
    affs: HexAff[];
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