const completed_Item = document.querySelectorAll('span');
const uncomplete_Item = document.querySelectorAll('span#completed');


Array.from(completed_Item).forEach((Element)=>{
    Element.addEventListener('click', mark_Item_complete_fnc)
});

Array.from(uncomplete_Item).forEach((Element)=>{
    Element.addEventListener('click', uncomplete_item_fnc)

});

async function mark_Item_complete_fnc(){
    const get_completedItem_text = this.parentNode.childNodes[1].innerText
   //const completed_date = this.parentNode.childNodes[3].innerText

    try{
        const response = await fetch('completed_item_link', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'jscompleteItem_body': get_completedItem_text
                //'jscompletedate': completed_date
            })
        })
        const data = await response.json()
            location.reload()
        
        //console.log(data)
        
    }catch(error){
        console.log(error)
    }
}

async function uncomplete_item_fnc(){
    const get_uncomplete_text = this.parentNode.childNodes[1].innerText
    //const getredate = this.parentNode.childNodes[3].innerText
    
        try{
            const response = await fetch('uncomplete_itemlink', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    'uncomplete_item_body': get_uncomplete_text
                    //'redodate': getredate
                })
            })
            const data = await response.json()
            location.reload()
            
        }catch(error){
            console.log(error)
        }
    }