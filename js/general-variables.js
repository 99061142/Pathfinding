const speeds = {slow: 100, normal: 50, fast: 20, instant: 0}
var speed = speeds.normal; // Millisecond wait time the user chose

const run_button = document.getElementById("run-button")

var pathfinding_is_running = false // If the algorithm is searching the fastest path

const standard_class_names = "node border border-dark float-left" // Standard class names for the node

// Show if the important positions that can be on the board are placed (1 max on the board), and if both are used
const important_position_information = {
    start: {
        row: null,
        col: null,
        used: false
    },
    
    end: {
        row: null,
        col: null,
        used: false
    },

    both_used: false
}