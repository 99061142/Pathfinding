const run_button = document.getElementById("run-button")

// For every algorithm option inside the navigation
document.getElementById("algorithm-dropdown").querySelectorAll("button").forEach(function(algorithm_button){
    // If the user clicks on an algorithm option
    algorithm_button.onclick = () => {
        const algorithm_name = algorithm_button.innerText
        const run_button_function = `make_path('${algorithm_name.toLowerCase()}')`

        run_button.setAttribute("onclick", run_button_function)
        run_button.innerText = `Run ${algorithm_name}`
    }
})

// For every speed option inside the navigation
document.getElementById("speed-dropdown").querySelectorAll("button").forEach(function(speed_button){
    // If the user clicks on an speed option
    speed_button.onclick = () => {
        const speed_type = speed_button.innerText.toLowerCase()

        board.sleep_time = speed_type // Update the speed value
    }
})