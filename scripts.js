// Base "Source"
var produto_1 = [];
var produto_2 = [];
var produto_3 = [];
const telefone = "";

function produto(nome, desc, price, img){
    
    return (
        this.nome = nome,
        this.descrição = desc,
        this.preço = price,
        this.imagemPNG = img, 
        this.selecionado = false
    )
} 
function refreshProducts(fator, html){
    var canDo = 0;
    html.innerHTML = "";

    fator.forEach((x)=>{
        var div_opção = document.createElement('div');
        var div_prato = document.createElement('div');
        var div_portrait = document.createElement('img');
        var div_prato_nome = document.createElement('p');
        var div_prato_desc = document.createElement('p');
        var div_prato_preço = document.createElement('p');
        
        if(x.selecionado == true){
            div_opção.className = "opcao-comidaSelecionada";
        }else{
            div_opção.className = "opcao-comida";
            div_opção.onclick = function(){
                fator.forEach((y)=>{
                    y.selecionado = false;
                })
                x.selecionado = true;
                return refreshProducts( fator, div_opção.parentElement )
            }
        }
        div_prato.className = "prato";
        div_prato_nome.className = "nome";
        div_prato_desc.className = "descricao";
        div_prato_preço.className = "preco";
        
        div_portrait.src = x.imagemPNG;
        div_prato_nome.textContent = x.nome;        
        div_prato_desc.textContent = x.descrição;
        div_prato_preço.textContent = `R$${x.preço.toFixed(2)}`;

        div_opção.appendChild( div_prato );
        div_prato.appendChild( div_portrait );
        div_prato.appendChild( div_prato_nome );
        div_prato.appendChild( div_prato_desc );
        div_prato.appendChild( div_prato_preço );
        html.appendChild( div_opção );
    })


    produto_1.forEach( function(x){
        if ( x.selecionado ){ canDo++ } 
    } )
    produto_2.forEach( function(x){
        if ( x.selecionado ){ canDo++ } 
    } )
    produto_3.forEach( function(x){
        if ( x.selecionado ){ canDo++ } 
    } )
    if(canDo == 3){
        const pedido = document.querySelector( '.button' )
        pedido.style.backgroundColor = "rgb(81, 226, 37)";
        pedido.onclick = function(){
            var nome_1 = undefined;
            var nome_2 = undefined;
            var nome_3 = undefined;
            produto_1.forEach((x)=>{
                if(x.selecionado){
                    nome_1 = x;
                }
            })
            produto_2.forEach((x)=>{
                if(x.selecionado){
                    nome_2 = x;
                }
            })
            produto_3.forEach((x)=>{
                if(x.selecionado){
                    nome_3 = x;
                }
            })
            var preço = nome_1.preço + nome_2.preço + nome_3.preço;
             window.open(`https://wa.me/${telefone}?text=Olá, gostaria de fazer o pedido:\n- Prato: ${nome_1.nome} \n- Bebida: ${nome_2.nome}\n- Sobremesa: ${nome_3.nome}\nTotal: R$ ${preço.toFixed(2)}`)
        };
    }
}





// Configurações

produto_1.push(
    new produto("Frango Yin Yang", "Frango, Batata, Salada, Molho", 42.20, "./frango.png"),
    new produto("Bife Yin Yang", "Frango, Batata, Salada, Molho", 42.20, "./frango.png")
)
produto_2.push(
    new produto("Coquinha", "Coca-Cola em lata 500ml", 7.99, "./coquinha_gelada_1.png"),
    new produto("Pepsi", "Pepsi em lata 500ml", 6.99, "./coquinha_gelada_1.png")
)
produto_3.push(
    new produto("Pudim", "Copo para descartar seu dinheiro", 9.90, "./copo.jpg"),
) 
    
refreshProducts( produto_1, document.querySelectorAll(".carrossel")[0] );
refreshProducts( produto_2, document.querySelectorAll(".carrossel")[1] );
refreshProducts( produto_3, document.querySelectorAll(".carrossel")[2] );


