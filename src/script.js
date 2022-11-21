$(document).ready(function () {
    displayTable();
    //add button to add movie to table
    $(document).on('click', '#addBtn', function(){
        var title = $("#title").val();
        var rating = $("#rating").val();
        if(title != "" && rating != ""){
            $.ajax({
                type: "POST",
                url: "./addMovie.php",
                data: {title : title, rating : rating},
                dataType: "json",
                success: function (res) {
                    console.log(res);
                   displayTable();
                   $("#title").val("");
                   $("#rating").val("");
                }
            });
        }else{
            alert("Fields cannot be empty")
        }
    })
    //delete button click function
    $(document).on('click', '.btn-danger', function(){
        var id = $(this).attr("id");
        if(confirm("Are you sure?"))
        $.ajax({
            type: "POST",
            url: "./deleteMovie.php",
            data: {id : id},
            dataType: "json",
            success: function (response) {
                displayTable();
            }
        });
    });
    //click function when user clicks on ascending button
    $(document).on('click', '.asc', function(){
        var orderBy = $(this).attr("value");
        $.ajax({
            type: "get",
            url: "./getData.php",
            dataType: "json",
            success: function (data) {
                if(orderBy == "rating"){
                    data.sort((a, b) => {
                        return a.rating - b.rating;
                    });
                    displaySortedTable(data);
                }  else{
                    data.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                    
                        if (fa < fb) {
                            return -1;
                        }
                        if (fa > fb) {
                            return 1;
                        }
                        return 0;
                    });
                    displaySortedTable(data);
                }
            }
        });
    });
    //click function when user clicks on descending button
    $(document).on('click', '.desc', function(){
        var orderBy = $(this).attr("value");
        $.ajax({
            type: "get",
            url: "./getData.php",
            dataType: "json",
            success: function (data) {
                if(orderBy == "rating"){
                    data.sort((a, b) => {
                        return  b.rating - a.rating;
                    });
                    displaySortedTable(data);
                }  else{
                    data.sort((a, b) => {
                        let fa = a.title.toLowerCase(),
                            fb = b.title.toLowerCase();
                    
                        if (fa > fb) {
                            return -1;
                        }
                        if (fa < fb) {
                            return 1;
                        }
                        return 0;
                    });
                    displaySortedTable(data);
                }
            }
        });
    });
});
//display function
function displaySortedTable(data){
    
                var str = `<table class="table table-striped"><tr><th style="width: 70%; padding-left:30%">
    <div class="d-flex"><div class="pt-3">Title</div><div class="d-flex flex-column"> 
            <div>
                <a style="font-size: 12px; padding:5px" value="title" class="btn desc"><i class="fa-solid fa-angle-up"></i></a>
            </div>
            <div>
                <a style="font-size: 12px; padding:5px" value="title" class="btn asc"><i class="fa-solid fa-angle-down"></i></a>
            </div></div></div></th> <th><div class="d-flex"><div class="pt-3">
            Rating
        </div>
        <div class="d-flex flex-column"> 
            <div >
                <a style="font-size: 12px; padding:5px" value="rating" class="btn desc"><i class="fa-solid fa-angle-up"></i></a>
            </div>
            <div >
                <a style="font-size: 12px; padding:5px" value="rating" class="btn asc"><i class="fa-solid fa-angle-down"></i></a>
            </div></div> </div></th>
            <th><div class="pt-3">Delete</div> </th></tr>`;
            var c =0;
            data.forEach(element => {
            str += `<tr style="text-align:center;"><td>${element.title}</td><td>${element.rating}</td><td><button id="${c++}"class="btn btn-danger">Delete</button></td></tr>`
            });

            str += `</table>`;
            $("#displayTable").html(str);
            
}
function displayTable(){
    $.ajax({
        type: "get",
        url: "./getData.php",
        dataType: "json",
        success: function (res) {
            if(res.length != 0){
                var str = `<table class="table table-striped"><tr><th style="width: 70%; padding-left:30%">
    <div class="d-flex"><div class="pt-3">Title</div><div class="d-flex flex-column"> 
            <div>
                <a style="font-size: 12px; padding:5px" value="title" class="btn desc"><i class="fa-solid fa-angle-up"></i></a>
            </div>
            <div>
                <a style="font-size: 12px; padding:5px" value="title" class="btn asc"><i class="fa-solid fa-angle-down"></i></a>
            </div></div></div></th> <th><div class="d-flex"><div class="pt-3">
            Rating
        </div>
        <div class="d-flex flex-column"> 
            <div >
                <a style="font-size: 12px; padding:5px" value="rating" class="btn desc"><i class="fa-solid fa-angle-up"></i></a>
            </div>
            <div >
                <a style="font-size: 12px; padding:5px" value="rating" class="btn asc"><i class="fa-solid fa-angle-down"></i></a>
            </div></div> </div></th>
            <th><div class="pt-3">Delete</div> </th></tr>`;
            var c =0;
            res.forEach(element => {
            str += `<tr style="text-align:center;"><td>${element.title}</td><td>${element.rating}</td><td><button id="${c++}"class="btn btn-danger">Delete</button></td></tr>`
            });

            str += `</table>`;
            $("#displayTable").html(str);
            } else{
                $("#displayTable").html("<h2>No Movies to show</h2>");
            }
        }
    });
    
}