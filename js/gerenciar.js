let _afazer = []
let _fazendo = []
let _pronto = []
let _status;
let idTarefa;

const bntFecharModal = document.querySelector('#editar-tarefas');

document.addEventListener('DOMContentLoaded', () => {

    consultarTarefas();

});


bntFecharModal.addEventListener('click', () => {
    document.querySelector('.modal-container').style.display = 'none';
});

document.querySelector('#aFazer').addEventListener('change', (e) => {
    if (e.target && e.target.tagName === 'SELECT') {
        _status = e.target.value;
    }
});

document.querySelector('#fazendo').addEventListener('change', (e) => {
    if (e.target && e.target.tagName === 'SELECT') {
        _status = e.target.value;
    }
});

document.querySelector('#pronto').addEventListener('change', (e) => {
    if (e.target && e.target.tagName === 'SELECT') {
        _status = e.target.value;
    }
});

function mudarStatusTarefa(id) {
    //const url = `http://localhost:3001/status_tarefas/${id}`;
    const url = `https://api-kanban-dmn5.onrender.com/status_tarefas/${id}`;
    if(!_status) {
        return window.alert('Você deve primeiro selecionar um status!');
    }

    const novoStatus = {
        status: _status
    }

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoStatus)

    })
        .then(response => {
            if (response.status === 201) {
                // window.alert('Status alterado com Sucesso!');
                return window.location.href = '/html/gerenciarTarefas.html';
            }
            return response.json();
        })
        .then(data => {
            const erro = data.erro;
            const mensagem = data.mensagem;

            if (erro) {
                return window.alert(erro);
            } else if (mensagem) {
                return window.alert(mensagem);
            }

        })
        .catch(erro => {
            console.log(erro);

        })
}
function excluirTarefa(id) {

    if (window.confirm('Deseja excluir a tarefa atual?')) {

        //const url = `http://localhost:3001/tarefas/${id}`;
        const url = `https://api-kanban-dmn5.onrender.com/tarefas/${id}`;

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(response => {
                if (response.status === 201) {
                    window.alert('Tarefa excluída com Sucesso!');
                    return window.location.href = '/html/gerenciarTarefas.html';
                }
                return response.json();
            })
            .then(data => {
                const erro = data.erro;
                const mensagem = data.mensagem;

                if (erro) {
                    return window.alert(erro);
                } else if (mensagem) {
                    return window.alert(mensagem);
                }




            })
            .catch(erro => {
                console.log(erro);

            })

    } else {
        return;
    }


}
function exibirEditarTarefa(id) {
    document.querySelector('.modal-container').style.display = 'block';

    idTarefa = id;

    //const url = `http://localhost:3001/tarefas/${id}`;
    const url = `https://api-kanban-dmn5.onrender.com/tarefas/${id}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }

    })
        .then(response => response.json())
        .then(data => {

            if (data) {

                document.querySelector('#input-descricao').value = data.descricao;
                document.querySelector('#input-setor').value = data.setor;
                document.querySelector('#input-editar-usuario').value = data.nome_usuario;
                document.querySelector('#select-prioridade').value = data.prioridade;
            }

        })
        .catch(erro => {
            console.log(erro);

        })

}

function salvarEditar() {

    const descricao = document.querySelector('#input-descricao').value;
    const setor = document.querySelector('#input-setor').value;
    const prioridade = document.querySelector('#select-prioridade').value;

    if (!descricao || !setor || !prioridade) {
        return window.alert('Preencha todos dos dados!');
    }

    const tarefaEditada = {
        id: idTarefa,
        descricao,
        setor,
        prioridade
    }

    //const url = 'http://localhost:3001/tarefas';
    const url = 'https://api-kanban-dmn5.onrender.com/tarefas';

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefaEditada)

    })
        .then(response => {
            if (response.status === 201) {
                window.alert('Tarefa editada com sucesso!');
                document.querySelector('.modal-container').style.display = 'none';
                window.location.href = '/html/gerenciarTarefas.html';
            }
            return response.json();
        })
        .then(data => {
            const erro = data.erro;
            const mensagem = data.mensagem;

            if (erro) {
                return window.alert(erro);
            } else if (mensagem) {
                return window.alert(mensagem);
            }

        })
        .catch(erro => {
            console.log(erro);

        })




}

function consultarTarefas() {
    //const url = 'http://localhost:3001/tarefas';
    const url = 'https://api-kanban-dmn5.onrender.com/tarefas';

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const erro = data.erro;
            const mensagem = data.mensagem;

            if (erro) {
                return window.alert(erro);
            } else if (mensagem) {
                return window.alert(mensagem);
            }

            const { afazer, fazendo, pronto } = data;

            _afazer = afazer;
            _fazendo = fazendo;
            _pronto = pronto;

            exibirTarefas();

        });

}

function exibirTarefas() {

    const tarefa_a_fazer = document.querySelector('#aFazer');
    const tarefa_fazendo = document.querySelector('#fazendo');
    const tarefa_pronto = document.querySelector('#pronto');

    if (_afazer.length > 0) {

        tarefa_a_fazer.querySelector('#tarefa').style.display = 'block';

        _afazer.forEach(tarefa => {
            const tarefa1 = tarefa_a_fazer.querySelector('.tarefa');
            const btnEditar = document.createElement('button');
            const btnExcluir = document.createElement('button');
            const btnMudarStatus = document.createElement('button');
            const div = document.createElement('div');

            div.innerHTML = `
            
            <strong>Descrição:</strong><span> ${tarefa.descricao}</span>
            <br>
            <strong>Setor:</strong><span> ${tarefa.setor}</span>
            <br>
            <strong>Prioridade:</strong><span> ${capitalizePalavas(tarefa.prioridade)}</span>
            <br>
            <strong>Status:</strong><span> ${capitalizePalavas(tarefa.status)}</span>
            <br>
            <strong>Nome:</strong><span> ${tarefa.nome_usuario}</span>
            <br>     
            <strong>Status:</strong><span>                   
            <select>
                <option value="a fazer" ${tarefa.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                <option value="fazendo" ${tarefa.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                <option value="pronto" ${tarefa.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            </select>  
            <br>
            <br>
              
            `
            div.classList.add('card');
            btnMudarStatus.textContent = 'Salvar Status';
            btnMudarStatus.addEventListener('click', () => mudarStatusTarefa(tarefa.id));
            div.appendChild(btnMudarStatus);
            tarefa1.appendChild(div);
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => exibirEditarTarefa(tarefa.id));
            div.appendChild(btnEditar);
            tarefa1.appendChild(div);
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
            div.appendChild(btnExcluir);
            tarefa1.appendChild(div);

        });



    }

    if (_fazendo.length > 0) {
        tarefa_fazendo.querySelector('#tarefa').style.display = 'block';


        _fazendo.forEach(tarefa => {
            const tarefa2 = tarefa_fazendo.querySelector('.tarefa');
            const btnEditar = document.createElement('button');
            const btnExcluir = document.createElement('button');
            const btnMudarStatus = document.createElement('button');
            const div = document.createElement('div');


            div.innerHTML = `
            
            <strong>Descrição:</strong><span> ${tarefa.descricao}</span>
            <br>
            <strong>Setor:</strong><span> ${tarefa.setor}</span>
            <br>
            <strong>Prioridade:</strong><span> ${capitalizePalavas(tarefa.prioridade)}</span>
            <br>
            <strong>Status:</strong><span> ${capitalizePalavas(tarefa.status)}</span>
            <br>
            <strong>Nome:</strong><span> ${tarefa.nome_usuario}</span>
            <br>
            <strong>Status:</strong><span>                        
            <select>
                <option value="a fazer" ${tarefa.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                <option value="fazendo" ${tarefa.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                <option value="pronto" ${tarefa.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            </select>  
            <br>
            <br>
              
            `
            div.classList.add('card');
            btnMudarStatus.textContent = 'Salvar Status';
            btnMudarStatus.addEventListener('click', () => mudarStatusTarefa(tarefa.id));
            div.appendChild(btnMudarStatus);
            tarefa2.appendChild(div);
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => exibirEditarTarefa(tarefa.id));
            div.appendChild(btnEditar);
            tarefa2.appendChild(div);
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
            div.appendChild(btnExcluir);
            tarefa2.appendChild(div);
        });


    }

    if (_pronto.length > 0) {
        tarefa_pronto.querySelector('#tarefa').style.display = 'block';

        _pronto.forEach(tarefa => {
            const tarefa3 = tarefa_pronto.querySelector('.tarefa');
            const btnEditar = document.createElement('button');
            const btnExcluir = document.createElement('button');
            const btnMudarStatus = document.createElement('button');
            const div = document.createElement('div');

            div.innerHTML = `
            
            <strong>Descrição:</strong><span> ${tarefa.descricao}</span>
            <br>
            <strong>Setor:</strong><span> ${tarefa.setor}</span>
            <br>
            <strong>Prioridade:</strong><span> ${capitalizePalavas(tarefa.prioridade)}</span>
            <br>
            <strong>Status:</strong><span> ${capitalizePalavas(tarefa.status)}</span>
            <br>
            <strong>Nome:</strong><span> ${tarefa.nome_usuario}</span>
            <br> 
            <strong>Status:</strong><span> 
            <select>
                <option value="a fazer" ${tarefa.status === 'a fazer' ? 'selected' : ''}>A Fazer</option>
                <option value="fazendo" ${tarefa.status === 'fazendo' ? 'selected' : ''}>Fazendo</option>
                <option value="pronto" ${tarefa.status === 'pronto' ? 'selected' : ''}>Pronto</option>
            </select>  
            <br>
            <br>
              
            `
            div.classList.add('card');
            btnMudarStatus.textContent = 'Salvar Status';
            btnMudarStatus.addEventListener('click', () => mudarStatusTarefa(tarefa.id));
            div.appendChild(btnMudarStatus);
            tarefa3.appendChild(div);
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => exibirEditarTarefa(tarefa.id));
            div.appendChild(btnEditar);
            tarefa3.appendChild(div);
            btnExcluir.textContent = 'Excluir';
            btnExcluir.addEventListener('click', () => excluirTarefa(tarefa.id));
            div.appendChild(btnExcluir);
            tarefa3.appendChild(div);
            tarefa3.appendChild(div);
        });


    }
}
function capitalizePalavas(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}