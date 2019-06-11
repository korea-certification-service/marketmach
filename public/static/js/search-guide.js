window.addEventListener("load" ,function(){
    var searchInput = document.querySelector("#search_item_name");
    var textSearchBox = document.querySelector(".textSearchBox");

    var target = document.querySelector(".sch_selec");


    searchInput.addEventListener("focus", function(){
        textSearchBox.classList.add("show_textSearchBox");
    });
    window.addEventListener("click", function(){
        textSearchBox.classList.remove("show_textSearchBox");
    });

    target.addEventListener("click", function(e){
        console.log(e.currentTarget);
    });

    console.log(searchInput);
});