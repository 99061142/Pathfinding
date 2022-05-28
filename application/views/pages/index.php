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
                <div id="wall" class="border border-dark d-inline-block p-2"></div>
                <p class="d-inline-block">Walls</p>
            </div>

            <div class="col-sm">    
                <div id="found" class="border border-dark d-inline-block p-2"></div>
                <p class="d-inline-block">Checked node</p>
            </div>
            
            <div class="col-sm">    
                <div id="next" class="border border-dark d-inline-block p-2"></div>
                <p class="d-inline-block">Next node</p>
            </div>

            <div class="col-sm">    
                <div id="fastest" class="border border-dark d-inline-block p-2"></div>
                <p class="d-inline-block">Fastest route</p>
            </div>
        </div>
    </div>

    <table class="my-2 d-flex justify-content-center">
        <tbody id="board">
            <?php for($row = 0; $row <= 36; $row++){ ?>
                <tr id="row">
                    <?php for($col = 0; $col <= 36; $col++){ ?>
                        <td class="node"></td>
                    <?php } ?>
                </tr>
            <?php } ?>
        </tbody>
    </table>
</main>