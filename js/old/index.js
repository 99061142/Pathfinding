let capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);
let neighbourPosition = (position, direction) => position.map((value, i) => value += direction[i]);