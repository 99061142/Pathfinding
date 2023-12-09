import Algorithm from "./algorithm";

class Dfs extends Algorithm {
    constructor(props) {
        super(props);
        this._path = {
            [props.startPos]: null
        };
        this._notMovablePositions = [props.startPos.join(',')];
    }

    get route() {
        // Loop from the position that found the end position to the position that has the start position as parent
        let parent = this._path[this.props.endPos];
        let path = [];
        while (!this.isStartPos(parent)) {
            path.push(parent);
            parent = this._path[parent];
        }
        return path
    }

    canMove(pos) {
        // If the cell isn't in bounds, not possible to reach (wall), or already queued / visited, return false, else true
        if (
            !this.cellInBounds(pos) || 
            this.cellWeight(pos) === Infinity ||
            this._notMovablePositions.includes(pos.join(','))
        ) {
            return false
        }
        return true
    }

    async run() {
        let queue = [this.props.startPos]
        while (queue.length) {
            // Select the last position in the queue and dequeue it
            const CURRENT = queue.pop();

            // If the current position is the end position, show and return the route
            if (this.isEndPos(CURRENT)) {
                await this.animateSearch();
                await this.animateRoute(this.route);
                return
            }

            const NEIGHBOURS = this.neighbours(CURRENT)
            for (const neighbour of NEIGHBOURS) {
                // If the position is not movable, continue
                if (!this.canMove(neighbour)) {
                    continue
                }

                // Save the neighbour parent
                this._path[neighbour] = CURRENT;

                // Queue the position, add the position to the "notMovablePositions" list
                // and set the element as 'queued' if the neighbour position isn't the end position
                queue.push(neighbour);
                if (!this.isEndPos(neighbour)) {
                    this._notMovablePositions.push(neighbour.join(','));
                    
                    // Push a list with the position and 'queued' to the animations list
                    // to show the user how the algorithm is working/
                    // The first list value is the position of the cell, and the second is the type what the cell gets
                    this.animations.push([
                        neighbour, 
                        "queued"
                    ]);
                }
            }

            if (!this.isStartPos(CURRENT)) {
                // Push a list with the position and 'visited' to the animations list 
                // to show the user how the algorithm is working
                // The first list value is the position of the cell, and the second is the type what the cell gets
                this.animations.push([
                    CURRENT,
                    "visited"
                ]);
            }
        }
        await this.animateSearch();
    }
}

export default Dfs;