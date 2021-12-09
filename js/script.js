/*document.getElementById('tbody').onload = () => {carregaTabela()};

function carregaTabela(){

}*/
class Pessoa {
    constructor() {
        this.arrayPessoa = [];
        this.id = 1;
        this.editId = null;
    }

    // FUNÇÂO SALVAR  / LER INPUT E VALIDA ANTES DE SALVAR
    salvar() {
        let pessoa = this.lerDados()

        if (this.validaCampos(pessoa)) {
            if (this.editId == null) {
                this.adicionar(pessoa);
            } else {
                this.atualizar(this.editId, pessoa);
            }

        }
        this.listaTabela();
        this.cancelar();
        console.log(this.arrayPessoa);
    }

    // FUNÇÂO ADICIONA PESSOA NO ARRAY
    adicionar(pessoa) {
        this.arrayPessoa.push(pessoa);
        this.id++;

        let key = 1;
        localStorage.setItem(key, JSON.stringify(pessoa));

        document.getElementById('nomeInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('telefoneInput').value = '';
    }

    // VALIDAÇÂO CAMPOS INPUT & DADOS JA CADASTRADOS
    validaCampos(pessoa) {
        let msg = '';
        if (pessoa.nome == '') {
            msg += 'Digite o nome da pessoa !\n'
        }
        if (pessoa.email == '') {
            msg += 'Digite o e-mail !\n'
        }
        if (pessoa.telefone == '') {
            msg += 'Digite o Telefone !\n'
        }

        for (let i = 0; i < this.arrayPessoa.length; i++) {
            if (pessoa.nome === this.arrayPessoa[i].nome) {
                msg += 'Nome já cadastrado!\n'
            }
            if (pessoa.email === this.arrayPessoa[i].email) {
                msg += 'E-mail já cadastrado!\n'
            }
            if (pessoa.telefone === this.arrayPessoa[i].telefone) {
                msg += 'Telefone já cadastrado!\n'
            }

        }

        if (msg != '') {
            alert(msg);
            return false;
        } else {
            return true;
        }

    }

    // FUNÇÂO PARA LER OS INPUTS E RETORNA INFORMAÇÕES DA PESSOA DENTRO DE UM ARRAY
    lerDados() {
        let pessoa = {};

        pessoa.id = this.id;
        pessoa.nome = document.getElementById('nomeInput').value;
        pessoa.email = document.getElementById('emailInput').value;
        pessoa.telefone = document.getElementById('telefoneInput').value;

        return pessoa;
    }

    // LISTA ARRAY EM UMA TABELA
    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayPessoa.length; i++) {

            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_telefone = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayPessoa[i].id;
            td_nome.innerText = this.arrayPessoa[i].nome;
            td_email.innerText = this.arrayPessoa[i].email;
            td_telefone.innerText = this.arrayPessoa[i].telefone

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/delete-friend.png'
            imgDelete.setAttribute('onclick', 'pessoa.deletar(' + this.arrayPessoa[i].id + ')');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/edit.png'
            imgEdit.setAttribute('onclick', 'pessoa.editar(' + JSON.stringify(this.arrayPessoa[i]) + ')');

            td_acoes.appendChild(imgDelete);
            td_acoes.appendChild(imgEdit);


        }
    }

    // ATUALIZA DADOS DA PESSOA A SER EDIDATA
    atualizar(id, pessoa) {

        for (let i = 0; i < this.arrayPessoa.length; i++) {
            if (this.arrayPessoa[i].id == id) {
                this.arrayPessoa[i].nome = pessoa.nome;
                this.arrayPessoa[i].email = pessoa.email;
                this.arrayPessoa[i].telefone = pessoa.telefone;
            }
        }
    }

    // PREPARA EDIÇÂO DA PESSOA A SER EDITADA
    editar(pessoa) {
        this.editId = pessoa.id;
        document.getElementById('modal').innerText = 'EDITAR CADASTRO';
        document.getElementById('btnAdd').innerText = 'Atualizar';

        document.getElementById('nomeInput').value = pessoa.nome;
        document.getElementById('emailInput').value = pessoa.email;
        document.getElementById('telefoneInput').value = pessoa.telefone;
        modalOpen();


    }

    // DELETA PESSOA DO ARRAY E DA TABELA PEGANDO O ID COMO PARÂMETRO
    deletar(id) {
        if (confirm('Deseja apagar pessoa com ID ' + id + '?')) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayPessoa.length; i++) {
                if (id === this.arrayPessoa[i].id) {
                    this.arrayPessoa.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
        console.log(this.arrayPessoa);
    }

    // CANCELA OPERAÇÂO
    cancelar() {

        document.getElementById('nomeInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('telefoneInput').value = '';

        document.getElementById('modal').innerText = 'NOVO CADASTRO';
        document.getElementById('btnAdd').innerText = 'Salvar';
        this.editId = null;
        modalOpen();

    }

    // PESQUISA CADASTRO
    pesquisa() {
        let id = document.getElementById('inputPesquisa').value;
        let idValido = false;

        for (let i = 0; i < this.arrayPessoa.length; i++) {
            if (this.arrayPessoa[i].id == id) {
                alert('ID: ' + this.arrayPessoa[i].id + '\nNOME: ' + this.arrayPessoa[i].nome + '\nE-MAIL: ' + this.arrayPessoa[i].email + '\nTELEFONE: ' + this.arrayPessoa[i].telefone)
                idValido = true;
            }
        }
        if (!idValido) {
            alert('ID Invalido !!');
        }
        document.getElementById('inputPesquisa').value = '';
    }
}

var pessoa = new Pessoa();


//--------------- ABRE E FECHA MODAL ----------------
let aberto = false;

function modalOpen() {
    let container = document.getElementById('form');

    if (aberto == false) {
        container.classList.remove('modalClosed');
        container.classList.add('modalOpen');
        aberto = true;
    } else {
        container.classList.remove('modalOpen');
        container.classList.add('modalClosed');
        aberto = false;
    }
}