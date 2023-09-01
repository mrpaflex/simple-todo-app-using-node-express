const redoItem = document.querySelectorAll('.item span');

const completedItem = document.querySelectorAll('.item span#completed')

Array.from(completedItem).forEach((Element)=>{
    Element.addEventListener('click', markmecomplete)
})

Array.from(redoItem).forEach((Element)=>{
    Element.addEventListener('click', redotask)

})

async function redotask(){
const getredotex = this.parentNode.childNodes[1].innerText;
//const getredate = this.parentNode.childNodes[3].innerText;

    try{
        const holdfetct = await fetch('redo_me', {
            method: 'put',
            Headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'redome': getredotex,
               // 'redodate': getredate
            })
        })

        const data = await holdfetct.json()
        location.reload()
    }catch(error){
        console.log(error)
    }
}




async function markmecomplete(){
    const completedItem = this.parentNode.childNodes[1].innerText;
   // const completedate = this.parentNode.childNodes[3].innerText;

    try{
        const response = await fetch('done', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'jscompleteItem': completedItem,
                //'jscompletedate': completedate
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(error){
        console.log(error)
    }
}