// Base "Source"
const produto_1 = [];
const produto_2 = [];
const produto_3 = [];
const telefone = "5521974128800";

function produto(nome, djamo, desc, price, img){
    
    return (
        this.nome = nome,
        this.djamo = djamo,
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
        var div_prato_nome = document.createElement('ruby');
        var div_prato_desc = document.createElement('p');
        var div_prato_preço = document.createElement('p');
        var div_prato_ion = document.createElement('ion-icon');
        div_prato_ion.name= "checkmark-circle";
        
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
        x.nome.forEach(
            (a, b) =>{
                div_prato_nome.innerHTML = div_prato_nome.innerHTML + `${a}<rp>(</rp> <rt>${x.djamo[b]}</rt> <rp>)</rp>`;
            }
        )
        div_prato_desc.textContent = x.descrição;
        div_prato_preço.textContent = `R$${x.preço.toFixed(2)}`;

        div_opção.appendChild( div_prato );
        div_prato.appendChild( div_portrait );
        div_prato.appendChild( div_prato_nome );
        div_prato.appendChild( div_prato_desc );
        div_prato.appendChild( div_prato_preço );
        div_prato.appendChild( div_prato_ion );
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
        pedido.textContent = "Fechar pedido"
        pedido.style.backgroundColor = "rgb(81, 226, 37)";
        pedido.onclick = function(){
            let nome_1 = undefined;
            let nome_2 = undefined;
            let nome_3 = undefined;
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
            document.querySelector(".vignette").classList.remove("off");
            generatePaid();
            
        };
    }
}
function generatePaid(){
    let nome_1 = undefined;
    let nome_2 = undefined;
    let nome_3 = undefined;
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
    document.querySelector(".prato .name").textContent = nome_1.nome;
    document.querySelector(".prato .price").textContent = nome_1.preço.toFixed(2);
    document.querySelector(".bebida .name").textContent = nome_2.nome;
    document.querySelector(".bebida .price").textContent = nome_2.preço.toFixed(2);
    document.querySelector(".sobremesa .name").textContent = nome_3.nome;
    document.querySelector(".sobremesa .price").textContent = nome_3.preço.toFixed(2);
    document.querySelector(".preco .price").textContent = "R$ " + (nome_1.preço + nome_2.preço + nome_3.preço).toFixed(2);
    document.querySelector(".btn.next").addEventListener('click', function(e){
        document.querySelector(".confirm").classList.add("desactive");
        document.querySelector(".endereco").classList.remove("desactive");
    });
    document.querySelectorAll(".btn.cancel").forEach(v=>{
        v.addEventListener('click', function(e){
            document.querySelector(".vignette").classList.add("off");
            document.querySelector(".confirm").classList.remove("desactive");
            document.querySelector(".endereco").classList.add("desactive");
        })
    });
    document.querySelector(".btn.finish").addEventListener('click', function(e){
        let user_name = document.querySelector("input#userName").value;
        let user_mail = document.querySelector("input#userMail").value;
        let preço = nome_1.preço + nome_2.preço + nome_3.preço;
        let texto = `Olá, gostaria de fazer o pedido: \n- Prato: ${nome_1.nome} \n- Bebida: ${nome_2.nome}\n- Sobremesa: ${nome_3.nome} \n\nTotal: R$ ${preço.toFixed(2)}\n\nNome: ${user_name}\nEndereço: ${user_mail}`
        texto = encodeURIComponent(texto)
        window.open(`https://wa.me/${telefone}?text=${texto}`)
    });

}



// Configurações

produto_1.push(
    new produto(["Bi", "bim", "bap"], ["비", "빔", "밥"], "arroz, vegetais, carne, ovo frito, pasta de pimenta.", 14.40, "./img/pratos/bibimbap.jpg"),
    new produto(["Ja", "jang", "myeon"], ["짜", "장", "면"], "macarrão, pepino, abobrinha, cebola, carne de porco.", 14.40, "./img/pratos/jajangmyeon.jpg"),
    new produto(["Kim", "bap"], ["김", "밥"], "legumes, carne, rabanete doce em conserva e arroz.", 14.40, "./img/pratos/kimbap.jpg"),
    new produto(["Kim", "chi"], ["김", "치"], "repolho, pimenta, alho, gengibre e cebolinha.", 14.40, "./img/pratos/kimchi.png"),
    new produto(["Man", "du"], ["만", "두"], "bolinho coreano leva carne moída ou porco.", 14.40, "./img/pratos/mandu.jpg"),
    new produto(["Sam", "gyeop", "sal"], ["삼", "겹", "살"], "fatias grossas de barriga de porco grelhadas.", 14.40, "./img/pratos/samgyeopsal.jpg"),
    new produto(["Tteok", "bokk", "i"], ["떡", "볶", "이"], "bolos de arroz e bolos de peixes doces e cremosos.", 14.40, "./img/pratos/tteokbokki.jpg")
)
produto_2.push(
    new produto(["Chilsung", "Cider"], ["칠성사","이다"], "Limonada refrescante", 4.50, "./img/bebidas/Chilsung Cider.jpg"),
    new produto(["Banana", "mas", "uyu"], ["바나나", "맛","우유"], "Leite de Banana", 4.50, "./img/bebidas/bananauyu.jpg"),
)
produto_3.push(
    new produto(["Bing", "su"], ["빙", "수"], "Sorvete coreano de chocolate", 34.90, "./img/doces/bingsu de chocolate.jpg"),
    new produto(["Bing", "su"], ["빙", "수"], "Sorvete coreano de morango", 35.90, "./img/doces/bingsu de morango.jpg"),
    new produto(["Da", "sik"], ["다", "식"], "Bolinho do ano novo lunar", 17.90, "./img/doces/dasik.jpg"),
    new produto(["Kyung", "dan"], ["경", "단"], "Bolinho de arroz doce", 8.90, "./img/doces/kyungdan.jpg"),
) 
    
refreshProducts( produto_1, document.querySelectorAll(".carrossel")[0] );
refreshProducts( produto_2, document.querySelectorAll(".carrossel")[1] );
refreshProducts( produto_3, document.querySelectorAll(".carrossel")[2] );


