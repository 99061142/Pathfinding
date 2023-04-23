import { createRef, useEffect, useState } from "react";
import Cell from './cell';

function Board(props) {
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const board = createRef(null);

    useEffect(() => {
        const maxRows = () => {
            // Get the max amount of rows by the max height of the board divided by the cell view height
            const BOARD = board.current;
            const TOP = BOARD.getBoundingClientRect().top;
            const MAX_HEIGHT = (window.innerHeight - TOP);
            const CELL_PADDING = ((window.innerHeight / 100) * 1.75) * 2;
            const ROWS = Math.floor(MAX_HEIGHT / CELL_PADDING) - 1;
            return ROWS
        }
        setRows(maxRows());

        const maxCols = () => {
            // Get the max amount of cols by the max width of the board divided by the cell view height
            const MAX_WIDTH = window.innerWidth;
            const CELL_PADDING = ((window.innerHeight / 100) * 1.75) * 2;
            const COLS = Math.floor(MAX_WIDTH / CELL_PADDING) - 1;
            return COLS
        }
        setCols(maxCols());
    }, [board]);

    const initCellType = (row, col) => {
        // Return the type of the cell based on the row and col
        const CENTER_ROW = Math.floor(rows / 2);
        if (row !== CENTER_ROW) {
            return ''
        }
        const START_COL = Math.floor(cols * .15);
        if (col === START_COL) {
            return 'start'
        }
        const END_COL = Math.floor(cols * .85);
        if (col === END_COL) {
            return 'end'
        }
        return ''
    }

    return (
        <table ref={board} className="my-2 d-flex justify-content-center">
            <tbody>
                {[...Array(rows)].map((_, row) =>
                    <tr key={row}>
                        {[...Array(cols)].map((_, col) =>
                            <Cell
                                initWeight={1}
                                initType={initCellType(row, col)}
                                row={row}
                                col={col}
                                key={col}
                                {...props}
                            />
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default Board;