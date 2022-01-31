var find_path = true

function run_button_activation(){
    const button = document.getElementById("run-button");

    const finding_path_color = {off: "bg-green", on: "bg-danger"}

    if(find_path){
        button.classList.replace(finding_path_color.off, finding_path_color.on)

        button.disabled = true
        find_path = false
    }else{
        button.classList.replace(finding_path_color.on, finding_path_color.off)
        
        button.disabled = false
        find_path = true
    }
}