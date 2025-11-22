let expcompany = document.getElementById('expcompany')
let exprole = document.getElementById('exprole')
let expfrom = document.getElementById('expfrom')
let expto = document.getElementById('expto')

let experiencecard = document.getElementById('experience_card')

let experience = []; 


let addworker = document.getElementById('addworker')
let form = document.getElementById('form')
addworker.addEventListener('click',function(){
     form.style.display = 'block'
})

let addexperience = document.getElementById('add-experience')
addexperience.addEventListener('click', function(){
      if(!expcompany.value || !exprole.value || !expfrom.value || !expto.value ){
        alert('completer les formulaire');
        return ;
    }

    let obj_exprience = {
        nom : expcompany.value ,
        ville : exprole.value ,
        dubet : expfrom.value ,
        finale : expto.value ,
    }

    experience.push(obj_exprience)
    
    
    
    let div = document.createElement("div");
    div.className = "exp-card";
    div.innerHTML = `
        <div>
            <strong>${obj_exprience.nom}</strong><br>
            ${obj_exprience.ville} — ${obj_exprience.dubet} → ${obj_exprience.finale}
        </div>
        <div>
            <button id="edit-exp">edit</button>
            <button id="delete-exp">delet</button>
        </div>
    `;
     
    let deletexp = div.querySelector('#delete-exp')
    let editexp = div.querySelector('#edit-exp')

    deletexp.addEventListener('click', function(){
        div.remove()
        experience = experience.filter(e => e !== obj_exprience)
    })
   editexp.addEventListener('click', function(){
         expcompany.value = obj_exprience.nom
         exprole.value = obj_exprience.ville
         expfrom.value = obj_exprience.dubet
        expto.value = obj_exprience.finale
        div.remove()
        experience = experience.filter(e => e !== obj_exprience)
    })

    experiencecard.appendChild(div)

    expcompany.value = '' ;
    exprole.value = '' ;
    expfrom.value = '' ;
    expto.value = '' ;
})