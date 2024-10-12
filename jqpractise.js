$(function(){
//jq will execute this function after page load
//so do binding here
$("#addbutton").click(handlebtnclick);
//$("#todos li").click(removeme);
$("#todos").on("click","li",removeme);

});

function handlebtnclick(){
    var newtodo=$("#newtodo").val();
    if(!newtodo){
        $("#newtodo").addClass("error");
        return;
    }
    $("#newtodo").removeClass("error");
    $("#newtodo").val("");
    $("#todos").append("<li>"+newtodo+"</li>");
    
}

function removeme(){
    $(this).remove();
}

