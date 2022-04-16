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