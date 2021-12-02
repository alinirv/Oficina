//inicialliza o vetor de objetos.
var registroConserto = [];
//carrega vetor mecanicos do storange
var mecanicoArmazenado = localStorage.getItem("vetorMecanico");
var registroMecanicos = JSON.parse(mecanicoArmazenado);
//carrega vetor veiculos do storange
var veicArmazenado = localStorage.getItem("vetorVeiculo");
var registroVeiculos = JSON.parse(veicArmazenado);
//carrega vetor consertos do storange
var consertoArmazenado = localStorage.getItem("vetorConserto");
registroConserto = JSON.parse(consertoArmazenado);

$(document).ready(function () {
    //*******************Funções Padrão*************************
    //exibe mensagens de alerta.
    function disparaMensagem(seletor, aux) {
        if (aux == 1) {
            $(seletor).css({
                "display": "block",
            });
        } else {
            $(seletor).css({
                "display": "none",
            });
        }
    }
    //cria registro conserto
    function registrar() {
        let registro = {
            'ordemServico': $("#ordemServico").val(),
            'cpf': $("#cpf").val(),
            'placa': $("#placa").val(),
            'placaCidade': $("#placa_cidade").val(),
            'placaEstado': $("#placa_estado").val(),
            'dataEntrada': $("#data_entrada").val(),
            'dataSaida': $("#data_saida").val(),
            'problemaVeic': $("#problema_veic").val(),
            'valorConserto': $("#valor_conserto").val(),
        };

        registroConserto.push(registro);
    }
    //reseta os campos do formulario.
    function reset_form(seletor) {
        $(seletor).each(function () {
            this.reset();
        });
    }
    //cria linha e celulas na tabela escolhida.
    function listaTabela(local, position) {
        $(local).append("<tr><td>" + registroConserto[position].ordemServico + "</td><td>" + registroConserto[position].cpf + "</td><td>" + registroConserto[position].placa + "</td><td>" + registroConserto[position].placaCidade + "</td><td>" + registroConserto[position].placaEstado + "</td><td>" + registroConserto[position].dataEntrada + "</td><td>" + registroConserto[position].dataSaida + "</td><td>" + registroConserto[position].problemaVeic + "</td><td>" + registroConserto[position].valorConserto + "</td></tr>");
    }
    // aciona a div oculta em  cadastro, altera e remove.
    function exiberesultado(local) {
        $(local).css({ display: 'block' })
    }
    // remove linhas criadas na tabela e limpa input
    function limpaGeral(input, tbody) {
        $(tbody).children().remove();
        $(input).val("");
    }
    //**********Validação campos cadastrados****************
    // verifica se o cpf ta cadastrado no vetor de mecanicos.
    $("#cpf").focusout(function () {
        let cpf = $("#cpf").val();
        let controle = 1;
        for (i = 0; i < registroMecanicos.length; i++) {
            if (registroMecanicos[i].cpf == cpf) {
                controle = 0;
                break;
            }
        }
        disparaMensagem(".alertCpf", controle);
    });
    //verifica se a placa já esta cadastrada no vetor de veiculo.
    $("#placa").focusout(function () {
        let placa = $("#placa").val();
        let controle = 1;

        for (i = 0; i < registroVeiculos.length; i++) {
            if (registroVeiculos[i].placa == placa) {
                $("#placa_cidade").val(registroVeiculos[i].cidade);
                $("#placa_estado").val(registroVeiculos[i].estado);
                controle = 0;
                break;
            }
        }
        disparaMensagem(".alertPlaca", controle);

    });
    //verifica se já existe um cadastro para nova ordem de serviço.
    $("#ordemServico").focusout(function () {
        let oS = $("#ordemServico").val();
        let controle = 0;

        for (i = 0; i < registroConserto.length; i++) {
            if (registroConserto[i].ordemServico == oS) {
                controle = 1;
                $("#ordemServico").val("");
                break;
            }
        }
        disparaMensagem(".alertRepetido", controle);

    });
    //********Validação campos Obrigatorio******************
    //variavel de controle da validação.
    var controleValidar = -1;
    // valida se não há campos requerido em branco.
    function validaCampo() {
        controleValidar = -1;
        let campos = $(".required");
        for (i = 0; i < campos.length; i++) {
            let id = campos[i].id;
            if (campos[i].value == "") {
                // se o campo estiver vazio dispara style.
                $("#" + id).css({ border: "2px solid red" });
                controleValidar = 1;
                break;
            } else {
                $("#" + id).css({ border: "none" });
            }
        }
    }
    //*******************Cadastrar**************************
    //determina onde as llinhas da tabela será criada
    function acionaTabCadastro() {
        let ultimo = registroConserto.length - 1;
        listaTabela('#tabdados', ultimo);
    }
    //aciona as funções para cadastrar, exibir e salvar localstorange
    function cadastrar() {
        //cria registro para vetor de objetos.
        registrar();
        acionaTabCadastro();
        exiberesultado('#exibeCadasto');
        reset_form('#dados_consertos');
        //armazena no storange sempre que cadastra.
        let conserto = JSON.stringify(registroConserto);
        localStorage.setItem("vetorConserto", conserto);
    }
    // inicia o cadastro somente  após a validação do campos obrigatorios.
    $("#btnCadastro").click(function () {
        validaCampo();
        if (controleValidar == 1) {
            //alertaCampos();
            disparaMensagem("#campoObrigatorio", controleValidar);
        } else {
            disparaMensagem("#campoObrigatorio", controleValidar);
            cadastrar();
        }
    });
    $("#limpCadastro").click(function () {
        $("#tabdados").children().remove();
        $('#exibeCadasto').css({ display: 'none' })
    });
    //*******************Json**************************
    $("#btnJson").click(function () {
        alert(JSON.stringify(registroConserto));
    });
    //*******************Pesquisa**************************
    //variavel de controle 
    var controle = -1;    
    //exibe todos registros do vetor.    
    $("#listarTodos").click(function () {
        controle = 1;
        limpaGeral("#listarOs", "#tabPesquisa");
        for (i = 0; i < registroConserto.length; i++) {
            listaTabela('#tabPesquisa', i);
            controle = 0;
        }
        disparaMensagem(".alertPesquisa", controle);
    });
    // exibe registro escolhido pela chave ordem se serviço.
    $("#listarUm").click(function () {
        debugger;
        controle = 1;
        let oS = $("#listarOs").val();
        limpaGeral("#listarOs", "#tabPesquisa");
        for (i = 0; i < registroConserto.length; i++) {
            if (oS == registroConserto[i].ordemServico) {
                listaTabela('#tabPesquisa', i);
                controle = 0;
            }
        }
        disparaMensagem(".alertPesquisa", controle);
    });
    // limpa os dados listados.
    $("#limpaPesquisa").click(function () {
        limpaGeral("#listarOs", "#tabPesquisa");
        $('.alertPesquisa').css({ display: 'none' })
    });
    //*******************Alterar**************************      
    //retorna o item pesquisado se ele existir.
    $("#pesquisaAltera").click(function () {
        controle = -1;
        let oS = $("#ordServAlterar").val();
        limpaGeral("#ordServAlterar", "#alteraDados");
        for (i = 0; i < registroConserto.length; i++) {
            if (oS == registroConserto[i].ordemServico) {
                listaTabela('#alteraDados', i);
                controle = i;
                break;
            }
        }
        if (controle > -1) {
            $("#erroAlterar").css({ display: "none" });
            $("#formAltera").css({ display: "block" });
        } else {
            $("#erroAlterar").css({ display: "block" });
        }
    });
    //altera no vetor de objestos e salva no storange.
    $("#Alterar").click(function () {
        let item = controle;
        if ($("#novaSaida").val()) {
            registroConserto[item].dataSaida = $("#novaSaida").val();
        }
        if ($("#novoProblema").val()) {
            registroConserto[item].problemaVeic = $("#novoProblema").val();
        }
        if ($("#novoValor").val()) {
            registroConserto[item].valorConserto = $("#novoValor").val();
        }
        var conserto = JSON.stringify(registroConserto);
        localStorage.setItem("vetorConserto", conserto);
        limpaGeral("#ordServAlterar", "#alteraDados");
        $("#formAltera").css({ display: "none" })

    });
    //limpa o alterar
    $("#limpAltera").click(function () {
        reset_form("#altera")
        limpaGeral("#ordServAlterar", "#alteraDados");
        $("#formAltera").css({ display: "none" })
    });
    //*******************Excluir**************************
    //retorna o registro a ser excluido
    $("#pesquisaExcluir").click(function () {
        controle = -1;
        let aux = 1;
        let oS = $("#ordServExcluir").val();
        //limpaGeral("#ordServExcluir", "#excluirDados");
        for (i = 0; i < registroConserto.length; i++) {
            if (oS == registroConserto[i].ordemServico) {
                listaTabela('#excluirDados', i);
                controle = i;
                aux = 0;
                $("#confirmaExcluir").css({ display: "block" })
                break;
            }
        }
        disparaMensagem(".alertRemover", aux);   
    });
    //exclui registro apos confirmação
    $("#excluir").click(function () {
        let item = controle;
        if (item > -1) {
            registroConserto.splice(item, 1);
        }
        var conserto = JSON.stringify(registroConserto);
        localStorage.setItem("vetorConserto", conserto);
        limpaGeral("#ordServExcluir", "#excluirDados");
        $("#confirmaExcluir").css({ display: "none" })

    });
    //limpa o excluir apos confirmação
    $("#limpExcluir").click(function () {
        reset_form("#altera")
        limpaGeral("#ordServExcluir", "#excluirDados");
        disparaMensagem(".alertPesquisa", 1);
        $("#confirmaExcluir").css({ display: "none" })
    });
});