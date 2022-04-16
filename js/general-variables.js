const speeds = {slow: 100, normal: 50, fast: 20, instant: 0}
var speed = speeds.normal; // Millisecond wait time the user chose

const run_button = document.getElementById("run-button")

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
    }
}