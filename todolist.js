const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

let body = document.querySelector('body');
body.style.backgroundColor = 'SteelBlue';


function adicionarTarefa(){
    const taskText = taskInput.value.trim();
    if (taskText !== "") {

        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="butao_concluida" onClick="concluidTask(this)">concluida</button>
            <button class="editaButton" onClick="editarTexto(this)">Editar</button>
            <button class="remove-btn" onClick="deleteTask(this), removeContador()">Remover</button>
        `;
        
        todoList.insertAdjacentElement("afterbegin", li);
        taskInput.value = "";

    }
}

function deleteTask(button) {
    const li = button.parentElement;
    todoList.removeChild(li);
}

function concluidTask(todoList) {
    const li = todoList.parentElement;
    li.classList.toggle("feita");
}

let div = document.querySelector(".todo-container")

div.insertAdjacentHTML('beforeend', '<button class="limpar-lista" onClick="limparTask(), limparContador()">Limpar</button>')

function limparTask(){
    let todoList = document.getElementById("todoList");
    todoList.innerText = "";
}

function AddCotador(){
    var contador = document.querySelectorAll('#todoList li').length
   console.log("contador", + contador)
   document.getElementById('count').innerHTML = '<p> Tarefas : ' + (contador)

}
    
function removeContador(){
    var contador = document.querySelectorAll('#todoList li').length
   console.log("contador", + contador)
   document.getElementById('count').innerHTML = '<p> Tarefas : ' + (contador)

}
    

function limparContador(){
    var contador = document.querySelectorAll('#todoList li').length
   console.log("contador", + contador)
   document.getElementById('count').innerHTML = '<p> Tarefas : ' +  (contador)

}
    

function editarTexto(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent); 
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}
