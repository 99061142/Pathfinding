<nav class="navbar navbar-expand-lg navbar-light bg-success mb-4">
    <!-- Title / homepage -->
    <a class="navbar-brand p-0 pr-3" href="<?= site_url() ?>">Home</a>
    <!-- /Title / homepage -->

    <!-- Navigation toggler -->
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- /Navigation toggler -->

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">

            <!-- About  -->
            <li class="navbar-nav">
                <a class="nav-link text-white" href="<?= site_url('about') ?>">About</a>
            </li>
            <!-- /About -->

            <!-- navigation tests -->
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-white" href="#" id="changeDropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">test</a>
                <div class="dropdown-menu" aria-labelledby="changeDropdownMenu">
                    <a class="dropdown-item" href="">test</a>
                    <a class="dropdown-item" href="">test</a>
                    <a class="dropdown-item" href="">test</a>
                </div>
            </li>
            <!-- /navigation tests -->
        </ul>
    </div>
</nav>
<div id="container">