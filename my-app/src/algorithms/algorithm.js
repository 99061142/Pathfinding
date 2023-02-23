import { Component } from "react";

class Algorithm {
    constructor(props) {
        this.props = props
    }

    sleep() {
        let ms = 100 - this.props.speed;
        if(ms == 0) { return }
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Algorithm;