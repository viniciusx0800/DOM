const taskInput = document.getElementById("taskInput");
const todoList = document.getElementById("todoList");

const body = document.querySelector('body');
body.style.backgroundColor = 'DimGray';

const texto = document.querySelector('h1')
texto.style.color = 'White'
texto.style.fontSize = '40px'

const alerta = document.querySelector('abbr')
alerta.style.textDecoration = 'none'

const boxlist = document.querySelector(".todo-container");

// 1. Adicionar uma nova tarefa
function adicionarTarefa(){
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);

       
        const li = document.createElement("li");
        li.innerHTML = `
           
            <span onclick="editarTexto(this)">${maxText}</span> 
            <select id="PrioridadeDaTarefa" onchange="Prioridade(this.parentElement, this.value)">
                <option value="Filtro">Filtro de prioridade</option>
                <option value="Baixa">Baixa</option>
                <option value="Media">Média</option>
                <option value="Alta">Alta</option>
            </select>
            <button class="butao_concluida" onClick="concluidTask(this)"><i class="conclu fa-solid fa-circle-check" style="font-size:40px;"></i></button>
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

        AlterarCordoBotao();

        salvarTarefaNoLocalStorag(maxText);

    }
}


let tony = document.querySelector(".utron");

tony.insertAdjacentHTML('beforebegin', `
    
`);

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

        removerTarefaDoLocalStorag(li);
    }, 500); 


    
}

// 3. Marcar tarefa como concluída
function concluidTask(button) {
    const li = button.parentElement;
    li.classList.toggle("feita");

    // 17. Alterar a cor do botão "Remover" com base no status da tarefa
    const removeButton = li.querySelector(".remove-btn");
    if (li.classList.contains("feita")) {
        removeButton.style.backgroundColor = "green";  
    } else {
        removeButton.style.backgroundColor = "red";  
    }

    atualizarTarefaNoLocalStorag();
}



// 4. Limpar a lista de tarefas
let div = document.querySelector(".todo-container");
div.insertAdjacentHTML('beforeend', '<button class="limpar-lista" onClick="limparTask()"><i class="fa-solid fa-broom-ball" style="font-size:40px;"></i></button>');

const botaoLista = document.querySelector('.limpar-lista');

botaoLista.style.backgroundColor = ''; 
botaoLista.style.margin = '2px'


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
   
   localStorage.removeItem("tarefaAdicionada") 
}

// 5. Contar o número de tarefas
function atualizarContador(){
    const contador = document.querySelectorAll('#todoList li').length;
    document.getElementById('count').textContent = `Contar Tarefas: ${contador}`;

    // 16. Alterar o fundo da página dinamicamente
    if (contador === 0) {
        boxlist.style.backgroundColor = '#d9d9d960';
    } else {
        boxlist.style.backgroundColor = '#d9d9d960';
        
    }
}


    
    var elemento = document.getElementById("count");

    elemento.style.margin = "2%"
    elemento.style.color = "black"; 
    elemento.style.fontSize = "25px";
    elemento.style.fontFamily = " monospace"
  

// // 6. Alterar o texto de uma tarefa
// function editarTexto(button) {
//     const li = button.parentElement;
//     const span = li.querySelector("span");
//     const newText = prompt("Editar tarefa:", span.textContent); 
//     if (newText !== null && newText.trim() !== "") {
//         span.textContent = newText.trim();
//     }
// }


// 8. Adicionar uma tarefa com a tecla "Enter"
taskInput.addEventListener('keydown', function(event) {
    if (event.key === "Enter") { 
        adicionarTarefa(); 
    }
});


// 9.  edição de texto da tarefa no input
function editarTexto(button) {
    const li = button.parentElement;
    const span = li.querySelector('span'); 
    const textoAtual = span.textContent; 

    const input = document.createElement('input');
    input.type = 'text';
    input.value = textoAtual; 
    span.replaceWith(input); 

    input.focus();

    input.addEventListener('blur', function() {
        const novoTexto = input.value.trim();
        if (novoTexto !== "") {
            span.textContent = novoTexto; 
        } else {
            span.textContent = textoAtual; 
        }
        input.replaceWith(span); 

        atualizarTarefaNoLocalStorag();
    });

    input.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            input.blur(); 
        }
    });

}

let flocos = document.querySelector(".filtro");

flocos.insertAdjacentHTML('beforebegin', `
    <select id="filtroTarefas" onchange="filtrarTarefas(this.value)">
        <option value="Filtro">Filtro de tarefas</option>
        <option value="todas">Todas</option>
        <option value="pendentes">Pendentes</option>
        <option value="concluidas">Concluídas</option>
    </select>
