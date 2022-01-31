var find_path = true // If the path is being searched for
var path_found = false // If the previous searched path is found


// Check if run button can be used
function run_button_activation(){
    const button = document.getElementById("run-button"); // Button element

    const finding_path_color = {off: "bg-green", on: "bg-danger"} // Class names

    // If the path is being searched for
    if(find_path){
        button.classList.replace(finding_path_color.off, finding_path_color.on) //  Off color for the button
        
        button.disabled = true
        find_path = false 

        // If the previous searched path is found
        if(path_found){
            path_found = false
            clear_specific_nodes("path") // Clear every node that got an path background
        }
    }
    
    // If the path is found
    else{
        button.classList.replace(finding_path_color.on, finding_path_color.off) // On color for the button
        
        button.disabled = false
        find_path = true
        path_found = true
    }
}