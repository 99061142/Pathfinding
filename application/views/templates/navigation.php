<nav class="navbar navbar-expand-lg navbar-light">
    <a class="navbar-brand">Pathfinding</a> <!-- /Title -->

    <!-- Navigation toggler -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- /Navigation toggler -->

    <div class="collapse navbar-collapse mt-1" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <!-- Algorithms -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="changeDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Algorithms</a>
                <div class="dropdown-menu mt-4" id="algorithm-dropdown" aria-labelledby="changeDropdownMenu">
                    <button class="dropdown-item">Dijkstra</button>
                    <button class="dropdown-item">A*</button>
                </div>
            </li>
            <!-- /Algorithms -->

            <!-- Random layouts -->
            <li class="nav-item dropdown">
                <a class="dropdown-toggle" id="changeDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Layouts</a>
                <div class="dropdown-menu mt-4" id="algorithm-dropdown" aria-labelledby="changeDropdownMenu">
                    <button class="dropdown-item" onclick="">Self</button>
                    <button class="dropdown-item" onclick="">Maze</button>
                </div>
            </li>
            <!-- /Random layouts -->


            <!-- Run the algorithm -->
            <li class="nav-item">
                <button class="px-4 bg-green" id="run-button" onclick=make_path()>Run</button>
            </li>
            <!-- /Run the algorithm -->

            <!-- Reset all the nodes on the board -->
            <li class="nav-item">
                <button class="buttton-as-anchor" onclick="clear_board()">Clear board</button>
            </li>
            <!-- /Reset all the nodes on the board -->

            <!-- Reset all the walls on the board -->
            <li class="nav-item">
                <button class="buttton-as-anchor" onclick="clear_node_background('walls')">Clear walls</button>
            </li>
            <!-- /Reset all the walls on the board -->

            <!-- Clear the path the algorithm made -->
            <li class="nav-item">
                <button class="buttton-as-anchor" onclick="">Clear algorithm path</button>
            </li>
            <!-- /Clear the path the algorithm made -->
        </ul>
    </div>
</nav>  
<div class="container">