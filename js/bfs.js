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
            if([row_num, col_num].toString() == end.toString()){
                return
            }

            

            // If the block is an empty node
            if(board[row_num] && board[row_num][col_num] == 0){
                found_node(row_num, col_num); // Change the background color

                positions.push([row_num, col_num]); // Let the node be checked the next round
                
                board[row_num][col_num] = 1; // Change the node to the wall value


                for(const [direction_row, direction_col] of directions){
                    const next_row_num = row_num + direction_row // Next row of the node
                    const next_col_num = col_num + direction_col // Next column of the node

                    // If there is a empty node next to the checked node
                    if(board[next_row_num] && board[next_row_num][next_col_num] == 0){
                        next_node(next_row_num, next_col_num); // Change the background color
                    }
                }

                if(speed){
                    await sleep(speed); // Wait an x amount of milliseconds
                }
            }
        }
    }
}