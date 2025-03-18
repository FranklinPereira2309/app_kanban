function cadastrarUsuario() {
    const nome = document.querySelector('#input-nome').value;
    const email = document.querySelector('#input-email').value;
    //const url = 'http://localhost:3001/usuarios';
    const url = 'https://api-kanban-dmn5.onrender.com/usuarios';

    if (!nome || !email) {
        return window.alert('Preencha todos os campos!');
    }

    const novoUsuario = {
        nome: capitalizePalavas(nome),
        email: email.toLowerCase()
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)
    })
        .then(response => {
            if (response.status === 200) {
                window.alert('Usuário Cadastrado com Sucesso!');
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

    document.querySelector('#input-nome').value = '';
    document.querySelector('#input-email').value = '';
}

function capitalizePalavas(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}