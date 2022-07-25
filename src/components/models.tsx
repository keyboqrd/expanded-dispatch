import { Affiliates } from "../models/affiliate";

export type CanvasParams = {

}

export type CanvasStatus = {
    curStep: number;
    affiliates: Affiliates;
    runInterval: number | undefined;
    hexParams: HexParams[][];
}

export interface IStepTest {
    curStep: number;
}

export type HexParams = {
    affs: HexAff[];
    affHover(aff: number): any;
    affDeHover(aff: number): any;
}

export type HexAff = {
    affId: number;
    step: number;
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