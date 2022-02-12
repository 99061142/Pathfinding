var find_path = false // If the path is being searched for
var path_found = false // If the previous searched path is found


// Check if run button can be used
function run_button_activation(){
   // If the path must be made
    if(!find_path){
        if(path_found){
            path_found = false
            clear_specific_nodes("path");
        }

        find_path = true 
        start_button.disabled = true
    }
    
    // If the path is found
    else{
        find_path = false
        start_button.disabled = false
        path_found = true  
    }
}