`);

var elemento = document.getElementById("filtroTarefas");
elemento.style.backgroundColor = "rgba(13, 109, 93, 0.44)"
elemento.style.margin = "2%"
elemento.style.color = "rgb(2, 2, 2)"; 
elemento.style.fontSize = "15px";
elemento.style.cursor = "pointer";
elemento.style.borderRadius = "25%"
elemento.style.height = "30px"
elemento.style.textAlign = "center"
elemento.style.borderColor = "rgb(255, 255, 255)"

// 11. Adicionar um filtro de tarefas (pendentes/concluídas)
function filtrarTarefas(tipo) {
    const tarefas = document.querySelectorAll('#todoList li');
    tarefas.forEach((tarefa) => {
        switch (tipo) {
            case 'pendentes':
                if (tarefa.classList.contains('feita')) {
                    tarefa.style.display = 'none';
                } else {
                    tarefa.style.display = 'flex';
                }
                break;
            case 'concluidas':
                if (!tarefa.classList.contains('feita')) {
                    tarefa.style.display = 'none';
                } else {
                    tarefa.style.display = 'flex';
                }
                break;
            case 'todas':
                tarefa.style.display = 'flex';
                break;
        }
    });
}

const algoNovo = document.querySelector(".todo-container");
div.insertAdjacentHTML('beforeend', '<div class="teste"><h2> VAI MELHORAR !!</h2></div>');
 
const geregere = document.querySelector('.teste')

geregere.style.color = 'green'
geregere.style.backgroundColor = 'White'

taskInput.addEventListener('input', AlterarCordoBotao);


//  13. Salvar tarefas no localStorage

function salvarTarefaNoLocalStorag(tarefaTexto){
    let tarefaAdicionada
    if(localStorage.getItem("tarefaAdicionada") === null ){
        tarefaAdicionada = []

    }
    else{
        tarefaAdicionada = JSON.parse(localStorage.getItem("tarefaAdicionada"))
    }
    tarefaAdicionada.push(tarefaTexto)
    localStorage.setItem("tarefaAdicionada", JSON.stringify(tarefaAdicionada))
}


function removerTarefaDoLocalStorag(tarefaExcluida){
    let tarefaAdicionada
    if(localStorage.getItem("tarefaAdicionada") === null ){
        tarefaAdicionada = []

    }
    else{
        tarefaAdicionada = JSON.parse(localStorage.getItem("tarefaAdicionada"))
    }
   const tarefaIndex = tarefaExcluida.querySelector("span").innerText
   tarefaAdicionada.splice(tarefaAdicionada.indexOF(tarefaIndex), 1)
   localStorage.setItem("tarefaAdicionada", JSON.stringify(tarefaAdicionada))
}

function atualizarTarefaNoLocalStorag(){
    let tarefaAdicionada = []
    document.querySelectorAll("#todoList li").forEach(function (li){
        tarefaAdicionada.push(li.querySelector("span").innerText)
    })
    localStorage.setItem("tarefaAdicionada", JSON.stringify(tarefaAdicionada))
}


function carregarTarefaDoLocalStorag(){
    let tarefaAdicionada
    if(localStorage.getItem("tarefaAdicionada") === null ){
        tarefaAdicionada = []

    }
    else{
        tarefaAdicionada = JSON.parse(localStorage.getItem("tarefaAdicionada"))
    }

    tarefaAdicionada.forEach(function(tarefaTexto) {
        const li = document.createElement("li");
        li.innerHTML = `
            <span onclick="editarTexto(this)">${tarefaTexto}</span>        
            <select id="PrioridadeDaTarefa" onchange="Prioridade(this.parentElement, this.value)">
                <option value="Filtro">Filtro de prioridade</option>
                <option value="Baixa">Baixa</option>
                <option value="Media">Média</option>
                <option value="Alta">Alta</option>
            </select>
            <button class="butao_concluida" onClick="concluidTask(this)">
                <i class="conclu fa-solid fa-circle-check" style="font-size:40px;"></i>
            </button>
            <button class="remove-btn" onClick="deleteTask(this)">
                <i class="remuv fa-solid fa-trash-can" style="font-size:40px;"></i>
            </button>
        `;

        todoList.appendChild(li)

    })
}


document.addEventListener('DOMContentLoaded', carregarTarefaDoLocalStorag);


// 14. Alterar a cor do botão "Adicionar" com base no preenchimento do campo
function AlterarCordoBotao() {
    if (taskInput.value.trim() === "") {

        addButton.disabled = true;
        addButton.style.backgroundColor = "gray";
        addButton.style.cursor = "not-allowed";
       
    } else {
        addButton.disabled = false;
        addButton.style.backgroundColor = "green";
       
    }
}



function Prioridade(tarefa, PrioridadeDaTarefa) {
    switch (PrioridadeDaTarefa) {
        case 'Filtro':
            tarefa.style.backgroundColor = "LightGrey";  
            tarefa.style.color = "black";
            break;
        case 'Baixa':
            tarefa.style.backgroundColor = "#32CD32";
            tarefa.style.color = "Yellow";
            break;
        case 'Media':
            tarefa.style.backgroundColor = "#FFFF60	";
            tarefa.style.color = "OrangeRed";
            break;
        case 'Alta':
            tarefa.style.backgroundColor = "#B22222";
            tarefa.style.color = "GhostWhite";
            break;
    }
}

