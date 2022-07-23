

export type ColumnParams = {
    hexeParams: HexParams[];
}

export type ColumnStates = {
    count: number; // like this
};

export type HexParams = {
    hex: Hex;
}

export type InnerParams = {
    hex: Hex;
}

export enum Hex {
    none = 1,
    plain = 2,
    affed = 3,
    //aff = 4
}