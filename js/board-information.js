function get_path(){
    const start_node = document.getElementById("start-node")
    const end_node = document.getElementById("end-node")

    if(start_node != null && end_node != null){
        board = make_board()
        find_path(board, start_node, end_node)
    }
}


function make_board(){
    board = [];

    document.querySelectorAll(".nodes > div").forEach(function(nodes_row){
        row_nodes = [];

        nodes_row.querySelectorAll(".node").forEach(function(node){
            if(node.id == "start-node" || node.id == ""){
                row_nodes.push(0);
            }
            else if(node.id == "end-node"){
                row_nodes.push(2);
            }
            else{
                row_nodes.push(1);
            }
        });
        board.push(row_nodes);
    });

    return board
}


function find_path(board, start, end){
    console.log(board)
    console.log(start)
    console.log(end)
}