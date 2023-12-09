import { Component } from "react";

class Animations extends Component {
    constructor(props) { 
        super(props);
        this.animations = [];
    }

    setCellType(pos, type) {
        const [ROW, COL] = pos;
        const CELL = this.props.board[ROW][COL].current;
        CELL.type = CELL.type.includes('weight') ? "weight-" + type : type;
    }

    async animateRoute(route) {
        for (const pos of route) {
            this.setCellType(pos, 'route');
            await this.sleep();
        }
    }

    async animateSearch() {
        for (const [pos, type] of this.animations) {
            this.setCellType(pos, type);
            if (type === "visited") await this.sleep()
        }
    }

    async sleep() {
        // SLeep X ms based on the current speed [1, 100]
        const MS = Number(this.props.speedRef.current.max) + 1 - this.props.getSpeed();
        return new Promise((resolve) => setTimeout(resolve, MS));
    }
}

export default Animations;