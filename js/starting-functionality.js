const start_button = document.getElementById("run-button"); // Button to run the pathfinding algorithm
const standard_node_classes = "node border border-dark float-left"; // Standard classes for the node

const speeds = {slow: 100, normal: 50, fast: 20, instant: 0} // Millisecond to wait for every loop through the pathfinding destinations 
var speed = speeds.normal; // Millisecond wait time the user chose

const important_nodes_id = []; // All the important nodes id (start, end etc...)

// Add all the important id names to the list
for(important_node_name in positions_information){
    const important_node_id = positions_information[important_node_name].id;
    important_nodes_id.push(important_node_id);
}


// For every node on the board
document.querySelectorAll(".node").forEach(function(node){
    // If the user hovers over the node
    node.addEventListener("mouseover", function(mouse_event){
        // If the node is not an important node, or already a wall
        if(mouse_event.buttons == 1 && node.id != "wall" && !important_nodes_id.includes(node.id) && !find_path){
            // If the node is not empty
            if(node.id){
                node.className = standard_node_classes; // Delete the specific class information about the node
            }
            
            node.id = "wall"; // Make the node a wall
        }
    });


    // If the user clicks on the node
    node.onclick = () => { 
        // If it is an important node
        if(important_nodes_id.includes(node.id)){
            positions_information[node.id]['used'] = false;
            node.className = standard_node_classes; // Delete the specific class information about the node
            node.removeAttribute('id');
        }

        // If the node is not an important node
        else{   
            // If there is no start or end position added to the board, it gets added (in order 1. start, 2. end)
            for(important_position_name in positions_information){
                if(!positions_information[important_position_name].used){
                    make_important_position(node, important_position_name);
                    break
                }
            }
        }
    }
});


// For every algorithm option inside the nav
document.getElementById("algorithm-dropdown").querySelectorAll("button").forEach(function(algorithm_button){
    // If the user clicks on an algorithm option
    algorithm_button.onclick = () => {
        const algorithm_name = algorithm_button.innerText; // Algorithm name

        start_button.setAttribute("onclick", `make_path('${algorithm_name.toLowerCase()}')`); // Add an onclick event to the run button
        start_button.innerText = `Run ${algorithm_name}`; // Update the run buttons name to include the pathfinding name
    }
});


// For every speed option inside the nav
document.getElementById("speed-dropdown").querySelectorAll("button").forEach(function(speed_button){
    // If the user clicks on an speed option
    speed_button.onclick = () => {
        const speed_name = speed_button.innerText.toLowerCase(); // Speed name
        speed = speeds[speed_name]; // Update the speed value
    }
});