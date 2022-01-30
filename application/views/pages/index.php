<div class="d-flex justify-content-around my-2">
    <p class="m-0">
        <i class="fas fa-arrow-right border border-dark bg-success"></i>
        Starting point
    </p>

    <p class="m-0">
        <i class="fas fa-home border border-dark bg-danger"></i>
        End point
    </p>

    <div class="d-flex justify-content-center align-items-center">    
        <div class="border border-dark mr-1" style="background-color: black; height: 18px; width: 18px;"></div>
        Walls
    </div>

    <div class="d-flex justify-content-center align-items-center">    
        <div class="border border-dark mr-1 bg-primary" style="height: 18px; width: 18px;"></div>
        Checked node
    </div>

    <div class="d-flex justify-content-center align-items-center">    
        <div class="border border-dark bg-warning mr-1" style="height: 18px; width: 18px;"></div>
        Fastest route
    </div>
</div>

<p class="text-center">* Information about the algorithm *</p>

<div class="my-2 d-table" id="nodes">
    <?php for($row = 0; $row < 25; $row++){ ?>
        <div>
            <?php for($i = 0; $i < 25; $i++){ ?>
                <div class="border border-dark float-left node"></div>
            <?php } ?>
        </div>
    <?php } ?>
</div>