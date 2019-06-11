window.addEventListener("load", function(){
    var price = document.querySelector("#price");
    var point = document.querySelector("#point");

    price.setAttribute("maxLength", "10");
    point.setAttribute("maxLength", "14");

    price.addEventListener("input", function(){
        maxLengthCheck(price)
        console.log(1);
    });
    point.addEventListener("input", function(){
        maxLengthCheck(point)
    });

    function maxLengthCheck(object){
        if (object.value.length > object.maxLength){
          object.value = object.value.slice(0, object.maxLength);
        }    
      }
});