var find_path = false // If the path is being searched for
var path_found = false // If the previous searched path is found


function make_path(algorithm_name){
    const start_node = document.getElementById("start"); // Start node
    const end_node = document.getElementById("end"); // End node

    // If the start / end position is on the board
    if(positions_information['start'].used && positions_information['end'].used && !find_path){
        run_button_switcher()

        const board = make_board(); // Make the board
        const start = get_position(start_node); // Get the start position
        const end = get_position(end_node); // Get the end position

        window[`path_${algorithm_name}`](board, start, end).then(run_button_switcher); 
    }
}


// Make the board
function make_board(){
    const board = []; // Board

    // For every row with nodes
    document.querySelectorAll("#nodes > div").forEach(function(nodes_row){
        const row_nodes = []; // Row with nodes

        // For every node inside the row
        nodes_row.querySelectorAll(".node").forEach(function(node){
            // Give the column a number to specify what the element is (0 = empty 1 = start/end/wall)
            const col_number = (start_end_ids.includes(node.id) || node.id == "wall") ? 1 : 0;
            row_nodes.push(col_number); // Push the column number to the row list
        });
        board.push(row_nodes); // Push the row to the board list 
    });

    return board;
}


// Get the position of the node inside the board
function get_position(node){
    const parent = node.parentElement; // Parent of the node

    const row = Array.from(document.getElementById("nodes").children).indexOf(parent); // Row of the node
    const col = Array.from(parent.children).indexOf(node); // Column of the node

    return [row, col];
}


// Get the element of the node
function get_element(row, col){
    const element_row = document.getElementById('nodes').children[row]; // Row of the node
    const element = element_row.children[col]; // Get the element

    return element;
}


/// Change the background color
function update_node_id(element, info){
    element.id = info; // ID that the node is checked
}


// If the node is found
function found_node(row, col){
    const element = get_element(row, col); // Get the element
    update_node_id(element, "found"); // Change the background color
}


function next_node(row, col){
    const element = get_element(row, col); // Get the element
    update_node_id(element, "next"); // Change the background color
}


// Wait an x amount of milliseconds
function sleep(time){
    return new Promise(resolve => setTimeout(resolve, time));
}


// Check if run button can be used
function run_button_switcher(){
    // End of search
    if(find_path){  
        path_found = true // If the ending is found
        find_path = false // If the ending is being searched for
        start_button.disabled = false // Enable the button
    }

    // Start of search
    else{
        find_path = true // If the ending is being searched for
        start_button.disabled = true // Disable the button

        // If the previous path was being found (delete old nodes that were found)
        if(path_found){ 
            clear_specific_nodes("path"); // Delete every old node that were found
            path_found = false // If the ending is found
        }
    }
}