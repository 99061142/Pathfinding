const nodes = document.querySelectorAll(".node"); // All the nodes

var has_start_node = false; // If the board has a start node
var has_end_node = false; // If the board has a end node


// Pick a random position for the starting point and the end point
function starting_points(){
    while(true){
        var start_node = nodes[Math.floor(Math.random()*nodes.length)];
        var end_node = nodes[Math.floor(Math.random()*nodes.length)];

        // If the positions are not the same
        if(start_node != end_node){            
            break;
        }
    }

    // Add the font to the node
    icon_classes(start_node, "start")
    icon_classes(end_node, "end")
}
starting_points() // Always make the random start / end position



// Change the board
function change_board(info){
    // For every node
    nodes.forEach(function(node){
        // Delete the background color if a condition is met
        if(node.style.backgroundColor == "black" && info != "clear_path" || node.style.backgroundColor != "black" && node.style.backgroundColor != "" && info == "clear_path"){
            node.style.backgroundColor = ""; // Reset the background color
        }

        // If the node contained a font, and the board must delete everything
        if(info == "clear_all" && node.classList.contains("fas")){
            node.className = "node"; // Delete the font
        }
    });

    // If everything must be deleted
    if(info == "clear_all"){
        starting_points(); // Pick the random start / end position
    }
}


// Make the start / end node
function icon_classes(node, position){
    // If the starting node must be made
    if(position == "start"){
        node.classList.add("start_node", "fas", "fa-arrow-right", "fa-sm");
        has_start_node = true;
    }
    
    // If the ending node must be made
    else{
        node.classList.add("end_node", "fas", "fa-home", "fa-sm");
        has_end_node = true;
    }
}



// For every node in the board
nodes.forEach(function(node){
    // If the user hover over the node
    node.addEventListener("mouseover", function(mouse_event){
        // When the user holds down the left mouse button, and the node is not the starting / ending position
        if(mouse_event.buttons == 1 && !node.classList.contains("fas")){
            node.style.backgroundColor = "black"; // Make the node a wall
        }
    })


    // If the user clicks on a node
    node.onclick = function(){
        // If the node is a starting / ending position
        if(node.classList.contains("fas")){
            // If the node is the starting position
            if(node.classList.contains("start_node")){
                has_start_node = false;
            }
            
            // If the node is the ending position
            else{
                has_end_node = false;
            }

            node.className = "node"; // Delete the starting / ending position
        }
        
        // If the node is not the starting / ending position
        else{
            // If the node is not a wall
            if(node.style.backgroundColor == ""){
                // If there is not an starting position on the board
                if(!has_start_node){
                    icon_classes(node, "start") // Make the node the starting position
                }
                
                // If there is an starting position on the board
                else{
                    // If there is not an ending position on the board
                    if(!has_end_node){
                        icon_classes(node, "end") // Make the node the ending position
                    }
                }
            }
        }
    }
});