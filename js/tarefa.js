
let id_usuario = document.querySelector('#select-usuario').value;

document.addEventListener('DOMContentLoaded', ()=> {
    
    consultarUsuario();
    
});

document.querySelector('#select-usuario').addEventListener('change', (e)=> {
    id_usuario = Number(e.target.value);
});

function cadastrarTarefa() {
    
    const descricao = document.querySelector('#input-descricao').value;
    const setor = document.querySelector('#input-setor').value;
    const prioridade = document.querySelector('#select-prioridade').value;
    
    const url = 'http://localhost:3001/tarefas';

    if (!descricao || !setor || !prioridade || !id_usuario) {
        return window.alert('Preencha todos os campos!');
    }


    const novaTarefa = {
        usuario_id: id_usuario,
        descricao,
        setor,
        prioridade
    }

    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaTarefa)
    })
        .then(response => {
            if (response.status === 200) {
                window.alert('Tarefa Cadastrada com Sucesso!');
            }

            return response.json();
        })
        .then(data => {
            const erro = data.erro;
            const mensagem = data.mensagem;

            if (erro) {
                return window.alert(erro);
            }
            else if (mensagem) {
                return window.alert(mensagem);
            }

        })
        .catch(erro => {
            console.log(erro);
            
        })

        document.querySelector('#input-descricao').value = '';
        document.querySelector('#input-setor').value = '';
        document.querySelector('#select-usuario').value = '';
        document.querySelector('#select-prioridade').value = '';
}
function consultarUsuario() {
    const selectUsuario = document.querySelector('#select-usuario');

    const url = 'http://localhost:3001/usuarios';

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
            }
            else if (mensagem) {
                return window.alert(mensagem);
            }

            const usuarios = data;

            usuarios.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.id;
                option.textContent = usuario.nome;

                selectUsuario.appendChild(option);
            });


        })
}





