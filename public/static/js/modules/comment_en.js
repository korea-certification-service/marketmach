//var communityId = "<%= communityId %>";
//var userTag = "<%= userTag %>";
var replyCount = 0;
$(document).ready(function() {
    getDetail();

    $('#addReply').on('click',function(){
        ajaxLoginYnCheck(addReply);
    });

    $('#add_reply').on('click', function() {
        if(userTag == "") {
            alert("You need to sign up for writing comment.");
            location.href = "/login";
        }
    });
});

function getDetail() {
    $.ajax({
        method: "GET",
        url: "/v1/items/" + itemId + "/replys",
    }).done(function (success) {
        console.log(success.data);
        replyCount = success.data.list.length;
        getReply(success.data.list);
    }).fail(function (fail) {
        console.log(fail);
    })
}

function getReply(replys) {
    var strDOM = "";
    if(replys.length == 0) {
        $('.reply_list').html("<li>No exist comments.</li>");
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
                            '<button class="fc3" onclick="modifyReply(\''+replys[i]._id+'\')">Edit</button>' + 
                            '<button class="fcrd" onclick="deleteReply(\''+replys[i]._id+'\')">Delete</button>' + 
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
        alert('Please enter comment.');
        return;
    }

    var data = {
        "itemId": itemId,
        "content": $('#add_reply').val(),
        "count": 0,
        "reporter": userTag,
        "recommandCount": 0,
        "nottobeCount": 0
    }

    console.log(data);

    $.ajax({
        method: "POST",
        url: "/v1/items/reply",
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
                            '<button class="fc3" onclick="modifyReply(\''+reply._id+'\')">Edit</button>' + 
                            '<button class="fcrd" onclick="deleteReply(\''+reply._id+'\')">Delete</button>' + 
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
    $('#modify_area' +id).append('<div class="item_btn"><button class="fc3" onclick="update(\''+id+'\')">Save</button><button class="fcrd" onclick="initContent(\''+id+'\')">Cancel</button></div>');
    $('#item_btn_'+id).hide();
}

function update(id) {
    ajaxLoginYnCheck(function(){
        var data = {
            "content": $('#modify_reply').val()
        }

        console.log(id, data);

        $.ajax({
            method: "PUT",
            url: "/v1/items/reply/" + id,
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
    });
}

function initContent(id,content) {
    if(content != undefined) {
        $('#hid_content'+id).val(content);
    }
    
    $('#modify_area' +id).html(replaceDesc($('#hid_content' + id).val()));
    $('#item_btn_'+id).show();
}

function deleteReply(id) {
    ajaxLoginYnCheck(function(){
        var confirmYn = confirm('Do you want to delete comment?');
        if(confirmYn) {
            console.log(id);

            $.ajax({
                method: "DELETE",
                url: "/v1/items/reply/" + id,
                beforeSend: function (xhr) {
                    $(".item_btn button").attr('disabled', true);
                }
            }).done(function (success) {
                console.log(success);            
                location.reload();
                $(".item_btn button").attr('disabled', false);
            }).fail(function (fail) {
                $(".item_btn button").attr('disabled', false);
            })
        }
    });
}