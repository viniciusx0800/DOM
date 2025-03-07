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
            <button class="butao_concluida" onClick="concluidTask(this)"><i class="conclu fa-solid fa-circle-check" style="font-size:40px;"></i></button>
            <button class="editaButton" onClick="editarTexto(this)"><i class="edit fa-solid fa-pen-to-square" style="font-size:40px;"></i></button>
            <button class="remove-btn" onClick="deleteTask(this)"><i class="remuv fa-solid fa-trash-can" style="font-size:40px;"></i></button>
        `;
        
        todoList.insertAdjacentElement("afterbegin", li);
        taskInput.value = "";

        
        li.style.opacity = 0;
        setTimeout(() => {
            li.style.transition = 'opacity 0.5s, transform 0.5s';
            li.style.opacity = 1;
        }, 10); 

        atualizarContador();
    }
}

function deleteTask(button) {
    const li = button.parentElement;

   
    li.style.transition = 'opacity 0.5s, transform 0.5s';
    li.style.opacity = 0;
    li.style.transform = 'translateY(20px)';

   
    setTimeout(() => {
        todoList.removeChild(li);
        atualizarContador();
    }, 500); 
}

function concluidTask(button) {
    const li = button.parentElement;
    li.classList.toggle("feita");
}

let div = document.querySelector(".todo-container");
div.insertAdjacentHTML('beforeend', '<button class="limpar-lista" onClick="limparTask()"><i class="fa-solid fa-broom-ball" style="font-size:40px;"></i></button>');

function limparTask(){
    const allItems = document.querySelectorAll("#todoList li");
    allItems.forEach((item) => {
      
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        item.style.opacity = 0;
        item.style.transform = 'translate(50px)';
       
        setTimeout(() => {
            todoList.removeChild(item);
            atualizarContador();
        }, 500); 
    });
   
}


function atualizarContador(){
    const contador = document.querySelectorAll('#todoList li').length;
    document.getElementById('count').textContent = `Tarefas: ${contador}`;
}

function editarTexto(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent); 
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}
