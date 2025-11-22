let expcompany = document.getElementById('expcompany')
let exprole = document.getElementById('exprole')
let expfrom = document.getElementById('expfrom')
let expto = document.getElementById('expto')

let experiencecard = document.getElementById('experience_card')

let experience = []; 
let experiences = [] ;
let arr_worker = [] ;


let addworker = document.getElementById('addworker')
let form = document.getElementById('form')
addworker.addEventListener('click',function(){
     form.style.display = 'block'
})

// *****************************************experience****************************************************** 

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
            ${obj_exprience.ville} || from : ${obj_exprience.dubet} to : ${obj_exprience.finale}
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

// ****************************************experience******************************************************

// ********************************************ajoute***********************************************************

let addbtn = document.getElementById('submit-form')
let roleselect = document.getElementById('role-select')
let fname = document.getElementById('fname')
let lname = document.getElementById('lname')
let phone = document.getElementById('phone')
let email = document.getElementById('email')

addbtn.addEventListener('click', function(){

    experiencecard.innerHTML = ''

    if(!fname.value || !lname.value || !phone.value || !email.value   ){
        alert('complete la fermelure');
        return ;
    }
    let obj_worker = {
        id : Date.now() ,
        fname : fname.value ,
        lname : lname.value ,
        roleselect : roleselect.value ,
        phone : phone.value ,
        email : email.value ,
        experiences : [...experience] ,
    }
    arr_worker.push(obj_worker)
   

        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
           <img src="" alt="">
            <div>
                <h2>${obj_worker.fname}</h2>
                <p>${obj_worker.roleselect}</p>
            </div>
        `;
        let cardsmall = document.getElementById('cardsmall')
        cardsmall.appendChild(card)
    
      fname.value = '';
      lname.value = ''  
      roleselect.value = '' 
      phone.value = '' 
      email.value = '' 
      experience = [];
       form.style.display = 'none'
})


let closeForm = document.getElementById('closeForm')

closeForm.addEventListener('click', function(){
    form.style.display = 'none'
})

