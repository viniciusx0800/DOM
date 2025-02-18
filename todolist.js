
const todoList = document.getElementById('todoList')

function adicionarTarefa(){
    var tarefa = document.getElementById('taskInput').value
    if(tarefa != ''){

        var novaTarefa = document.createElement('li')

        var id = tarefa+Math.floor(Math.random() * 1000000)

        novaTarefa.setAttribute('id', id)

        novaTarefa.innerHTML = tarefa

        var tex = document.createElement('o')
        

        novaTarefa.appendChild(tex)

        lista.appendChild(novaTarefa)
    }
    
}
