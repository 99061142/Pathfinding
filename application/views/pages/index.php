<div class="d-flex justify-content-around my-2">
    <div>
        <p>
            <i class="fas fa-arrow-right"></i>
            Starting point
        </p>
    </div>

    <div>
        <p>
            <i class="fas fa-home"></i>
            End point
        </p>
    </div>

    <div>
        <p>
            <i class="fas fa-square"></i>
            Walls
        </p>
    </div>

        <p>
            <i class="fas fa-square text-warning"></i>
            Fastest route
        </p>
    </div>
</div>

<p class="text-center">* Information about the algorithm *</p>

<div class="nodes my-2">
    <?php for($i = 0; $i <= 5; $i++){ ?>
        <div>
            <?php for($x = 0; $x <= 5; $x++){ ?>
                <div class="node"></div>
            <?php } ?>
        </div>
    <?php } ?>
</div>