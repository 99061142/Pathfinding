// Check each node until the ending node is found
async function path_bfs(board, start, end){
    const positions = [[start]] // Positions of the node(s)
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] // Up, right, down and left

    // Loop through every route to go to the new node
    for(let route of positions){
        let [row, col] = route.slice(-1)[0] // Last node inside the route to go to the next node

        // For every direction the node can go to
        for(let [direction_row, direction_col] of directions){
            let row_num = row + direction_row // Row of the node
            let col_num = col + direction_col // Column of the node

            // If the node is the end position
            if([row_num, col_num].toString() == end.toString()){
                show_end_path(route) // Show the end path from the start to the end node
                return
            }

            // If the block is an empty node
            if(board[row_num] && board[row_num][col_num] == 0){
                change_importancy(row_num, col_num, "found")

                // Add the found node to the route with the previous nodes 
                // to go further with the found node when the loop gets called again 
                let new_list = [...route]
                new_list.push([row_num, col_num])
                positions.push(new_list)
                
                board[row_num][col_num] = 1 // Change the node to the wall value

                // For every direction the node can go to
                for(let [next_direction_row, next_direction_col] of directions){
                    let next_row_num = row_num + next_direction_row // Next row of the node
                    let next_col_num = col_num + next_direction_col // Next column of the node

                    // If there is a empty node next to the checked node
                    if(board[next_row_num] && board[next_row_num][next_col_num] == 0){
                        change_importancy(next_row_num, next_col_num, "next")
                    }
                }

                // If the user wants to let the pathfinding algorithm go faster
                if(speed){
                    await sleep(speed) // Wait an x amount of milliseconds
                }
            }
        }
    }
}