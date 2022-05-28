const RUN_BUTTON = document.getElementById("run-button");
const SPEED_NAV = document.getElementById("speed-nav");

function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

// For every algorithm option inside the navigation
document.getElementById("algorithm-dropdown").querySelectorAll("button").forEach(algorithmButton => {
    // If the user clicks on an algorithm option
    algorithmButton.onclick = () => {
        const ALGORITHM_NAME = algorithmButton.innerText;
        const RUN_BUTTON_FUNCTION = `BOARD.makePath('${ALGORITHM_NAME}')`;

        RUN_BUTTON.setAttribute("onclick", RUN_BUTTON_FUNCTION);
        RUN_BUTTON.innerText = `Run ${ALGORITHM_NAME}`;
    }
})

// For every speed option inside the navigation
document.getElementById("speed-dropdown").querySelectorAll("button").forEach(speedButton => {
    // If the user clicks on an speed option
    speedButton.onclick = () => {
        const SPEED_TYPE = speedButton.innerText;
        BOARD.speedTime = SPEED_TYPE.toLowerCase(); // Update the speed value

        for(let speedType in BOARD.speedTypes) {
            speedType = capitalize(speedType);
    
            if(SPEED_NAV.innerText.includes(speedType)) { 
                SPEED_NAV.innerText = SPEED_NAV.innerText.replace(speedType, SPEED_TYPE); 
                break;
            }
        }
    }
})

document.addEventListener("keypress", e => {
    const KEY = e.key.toLowerCase(); // Character

    switch(KEY) {
        case "s":
            // Start the pathfinding
            RUN_BUTTON.onclick()
            break

        case "c":
            // Clear the board
            BOARD.clearBoard()
            break
    }
});