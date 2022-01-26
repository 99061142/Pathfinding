function make_path(){
    const start_node = document.getElementById("start-node") // Start node
    const end_node = document.getElementById("end-node") // End node

    // If the start / end node is on the board
    if(start_node != null && end_node != null){
        board = make_board(); // Make the board
        start = start_position(start_node); // Get the position of the starting node
        path(board, start); // Make the path
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
            // If the node is the start position, or empty
            if(node.id == "" || node.id == "start-node"){
                row_nodes.push(0);
            }

            // If the node is the end position
            else if(node.id == "end-node"){
                row_nodes.push(2);
            }

            // If the node is a wall
            else{
                row_nodes.push(1);
            }
        });

        board.push(row_nodes); // Push the row to the board list 
    });

    return board; // Return the board
}


function start_position(start_node){
    var parent = start_node.parentElement; // Get the row element of the node

    var row = Array.from(document.getElementById("nodes").children).indexOf(parent); // Get the index of the row
    var index = Array.from(parent.children).indexOf(start_node); // Get the position index inside the row

    return {row: row, index: index}; // Return the position of the start node
}


function path(board, start){
    // pass
}