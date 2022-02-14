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
        <div class="border border-dark mr-1" style="height: 18px; width: 18px; background-color: #007bff;"></div>
        Checked node
    </div>
    
    <div class="d-flex justify-content-center align-items-center">    
        <div class="border border-dark mr-1" style="height: 18px; width: 18px; background-color: slateblue;"></div>
        Next node
    </div>

    <div class="d-flex justify-content-center align-items-center">    
        <div class="border border-dark bg-warning mr-1" style="height: 18px; width: 18px;"></div>
        Fastest route
    </div>
</div>

<p class="text-center">* Information about the algorithm *</p>

<div class="my-2 d-table" id="nodes" style="margin: auto;">
    <?php for($row = 0; $row < 15; $row++){ ?>
        <div>
            <?php for($i = 0; $i < 15; $i++){ ?>
                <div class="node border border-dark float-left"></div>
            <?php } ?>
        </div>
    <?php } ?>
</div>