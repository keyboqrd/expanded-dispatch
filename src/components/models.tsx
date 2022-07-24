export type ColumnStates = {
    count: number; // like this
};

export type CanvasParams = {

}

export type HexParams = {
    type: HexType;
    affs?: { aff: number, step: number }[];
    affHover(aff: number): any;
}

export type InnerParams = {
    hex: HexType;
}

export enum HexType {
    //none = 1,
    plain = 2,
    affed = 3,
    aff = 4
}