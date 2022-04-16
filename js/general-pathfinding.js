function make_path(algorithm_name){
    // If the start / end position is on the board
    if(important_position_information['both_used']){
        clear_specific_nodes('path')
        pathfinding_working(true)

        const board = make_board() // Get the 2d array of the board

        const start = [
            important_position_information['start']['row'],
            important_position_information['start']['col']
        ]
        
        const end = [
            important_position_information['end']['row'], 
            important_position_information['end']['col']
        ]

        window[`path_${algorithm_name}`](board, start, end).then(
            pathfinding_working
        )
    }
}

function pathfinding_working(pathfinding_on=false){
    if(pathfinding_on){
        run_button.disabled = true
        pathfinding_is_running = true
    }else{
        run_button.disabled = false
        pathfinding_is_running = false    
    }
}


// Make the board
function make_board(){
    const board = [] // Board

    // For every row with nodes
    document.querySelectorAll("#nodes > div").forEach(function(nodes_row){
        const row_nodes = [] // Row with nodes

        // For every node inside the row
        nodes_row.querySelectorAll(".node").forEach(function(node_element){
            // Give the column a number to specify what the element is (0 = empty 1 = start/end/wall)
            const col_number = (important_position_information[node_element.id] || node_element.id == "wall") ? 1 : 0
            row_nodes.push(col_number) // Push the column number to the row list
        })

        board.push(row_nodes) // Push the row to the board list 
    })

    return board
}

function change_importancy(row, col, importancy){
    node_element = get_node_element(row, col)

    node_element.id = importancy
}

// Show the end path of the pathfinding algorithm
async function show_end_path(list){
    route = list.slice(1).reverse() // Route from end to start position

    // For every node to the end node (except the start)
    for(let [row, col] of route){
        change_importancy(row, col, "fastest")
        
        if(speed){
            await sleep(speed) // Wait an x amount of milliseconds
        }
    }
}

// Wait an x amount of milliseconds
function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time))
}