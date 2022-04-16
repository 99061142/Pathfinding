// Show if the important positions that can be on the board are placed (1 max on the board)
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


class Node{
    constructor(element, row, col){
        this.element = element
        this.row = row
        this.col = col
        this.class_names = "node border border-dark float-left"
        this.id = ""
    }

    add_start(){
        // Check if the start is not already on the board
        if(!important_position_information['start']['used']){
            this.class_names += " fas fa-arrow-right bg-success" // Add the start styling to the node as classes
            this.id = "start"

            important_position_information['start']['used'] = true
            important_position_information['start']['row'] = this.row
            important_position_information['start']['col'] = this.col
        }
    }

    add_end(){
        // Check if the end position is not already on the board
        if(!important_position_information['start']['used']){
            this.class_names += " fas fa-home bg-danger" // Add the end styling to the node as classes
            this.id = "end"
            
            important_position_information['start']['used'] = true
            important_position_information['start']['row'] = this.row
            important_position_information['start']['col'] = this.col
        }
    }
}


// Get the position of the node inside the board
function node_position(node_element){
    const parent = node_element.parentElement; // Parent of the node

    const row = Array.from(document.getElementById("nodes").children).indexOf(parent); // Row of the node
    const col = Array.from(parent.children).indexOf(node_element); // Column of the node

    return [row, col];
}


// For each node on the board
document.querySelectorAll("#nodes>div>div").forEach(function(node_element){
    const [row, col] = node_position(node_element) // Get the row and column of the element

    const node = new Node(node_element, row, col) // Add the element to the class

    node_element.id = node.id // Add the standard id to the element
    node_element.className = node.class_names // Add the standard classes to the element
});