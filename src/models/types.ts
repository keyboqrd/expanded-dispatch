export enum Trade {
    NotYet = 0,
    HVAC = 1,
    Flooring = 2,
    Pool = 3
}

export enum WoStatus {

}

export type P = {
    col: number,
    row: number,
}

export type WO = {
    coordinates: P;
    trade: Trade;
}

export enum Dir1 {
    U = 1,
    D = 2,
}

export enum Dir2 {
    L = 1,
    R = 2,
}
