const completed_Item = document.querySelectorAll('#completed')

const uncomplete_Item = document.querySelectorAll('#undone');

Array.from(completed_Item).forEach((Element)=>{
    Element.addEventListener('click', mark_Item_complete_fnc)
})

Array.from(uncomplete_Item).forEach((Element)=>{
    Element.addEventListener('click', uncomplete_item_fnc)

})

async function mark_Item_complete_fnc(){
    const get_completedItem_text = this.parentNode.childNodes[1].innerText
   //const completed_date = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('completed_item_link', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'jscompleteItem_body': get_completedItem_text,
                //'jscompletedate': completed_date
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}

async function uncomplete_item_fnc(){
    const get_uncomplete_text = this.parentNode.childNodes[1].innerText
    //const getredate = this.parentNode.childNodes[3].innerText
    
        try{
            const store_uncomplete_item_fnc = await fetch('uncomplete_Item', {
                method: 'put',
                Headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'uncomplete_item_body': get_uncomplete_text,
                    //'redodate': getredate
                })
            })
    
            const data = await store_uncomplete_item_fnc.json()
            location.reload()
        }catch(error){
            console.log(error)
        }
    }