<div class="d-flex justify-content-around">
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
</div>

<p class="text-center mt-4 mb-2">* Information about the algorithm *</p>

<div class="div-center">
    <?php for($i = 0; $i <= 25; $i++){ ?>
        <div class="div-center">
            <?php for($x = 0; $x <= 75; $x++){ ?>
                <div class="node"></div>
            <?php } ?>
        </div>
    <?php } ?>
</div>