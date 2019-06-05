//var communityId = "<%= communityId %>";
//var userTag = "<%= userTag %>";
//var replyCount = 0;
$(document).ready(function() {
    //getDetail();

    $('#addReply').on('click',function(){
        addReply();
    });

    $('#add_reply').on('click', function() {
        if(userTag == "") {
            alert("댓글 작성을 위해 로그인이 필요합니다.");
            location.href = "/login";
        }
    });
});

function getDetail() {
    $.ajax({
        method: "GET",
        url: "/community/detail/" + communityId,
    }).done(function (success) {
        console.log(success.data);
        var type = getCommunityType(success.data.type);
        var title = success.data.title;
        var reporter = success.data.reporter;
        var regDate = success.data.regDate.substring(2, 10);
        var content = success.data.type == 'movie' ? success.data.content : "<div>" + replaceDesc(success.data.content) + "</div>";
        var movieUrl = success.data.movieUrl;
        var replys = success.data.reply;
        var image = success.data.images.length ==0 ? "" : "<div style='text-align: center;'><img style='align: center;' src='" + success.data.images[0].path + "'></div>";

        $('#title').text(title);   
        if(success.data.type == 'movie') {
            $('#content').addClass("hasYoutube").html("<iframe width='100%' height='100%' src=\'" + movieUrl + "\' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>");   
        } else {
            $('#content').html(image + content);   
        }
        replyCount = replys.length;
        getReply(replys);
    }).fail(function (fail) {
        console.log(fail);
    })
}

function getReply(replys) {
    var strDOM = "";
    if(replys.length == 0) {
        $('.reply_list').html("<li>등록된 댓글이 없습니다.</li>");
        return;
    }

    for(var i=0;i<replys.length;i++) {
        strDOM += '<li>' + 
                        '<dl class="rep_origin rep_common">' + 
                            '<dt>' + 
                                '<div class="item_txt">' + 
                                    '<i class="material-icons">account_circle</i>' + 
                                    '<span class="rep_name">'+replys[i].reporter+'</span>' + 
                                    '<span class="rep_date">'+replys[i].regDate+'</span>' + 
                                '</div>';
        if(replys[i].reporter == userTag) {
            strDOM +=   '<div class="item_btn" id="item_btn_'+replys[i]._id+'">' + 
                            '<button class="fc3" onclick="modifyReply(\''+replys[i]._id+'\')">수정</button>' + 
                            '<button class="fcrd" onclick="deleteReply(\''+replys[i]._id+'\')">삭제</button>' + 
                        '</div>'; 
        }
        strDOM +=        '</dt>' +
                            '<input type="hidden" id="hid_content'+replys[i]._id+'" value="'+replys[i].content+'">' + 
                            '<dd id="modify_area'+replys[i]._id+'">' + 
                                replaceDesc(replys[i].content) + 
                            '</dd>' + 
                        '</dl>' + 
                    '</li>';
    }
    $('.reply_list').html(strDOM);
}

function addReply() {
    if($('#add_reply').val() == "") {
        alert('내용을 입력하세요.');
        return;
    }

    var data = {
        "communityId": communityId,
        "content": $('#add_reply').val(),
        "count": 0,
        "reporter": userTag,
        "recommandCount": 0,
        "nottobeCount": 0
    }

    console.log(data);

    $.ajax({
        method: "POST",
        url: "/v1/community/reply",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            $("#addReply").attr('disabled', true);
        }
    }).done(function (success) {
        console.log(success);
        //location.href = '/community/board/detail/' + success.data._id;
        var reply = success.data;
        var strDOM = "";
        strDOM += '<li>' + 
                        '<dl class="rep_origin rep_common">' + 
                            '<dt>' + 
                                '<div class="item_txt">' + 
                                    '<i class="material-icons">account_circle</i>' + 
                                    '<span class="rep_name">'+reply.reporter+'</span>' + 
                                    '<span class="rep_date">'+reply.regDate+'</span>' + 
                                '</div>';
        strDOM +=   '<div class="item_btn" id="item_btn_'+reply._id+'">' + 
                            '<button class="fc3" onclick="modifyReply(\''+reply._id+'\')">수정</button>' + 
                            '<button class="fcrd" onclick="deleteReply(\''+reply._id+'\')">삭제</button>' + 
                        '</div>'; 
        strDOM +=        '</dt>' +
                            '<input type="hidden" id="hid_content'+reply._id+'" value="'+reply.content+'">' + 
                            '<dd id="modify_area'+reply._id+'">' + 
                                replaceDesc(reply.content) + 
                            '</dd>' + 
                        '</dl>' + 
                    '</li>';
    
        if(replyCount == 0) {
            $('.reply_list').html('');    
        }
        $('.reply_list').prepend(strDOM);
        $('#add_reply').val('');
        $('#addReply').attr('disabled', false);
    }).fail(function (fail) {
        $('#addReply').attr('disabled', false);
    })
}

function modifyReply(id) {
    $('#modify_area' +id).html('<textarea id="modify_reply" class="form-control" maxlength="300" style="height: 80px">'+$('#hid_content'+id).val()+'</textarea>');
    $('#modify_area' +id).append('<div class="item_btn"><button class="fc3" onclick="update(\''+id+'\')">저장</button><button class="fcrd" onclick="initContent(\''+id+'\')">취소</button></div>');
    $('#item_btn_'+id).hide();
}

function update(id) {
    var data = {
        "content": $('#modify_reply').val()
    }

    console.log(id, data);

    $.ajax({
        method: "PUT",
        url: "/v1/community/reply/" + id,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            $(".item_btn button").attr('disabled', true);
        }
    }).done(function (success) {
        console.log(success);
        initContent(id, success.data.content)
        $(".item_btn button").attr('disabled', false);
    }).fail(function (fail) {
        $(".item_btn button").attr('disabled', false);
    })
}

function initContent(id,content) {
    if(content != undefined) {
        $('#hid_content'+id).val(content);
    }
    
    $('#modify_area' +id).html(replaceDesc($('#hid_content' + id).val()));
    $('#item_btn_'+id).show();
}

function deleteReply(id) {
    var confirmYn = confirm('정말로 삭제하시겠습니까?');
    if(confirmYn) {
        console.log(id);

        $.ajax({
            method: "DELETE",
            url: "/v1/community/reply/" + id,
            beforeSend: function (xhr) {
                $(".item_btn button").attr('disabled', true);
            }
        }).done(function (success) {
            console.log(success);
            location.href = '/community/board/detail/' + communityId;
            $(".item_btn button").attr('disabled', false);
        }).fail(function (fail) {
            $(".item_btn button").attr('disabled', false);
        })
    }
}