//carrega vetor veiculos do storange
var veicArmazenado = localStorage.getItem("vetorVeiculo");
var registroVeiculos = JSON.parse(veicArmazenado);
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
        'placa': document.getElementById('placa').value,
        'cidade': document.getElementById('placa_cidade').value,
        'estado': document.getElementById('placa_estado').value,
        'tipo': document.getElementById('tipo_veic').value,
        'marca': document.getElementById('marca_veic').value,
        'modelo': document.getElementById('modelo_veic').value,
        'ano': document.getElementById('ano_veic').value,
        'qtnPortas': document.getElementById('portas_veic').value,
        'qtnLugares': document.getElementById('lugares_veic').value,
        'combustivel': document.getElementById('combustivel_veic').value,
        'cor': document.getElementById('cor_veic').value,
        'acessorios': document.getElementById('acessorios_veic').value
    }
    registroVeiculos.push(registro);
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

    registro = document.createTextNode(registroVeiculos[position].registroVeiculo)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].placa)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].cidade)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].estado)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].tipo)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].marca)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].modelo)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].ano)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].qtnPortas)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].qtnLugares)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].combustivel)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].cor)
    celula = document.createElement("td");
    celula.appendChild(registro);
    linha.appendChild(celula);

    registro = document.createTextNode(registroVeiculos[position].acessorios)
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
//*******************Validação Placa*********************
//verifica se placa já existe.
function existePlaca(placa) {
    let local = document.getElementById('errorCadastro');
    let aux = 0;
    for (i = 0; i < registroVeiculos.length; i++) {
        if (placa == registroVeiculos[i].placa) {
            //se placa digitado já existir ativa div com informação.
            aux = 1;
            disparaMensagem(local, aux);
            document.getElementById('placa').value = "";

            break;
        } else {
            //se não existe desativa div, garante que desativa informação apos digitado novamente.
            disparaMensagem(local, aux);
        };
    };
}
//verifica se placa digitado já esta cadastrado
function validacaoPlaca() {
    let placa = document.getElementById('placa').value;
    //confirma se há registro armazenado.
    if (registroVeiculos.length != 0) {
        existePlaca(placa);
    }
}
//intercepta o campo placa para a validação apos digitado. 
document.getElementById('placa').addEventListener('focusout', validacaoPlaca);
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
function contole() {
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
//*********************Cadastrar***************************
// aciona a criação de linhas na tabela.
function acionaTabCadastro() {
    let ultimo = registroVeiculos.length - 1;
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
    document.getElementById("infoVeiculo").reset();
    //armazena no storange sempre que cadastra.
    var veiculo = JSON.stringify(registroVeiculos);
    localStorage.setItem("vetorVeiculo", veiculo);
}
//***********************Json**********************************
//mostra a strig Json em um alerta.
function mostraJSON() {
    //mostra vetor de objetos.
    alert(JSON.stringify(registroVeiculos));
}
//*********************Pesquisar*******************************
//Lista todos os registros.
function listarTodos() {
    limpaGeral("placaListar", "tabListar", "erroListar");
    let local = document.getElementById('tabListar');
    for (i = 0; i < registroVeiculos.length; i++) {
        // encontrou aciona a linha na tabela.
        listaTabela(local, i);
    };
}
//Lista um registro por chave placa.
function listarUm() {
    let aux = 1;
    let local = document.getElementById('tabListar');
    let placa = document.getElementById('placaListar').value;
    limpaGeral("placaListar", "tabListar", "erroListar");
    for (i = 0; i < registroVeiculos.length; i++) {
        if (placa == registroVeiculos[i].placa) {
            // encontrou aciona a linha na tabela.
            listaTabela(local, i)
            aux = 0;
            break;
        }
    };
    let msg = document.getElementById('erroListar');
    disparaMensagem(msg, aux);
    document.getElementById('placa').value = "";
}
//***********************Alterar********************************
//pesquisa por chave placa para alteração cadastro.
function alterarPesquisa() {
    debugger;
    controleExcluir = -1;
    let aux = 1;
    let local = document.getElementById('alterarDados');
    let placa = document.getElementById('placaAlterar').value;
    for (i = 0; i < registroVeiculos.length; i++) {
        if (placa == registroVeiculos[i].placa) {
            // encontrou aciona a linha na tabela.
            listaTabela(local, i)
            aux = 0; //controla se o elemento foi encontrado
            controleExcluir = i; //armazena a posição encontrada.
            exiberesultado("formAltera");
            break;
        }
    };
    document.getElementById('placaAlterar').value = ""; //limpa campo digitado
    let msg = document.getElementById('erroAlterar');
    disparaMensagem(msg, aux);

}
//realiza a alteração de dados de um registro
function alterarCadastro() {
    let item = controleExcluir;
    if (document.getElementById("combustivelAtera").value) {
        registroVeiculos[item].combustivel = document.getElementById("combustivelAtera").value;
    }
    if (document.getElementById("corAltera").value) {
        registroVeiculos[item].cor = document.getElementById("corAltera").value;
    }
    if (document.getElementById("acessoriosAltera").value) {
        registroVeiculos[item].acessorios = document.getElementById("acessoriosAltera").value;
    }

    var veiculo = JSON.stringify(registroVeiculos);
    localStorage.setItem("vetorVeiculo", veiculo);

    document.getElementById("altera").reset();
    limpaGeral("placaAlterar", "alterarDados", "formAltera");
}
//***********************Remover********************************
//variavel que controla o metodo remover.
var controleExcluir = -1;
//pesquisa por chave placa o dado a ser exluido do registro.
function pesquisaRemove() {
    // reseta a variavel controle.
    controleExcluir = -1;
    let placa, local, i, msg;
    let aux = 1;
    placa = document.getElementById('placaExcluir').value;
    local = document.getElementById('excluirDados');
    //varre o vetor em busca da chave.
    for (i = 0; i < registroVeiculos.length; i++) {
        if (placa == registroVeiculos[i].placa) {
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
    document.getElementById('placaExcluir').value = "";

}
// remove elemento do registro de veiculo
function remove() {
    //recebe ao indice da chave do elmento pela pesquisa remover
    let item = controleExcluir
    if (item > -1) {
        registroVeiculos.splice(item, 1);
        //armazena no storange sempre que exclui.
        var veiculo = JSON.stringify(registroVeiculos);
        localStorage.setItem("vetorVeiculo", veiculo);

    }
    limpaGeral('placaExcluir', "excluirDados", "");
    document.getElementById("confirmaExcluir").style.display = 'none';

}
function limpaRemove() {
    document.getElementById("confirmaExcluir").style.display = 'none';
    limpaGeral('placaExcluir', "excluirDados", "");

}
