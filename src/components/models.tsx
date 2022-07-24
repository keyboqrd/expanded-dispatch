import { Dispatch } from "react";
import { Affiliates } from "../models/affiliate";

export type ColumnStates = {
    count: number; // like this
};

export type CanvasParams = {

}

export type CanvasStatus = {
    curStep: number;
    affiliates: Affiliates;
}

export interface IStepTest {
    curStep: number;
}

export type HexParams = {
    affs: HexAff[];
    affHover(aff: number): any;
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