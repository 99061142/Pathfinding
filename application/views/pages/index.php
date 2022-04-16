<main>
    <div class="container">
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
                <div id="wall" class="border border-dark mr-1" style="height: 18px; width: 18px;"></div>
                Walls
            </div>

            <div class="d-flex justify-content-center align-items-center">    
                <div id="found" class="border border-dark mr-1" style="height: 18px; width: 18px;"></div>
                Checked node
            </div>
            
            <div class="d-flex justify-content-center align-items-center">    
                <div id="next" class="border border-dark mr-1" style="height: 18px; width: 18px;"></div>
                Next node
            </div>

            <div class="d-flex justify-content-center align-items-center">    
                <div id="fastest" class="border border-dark mr-1" style="height: 18px; width: 18px;"></div>
                Fastest route
            </div>
        </div>
    </div>

    <div class="mt-4 d-table" id="nodes" style="margin: auto;"></div>
</main>