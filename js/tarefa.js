


function cadastrarTarefa() {
    
    const descricao = document.querySelector('#input-descricao').value;
    const setor = document.querySelector('#input-setor').value;
    const prioridade = document.querySelector('#select-prioridade').value;
    
    //const url = 'http://localhost:3001/tarefas';
    const url = 'https://api-kanban-pi83.onrender.com/tarefas';

    const token = localStorage.getItem('token');
    if (!token) {
        window.alert('Você precisa estar logado!');
        return window.location.href = '/html/login.html';
    }

    if (!descricao || !setor || !prioridade) {
        return window.alert('Preencha todos os campos!');
    }


    const novaTarefa = {
        descricao,
        setor,
        prioridade
    }

    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
        document.querySelector('#select-prioridade').value = '';
}






