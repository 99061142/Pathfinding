// Check each node until the ending node is found
async function path_bfs(){
    const positions = [[board.start_position]] // Positions of the node(s)
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] // Up, right, down and left

    // Loop through every route to go to the new node
    for(let route of positions){
        const [this_row, this_col] = route.slice(-1)[0] // Last node inside the route to go to the next node

        // For every movable direction
        for(let [direction_row, direction_col] of directions){
            const row = this_row + direction_row
            const col = this_col + direction_col
            const position = [row, col]

            // If the positon is the end position
            if(board.is_end_position(position)){
                return route
            }

            // If the node is empty
            if(board.on_board(position)){
                board.found(position)

                // Go further with the found node when the loop gets called again 
                const new_list = [...route, [row, col]]
                positions.push(new_list)
                
                // For every movable direction
                for(let [direction_row, direction_col] of directions){
                    const next_row = row + direction_row
                    const next_col = col + direction_col
                    const position = [next_row, next_col]

                    board.next(position)
                }

                await board.sleep()
            }
        }
    }
}