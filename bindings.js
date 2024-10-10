window.onload=function(){
    var btn=document.getElementById("btnAdd");
    btn.onclick=handleAdd;
}

function handleAdd(){
    var newToDo=document.getElementById("newToDo").value;
    var todos=document.getElementById("todos");
    var newToDoText=document.createTextNode(newToDo);
    var newLi=document.createElement("li");
    newLi.appendChild(newToDoText);
    todos.appendChild(newLi);

    var deletebtn=document.createElement("button");
    deletebtn.innerHTML="delete";
    deletebtn.onclick=deletehandle;

    newLi.appendChild(deletebtn);
    newToDo.appendChild(newLi);

} 

function deletehandle(e){
    var tag=e.target;
    var li=tag.parentNode;
    li.parentNode.removeChild(li);
} 