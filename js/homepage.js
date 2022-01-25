const node_positions = {
    start: {
        classes: ["fas", "fa-arrow-right"],
        id: "start-node",
        in_board: false
    },

    end: {
        classes: ["fas", "fa-home"],
        id: "end-node",
        in_board: false    
    }
};


// Delete the background
function clear_node_background(info='all'){
    var node_backgrounds = []; // Classes / id's that must get deleted

    // If the wall background must be deleted
    if(info == "walls" || info == "all"){
        node_backgrounds.push(".node#wall");
    }

    // If the path background must be deleted
    if(info == "path" || info == "all"){
        node_backgrounds.push(".node.pathmaking", ".node.fastest_path");
    }

    // Delete the background of every node with the specific class(es)
    document.querySelectorAll(...node_backgrounds).forEach(function(node){
        node.removeAttribute('style'); // Remove the background color
        node.className = "node"; // Remove the specific classes
    });
}


// Delete the start and/or end position
function clear_positions(){
    document.querySelectorAll("#start-node, #end-node").forEach(function(node){
        node.className = "node"; // Remove the specific classes
        node.removeAttribute('style');
    });

    node_positions['start']['in_board'] = false;
    node_positions['end']['in_board'] = false;
}


// If the user wants to clear the whole board
function clear_board(){
    clear_node_background(); // Clear every node
    clear_positions(); // Delete the start and/or end position
}


// Make the start or end position
function make_position(node, position){
    node.classList.add(...node_positions[position]['classes']); // Add the specific classes
    node.id = node_positions[position]['id']; // Add the specific id
    node_positions[position]['in_board'] = true;
    node.style.backgroundColor = (position == "start") ? "green" : "red";
}




// For every node on the board
document.querySelectorAll(".node").forEach(function(node){
    // If the user hovers over the node
    node.addEventListener("mouseover", function(mouse_event){
        // When the user holds down the left mouse button, and the node is not the starting / ending position
        if(mouse_event.buttons == 1 && node.id != node_positions['start']['id'] && node.id != node_positions['end']['id']){
            // Make the node a wall
            node.style.backgroundColor = "black";
            node.id = "wall";
        }
    });


    // If the user clicks on a node
    node.onclick = function(){ 
        // If the node is the start / end position
        if(node.id == node_positions['start']['id'] || node.id == node_positions['end']['id']){
            var position = (node.id == node_positions['start']['id']) ? "start" : "end"

            node_positions[position]['in_board'] = false;
            node.classList.remove(...node_positions[position]['classes'])
            node.removeAttribute('id');
            node.removeAttribute('style');
        }

        // If the node is not the starting / ending position
        else{
            if(node.id.value == undefined && !node.hasAttribute("style")){
                // If there is not an starting position on the board
                if(!node_positions['start']['in_board']){
                    make_position(node, "start"); // Make the node the starting position
                }
                
                // If there is an starting position on the board
                else{
                    // If there is not an ending position on the board
                    if(!node_positions['end']['in_board']){
                        make_position(node, "end"); // Make the node the ending position
                    }
                }
            }
        }
    }
});


// For every algorithm option inside the nav
document.getElementById("algorithm-dropdown").querySelectorAll("button").forEach(function(algorithm_button){
    // If the user clicks on an algorithm option
    algorithm_button.onclick = function(){
        var algorithm_name = algorithm_button.innerText.toLowerCase(); // Algorithm name

        document.getElementById("run-button").innerText = `Run ${algorithm_name}`; // Show the algorithm name inside the run button

        // If the algorithm name includes a '*'
        if(algorithm_name.includes("*")){
            algorithm_name = algorithm_name.replace("*", "_star");
        }

        document.getElementById("run-button").onclick = window[`${algorithm_name}_start`]; // Starting function if the user clicks on the run button inside the nav
    }
});