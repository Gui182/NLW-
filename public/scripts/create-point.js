/* document
    .querySelector("select[name=uf")
    .addEventListener("change", () => {
        console.log("mudei")
    })
 */

 function populateufs(){
     const ufSelect = document.querySelector("select[name=uf]")

     fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res) => { return res.json() })
        .then( states => {

            for( state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }


            
        } )
 }

 populateufs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

     fetch(url)
        .then( (res) => { return res.json() })
        .then( cities => {
            
            for( const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false
            
        } ) 
}

 document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //itens de  coleta

    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for(const item of itemsToCollect){
        item.addEventListener("click", handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=items]")
    let selectItems = []

    function handleSelectedItem(event){
        const itemLi = event.target
        //add or remove uma classe com javascript
        itemLi.classList.toggle("selected")

        const itemId = itemLi.dataset.id

        //Verificar se existem items selecionados
        //pegar os itens selecionados
        
        const alreadySelected = selectItems.findIndex( item => {
            const itemFound = item == itemId
            return itemFound
        })

        //se ja estiver selecionado tirar da selecao

        if(alreadySelected >= 0){
            const filteredItems = selectItems.filter( item => {
                const ItemIsDiferent = item != itemId
                return ItemIsDiferent
            })
            selectItems = filteredItems
        }else{
            //se nao estiver selecionado
            //adicionar a selecao
            selectItems.push(itemId)
            
        }

        
        //atualizar o campo escondidddo
        collectedItems.value = selectItems
      

    }

 