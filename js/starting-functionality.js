const standard_node_classes = "node border border-dark float-left"; // Standard classes for the node
const speeds = {slow: 100, normal: 50, fast: 20, instant: 0} // Speed options to find the end position
var speed = speeds['normal']; // Speed the user chose


// For every node on the board
document.querySelectorAll(".node").forEach(function(node){
    // If the user hovers over the node
    node.addEventListener("mouseover", function(mouse_event){
        // If the user holds down the left mouse button
        if(mouse_event.buttons == 1){
            var empty_node = true

            // Check if the node is not an important node
            for(key in positions_information){
                if(node.id == positions_information[key].id){
                    empty_node = false
                    break
                }
            }
            
            // If the node is empty
            if(empty_node){
                node.id = "wall"; // Make the node a wall
            }
        }
    });


    // If the user clicks on a node
    node.onclick = function(){ 
        var important_position // Name of the important position
        
        
        for(key in positions_information){
            // If the node is the start / end position
            if(node.id == positions_information[key].id){
                important_position = node.id
            }
        }
        
        // If the node is an important node
        if(important_position){
            positions_information[important_position]['used'] = false;
            node.classList.remove(...positions_information[important_position]['classes']) // Remove the specific classes
            node.removeAttribute('id'); // Remove the ID attribute
            node.removeAttribute('style'); // Remove the style attribute
        }
        
        // If the node is not an important node 
        else{
            // If the node is empty
            if(node.id.value == undefined && !node.id){
                // If there is not an starting position on the board
                if(!positions_information['start'].used){
                    make_important_position(node, "start"); // Make the node the start position
                }

                // If there is not an ending position on the board
                else if(!positions_information['end'].used){
                    make_important_position(node, "end"); // Make the node the end position
                }
            }
        }
    }
});


// For every algorithm option inside the nav
document.getElementById("algorithm-dropdown").querySelectorAll("button").forEach(function(algorithm_button){
    // If the user clicks on an algorithm option
    algorithm_button.onclick = function(){
        var algorithm_name = algorithm_button.innerText // Algorithm name

        document.getElementById("run-button").innerText = `Run ${algorithm_name}`; // Show the algorithm name inside the run button
    }
});


// For every speed option inside the nav
document.getElementById("speed-dropdown").querySelectorAll("button").forEach(function(speed_button){
    // If the user clicks on an speed option
    speed_button.onclick = function(){
        const speed_name = speed_button.innerText.toLowerCase() // Speed name
        speed = speeds[speed_name] // Speed value
    }
});