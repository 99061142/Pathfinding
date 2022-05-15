// Check each node until the ending node is found
async function pathBfs(){
    const POSITIONS = [[BOARD.startPosition]] // Positions of the node(s)
    const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]] // Up, right, down and left
    
    // Loop through every route to go to the new node
    for(let route of POSITIONS){
        const [THIS_ROW, THIS_COL] = route.slice(-1)[0] // Last node inside the route to go to the next node

        // For every movable direction
        for(let [directionRow, directionCol] of DIRECTIONS){
            const ROW = THIS_ROW + directionRow
            const COL = THIS_COL + directionCol
            const POSITION = [ROW, COL]

            // If the positon is the end position
            if(BOARD.isEndPosition(POSITION)){
                return route.slice(1)
            }

            // If the node is empty
            if(BOARD.empty(POSITION)){
                BOARD.found(POSITION)

                // Go further with the found node when the loop gets called again 
                const NEW_LIST = [...route, POSITION]
                POSITIONS.push(NEW_LIST)
                
                // For every movable direction
                for(let [directionRow, directionCol] of DIRECTIONS){
                    const NEXT_ROW = ROW + directionRow
                    const NEXT_COL = COL + directionCol
                    const POSITION = [NEXT_ROW, NEXT_COL]

                    if(BOARD.empty(POSITION) && !BOARD.isEndPosition(POSITION)){
                        BOARD.next(POSITION)
                        await BOARD.sleep()
                    }
                }
            }
        }
    }
}