const standard_node_classes = "node border border-dark float-left node"; // Standard classes for the node


const nodes_information = {
    start: {
        classes: ["fas", "fa-arrow-right", "bg-success"],
        id: "start-node",
        in_board: false
    },

    end: {
        classes: ["fas", "fa-home", "bg-danger"],
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
        // pass
    }

    // Delete the background of every node with the specific class(es)
    document.querySelectorAll(...node_backgrounds).forEach(function(node){
        node.removeAttribute('id'); // Remove the id
        node.removeAttribute('style'); // Remove the background color
        node.className = standard_node_classes; // Remove the specific classes
    });
}


// Delete the start and/or end position
function clear_positions(){
    document.querySelectorAll("#start-node, #end-node").forEach(function(node){
        node.className = standard_node_classes; // Remove the specific classes
        node.removeAttribute('id');
        node.removeAttribute('style');
    });

    nodes_information['start']['in_board'] = false;
    nodes_information['end']['in_board'] = false;
}


// If the user wants to clear the whole board
function clear_board(){
    clear_node_background(); // Clear every node
    clear_positions(); // Delete the start and/or end position
}


// Make the start or end position
function make_position(node, position){
    node.classList.add(...nodes_information[position]['classes']); // Add the specific classes
    node.id = nodes_information[position]['id']; // Add the specific id
    nodes_information[position]['in_board'] = true;
}


// For every node on the board
document.querySelectorAll(".node").forEach(function(node){
    // If the user hovers over the node
    node.addEventListener("mouseover", function(mouse_event){
        // When the user holds down the left mouse button, and the node is not the starting / ending position
        if(mouse_event.buttons == 1 && node.id != nodes_information['start']['id'] && node.id != nodes_information['end']['id']){
            // Make the node a wall
            node.style.backgroundColor = "black";
            node.id = "wall";
        }
    });


    // If the user clicks on a node
    node.onclick = function(){ 
        // If the node is the start / end position
        if(node.id == nodes_information['start']['id'] || node.id == nodes_information['end']['id']){
            var position = (node.id == nodes_information['start']['id']) ? "start" : "end"

            nodes_information[position]['in_board'] = false;
            node.classList.remove(...nodes_information[position]['classes'])
            node.removeAttribute('id');
            node.removeAttribute('style');
        }

        // If the node is not the starting / ending position
        else{
            if(node.id.value == undefined && !node.hasAttribute("style")){
                // If there is not an starting position on the board
                if(!nodes_information['start']['in_board']){
                    make_position(node, "start"); // Make the node the starting position
                }
                
                // If there is an starting position on the board
                else{
                    // If there is not an ending position on the board
                    if(!nodes_information['end']['in_board']){
                        make_position(node, "end"); // Make the node the ending position
                    }
                }
            }
        }
    }
});