

export type ColumnParams = {
    hexes: Cell[];
}

export type ColumnStates = {
    count: number; // like this
};

export type HexParams = {
    cell: Cell;
    id: number;
}

export type InnerParams = {
    cell: Cell;
    id: number
}

export enum Cell {
    none = 1,
    show = 2,
    wo = 3,
    aff = 4
}