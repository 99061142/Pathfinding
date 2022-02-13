// Delete the specific information of the specific nodes
function clear_specific_nodes(info='all'){
    if(!find_path || path_found){
        const node_backgrounds = []; // Id information for the specific nodes that must be updated

        // If the walls / everything must be deleted 
        if(info == "walls" || info == "all"){
            node_backgrounds.push("#wall"); // Add the wall ID to the list
        }

        // If the path / everything must be deleted 
        if(info == "path" || info == "all"){
            node_backgrounds.push("#found"); // Add the path ID(s) to the list
        }

        // If everything must be deleted
        if(info == "all"){
            node_backgrounds.push("#start", "#end");
        }

        remove_attributes(node_backgrounds) // Remove the specific attributes of the element(s)
    }
}


// Remove the attributes of the elements (and so delete it on the board)
function remove_attributes(elements){
    // Delete the specific information of the nodes that must get changed
    document.querySelectorAll(elements).forEach(function(node){
        node.className = standard_node_classes;  // Delete the specific class information about the node
        node.removeAttribute('id');
    });
}


// Clear all the changed nodes on the board
function clear_board(){
    if(!find_path){
        clear_specific_nodes(); // Clear all the changed nodes

        // Change the value if the element is on the board
        for(positions in positions_information){
            positions_information[positions].used = false
        }
    }
}


// Make the start or end position
function make_important_position(node, position){
    node.classList.add(...positions_information[position].classes); // Add the specific classes
    node.id = positions_information[position].id; // Add the specific id
    positions_information[position].used = true; // Value if the element is on the board
}