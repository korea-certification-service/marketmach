window.addEventListener("load", function(){
    var price = document.querySelector("#price");
    var point = document.querySelector("#point");
    var amount = document.querySelector("#amount");

    if(price != null){
        price.setAttribute("maxLength", "10");
        price.addEventListener("input", function(){
            maxLengthCheck(price)
        });
    }
    if(point != null){
        point.setAttribute("maxLength", "14");
        point.addEventListener("input", function(){
            maxLengthCheck(point)
        });
    }
    if(amount != null){
        amount.setAttribute("maxLength", "14");
        amount.addEventListener("input", function(){
            maxLengthCheck(amount)
        });
    }

    function maxLengthCheck(object){
        if (object.value.length > object.maxLength){
            object.value = object.value.slice(0, object.maxLength);
        }    
    }
});