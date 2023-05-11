const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')// onde vai fivar o que foi criado
console.log(form)
const itens = JSON.parse(localStorage.getItem('itens')) || [] // array localStorage.getItem('itens') ->devolve uma string
console.log(itens) 
//JSON.parse -> STRING PARA JSON.

itens.forEach( (element)=>{
   // console.log(element.quantidade,element.nome)
    criarElemento(element)// passadno o onj
})

// o evento do form é um submit 
form.addEventListener('submit', (evento)=>{
    // preventDefault() tira o padrao de funcionamento do evento no caso do submit
    evento.preventDefault(); //evitar padrao 
    /*
    console.log(evento.target[0].value) 
     nao é uma boa abordagem pois precisa de posicionamento correto (-escabilidade,-)
    console.log(evento)   
     usando target.element passo o id do elemento e tenho acesso a ele
    console.log(evento.target.elements['quantidade'].value)  
    */

    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    if(nome.value != "" && quantidade.value != ""){
        
            const existe = itens.find(element => element.nome == nome.value)

            const itemAtual = {
                "nome": nome.value,
                "quantidade": quantidade.value
            }
                                                  // FAZENDO O EXITENTE - VERIFICA ELEMENTO SE TEM IGUAL E ALTERA.  
            console.log(existe)
                    if(existe) {
                        itemAtual.id = existe.id // so substituição de id - do antigo para o novo dado
                        alterarLista(itemAtual)
                        
                        //itens[existe.id] = itemAtual // substiui o arquivo inteiro daquele id no array

                        // QUAL A POSSIÇÃO DO MEU ELEMENTO ? REFETE A ID DO ELEMENTO SER IGUAL AO ID DA BUSCA?
                        itens[itens.findIndex(buscaId => buscaId.id == existe.id)] = itemAtual

                    }else{

                        // Criação do id fora da criação do obj pra melhor controle.        
                        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0 
                       
                    /*
                        Qual meu ultimo elemento ? nesee elemento qual meu id ? pega o id desse ult elemento e adiciona + 1  

         1 ciclo  ->  id = 0,        itens [vazio] , length -> 0 item    itens[null].id(null) + 1 > : 0 retorna 0 no id
         2 ciclo  ->  id = 1,         itens [0] , length -> 1 item    itens[0].id(0) + 1               1 renorna 1 no id
         3 ciclo   -> id = 2,         itens[1] , length -> 2 item    itens[1].id( 1) + 1               2 retona 2 no id 
                     o id= 2 se refere ao 3 item que vai ser adicionado 

                     */

                                // refatorando passando obje e reutilização de criar elemento (desacoplando o local Storage dele)
                                criarElemento(itemAtual) // -> refatoração  cria elementos 
                                // pegando informação do form e passando pela function pra ser tratada 
                                // teve refatoção passando o obj

                                // um objetto
                                itens.push(itemAtual) // adicionar obj ao array -> array de obj 
                                // não ler obj tem q trasformar em um string     
                    }
                // não ler obj tem q trasformar em um string 
           // console.log(JSON.stringify(itens)) 
            localStorage.setItem("itens", JSON.stringify(itens)) 

            nome.value = "";
            quantidade.value = "";
            // guardar acesso de evento em uma variavel (boa pratica)
            //console.log(lista)  
    }    
})


    //Manter a função exclusiva pra fazer unica e exclusiva de criar elemento passando o obj pelo parametro 
    //<li class="item"><strong data-id="0"> 7 </strong>Camisas</li>
function criarElemento(item){ 
    //cria tag html
    const novoItem = document.createElement('li')
    // add class na tag
    novoItem.classList.add('item')
    // criar nova tag - so posso usar innerHTML em obj criado
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML =  item.quantidade
    numeroItem.dataset.id = item.id // add no data pra atualizar o html
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML =  novoItem.innerHTML + item.nome 
    novoItem.appendChild(criarBotao(item.id))
    // o valor dentro do li no modo HTML ligado mais o nome
    //console.log(novoItem)
    lista.appendChild(novoItem)
}

function alterarLista(item){
    document.querySelector("[data-id='"+item.id+"']").innerText = item.quantidade
}

function criarBotao(id){
    const  botao = document.createElement('button')
   botao.innerText = "X"
    /*
    function ( ) -> anonima  ->this
    ()=> evento sem this
    usar this uso function()
    event ()=>{}
    */
    botao.addEventListener("click" , function(){
        console.log("click")
        // this precisar aceesar o botao apenas <button>
        removerItem(this.parentNode,id)
        // pegar o pai da tag parentNode
    })  
    return botao
} 

function removerItem(remover, id){
    
    remover.remove()
    itens.splice(itens.findIndex(el => el.id == id),1) 
    
    console.log(itens)
    localStorage.setItem("itens", JSON.stringify(itens)) 
    // REMOVER  DE ITENS
    // E REMOVER DO LOCALsTOREGE
}
// logica de codigo perfeito

    /* 
    localStorage.setItem("nome", item.nome)
    localStorage.setItem("quantidade",item.quantidade) // so salva string 

     novoItem.innerHTML = numeroItem + nome 
     Nao cria a ligação entre eles de pai e filho pelo obj
     <li class="item">[object HTMLElement]2</li>
     É nesseario usar a api do document com appendChild

     cria dois obj atribuido um hiieranquiia pelo appendChild -> adicionado um no outro mais o valor do pai (+)
     coloca eles todos com o pai maior dentro de um objteto 
    */
