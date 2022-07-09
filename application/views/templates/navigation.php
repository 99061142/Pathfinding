<nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand">Pathfinding</a>

    <!-- Navigation toggler -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- /Navigation toggler -->

    <div class="collapse navbar-collapse mt-1" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <!-- Pathfinding algorithm options -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="algorithms-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">Algorithms</a>
                <div class="dropdown-menu mt-4" id="algorithm-options" aria-labelledby="algorithms-dropdown">
                    <button class="dropdown-item">BFS</button>
                    <button class="dropdown-item">DFS</button>
                    <button class="dropdown-item">Dijkstra</button>
                    <button class="dropdown-item" disabled>AStar</button>
                </div>
            </li>
            <!-- /Pathfinding algorithm options -->

            <!-- Board layouts -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="board-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">Layouts</a>
                <div class="dropdown-menu mt-4" aria-labelledby="board-layouts">
                    <button class="dropdown-item" id="maze" disabled>Maze</button>
                    <button class="dropdown-item" id="random-walls">Random walls</button>
                </div>
            </li>
            <!-- /Board layouts -->


            <!-- Run button -->
            <li class="nav-item">
                <button class="px-4 bg-green" id="run-button" value="dijkstra" disabled>Run </button>
            </li>
            <!-- /Run button -->

            <!-- Clear everything -->
            <li class="nav-item">
                <button class="buttton-as-anchor" id="clear-board">Clear board</button>
            </li>
            <!-- /Clear everything -->

            <!-- Clear walls -->
            <li class="nav-item">
                <button class="buttton-as-anchor" id="clear-walls">Clear walls</button>
            </li>
            <!-- /Clear walls -->

            <!-- Clear algorithm path -->
            <li class="nav-item">
                <button class="buttton-as-anchor" id="clear-path">Clear algorithm path</button>
            </li>
            <!-- /Clear algorithm path -->


            <!-- Speed options -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="speed-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">Speed: </a>
                <div class="dropdown-menu mt-4" id="speed-options" aria-labelledby="speed-dropdown">
                    <button class="dropdown-item">Slow</button>
                    <button class="dropdown-item">Normal</button>
                    <button class="dropdown-item">Fast</button>
                    <button class="dropdown-item">Instant</button>
                </div>
            </li>
            <!-- /Speed options -->
        </ul>
    </div>
</nav>