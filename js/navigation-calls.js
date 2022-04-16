// For every algorithm option inside the navigation
document.getElementById("algorithm-dropdown").querySelectorAll("button").forEach(function(algorithm_button){
    // If the user clicks on an algorithm option
    algorithm_button.onclick = () => {
        const algorithm_name = algorithm_button.innerText
        const run_button_function_name = `make_path('${algorithm_name.toLowerCase()}')`

        run_button.setAttribute("onclick", run_button_function_name) // Add an onclick event to the run button
        run_button.innerText = `Run ${algorithm_name}` // Update the run buttons name to include the pathfinding name
    }
});

// For every speed option inside the navigation
document.getElementById("speed-dropdown").querySelectorAll("button").forEach(function(speed_button){
    // If the user clicks on an speed option
    speed_button.onclick = () => {
        const speed_name = speed_button.innerText.toLowerCase()
        speed = speeds[speed_name] // Update the speed value
    }
});

// Randomly creates walls inside the board
function add_random_walls(){
    // For every node inside the board
    document.querySelectorAll(".node").forEach(function(node_element){
        // 33% chance to make the wall IF the node is not the start/end/wall node
        if(Math.random() <= 0.33 && !important_position_information[node_element.id] && node_element.id != "wall"){
            node_element.id = "wall"
        }
    });
}

// Delete the specific information of the specific nodes
function clear_specific_nodes(info='all'){
    const node_backgrounds = [] // Id information for the specific nodes that must be updated

    // If the walls / everything must be deleted 
    if(info == "walls" || info == "all"){
        node_backgrounds.push(".node#wall")
    }

    // If the path / everything must be deleted 
    if(info == "path" || info == "all"){
        node_backgrounds.push(".node#found", ".node#next", ".node#fastest")
    }

    // If everything must be deleted
    if(info == "all"){
        node_backgrounds.push(".node#start", ".node#end")
    }

    document.querySelectorAll(node_backgrounds).forEach(function(node_element){
        node_element.className = standard_class_names
        node_element.removeAttribute('id')
    });
}

// Clear all the changed nodes on the board
function clear_board(){
    clear_specific_nodes(); // Clear all the changed nodes

    // Change the value if the element is on the board
    for(important_position in important_position_information){
        important_position_information[important_position]['used'] = false
        important_position_information[important_position]['row'] = null
        important_position_information[important_position]['col'] = null
    }

    run_button.disabled = true
}