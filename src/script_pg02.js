//*********carrega vetor mecanicos do storange*******
var registroMecanicos =[];
var mecanicoArmazenado = localStorage.getItem("vetorMecanico");
var registroMecanicos = JSON.parse(mecanicoArmazenado);

//******************Funções Padrão********************
//remove linhas das tabelas.
function clearTab(elemento) {
    // metodo hashasChildNodes verifica se há filhos do nó retornando true ou false
    while (elemento.hasChildNodes()) {
        //enquanto houver filho remove o proximo.
        elemento.removeChild(elemento.lastChild);
    }
}
//coleta dados e insere no vetor objeto.
function registrar() {
    let registro = {
        'registro_mecanico': document.getElementById('registro_mecanico').value,
        'cpf': document.getElementById('cpf').value,
        'nome': document.getElementById('nome').value,
        'dataNascimento': document.getElementById('datanasc').value,
        'genero': document.getElementById('genero').value,
        'email_principal': document.getElementById('email_principal').value,
        'email_sec': document.getElementById('email_sec').value,
        'tel1': document.getElementById('tel1').value,
        'tel2': document.getElementById('tel2').value,
        'tel3': document.getElementById('tel3').value,
        'salario': document.getElementById('salario').value

    }
    registroMecanicos.push(registro);
};
//exibe mensagens de alerta.
function disparaMensagem(elemento, aux) {

    if (aux == 1) {
        elemento.style.display = 'block';
    } else {
        elemento.style.display = 'none';
    }
}
//cria linha nas tabelas com dados do vetor de objeto.
function listaTabela(local, position) {

    tbody = local;
    linha = document.createElement("tr");
    tbody.appendChild(linha);

    registro = document.createTextNode(registroMecanicos[position].registro_mecanico)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].cpf)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].nome)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].dataNascimento)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].genero)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].email_principal)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].email_sec)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].tel1)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].tel2)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].tel3)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroMecanicos[position].salario)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

}
//limpa os dados apresentados nas tabelas
function limpaGeral(input, tabela, div) {
    // limpa o input trocando por uma string vazia se for informado
    if (input) {
        document.getElementById(input).value = "";
    }
    //exclui o body da tabela acionada.
    let local = document.getElementById(tabela);
    clearTab(local);
    // desaciona a div resultados se for informada
    if (div) {
        document.getElementById(div).style.display = 'none';
    }
}
//exibe div com cadastro realizado.
function exiberesultado(local) {
    document.getElementById(local).style.display = 'block';
}
//*******************Validação CPF*********************
//verifica se cpf já existe.
function existeCPF(cpf) {

    let local = document.getElementById('errorCadastro');
    let aux = 0;
    for (i = 0; i < registroMecanicos.length; i++) {
        if (cpf == registroMecanicos[i].cpf) {
            //se cpf digitado já existir ativa div com informação.
            aux = 1;
            disparaMensagem(local, aux);
            document.getElementById('cpf').value = "";

            break;
        } else {
            //se não existe desativa div, garante que desativa informação apos digitado novamente.
            disparaMensagem(local, aux);
        };
    };
}
//verifica se cpf digitado já esta cadastrado
function validacaoCPF() {
    let cpf = document.getElementById('cpf').value;
    //confirma se há registro armazenado.
    if (registroMecanicos.length != 0) {
        existeCPF(cpf);
    }
}
//intercepta o campo cpf para a validação apos digitado. 
document.getElementById('cpf').addEventListener('focusout', validacaoCPF);
//*********************Cadastrar***************************
// aciona a criação de linhas na tabela.
function acionaTabCadastro() {
    let ultimo = registroMecanicos.length - 1;
    let local = document.getElementById('tabdados');
    listaTabela(local, ultimo);
}
//cadastra os dados do form.
function cadastrar() {
    //cria registro para vetor de objetos.
    registrar();
    acionaTabCadastro();
    //limpa formulario.
    exiberesultado('exibeCadasto');
    document.getElementById("infoPessoais").reset();
    //armazena no storange sempre que cadastra.
    var Mecanicos = JSON.stringify(registroMecanicos);
    localStorage.setItem("vetorMecanico", Mecanicos);
}
//**************Validação campos obrigatorios*************
//variavel de controle da validação.
var controleValidar = -1;
// valida se não há campos requerido em branco.
function validaCampo() {
    controleValidar = -1;
    let campos = document.getElementsByClassName("required");
    for (i = 0; i < campos.length; i++) {
        if (campos[i].value == "") {
            // se o campo estiver vazio dispara style.
            campos[i].style.border = "2px solid red";
            controleValidar = 1;
            break;
        } else {
            campos[i].style = "none";
        }
    }
}
//controla chamada da validação.
function contoleValidade() {
    let local = document.getElementById("campoObrigatorio");
    validaCampo();
    if (controleValidar == 1) {
        //alertaCampos();
        disparaMensagem(local, controleValidar);
    } else {
        disparaMensagem(local, controleValidar);
        cadastrar();

    }
}
//***********************Json**********************************
//mostra a strig Json em um alerta.
function mostraJSON() {
    //mostra vetor de objetos.
    alert(JSON.stringify(registroMecanicos));
}
//*********************Pesquisar*******************************
//Lista todos os registros.
function listarTodos() {
    limpaGeral("cpfListar", "tabListar", "erroListar");
    let local = document.getElementById('tabListar');
    for (i = 0; i < registroMecanicos.length; i++) {
        // encontrou aciona a linha na tabela.
        listaTabela(local, i);
    };
}
//Lista um registro por chave cpf.
function listarUm() {
    let aux = 1;
    let local = document.getElementById('tabListar');
    let cpf = document.getElementById('cpfListar').value;
    limpaGeral("cpfListar", "tabListar", "erroListar");
    for (i = 0; i < registroMecanicos.length; i++) {
        if (cpf == registroMecanicos[i].cpf) {
            // encontrou aciona a linha na tabela.
            listaTabela(local, i)
            aux = 0;
            break;
        }
    };
    let msg = document.getElementById('erroListar');
    disparaMensagem(msg, aux);
    document.getElementById('cpfListar').value = "";
}
//***********************Remover********************************
//variavel que controla o metodo remover.
var controleExcluir = -1;
//pesquisa por chave cpf o dado a ser exluido do registro.
function pesquisaRemove() {
    // reseta a variavel controle.
    controleExcluir = -1;
    let cpf, local, i, msg;
    let aux = 1;
    cpf = document.getElementById('cpfExcluir').value;
    local = document.getElementById('excluirDados');
    //varre o vetor em busca da chave.
    for (i = 0; i < registroMecanicos.length; i++) {
        if (cpf == registroMecanicos[i].cpf) {
            // encontrou aciona a linha na tabela.
            listaTabela(local, i)
            //controle recebe a posição do indice.
            controleExcluir = i;
            aux = 0;
            exiberesultado("confirmaExcluir");
            break;
        }
    };
    msg = document.getElementById('erroRemover');
    disparaMensagem(msg, aux);
    document.getElementById('cpfExcluir').value = "";

}
// remove elemento do registro de mecanicos
function remove() {
    //recebe ao indice da chave do elmento pela pesquisa remover
    let item = controleExcluir
    if (item > -1) {
        registroMecanicos.splice(item, 1);
        //armazena no storange sempre que exclui.
        var Mecanicos = JSON.stringify(registroMecanicos);
        localStorage.setItem("vetorMecanico", Mecanicos);
        document.getElementById("confirmaExcluir").style.display = 'none';
    }
    limpaGeral('cpfExcluir', "excluirDados", "");    
}
function limpaRemove(){
    document.getElementById("confirmaExcluir").style.display = 'none';
    limpaGeral('cpfExcluir', "excluirDados", "");   
}
//***********************Alterar********************************
//pesquisa por chave cpf para alteração cadastro.
function alterarPesquisa() {
    debugger;
    controleExcluir = -1;
    let aux = 1;
    let local = document.getElementById('alterarDados');
    let cpf = document.getElementById('cpfAlterar').value;
    for (i = 0; i < registroMecanicos.length; i++) {
        if (cpf == registroMecanicos[i].cpf) {
            // encontrou aciona a linha na tabela.
            listaTabela(local, i)
            aux = 0; //controla se o elemento foi encontrado
            controleExcluir = i; //armazena a posição encontrada.
            exiberesultado("formAltera");
            break;
        }
    };
    document.getElementById('cpfAlterar').value = ""; //limpa campo digitado
    let msg = document.getElementById('erroAlterar');
    disparaMensagem(msg, aux);
    
}
//realiza a alteração de dados de um registro
function alterarCadastro() {
    let item = controleExcluir;
    if (document.getElementById("alteraEmailP").value) {
        registroMecanicos[item].email_principal = document.getElementById("alteraEmailP").value;
    }
    if (document.getElementById("alteraEmailSec").value) {
        registroMecanicos[item].email_sec = document.getElementById("alteraEmailSec").value;
    }
    if (document.getElementById("alteraTel1").value) {
        registroMecanicos[item].tel1 = document.getElementById("alteraTel1").value;
    }
    if (document.getElementById("alteraTel2").value) {
        registroMecanicos[item].tel2 = document.getElementById("alteraTel2").value;
    }
    if (document.getElementById("alteraTel3").value) {
        registroMecanicos[item].tel3 = document.getElementById("alteraTel3").value;
    }
    if (document.getElementById("alteraSalario").value) {
        registroMecanicos[item].salario = document.getElementById("alteraSalario").value;
    }
    var Mecanicos = JSON.stringify(registroMecanicos);
    localStorage.setItem("vetorMecanico", Mecanicos);

    document.getElementById("altera").reset();
    limpaGeral("cpfAlterar", "alterarDados", "formAltera");
}
