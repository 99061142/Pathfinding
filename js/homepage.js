const nodes = document.querySelectorAll("[class^=node]"); // All the nodes

// Pick a random position for the starting point and the end point
while(true){
    var starting_point = nodes[Math.floor(Math.random()*nodes.length)];
    var end_point = nodes[Math.floor(Math.random()*nodes.length)];

    // If the positions are not the same
    if(starting_point != end_point){
        break
    }
}

// Add the fonts to the nodes
starting_point.classList.add("fas", "fa-arrow-right", "fa-sm");
end_point.classList.add("fas", "fa-home", "fa-sm");


// If the user hovers over the node, and hold the left mouse button, the node gets black ( indicate a wall )
nodes.forEach(function(node){
    // Add an event to the node
    node.addEventListener("mouseover", function(mouse_event){
        // When the user hold down the left mouse button
        if(mouse_event.buttons == 1){
            node.style.backgroundColor = "black"; // Change the background color
        }
    })
});