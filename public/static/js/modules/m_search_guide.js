document.addEventListener("DOMContentLoaded", function () { 
    
    var data = [];
    getData("games");
    
    function getData(path){
        $.ajax({
            url: '/v1/'+path,
            success: function(dt){
                if(path == "games") {
                    data.games = dt.data;
                } else if(path == "assets") {
                    data.assets = dt.data;
                }
                showLeftList();
            }
        })   
    }

    var srchSelect = document.querySelector(".m_srch_select");
    var seletedValue;
    var srchInput = document.querySelector("#m_search_item_name");
    var srchDel = document.querySelector(".m_srch_del");
    var srchBoxWrap = document.querySelector(".m_srch_bottomWrap");

    var srchBoxLeft = document.querySelector(".m_srch_box_left");
    var srchBoxRight = document.querySelector(".m_srch_box_right");

    var leftUl = srchBoxLeft.children[0];
    var rightUl = srchBoxRight.children[0];

    var inputSetTimeOut;

    switch(location.pathname) {
        case '/sells':
        case '/buys' :
            srchInput.setAttribute("placeholder", "게임자산 검색이 가능합니다");
            break;
        case '/etc-sells':
        case '/etc-buys' :
            srchInput.setAttribute("placeholder", "중고자산 검색이 가능합니다");
            break;
        case '/otc-sells':
        case '/otc-buys' :
            srchInput.setAttribute("placeholder", "코인자산 검색이 가능합니다");
            break;
    }

    srchInput.addEventListener("click", function() {
        showLeftList();
    })
    
    //[ 인풋 이벤트 ] : 왼쪽 카테고리에 검색어에 해당하는 리스트 추가
    srchInput.addEventListener("input", function(event){

        var that = this;

        clearTimeout(inputSetTimeOut);

        inputSetTimeOut = setTimeout(function(){
 
            var val = that.value;
            var srchVal = val.split(' ');
    
            var step01Rge = new RegExp(srchVal[0], "g");
            var step02Reg = new RegExp(srchVal[1], "g");
    
            var _arr;

            srchDel.style.display = "block"; 

            //카테고리박스 초기화
            removeList(leftUl);
            removeList(rightUl);
    
            //카테고리박스 사이즈 초기화
            setSize(1);
    
            //왼쪽 카테고리에 리스트 추가 게임이름 또는 서버명으로 검색했을때
            if( seletedValue == "games" ) { //게임자산일때
                
                //게임이름 또는 서버명으로 검색할때
                data.games.forEach(function(el){ 

                    if( el.game_name.match(step01Rge) != null && val != "" ) { //게임이름으로 검색할때
    
                        addList(el.game_name, leftUl);
                            

                    } else {

                        el.servers.forEach(function(e) { //서버명으로 검색할때

                            if(e.match(step01Rge) != null && val != "") {

                                addList(el.game_name+">"+e, leftUl, "game_with_server");

                            }
    
                        });

                    } 

                });

                //게임이름과 서버명으로 검색했을때
                if( srchVal[1] != undefined && srchVal[0] != " " ) {

                    removeList(rightUl);
                    setSize(0);
                    
                    _arr = data.games.filter(function(el){
                        return el.game_name == srchVal[0]; //검색한 게임이름을 가지고있는 객체를 반환
                    });

                    if( _arr.length == 0 ) { //첫번째 검색어와 일치되는 데이터가 없을때
                        removeList(leftUl);
                        removeList(rightUl);
                        setSize(1);
                        addList("검색결과가 없습니다", leftUl, "no_exist");
                        var NoExist = document.querySelector(".no_exist");
                        if(leftUl.childNodes[0]) { leftUl.childNodes[0].classList.add("clicked"); }
                        return;
                    }

                    _arr[0].servers.forEach(function(el){ //검색한 게임이름을 가지고있는 객체의 servers배열을 탐색하여 리스트추가
                        
                        if( el.match(step02Reg) != null && val != "" ) {

                            addList(el, rightUl);

                        }

                    });
                }
    
            } 
            // else if( seletedValue == "assets" ) { //현물자산일때
    
            //     data.assets.forEach(function(el){
    
    
            //         if( el.category1.match(step01Rge) != null && val != "" ) { //검색결과가 존재할때
    
            //             addList(el.category1, leftUl);
    
            //         }
    
            //     });
    
            // }

            if(  val == "" ){ //사용자가 텍스트를 모두 지웠을때

                srchDel.style.display = "none";
                showLeftList();

            }

            //검색결과없음 표시
            if(leftUl.childElementCount == 0){

                addList("검색결과가 없습니다", leftUl, "no_exist");

                var NoExist = document.querySelector(".no_exist");

            } else if(leftUl.childElementCount != 0 && NoExist ){

                leftUl.removeChild( NoExist );

            }

            if( leftUl.childNodes[0] ) { leftUl.childNodes[0].classList.add("clicked"); }
            if( rightUl.childNodes[0] ) { rightUl.childNodes[0].classList.add("clicked"); }
    
        }, 250);
        

    });
    
    //[ 키다운 이벤트 ] : 방향키에 따라 리스트를 강조 및 스크롤 조절, 스페이스와 엔터 키를 인식하여 다음카테고리 요소를 보여줌
    // srchInput.addEventListener("keydown", function(e){

    //     var val = this.value;
    //     var srchVal = val.split(' ');

    //     if(e.keyCode == 38 || e.keyCode == 40){
    //         var haveClassEl = document.querySelector(".clicked");
    //         var elTop = haveClassEl.offsetTop;
    
    //         if(e.keyCode == 38 && haveClassEl.previousSibling){
    
    //             haveClassEl.classList.remove("clicked");
    //             haveClassEl.previousSibling.classList.add("clicked");
    //             srchBoxLeft.scrollTop = elTop - 150;
    
    //         } else if(e.keyCode == 40 && haveClassEl.nextSibling) {
    
    //             haveClassEl.classList.remove("clicked");
    //             haveClassEl.nextSibling.classList.add("clicked");
    //             if( elTop > 120 ) { srchBoxLeft.scrollTop = elTop - 120; }
    
    //         }
    //     } else if( e.keyCode == 32 ) { //띄어쓰기시에 그다음 내용을 서버명으로 인식
            
    //         showRightList();
            
    //     }
        
    // });

    //[ 클릭 이벤트 ] : 왼쪽 카테고리에 리스트 추가
    srchSelect.addEventListener("change",function(e){
        srchBoxWrap.style.display = "none";

        if(srchSelect.value == "games"){
            srchInput.setAttribute("placeholder", "게임자산 검색이 가능합니다");
        } else if(srchSelect.value == "assets"){
            srchInput.setAttribute("placeholder", "중고자산 검색이 가능합니다");
        } else if(srchSelect.value == "otc"){
            srchInput.setAttribute("placeholder", "코인자산 검색이 가능합니다");
        }
        
    });

    //[ 클릭 이벤트 ] : 왼쪽 카테고리를 클릭하면 해당 카테고리에 맞는 리스트를 오른쪽에 추가
    leftUl.addEventListener("click", function(e){
        if( e.target.classList[0] == "game_with_server" ) {
            return;
        }
        showRightList(e);
    });

    //[ 클릭 이벤트 ] : 검색창 초기화
    srchDel.addEventListener("click", function(){
        srchDel.style.display = "none";
        srchInput.value = "";
        showLeftList();
    });

    //[ 클릭 이벤트 ] : 검색가이드박스를 보여주거나 없애줌
    document.addEventListener("click", function(e){
        
        if(e.target.offsetParent){
            if( 
                srchSelect.value == "games" && e.target.id == "m_search_item_name" ||
                srchSelect.value == "games" && e.target.offsetParent.classList[1] == "m_srch_bottomWrap"
            ){
                srchBoxWrap.style.display = "block";

            } else {

                srchBoxWrap.style.display = "none";

            }
        }
    });


    /****************************
     *****<< 커스텀 함수들 >>*****
     ***************************/
    /**
     * li태그를 동적으로 추가
     * @param {string | array} contents 추가할 리스트의 내용, 문자열이면 한개의 리스트출력 배열이면 배열의 길이만큼 리스트 출력
     * @param {object} ul 리스트가 위치할 ul태그
     * @param {string} className li태그가 가질 클래스네임
     * @param {string} href li태그의 자식 a태그가 가질 href값
     */
    function addList(contents, ul, className, href){ 

        if( typeof contents == "string" ) { //contents가 문자열일때

            var liEl = document.createElement("li");

            if( className ) { liEl.setAttribute("class", className); }

            liEl.innerText = contents;

            ul.appendChild(liEl);
            
        } else {

            contents.forEach(function(el){ //contents가 배열일때

                var liEl = document.createElement("li");

                liEl.innerText = el;

                ul.appendChild(liEl);

            });

        }

    }

    /**
     * li태그를 동적으로 삭제하는 함수
     * @param {object} ulEl 삭제할 리스트의 부모ul태그
     */
    function removeList(ulEl){
        while ( ulEl.hasChildNodes() ) { 
            ulEl.removeChild( ulEl.firstChild ); 
        }  
    }

    /**
     * 왼쪽 카테고리에 리스트 추가, 셀렉트박스로 선택한 옵션에 맞는 리스트를 왼쪽에 추가
     */
    function showLeftList(){
        
        srchBoxWrapWidth = srchBoxWrap.clientWidth;
        srchBoxWrapHeight = srchBoxWrap.clientHeight;

        //선택한 셀렉트박스의 값을 할당.
        seletedText = srchSelect.options[srchSelect.selectedIndex].innerText;
        seletedValue = srchSelect.options[srchSelect.selectedIndex].value;

        //카테고리박스 초기화
        removeList(leftUl);
        removeList(rightUl);

        //카테고리박스 사이즈 초기화
        setSize(1);

        //왼쪽 카테고리에 리스트 추가
        if( seletedValue == "games" ) { //게임자산일때

            data.games.forEach(function(el){

                addList(el.game_name, leftUl); //첫번째 인자값이 문자열
            
            });
        } 
        // else if( seletedValue == "assets"  ) { //현물자산일때

        //     data.assets.forEach(function(el){

        //         addList(el.category1, leftUl); //첫번째 인자값이 문자열

        //     });

        // }

        //첫번째 리스트에 클래스 추가
        if(leftUl.childNodes[0]) { leftUl.childNodes[0].classList.add("clicked"); }
    
    };

    /**
     * 특정 첫번째 카테고리에 해당하는 리스트들을 보여주는 함수
     * @param {object} e 클릭이벤트시 target객체 없을시에는 clicked라는 클래스를 가지고있는 왼쪽 li엘리먼트
     */
    function showRightList(e){

        var target = e != undefined ? e.target : leftUl.querySelector("li[class~='clicked']");
        
        //no_exist라는 클래스를 가지고있는 li태그가 있다면 함수실행종료
        if( leftUl.querySelector("li[class~='no_exist']") != undefined ){
            return;
        }

        //클릭한 li에 배경색 추가하고 다른 li배경색 삭제
        if(target.nodeName == "LI"){
            for( var i = 0, max = leftUl.children.length; i < max; i ++ ){
                leftUl.children[i].classList.remove("clicked");
            }
            target.classList.add("clicked");
        }
        
        //오른쪽 카테고리박스 초기화
        removeList(rightUl);

        //카테고리박스 사이즈 초기화
        setSize(0);

        //오른쪽 카테고리박스에 리스트 추가
        if( seletedValue == "games" ) { //게임자산일때

            addList("서버전체", rightUl, "clicked");

            data.games.forEach(function(el){

                if( target.innerText == el.game_name ){

                    addList(el.servers, rightUl); //첫번째 인자값이 배열

                }
                
            });

        } else if( seletedValue == "assets" ) { //현물자산일때

            addList("세부카테고리전체", rightUl, "clicked");

            data.assets.forEach(function(el){

                if( target.innerText == el.category1 ){

                    addList(el.category2, rightUl); //첫번째 인자값이 배열

                }
                
            });

        }

    }

    /**
     * 왼쪽 오른쪽 박스의 사이즈 초기화
     * @param {number} num 0이면 오른쪽 박스를 보여주고 아니면 안보여줌
     */
    function setSize(num){

        if(num == 0){

            srchBoxLeft.classList.remove("hideLeftSize");
            srchBoxRight.classList.remove("hideRightSize");

            srchBoxLeft.classList.add("showLeftSize");
            srchBoxRight.classList.add("showRightSize");

        } else {

            srchBoxLeft.classList.remove("showLeftSize");
            srchBoxRight.classList.remove("showRightSize");

            srchBoxLeft.classList.add("hideLeftSize");
            srchBoxRight.classList.add("hideRightSize");
    
        }
  
    }

});