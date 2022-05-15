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
                <a class="dropdown-toggle" id="algorithms" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">Algorithms</a>
                <div class="dropdown-menu mt-4" id="algorithm-dropdown" aria-labelledby="algorithms">
                    <button class="dropdown-item">BFS</button>
                    <button class="dropdown-item">DFS</button>
                    <button class="dropdown-item" disabled>Dijkstra</button>
                    <button class="dropdown-item" disabled>AStar</button>
                </div>
            </li>
            <!-- /Pathfinding algorithm options -->

            <!-- Board layouts -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="board-layouts" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">Layouts</a>
                <div class="dropdown-menu mt-4" aria-labelledby="board-layouts">
                    <button class="dropdown-item" onclick=BOARD.create_maze()>Maze</button>
                    <button class="dropdown-item" onclick=BOARD.random_walls()>Random walls</button>
                </div>
            </li>
            <!-- /Board layouts -->


            <!-- Run button -->
            <li class="nav-item">
                <button class="px-4 bg-green" id="run-button" onclick="BOARD.make_path('bfs')" disabled>Run DFS</button>
            </li>
            <!-- /Run button -->

            <!-- Clear everything -->
            <li class="nav-item">
                <button class="buttton-as-anchor" onclick="BOARD.clear_board()">Clear board</button>
            </li>
            <!-- /Clear everything -->

            <!-- Clear walls -->
            <li class="nav-item">
                <button class="buttton-as-anchor" onclick="BOARD.clear_walls()">Clear walls</button>
            </li>
            <!-- /Clear walls -->

            <!-- Clear algorithm path -->
            <li class="nav-item">
                <button class="buttton-as-anchor" onclick="BOARD.clear_algorithm_path()">Clear algorithm path</button>
            </li>
            <!-- /Clear algorithm path -->


            <!-- Speed options -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="pathfinding-speed" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="button">Speed</a>
                <div class="dropdown-menu mt-4" id="speed-dropdown" aria-labelledby="pathfinding-speed">
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