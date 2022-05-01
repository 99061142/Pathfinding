/*
Explanation:

Board list:
* 1 = Start, end, wall and the found node.
* 0 = empty, next and fastest node.

Function naming / variable naming information:
* Standard classes = every starting class that the node has.
* Standard nodes = wall, found, next, fastest and empty node.
* Important nodes = start and end node.
* Empty position = the node is on the board and is empty in the board list (0).
*/



class Node{
    #standard_classes = "border border-dark float-left"

    element(position){
        const [row, col] = position

        const row_element = document.getElementById('board').children[row] // Element of the row

        // Returns the element of the node if the row of the node was found
        if(row_element){
            return row_element.children[col]
        }
    }

    position(element){
        const row_element = element.parentElement

        const node_row = Array.from(document.getElementById('board').children).indexOf(row_element)
        const node_col = Array.from(row_element.children).indexOf(element)

        return [node_row, node_col]
    }

    empty(position){
        const [row, col] = position

        return this.list[row] && this.list[row][col] === 0 // If the position is on the board and empty
    }   

    get start_element(){
        return document.getElementById("start")
    }

    get end_element(){
        return document.getElementById("end")
    }

    get start_position(){
        const start_element = document.getElementById("start")

        // Return the end position if it's on the board
        if(start_element){
            return this.position(start_element)
        }
    }

    get end_position(){
        const end_element = document.getElementById("end")

        // Return the end position if it's on the board
        if(end_element){
            return this.position(end_element)
        }
    }

    set start_position(element){
        // Make the position on the board 1 so it isn't empty anymore
        const [row, col] = this.position(element)
        this.list[row][col] = 1

        // Make the element the start node
        element.id = "start"
        element.className += " fas fa-arrow-right bg-success"
    }

    set end_position(element){
        // Make the position on the board 1 so it isn't empty anymore
        const [row, col] = this.position(element)
        this.list[row][col] = 1 

        run_button.disabled = false

        // Make the element the end node
        element.id = "end"
        element.className += " fas fa-home bg-danger"
    }

    is_end_position(position){
        const [row, col] = position
        const [end_row, end_col] = this.end_position

        return row == end_row && col == end_col // If the position is the same as the end position
    }

    set_standard_attributes(element){
        element.className = this.#standard_classes

        // If the element has an id
        if(element.id){
            element.removeAttribute('id') // Delete the id
        }
    }

    wall(position){  
        const element = this.element(position)

        // If the node is not the start or end node
        if(element.id != "start" && element.id != "end"){
            // Change the node to the wall node
            element.className = this.#standard_classes
            element.id = "wall"
        }
    }

    found(position){  
        // If the position is on the board
        if(this.on_board(position)){
            // Change the node to the next node
            const [row, col] = position
            const element = this.element(position)  

            element.className = this.#standard_classes
            element.id = "found"

            this.list[row][col] = 1 // Make the position on the board 1 so it isn't empty anymore
        }
    }

    next(position){    
        // If the position is on the board
        if(this.on_board(position)){
            // Change the node to the next node
            const element = this.element(position)

            element.className = this.#standard_classes
            element.id = "next"
        }
    }

    fastest(position){  
        // Change the node to the fastest node
        const element = this.element(position)

        element.className = this.#standard_classes
        element.id = "fastest"
    }

    on_board(position){
        return this.empty(position) // If the position is on the board
    }

    is_standard_node(element){
        return !element.id && element.className == this.#standard_classes
    }

    is_important_node(element){
        const important_ids = ['start', 'end']

        return important_ids.includes(element.id)
    }
}



