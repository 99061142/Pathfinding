const RUN_BUTTON = document.getElementById("run-button");

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
        BOARD.speedTime = speedButton.innerText.toLowerCase(); // Update the speed value
    }
})