const start_button = document.getElementById("run-button"); // Button to run the pathfinding algorithm
const standard_node_classes = "node border border-dark float-left"; // Standard classes for the node

const speeds = {slow: 100, normal: 50, fast: 20, instant: 0} // Millisecond to wait for every loop through the pathfinding destinations 
var speed = speeds.normal; // Millisecond wait time the user chose

// Info about the positions the user can place
const positions_information = {
    start: {
        classes: ["fas", "fa-arrow-right", "bg-success"],
        id: "start",
        used: false
    },

    end: {
        classes: ["fas", "fa-home", "bg-danger"],
        id: "end",
        used: false 
    }
};

const start_end_ids = ["start", "end"]; // Start and end id


// For every node on the board
document.querySelectorAll(".node").forEach(function(node){
    // If the user hovers over the node
    node.addEventListener("mouseover", function(mouse_event){
        // If the node is not an important node, or already a wall
        if(mouse_event.buttons == 1 && node.id != "wall" && !start_end_ids.includes(node.id) && !find_path){
            // If the node is not empty
            if(node.id){
                node.className = standard_node_classes; // Delete the specific class information about the node
            }
            
            node.id = "wall"; // Make the node a wall
        }
    });


    // If the user clicks on the node
    node.onclick = () => { 
        if(!find_path){
            // If it is an important node
            if(start_end_ids.includes(node.id)){
                positions_information[node.id]['used'] = false;
                node.className = standard_node_classes; // Delete the specific class information about the node
                node.removeAttribute('id');

                start_button.disabled = true // Run button is disabled
            }

            // If the node is not an important node
            else{   
                // If there is no start or end position added to the board, it gets added (in order 1. start, 2. end)
                for(const start_end_id of start_end_ids){
                    if(!positions_information[start_end_id].used){
                        make_important_position(node, start_end_id);
                        break
                    }
                }

                // If the start and end position is on the board
                if(positions_information['start'].used && positions_information['end'].used && start_button.disabled){
                    start_button.disabled = false // Run button is enabled
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