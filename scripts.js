//Classe pai
class Processo{

    constructor(id,nome,duracao){
        this.id = id;
        this.nome = nome;
        this.duracao = duracao;
    }

    static pesquisar(nome){
        //Pesquisa na net o nome do processo
        alert('Pesquisando item' + nome)
        const a = document.createElement('a')
        a.style = 'display: none'
        document.body.appendChild(a)
        let chavePesquisa = nome
        let urllink = 'http://google.com/search?q='+ chavePesquisa
        a.href = urllink
        a.target = '_blank'
        a.click();
        
       
    }

    exportar(){
        
    }

}

//Classe filha herdando atributos e metodos 
class ProcessoEspecializado extends Processo{
    constructor(id,nome,duracao,especializacao){
        super(id,nome,duracao)
        this.especializacao = especializacao
    }

    //sobreescrita do metodo Exemplo de polimorfismo... simplificado
    static pesquisar(nome,especializacao){
        alert('Pesquisando item' + nome + "e" + especializacao)
        //link para o nome
        const a = document.createElement('a')
        a.style = 'display: none'
        document.body.appendChild(a)
        let chavePesquisaA = nome
        let urllinkA = 'http://google.com/search?q='+ chavePesquisaA
        a.href = urllinkA
        a.target = '_blank'
        a.click();
        
        //link para o especialista
        const b = document.createElement('a')
        b.style = 'display: none'
        document.body.appendChild(b)
        let chavePesquisaB = especializacao
        let urllinkB = 'http://google.com/search?q='+ chavePesquisaB
        b.href = urllinkB
        b.target = '_blank'
        b.click();
    }

}

//class ProcessoEspecializado herdando processo
//id nome duracao +especialista
//pesquisar vai ser diferente
//exportar

var arrayProcessos = []
var editId = null

console.log(arrayProcessos)

let testeProcesso = new Processo(99,'testando',999)

function lerDados(){
    let especializacao = document.getElementById("especializacaoProcesso").value
    let nome = document.getElementById('nomeProcesso').value
    let duracao = document.getElementById('duracaoProcesso').value
    validar(nome, duracao, especializacao)
}

function validar(nome, duracao, especializacao){
    //teste e tratamento de erros
    try{
        if(nome == '') throw "Insira um Nome"
        if(duracao == '') throw "Insira uma duração valida"
        if( especializacao == ''){
            console.log('Sem especialista')
            criarProcesso(nome,duracao)
            
        }else{
            console.log(especializacao)
            criarProcessoEspecializado(nome,duracao,especializacao)
        }
    } catch(erro){
        alert('Erro: ' + erro)
    }   
}

function criarProcesso(nome,duracao){
    let processo = new Processo
    processo.id = pegarIdAtual()
    processo.nome = nome
    processo.duracao = duracao
    arrayProcessos.push(processo)
}

function criarProcessoEspecializado(nome,duracao,especializacao){
    let processo = new ProcessoEspecializado
    processo.id = pegarIdAtual()
    processo.nome = nome
    processo.duracao = duracao
    processo.especializacao = especializacao
    arrayProcessos.push(processo) 
}

function pegarIdAtual(){
    console.log('chegou em pegar id atual')
    if(arrayProcessos == ''){
        idAtual = 1;
        console.log(idAtual)
    }else{
       comprimento = arrayProcessos.length
       console.log("comprimento: "+comprimento)

       ultimo = comprimento - 1
       console.log("ultimo:" + ultimo)

       ultimoId = arrayProcessos[ultimo].id
       console.log("ultimoID: " + ultimoId)

       idAtual = ultimoId + 1
       console.log("idAtual: " + idAtual)

    }
    return idAtual
}


function adicionar(){
    if(editId != null){
        console.log(editId)
        console.log('chamou atualizar')
        atualizar(editId)
    }
    else{
        lerDados()
        cancelar()
        console.log(arrayProcessos)
        mostrarProcessos(arrayProcessos)
    }  
}

function remover(id){
    if(confirm('Deseja deletar o produto ID' + id + '?')){
        //poderia ser usado o forEach
        for(let i = 0; i< arrayProcessos.length; i++){
            if(arrayProcessos[i].id == id){
                arrayProcessos.splice(i,1);
                console.log(arrayProcessos)
                mostrarProcessos(arrayProcessos)
            }
        }
    }
}

function procurar(){
    let procurarProcesso = document.getElementById("procurar").value
    let processosParecidos = []
    for(let i = 0 ; i < arrayProcessos.length; i++){
        if(arrayProcessos[i].nome.includes(procurarProcesso)){
            alert('achou um igual id: ' + arrayProcessos[i].id)
            processosParecidos.push(arrayProcessos[i])
            mostrarProcessos(processosParecidos)
        }
    }
}

function editar(dados){
    editId = dados.id;
    document.getElementById("salvar").value = "Atualizar"
    document.getElementById("nomeProcesso").value = dados.nome
    document.getElementById("duracaoProcesso").value = dados.duracao
    document.getElementById("especializacaoProcesso").value = dados.especializacao
}

function atualizar(id){
    let especializacao = document.getElementById("especializacaoProcesso").value
    let nome = document.getElementById('nomeProcesso').value
    let duracao = document.getElementById('duracaoProcesso').value

    for(let i = 0; i<arrayProcessos.length; i++){
        if(arrayProcessos[i].id == id){
            arrayProcessos[i].nome = nome
            arrayProcessos[i].duracao = duracao
            arrayProcessos[i].especializacao = especializacao
        }
    }
    editId = null
    cancelar()
    document.getElementById("salvar").value = "Adicionar"
    mostrarProcessos(arrayProcessos)
}