class Board extends Node{
    #speed_types = {
        slow: 50, 
        normal: 25, 
        fast: 5, 
        instant: 0
    }

    constructor(){
        super()
        this.name = 'Board'
        this.list = this.make_board_list()
        this.width = this.list[0].length
        this.height = this.list.length
        this.is_running = false
        this.speed = this.#speed_types['fast']
    } 

    set sleep_time(type_or_value){
        // Get the speed value with the type the user gave as parameter
        const speed_type = this.#speed_types[type_or_value]

        // If the user gave an number as paramater, or the speed value was found using the parameter type
        if(!isNaN(type_or_value) || speed_type != undefined){
            // Set the speed value the user gave / was found using the speed type the user gave
            this.speed = (speed_type != undefined) ? speed_type : type_or_value
        }
    }
    
    sleep(){
        if(this.speed){
            return new Promise(resolve => setTimeout(resolve, this.speed))
        }
    }

    make_board_list(){
        const list = [] // 2d list of the board

        // For every row
        document.querySelectorAll('tr').forEach(board_row => {
            const row_columns = []

            // For every node inside the row
            board_row.querySelectorAll('td').forEach(node => {
                // If the node has an id the number is 1 else 0
                const row_column_number = (node.id) ? 1 : 0
                row_columns.push(row_column_number)
            })

            list.push(row_columns)
        })

        return list
    }

    position_is_empty(row, col){
        return this.list[row] && !this.list[row][col] // If the node is empty and is on the board
    }

    clear_algorithm_path(){
        const classes = ["td#found", "td#next", "td#fastest"]
        this.clear_specific_elements(classes)
    }

    clear_walls(){
        const classes = ["td#wall"]
        this.clear_specific_elements(classes)
    }

    clear_board(){
        const classes = ["#start", "#end"]
        this.clear_specific_elements(classes)

        this.clear_algorithm_path()
        this.clear_walls()
    }

    clear_specific_elements(classes){
        if(!this.is_running){
            // For every class that must be cleared
            document.querySelectorAll(classes).forEach(element => {
                this.set_standard_attributes(element) // Change the node to the standard node
            })
        }
    }

    make_path(algorithm){
        // If the start and end position are on the board, and the board isn't running
        if(this.start_position && this.end_position && !this.is_running){
            this.clear_algorithm_path()
            this.list = this.make_board_list() // Get the 2d list of the board
            this.is_running = true
            run_button.disabled = true 

            // Start the pathfinding algorithm
            window[`path_${algorithm}`]().then(route => {
                // Make the fastest route
                this.fastest_route(route).then(() => {
                    this.is_running = false
                    run_button.disabled = false
                })
            })
        }
    }
    
    async fastest_route(route){
        // If the fastest route could be made
        if(route){
            route = route.slice(1).reverse() // Delete the end position and reverse the list

            // For every position inside the route
            for(let position of route){       
                this.fastest(position) // Make the node an fastest node

                await this.sleep()
            }
        }
    }

    random_walls(){
        if(!this.is_running){
            // For each node
            document.querySelectorAll("td").forEach(element => {
                // 33% chance to make the wall if it's an standard node
                if(Math.random() <= 0.33 && !this.is_important_node(element)){
                    // Make the node an wall node
                    const position = this.position(element)                    
                    this.wall(position)
                }
            })
        }
    }
}
const board = new Board()


// For each node
document.querySelectorAll('td').forEach(node_element => {  
    board.set_standard_attributes(node_element)

    node_element.onclick = () => { 
        if(!board.is_running){
            // If it's the start or end node
            if(board.start_element == node_element || board.end_element == node_element){
                // If it's the end node
                if(board.end_element == node_element){
                    run_button.disabled = true
                }

                board.set_standard_attributes(node_element) // Change the node to the start / end node
            }

            // If the board does not have the start or end position
            else if(!board.start_position || !board.end_position){
                // First add the start position then the end position  
                const importancy = board.start_position ? "end" : "start"

                if(importancy == "start"){
                    board.start_position = node_element
                }else{
                    board.end_position = node_element
                }
            }
        }
    }

    node_element.addEventListener("mouseover", mouse_event => {
        // When the user hovers over the node and is holding down the left mouse button
        if(!board.is_running && mouse_event.buttons == 1){
            const position = board.position(node_element)
            board.wall(position) // Make the node a wall
        }
    })
})