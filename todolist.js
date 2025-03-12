const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

let body = document.querySelector('body');
body.style.backgroundColor = 'SteelBlue';

const boxlist = document.querySelector(".todo-container");

boxlist.style.backgroundColor = 'Silver';  

// 8. Adicionar uma tarefa com a tecla "Enter"
taskInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") { 
        adicionarTarefa(); 
    }
});

// 1. Adicionar uma nova tarefa
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

         // 7. Adicionar animação ao adicionar/remover tarefas
        li.style.opacity = 0;
        setTimeout(() => {
            li.style.transition = 'opacity 0.5s, transform 0.5s';
            li.style.opacity = 1;
        }, 10); 

        atualizarContador();
    }
}

// 2. Remover uma tarefa
function deleteTask(button) {
    const li = button.parentElement;

     // 7. Adicionar animação ao adicionar/remover tarefas
    li.style.transition = 'opacity 0.5s, transform 0.5s';
    li.style.opacity = 0;
    li.style.transform = 'translateY(20px)';

    setTimeout(() => {
        todoList.removeChild(li);
        atualizarContador();
    }, 500); 
}

// 3. Marcar tarefa como concluída
function concluidTask(button) {
    const li = button.parentElement;
    li.classList.toggle("feita");
    // CORRIGIR FUNÇÃO
}

// 4. Limpar a lista de tarefas
let div = document.querySelector(".todo-container");
div.insertAdjacentHTML('beforeend', '<button class="limpar-lista" onClick="limparTask()"><i class="fa-solid fa-broom-ball" style="font-size:40px;"></i></button>');

const botaoLista = document.querySelector('.limpar-lista');
botaoLista.style.backgroundColor = ''; 

function limparTask(){
    const allItems = document.querySelectorAll("#todoList li");
    // 7. Adicionar animação ao adicionar/remover tarefas
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

// 5. Contar o número de tarefas
function atualizarContador(){
    const contador = document.querySelectorAll('#todoList li').length;
    document.getElementById('count').textContent = `Tarefas: ${contador}`;
}

// 6. Alterar o texto de uma tarefa
function editarTexto(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent); 
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

// 11. Adicionar um filtro de tarefas (pendentes/concluídas)
function filtrarTarefas(tipo) {
    const tarefas = document.querySelectorAll('#todoList li');
    tarefas.forEach((tarefa) => {
        switch (tipo) {
            case 'pendentes':
                if (tarefa.classList.contains('feita')) {
                    tarefa.style.display = 'none';
                } else {
                    tarefa.style.display = 'block';
                }
                break;
            case 'concluidas':
                if (!tarefa.classList.contains('feita')) {
                    tarefa.style.display = 'none';
                } else {
                    tarefa.style.display = 'block';
                }
                break;
            case 'todas':
                tarefa.style.display = 'block';
                break;
        }
    });
}


let filtro = document.createElement('div');
filtro.innerHTML = `
    <button  class="tarefa_pendentes" onclick="filtrarTarefas('pendentes')"><i class="fa-brands fa-product-hunt"></i></button>
    <button class="tarefa_concluidas" onclick="filtrarTarefas('concluidas')"><i class="fa-brands fa-cuttlefish"></i></button>
    <button class="todas_tarefas" onclick="filtrarTarefas('todas')"><i class="fa-brands fa-tumblr"></i></button>
`;

div.insertAdjacentElement('beforeend', filtro);

const botaoPendentes = document.querySelector('.tarefa_pendentes');
const botaoConcluidas = document.querySelector('.tarefa_concluidas');
const botaoTodas = document.querySelector('.todas_tarefas');


botaoPendentes.style.backgroundColor = 'blue';  
botaoPendentes.style.color = 'white';           
botaoPendentes.style.padding = '10px';          
botaoPendentes.style.margin = '2px'


botaoConcluidas.style.backgroundColor = 'green';
botaoConcluidas.style.color = 'white';
botaoConcluidas.style.padding = '10px';

botaoTodas.style.backgroundColor = 'DarkSlateGray';
botaoTodas.style.color = 'white';
botaoTodas.style.padding = '10px';
