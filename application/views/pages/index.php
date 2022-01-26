<div class="d-flex justify-content-around my-2">
    <p>
        <i class="fas fa-arrow-right"></i>
        Starting point
    </p>

    <p>
        <i class="fas fa-home"></i>
        End point
    </p>

    <p>    
        <i class="fas fa-square"></i>
        Walls
    </p>

    <p>
        <i class="fas fa-square text-warning"></i>
        Fastest route
    </p>
</div>

<p class="text-center">* Information about the algorithm *</p>

<div class="d-flex justify-content-center my-2" id="nodes">
    <?php for($row = 0; $row < 75; $row++){ ?>
        <div>
            <?php for($i = 0; $i < 32; $i++){ ?>
                <div class="node border border-dark"></div>
            <?php } ?>
        </div>
    <?php } ?>
</div>