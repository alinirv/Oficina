class Mecanicos{
    constructor(){
        this.registro = 1;
        this.cpf = "";
        this.nome ="";
        this.dataNascimento ="";
        this.genero = "";
        this.emailPrincipal ="";
        this.emailSecundario ="";
        this.tel1 ="";
        this.tel2 ="";
        this.tel3 ="";
        this.salario ="";
    }
    cadastrar(){
        this.lerDados()

    }
    lerDados(){
        let dados ={
        'registro':this.registro,
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
        return dados;

    }
    excluir(){

    }
}
var regstromecanico = new Mecanicos();