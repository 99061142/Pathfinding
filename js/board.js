function make_path(){
    const start_node = document.getElementById("start-node") // Start node
    const end_node = document.getElementById("end-node") // End node

    // If the start / end node is on the board
    if(start_node != null && end_node != null){
        board = make_board(); // Make the board
        start = get_position(start_node); // Get the position of the starting node
        end = get_position(end_node);

        path(board, start, end); // Make the path
    }
}


// Make the board
function make_board(){
    board = []; // Board

    // For every row with nodes
    document.querySelectorAll("#nodes > div").forEach(function(nodes_row){
        row_nodes = []; // Row with nodes

        // For every node inside the row
        nodes_row.querySelectorAll(".node").forEach(function(node){
            // If the node is a wall or the start position
            if(node.id == "wall" || node.id == "start-node"){
                row_nodes.push(1);
            }

            // If the node is empty or the end position
            else{
                row_nodes.push(0);
            }
        });

        board.push(row_nodes); // Push the row to the board list 
    });

    return board; // Return the board
}


function get_position(node){
    var parent = node.parentElement; // Parent of the node

    var row = Array.from(document.getElementById("nodes").children).indexOf(parent); // Row of the node
    var col = Array.from(parent.children).indexOf(node); // Column of the node

    return [row, col];
}


// Get the element of the node
function get_element(row, col){
    var row = document.getElementById('nodes').children[row]; // Row of the node
    var element = row.children[col]; // Get the element

    return element;
}


/// Change the background color
function change_background(element, info){
    // If the node is found, and not the fastest route
    if(info == "found"){    
        element.classList.add("bg-secondary");
    }
}


// If the node is found
function found_node(row, col){
    element = get_element(row, col) // Get the element
    change_background(element, "found") // Change the background color
}


// Wait an x amount of miliseconds
function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}


// Check each node to until the ending node is found
async function path(board, start, end){
    var positions = [start] // Positions of the node(s)

    var directions = [[-1, 0], [0, 1], [1, 0], [0, -1]] // Up, right, down and left

    // Loop through every position
    for(const [row, col] of positions){
        // Check every direction
        for(const [direction_row, direction_col] of directions){
            row_num = row + direction_row // New row of the node
            col_num = col + direction_col // New column of the node

            // IF the ending position is found
            if(row_num == end[0] && col_num == end[1]){
                positions = []
                break
            }

            // If the block is an empty node
            if(board[row_num] && board[row_num][col_num] === 0){
                found_node(row_num, col_num) // Change the backgroundcolor

                positions.push([row_num, col_num]) // Let the node be checked the next round
                
                board[row_num][col_num] = 1 // Change the node to the wall value

                await sleep(50) // Wait a few miliseconds
            }
        }
    }
}
