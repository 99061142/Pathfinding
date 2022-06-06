<main>
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <i class="fas fa-arrow-right border border-dark bg-success"></i>
                <p class="d-inline-block">Starting point</p>
            </div>

            <div class="col-sm">
                <i class="fas fa-home border border-dark bg-danger"></i>
                <p class="d-inline-block">End point</p>
            </div>

            <div class="col-sm">    
                <div class="border border-dark d-inline-block p-2" id="wall"></div>
                <p class="d-inline-block">Walls</p>
            </div>

            <div class="col-sm">    
                <div class="border border-dark d-inline-block p-2" id="found"></div>
                <p class="d-inline-block">Checked node</p>
            </div>
            
            <div class="col-sm">    
                <div class="border border-dark d-inline-block p-2" id="next"></div>
                <p class="d-inline-block">Next node</p>
            </div>

            <div class="col-sm">    
                <div class="border border-dark d-inline-block p-2" id="fastest"></div>
                <p class="d-inline-block">Fastest route</p>
            </div>
        </div>
    </div>

    <table class="my-2 d-flex justify-content-center">
        <tbody id="board">
            <?php for($row = 0; $row <= 36; $row++){ ?>
                <tr id="row">
                    <?php for($col = 0; $col <= 36; $col++){ ?>
                        <td class="node border border-dark float-left"></td>
                    <?php } ?>
                </tr>
            <?php } ?>
        </tbody>
    </table>
</main>