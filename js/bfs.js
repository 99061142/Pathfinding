// Check each node to until the ending node is found
async function path_bfs(board, start, end){
    const positions = [start]; // Positions of the node(s)
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    // Loop through every position
    for(const [row, col] of positions){
        // Check every direction
        for(const [direction_row, direction_col] of directions){
            const row_num = row + direction_row; // Row of the node
            const col_num = col + direction_col; // Column of the node

            // If the node is the end position
            if(row_num == end[0] && col_num == end[1]){
                return
            }

            // If the block is an empty node
            if(board[row_num] && board[row_num][col_num] === 0){
                found_node(row_num, col_num); // Change the backgroundcolor

                positions.push([row_num, col_num]); // Let the node be checked the next round
                
                board[row_num][col_num] = 1; // Change the node to the wall value

                if(speed > 0){
                    await sleep(speed); // Wait an x amount of milliseconds
                }
            }
        }
    }
}