document.addEventListener('DOMContentLoaded', () => {
    verificarLoginNav();
});

function verificarLoginNav() {
    const token = localStorage.getItem('token');
    const linkLogin = document.getElementById('li-login');
    const linkLogout = document.getElementById('li-logout');
    
    if (token) {
        if (linkLogin) linkLogin.style.display = 'none';
        if (linkLogout) linkLogout.style.display = 'inline-block';
    } else {
        if (linkLogin) linkLogin.style.display = 'inline-block';
        if (linkLogout) linkLogout.style.display = 'none';
    }
}

function logoutUsuario() {
    localStorage.removeItem('token');
    window.location.href = '/html/login.html';
}

function cadastrarUsuario() {
    const nome = document.querySelector('#input-nome').value;
    const email = document.querySelector('#input-email').value;
    const senha = document.querySelector('#input-senha').value;
    
    //const url = 'http://localhost:3001/usuarios';
    const url = 'https://api-kanban-pi83.onrender.com/usuarios';

    if (!nome || !email || !senha) {
        return window.alert('Preencha todos os campos!');
    }

    const novoUsuario = {
        nome: capitalizePalavas(nome),
        email: email.toLowerCase(),
        senha: senha
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
                window.location.href = '/html/login.html';
            }
            return response.json();
        })
        .then(data => {
            if (data.mensagem) {
                return window.alert(data.mensagem);
            }
            if (data.erro) {
                return window.alert(data.erro);
            }
        })
        .catch(erro => console.log(erro));
}

function cadastrarUsuarioTarefa() {
    const nome = document.querySelector('#input-nome').value;
    const email = document.querySelector('#input-email').value;
    const token = localStorage.getItem('token');
    
    //const url = 'http://localhost:3001/usuarios_tarefas';
    const url = 'https://api-kanban-pi83.onrender.com/usuarios_tarefas';

    if (!token) {
        window.alert('Você precisa estar logado para cadastrar um usuário de tarefa!');
        return window.location.href = '/html/login.html';
    }

    if (!nome || !email) {
        return window.alert('Preencha todos os campos!');
    }

    const novoUsuarioTarefa = {
        nome: capitalizePalavas(nome),
        email: email.toLowerCase()
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(novoUsuarioTarefa)
    })
        .then(response => {
            if (response.status === 201) {
                window.alert('Usuário Cadastrado com Sucesso!');
                document.querySelector('#input-nome').value = '';
                document.querySelector('#input-email').value = '';
            }
            return response.json();
        })
        .then(data => {
            if (data.mensagem) {
                return window.alert(data.mensagem);
            }
        })
        .catch(erro => console.log(erro));
}

function loginUsuario() {
    const email = document.querySelector('#input-email-login').value;
    const senha = document.querySelector('#input-senha-login').value;
    
    //const url = 'http://localhost:3001/login';
    const url = 'https://api-kanban-pi83.onrender.com/login';

    if (!email || !senha) {
        return window.alert('Preencha todos os campos!');
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email.toLowerCase(), senha })
    })
        .then(response => response.json())
        .then(data => {
            if (data.mensagem) {
                return window.alert(data.mensagem);
            }
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.alert('Login realizado com sucesso!');
                window.location.href = '/index.html';
            }
        })
        .catch(erro => console.log(erro));
}

function capitalizePalavas(str) {
    return str.split(' ').map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}