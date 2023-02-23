import { Component } from "react";

class Algorithm {
    constructor(props) {
        this.props = props
    }

    setVisited(row, cell) {
        this.props.setCellData({name: 'visited'}, row, cell)
    }

    
    setNext(row, cell) {
        this.props.setCellData({name: 'next'}, row, cell)
    }

    
    setFastest(row, cell) {
        this.props.setCellData({name: 'fastest'}, row, cell)
    }

    sleep() {
        let ms = 100 - this.props.speed;
        if(ms == 0) { return }
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default Algorithm;