addEventListener("load", function(){
    var radioTags = document.querySelectorAll("input[type=radio]");

    var historyObj = { ctgry: null, state: null };

    console.log(history.state);

    if( history.state != null ) {
        var ctgryCheck = history.state.ctgry;
        var stateCheck = history.state.state;

        var ctgry = document.querySelector("#"+ctgryCheck);
        var state = document.querySelector("#"+stateCheck);

        if(ctgryCheck != null ){
            ctgry.setAttribute("checked", true);
            console.log(ctgry);
        }
        if(stateCheck != null ){
            state.setAttribute("checked", true);
            console.log(state);
        }
    }

    radioTags.forEach(el => {
        el.addEventListener("click", function(){
            var title = el.parentElement.previousSibling.previousSibling.innerText;

            if(title == "상품유형") {
                historyObj.ctgry = this.id;
            } else if(title == "거래상태"){
                historyObj.state = this.id;
            }

            console.log(historyObj);
            
            history.pushState(historyObj, "선택한 radio태그정보 저장", location.href);
        });
    });

});