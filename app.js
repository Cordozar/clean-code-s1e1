var taskInput=document.getElementById("newTask");
var addButton=document.getElementsByClassName("adding-task__btn")[0];
var incompleteTaskHolder=document.getElementById("incompleteTasks");
var completedTasksHolder=document.getElementById("completedTasks");


var createNewTaskElement=function(taskString){

  var listItem=document.createElement("li");

  var checkBox=document.createElement("input");
  var label=document.createElement("label");
  var editInput=document.createElement("input");
  var editButton=document.createElement("button");

  var deleteButton=document.createElement("button");
  var deleteButtonImg=document.createElement("img");

  listItem.className = "tasks__list-item";

  label.innerText=taskString;
  label.className="tasks__task-name";

  checkBox.type="checkbox";
  checkBox.className = "tasks__task-checkbox";
  editInput.type="text";
  editInput.className="tasks__task-input";

  editButton.innerText="Edit";
  editButton.className="tasks__task-edit";

  deleteButton.className="tasks__task-delete";
  deleteButtonImg.src='./remove.svg';
  deleteButtonImg.className = "tasks__task-delete-img";
  deleteButton.appendChild(deleteButtonImg);


  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}



var addTask=function(){
  console.log("Add Task...");
  if (!taskInput.value) return;
  var listItem=createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}


var editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem=this.parentNode;

  var editInput=listItem.querySelector('.tasks__task-input');
  var label=listItem.querySelector(".tasks__task-name");
  var editBtn=listItem.querySelector(".tasks__task-edit");
  var containsClass=listItem.classList.contains("tasks__list-item_edit");

  if(containsClass){

    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }

  listItem.classList.toggle("tasks__list-item_edit");
};


var deleteTask=function(){
  console.log("Delete Task...");

  var listItem=this.parentNode;
  var ul=listItem.parentNode;
  ul.removeChild(listItem);

}


var taskCompleted=function(){
  console.log("Complete Task...");

  var listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
  console.log("Incomplete Task...");
  var listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
  console.log("AJAX Request");
}

addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  var checkBox=taskListItem.querySelector(".tasks__task-checkbox");
  var editButton=taskListItem.querySelector(".tasks__task-edit");
  var deleteButton=taskListItem.querySelector(".tasks__task-delete");


  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

for (var i=0; i<incompleteTaskHolder.children.length;i++){

  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




for (var i=0; i<completedTasksHolder.children.length;i++){
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}