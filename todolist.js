const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

let body = document.querySelector('body');
body.style.backgroundColor = 'SteelBlue';

let .concluida = document.querySelector('concluida');


function adicionarTarefa(){
    const taskText = taskInput.value.trim();
    if (taskText !== "") {

        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="concluida" onClick="concluidTask(this)">concluida</button>
            <button class="remove-btn" onClick="deleteTask(this)">Remover</button>
        `;
        todoList.appendChild(li);
        taskInput.value = "";

    }
}



function deleteTask(button) {
    const li = button.parentElement;
    todoList.removeChild(li);
}


function concluidTask(todoList) {
    const li = todoList.parentElement;
    li.classList.toggle("concluida");
}

