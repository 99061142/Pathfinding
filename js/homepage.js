const nodes = document.querySelectorAll(".node"); // All the nodes
const algorithm_buttons = document.getElementById("algorithm-dropdown").querySelectorAll("button"); // All the buttons to choose the algorithm
const run_button = document.getElementById("run-button");


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
    icon_classes(start_node, "start");
    icon_classes(end_node, "end");
}
starting_points(); // Always make the random start / end positions



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
        node.classList.add("node", "start-node", "fas", "fa-arrow-right");
        has_start_node = true;
    }
    
    // If the ending node must be made
    else{
        node.classList.add("node", "end-node", "fas", "fa-home");
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
            if(node.classList.contains("start-node")){
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
                    icon_classes(node, "start"); // Make the node the starting position
                }
                
                // If there is an starting position on the board
                else{
                    // If there is not an ending position on the board
                    if(!has_end_node){
                        icon_classes(node, "end"); // Make the node the ending position
                    }
                }
            }
        }
    }
});


// For every algorithm option inside the nav
algorithm_buttons.forEach(function(algorithm_button){
    // If the user clicks on an algorithm option
    algorithm_button.onclick = function(){
        var algorithm_name = algorithm_button.innerText; // Algorithm name

        run_button.innerText = `Run ${algorithm_name}`; // Show the algorithm name inside the run button

        algorithm_name = algorithm_name.toLowerCase();

        // If the algorithm name includes a '*'
        if(algorithm_name.includes("*")){
            algorithm_name = algorithm_name.replace("*", "_star");
        }

        document.getElementById("run-button").onclick = window[`${algorithm_name}_start`]; // Starting function if the user clicks on the run button inside the nav
    }
});