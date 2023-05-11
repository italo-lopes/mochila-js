const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')
const itens = JSON.parse(localStorage.getItem('itens')) || [] 

itens.forEach( (element)=>{
    criarElemento(element)
})

form.addEventListener('submit', (evento)=>{
    evento.preventDefault(); 

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    if(nome.value != "" && quantidade.value != ""){
            const existe = itens.find(element => element.nome == nome.value)
            const itemAtual = {
                "nome": nome.value,
                "quantidade": quantidade.value
            }                                    
            console.log(existe)
                    if(existe){
                        itemAtual.id = existe.id 
                        alterarLista(itemAtual)
                        itens[itens.findIndex(buscaId => buscaId.id == existe.id)] = itemAtual
                    }else{
                        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0 
                        criarElemento(itemAtual) 
                        itens.push(itemAtual) 
                    }
            localStorage.setItem("itens", JSON.stringify(itens)) 
            nome.value = "";
            quantidade.value = "";
    }    
})

function criarElemento(item){ 

    const novoItem = document.createElement('li')

    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')

    numeroItem.innerHTML =  item.quantidade

    numeroItem.dataset.id = item.id 

    novoItem.appendChild(numeroItem)

    novoItem.innerHTML =  novoItem.innerHTML + item.nome

    novoItem.appendChild(criarBotao(item.id))

    lista.appendChild(novoItem)
}

function alterarLista(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function criarBotao(id){
    const  botao = document.createElement('button')
    botao.innerText = "X"
    botao.addEventListener("click" , function(){
        removerItem(this.parentNode,id)
    })  
    return botao
} 

function removerItem(remover, id){
    remover.remove()
    itens.splice(itens.findIndex(el => el.id == id),1) 
    localStorage.setItem("itens", JSON.stringify(itens)) 
}
