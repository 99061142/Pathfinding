import { Node } from './node.js';
import { Bfs } from './algorithms/bfs.js';
import { Dfs } from './algorithms/dfs.js';
import { Dijkstra } from './algorithms/dijkstra.js';
import { Astar } from './algorithms/astar.js';

export class Board extends Node {
    #height = document.querySelectorAll('#board > tr').length;
    #width = document.querySelectorAll('#board > tr')[0].children.length;

    constructor() {
        super();
        this.columnType = "td";
        this.standardClasses = document.getElementsByTagName(this.columnType)[0].classList.value;
        this.list = this.createList();
        this.isRunning = false;
        this.importantNames = ["start", "end"];
        this.currentSpeedType = "normal";
        this.speedTypes = {
            slow: 50, 
            normal: 25, 
            fast: 5, 
            instant: 0
        };
    }

    get nodes() {
        return document.querySelectorAll(this.columnType);
    }

    get speed() {
        return this.speedTypes[this.currentSpeedType];
    }

    createList() {
        // Create a list of lists with the size of the board and fill it with 0 (empty node)
        return Array.from({length: this.#height}, () => Array.from({length: this.#width}, () => 0));
    }

    sleep() {
        if(this.speed) { return new Promise(resolve => setTimeout(resolve, this.speed)); }
    }

    emptyBoardColumn(position) {
        const [ROW, COL] = position;
        this.list[ROW][COL] = 0;
    }

    fillBoardColumn(position) {
        const [ROW, COL] = position;
        this.list[ROW][COL] = 1;
    }

    clearAlgorithmPath() {
        if(!this.isRunning) { 
            const CLASSES = ["#found", "#next", "#fastest"];
            this.clearSpecificElements(CLASSES);
        }
    }

    clearWalls() {
        if(!this.isRunning) {
            const CLASSES = ["#wall"];
            this.clearSpecificElements(CLASSES);
        }
    }

    clearBoard() {
        if(!this.isRunning) {
            const CLASSES = ["#start", "#end"];
            this.clearSpecificElements(CLASSES);
            this.clearAlgorithmPath();
            this.clearWalls();
        }
    }

    clearSpecificElements(classes) {
        classes = classes.map(classes => this.columnType + classes);

        // Set all the elements with the specified classes to the standard attributes
        document.querySelectorAll(classes).forEach(element => this.setStandardAttributes(element));
    }

    canRun() {
        return !this.isRunning && this.startPosition && this.endPosition; // If the algorithm can be runned
    }

    algorithm_class(algorithm) {
        switch(algorithm) {
            case "bfs":
                return new Bfs(this);
            case "dfs":
                return new Dfs(this);
            case "dijkstra":
                return new Dijkstra(this);
            case "astar":
                return new Astar(this);
        }
    }

    deleteWeightNodes() {
        document.querySelectorAll(this.columnType + "[id*='weight']").forEach(element => {
            element.id = element.id.replace("weight", "").toLowerCase();
            element.className = this.standardClasses;
        });
    }

    standardWeightStyling() {
        document.querySelectorAll(this.columnType + "[id*='weight']").forEach(element => {
            element.id = "weight";
        });
    }

    makePath(algorithm) {
        if(this.canRun()) {
            this.clearAlgorithmPath();
            this.standardWeightStyling();
            this.isRunning = true;
            this.runButton.disabled = true;

            this.algorithm_class(algorithm).run().then(route => {
                // make the shortest path
                this.fastestRoute(route).then(() => {
                    this.isRunning = false;
                    this.runButton.disabled = false;
                });
            });
        }
    }

    async fastestRoute(route) { 
        if(!route) { return; }
        
        for(let position of route) { 
            await this.fastest(position);
        }
    }

    randomWalls() {
        if(!this.isRunning) {
            document.querySelectorAll(this.columnType).forEach(element => {
                // 33% chance to make the wall if it's not an important node
                if(!this.importantNames.includes(element.id) && Math.random() <= 0.33) {          
                    this.wall(element);
                }
            });
        }
    }
}