function cancelar(){
    document.getElementById("especializacaoProcesso").value = ''
    document.getElementById('nomeProcesso').value = ''
    document.getElementById('duracaoProcesso').value =''
}

function importar(){

}

function exportar(){
    const dados = JSON.stringify(arrayProcessos)
    if(confirm("Deseja baixar os dados: "+ dados)){
        download()(dados, 'Arquivo.json')
    }
}

function download(){
    const a = document.createElement('a')
    a.style = 'display: none'
    document.body.appendChild(a)
    return function(conteudo,nomeArquivo){
        const blob = new Blob([conteudo], {type: 'octet/stream'})
        const url = window.URL.createObjectURL(blob)
        a.href = url
        a.download = nomeArquivo
        a.click()
        window.URL.revokeObjectURL(url)
    }
}

function verificarTipoProcesso(dados){
    if(dados.especializacao != null){
        console.log('tem algo na especilizacoa logo é processo especial')
        ProcessoEspecializado.pesquisar(dados.nome, dados.especializacao)
    }
    else{
        console.log('nao tem especializacao logo é processo normal')
        Processo.pesquisar(dados.nome)
    }
}

function mostrarProcessos(listaProcessos){
    //permite que eu passe diferentes listas em momentos diferentes mais possibilidade de expandir o projeto
    let containerProcessos = document.getElementById("containerProcessos")
    containerProcessos.innerHTML = ''

    for(let i = 0; i < listaProcessos.length; i++){
        //cria capsula processo
        let processo = document.createElement('div')
        processo.classList.add('processo')
        containerProcessos.appendChild(processo)

        //cria id processo
        let id = document.createElement('p')
        id.classList.add('id')
        id.innerText = listaProcessos[i].id
        processo.appendChild(id)

        //cria titulo processo
        let nome = document.createElement('h3')
        nome.classList.add('nome')
        nome.innerText = listaProcessos[i].nome
        processo.appendChild(nome)

        //cria duração
        let duracao = document.createElement('p')
        duracao.classList.add('duracao')
        duracao.innerText = listaProcessos[i].duracao
        processo.appendChild(duracao)

        //cria especializaçao
        let especializacao = document.createElement('p')
        especializacao.classList.add('especialista')
        especializacao.innerText = listaProcessos[i].especializacao
        processo.appendChild(especializacao)

        //cria area boteos
        let divAcoes = document.createElement('div')
        divAcoes.classList.add('açoes')
        processo.appendChild(divAcoes)

        //cria botao editar
        let botaoEditar = document.createElement('button')
        let iconeEditar = document.createElement('i')
        iconeEditar.classList.add('fa-solid')
        iconeEditar.classList.add('fa-pen-to-square')
        divAcoes.appendChild(botaoEditar)
        botaoEditar.appendChild(iconeEditar)
        botaoEditar.setAttribute("onClick","editar(" + JSON.stringify(listaProcessos[i]) + ")")

         //cria botao excluir
         let botaoExcluir = document.createElement('button')
         let iconeExcluir = document.createElement('i')
         iconeExcluir.classList.add('fa-solid')
         iconeExcluir.classList.add('fa-trash')
         divAcoes.appendChild(botaoExcluir)
         botaoExcluir.appendChild(iconeExcluir)
         botaoExcluir.setAttribute("onClick","remover(" + listaProcessos[i].id + ")")

        //cria botao pesquisar
        let botaoPesquisa = document.createElement('button')
        let iconePesquisa = document.createElement('i')
        iconePesquisa.classList.add('fa-solid')
        iconePesquisa.classList.add('fa-earth-americas')
        divAcoes.appendChild(botaoPesquisa)
        botaoPesquisa.appendChild(iconePesquisa)
        botaoPesquisa.setAttribute("onClick","verificarTipoProcesso(" + JSON.stringify(listaProcessos[i]) + ")")
        

        //cria botao exportar
        let botaoExportar = document.createElement('button')
        let iconeExportar = document.createElement('i')
        iconeExportar.classList.add('fa-sharp')
        iconeExportar.classList.add('fa-solid')
        iconeExportar.classList.add('fa-download')
        divAcoes.appendChild(botaoExportar)
        botaoExportar.appendChild(iconeExportar)
        //botaopesquisa.setAttribute('onclick'...)
    }
}


const input = document.querySelector('#inputArquivo')
const preview = document.querySelector('#preview')

input.addEventListener('change', function(){
    console.log(this.files)
    const arquivo = this.files[0];
    

    const leitor = new FileReader();

    leitor.addEventListener('load', function(){
        preview.value = leitor.result
        desestruturar(leitor.result)
        mostrarProcessos(arrayProcessos)
    })

    if(arquivo){
        leitor.readAsText(arquivo)
        
    }
})

function desestruturar(arrayProcessosImportada){
    alert('CHEGOU EM DESESTRUTURAR ' + arrayProcessosImportada)
    array = JSON.parse(arrayProcessosImportada)
    console.log(array)
    console.log(typeof(array))

    for(let i = 0; i < array.length; i++){
        console.log(array[i])
        if(array[i].especializacao != null){
            console.log('processo especializado')
            criarProcessoEspecializado(array[i].nome,array[i].duracao,array[i].especializacao)
        }
        else{
            console.log('processo normal')
            criarProcesso(array[i].nome,array[i].duracao)
        }
    }
   
    
}