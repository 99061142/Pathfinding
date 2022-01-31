// Check each node to until the ending node is found
async function path_bfs(board, start, end){
    finding_path = true

    const positions = [start]; // Positions of the node(s)
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // Up, right, down and left

    var ending_found = false;

    // Loop through every position
    for(const [row, col] of positions){
        // Check every direction
        for(const [direction_row, direction_col] of directions){
            const row_num = row + direction_row; // New row of the node
            const col_num = col + direction_col; // New column of the node

            // Check if the ending position is found
            if(row_num == end[0] && col_num == end[1]){
                ending_found = true;
                break;
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
        
        // If the ending position is found
        if(ending_found){
            break;
        }
    }
    run_button_activation()
}