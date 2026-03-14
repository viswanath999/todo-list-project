let todoItemsContainer=document.getElementById("todoItemsContainer");
let addTodoButton=document.getElementById("addTodoButton");
let saveTodoButton=document.getElementById("saveTodoButton");



addTodoButton.onclick=function(){
    onAddTodo();
}
saveTodoButton.onclick=function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
    
};
function getTodoListFromLocalStorage(){
    let stringifiedTodoList=localStorage.getItem("todoList");
    let parsedTodoList=JSON.parse(stringifiedTodoList);
    if(parsedTodoList===null){
        return[];
    }
    else{
        return parsedTodoList;
    }
}
let todoList=getTodoListFromLocalStorage();

function onTodoStatusChange(checkboxId,labelId,todoId){
        let checkboxElement =document.getElementById(checkboxId);
        let labelElement=document.getElementById(labelId);
        labelElement.classList.toggle("checked");
        let todoobjectIndex=todoList.findIndex(function(eachTodo){
            let eachTodoId="todo"+eachTodo.uniqueNo;
            if(eachTodoId===todoId){
                return true;
            }
            else{
                return false;
            }
        });
        let todoobject=todoList[todoobjectIndex];
        if(todoobject.ischecked===true){
            todoobject.ischecked=false;
        }
        else{
            todoobject.ischecked=true;
        }
}
function onDeleteTodo(todoId){
        let todoElement=document.getElementById(todoId);
        todoItemsContainer.removeChild(todoElement);
        let deleteIndex=todoList.findIndex(function(eachTodo){
            let eachTodoId="todo"+eachTodo.uniqueNo;
            if(eachTodoId===todoId){
                return true;
            }
            else{
                return false;
            }
        });
        todoList.splice(deleteIndex,1);
        console.log(todoList);
}



function createAndAppendTodo(todo){
    let checkboxId="checkbox"+todo.uniqueNo;
    let labelId="label"+todo.uniqueNo;
    let todoId="todo"+todo.uniqueNo;

    let todoElement=document.createElement("li");
    todoElement.classList.add("todo-item-container", "d-flex" ,"flex-row");
    todoElement.id=todoId;
    todoItemsContainer.appendChild(todoElement);

    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id=checkboxId;
    inputElement.onclick=function(){
        onTodoStatusChange(checkboxId,labelId,todoId);
    };
    inputElement.classList.add("checkbox-input");
    todoElement.appendChild(inputElement);
     
    let labelContainer=document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement=document.createElement("label");
    labelElement.setAttribute("for",checkboxId);
    labelElement.id=labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent=todo.text;
    labelContainer.appendChild(labelElement); 
    
    inputElement.id=checkboxId;
    inputElement.checked=todo.ischecked;
    if(todo.ischecked===true){
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer=document.createElement("div");
    deleteIconContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon=document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt" ,"delete-icon");
    deleteIcon.onclick=function(){
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

function onAddTodo(){
    let todosCount=todoList.length;
    todosCount=todosCount+1;
    let userInputElement=document.getElementById("todoUserInput");
    let userInputValue=userInputElement.value;
    
    let newTodo={
        text:userInputValue,
        uniqueNo:todosCount,
        ischecked:false
    };
    if(userInputValue===""){
        alert("Enter valid input");
        return;
    }
    createAndAppendTodo(newTodo);
    todoList.push(newTodo);
    userInputElement.value="";
}
for(let todo of todoList){
    createAndAppendTodo(todo);
}

