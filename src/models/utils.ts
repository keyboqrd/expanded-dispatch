import { COLS, ROWS } from "./consts";
import { P, Dir1, Dir2 } from "./types";

export abstract class Utils {
    public static move(p: P, dir1: Dir1, dir2: Dir2 | undefined): P | undefined {
        let col = p.col;
        let row = p.row;
        if (dir2 === undefined) {
            row = dir1 === Dir1.U ? row - 1 : row + 1;
        }
        else {
            if (col % 2 === 0) {
                row = dir1 === Dir1.U ? row - 1 : row;
            }
            else {
                row = dir1 === Dir1.U ? row : row + 1;
            }
            col = dir2 === Dir2.L ? col - 1 : col + 1;
        }
        if (0 <= col && col < COLS && 0 <= row && row < ROWS) {
            return { col, row };
        }
        else {
            return undefined;
        }
    }
}