let expcompany = document.getElementById('expcompany')
let exprole = document.getElementById('exprole')
let expfrom = document.getElementById('expfrom')
let expto = document.getElementById('expto')

let experiencecard = document.getElementById('experience_card')



let experience = []; 
let experiences = [] ;
let arr_worker = [] ;

// ***********************************************************localStorage***********************************************************************

window.addEventListener("DOMContentLoaded", function () {

    let savedWorkers = JSON.parse(localStorage.getItem("lo_worker")) || [];

    arr_worker = savedWorkers;

   
    let cardsmall = document.getElementById('cardsmall');

    arr_worker.forEach(worker => {
        let card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img class="afich_img" src="/assets/img/user_.webp" alt="">
            <div>
                <h2>${worker.fname}</h2>
                <p>${worker.roleselect}</p>
            </div>
        `;

        cardsmall.appendChild(card);

        card.addEventListener('click', () => {
            afihce_anfo(worker);
        });
    });
});


// ***********************************************************localStorage***********************************************************************

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

let cardsmall = document.getElementById('cardsmall')

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
    renderWorkers();

    localStorage.setItem('lo_worker' , JSON.stringify(arr_worker))
    
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

// *********************************************************ajoute******************************************************


// *************************************************************afiche******************************************************


let afiche_info = document.getElementById('afihce_anfo')
function afihce_anfo(worker){
    console.log(worker.experiences)
     let tbale_inf = worker.experiences.map(exp => `
            <h4>${exp.nom}</h4>
            <p>Role: ${exp.ville}</p>
            <p>From: ${exp.dubet} To: ${exp.finale}</p>
    `).join('')

    afiche_info.innerHTML = `
        <div class="afich_top">
            <img class="afich_img" src="/assets/img/user_work.webp" alt="">
            <div class="afich_top_content">
                <h2>${worker.fname}</h2>
                <p>${worker.lname}</p>
            </div>
            <button id="clos_info">close</button>  
        </div>
        <p class="afich_emaile">Email: ${worker.email}</p>
        <p class="afich_phone">Phone: ${worker.phone}</p>
        <p class="work_exp">Work experience :</p>
        ${tbale_inf}
    `
    afiche_info.style.display = 'block';

    let clos_info = document.getElementById('clos_info')
    clos_info.addEventListener('click',function(){
           afiche_info.style.display = 'none';
    })
    

}

// *************************************************************afiche******************************************************

// ****************************************************deplacer sur reception***********************************************


const reception_members = [];
let reception_btn = document.getElementById('reception_btn');
let chamber_reception = document.getElementById('chamber_reception');


reception_btn.addEventListener('click', function () {

    afiche_info.innerHTML = '' ;

    
    let parentCard = reception_btn.parentElement;
    let expt_role = parentCard.dataset.axceptRols.split(',');

    for (let worker of arr_worker) {

         if (expt_role.includes(worker.roleselect) && !reception_members.includes(worker.id)) {

            let servers = document.createElement('div');
            servers.className = 'reception';

            servers.innerHTML = `
                <img src="/assets/img/user_.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.fname}</h3>
                    <p>${worker.roleselect}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(servers);

           
            servers.addEventListener('click', function () {
                reception_members.push(worker.id);
                chamber_reception.appendChild(servers);
                afiche_info.style.display = 'none';
                renderWorkers();
            });

         
            let returnBtn = servers.querySelector(".return_sidebar");
            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                servers.remove();
                reception_members.splice(reception_members.indexOf(worker.id),1);
                renderWorkers();
            });
        }
    }

    afiche_info.style.display = 'block';
});


// ****************************************************deplacer sur reception**********************************************

// ****************************************************deplacer sur conference**********************************************



let conference_btn = document.getElementById('conference_btn');
let chamber_conference = document.getElementById('chamber_conference');


conference_btn.addEventListener('click', function () {

    afiche_info.innerHTML = '' ;

    
    let parentCard = conference_btn.parentElement;
    let expt_role = parentCard.dataset.axceptRols.split(',');

    for (let worker of arr_worker) {

        if (expt_role.includes(worker.roleselect)) {

            let conference = document.createElement('div');
            conference.className = 'reception';

            conference.innerHTML = `
                <img src="/assets/img/user_.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.fname}</h3>
                    <p>${worker.roleselect}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(conference);

           
            conference.addEventListener('click', function (e) {

                if (e.target.classList.contains("return_sidebar")) return;

                chamber_conference.appendChild(conference);
                afiche_info.style.display = 'none';
            });

         
            let returnBtn = conference.querySelector(".return_sidebar");
            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                conference.remove();
                cardSmall(worker);
            });
        }
    }

    afiche_info.style.display = 'block';
});

// ****************************************************deplacer sur conference**********************************************

// ****************************************************deplacer sur servers**********************************************

const server_members = []; 
let servers_btn = document.getElementById('servers_btn');
let chamber_servers = document.getElementById('chamber_servers');


servers_btn.addEventListener('click', function () {

    afiche_info.innerHTML = '' ;

    
    let parentCard = servers_btn.parentElement;
    let expt_role = parentCard.dataset.axceptRols.split(',');

    for (let worker of arr_worker) {

        if (expt_role.includes(worker.roleselect) && !server_members.includes(worker.id)) {

            let servers = document.createElement('div');
            servers.className = 'reception';

            servers.innerHTML = `
                <img src="/assets/img/user_.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.fname}</h3>
                    <p>${worker.roleselect}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(servers);

           
            servers.addEventListener('click', function () {
                server_members.push(worker.id);
                chamber_servers.appendChild(servers);
                afiche_info.style.display = 'none';
                renderWorkers();
            });

         
            let returnBtn = servers.querySelector(".return_sidebar");
            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                servers.remove();
                server_members.splice(server_members.indexOf(worker.id),1);
                renderWorkers();
            });
        }
    }

    afiche_info.style.display = 'block';
});



// ****************************************************deplacer sur servers**********************************************


// ****************************************************deplacer sur security**********************************************



let security_btn = document.getElementById('security_btn');
let chamber_security = document.getElementById('chamber_security');


security_btn.addEventListener('click', function () {

    afiche_info.innerHTML = '' ;

    
    let parentCard = security_btn.parentElement;
    let expt_role = parentCard.dataset.axceptRols.split(',');

    for (let worker of arr_worker) {

        if (expt_role.includes(worker.roleselect)) {

            let security = document.createElement('div');
            security.className = 'reception';

            security.innerHTML = `
                <img src="/assets/img/user_.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.fname}</h3>
                    <p>${worker.roleselect}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(security);

           
            security.addEventListener('click', function (e) {

                if (e.target.classList.contains("return_sidebar")) return;

                chamber_security.appendChild(security);
                afiche_info.style.display = 'none';
            });

         
            let returnBtn = security.querySelector(".return_sidebar");
            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                security.remove();
                cardSmall(worker);
            });
        }
    }

    afiche_info.style.display = 'block';
});


// ****************************************************deplacer sur security**********************************************


// ****************************************************deplacer sur staff**********************************************



let staff_btn = document.getElementById('staff_btn');
let chamber_staff = document.getElementById('chamber_staff');


staff_btn.addEventListener('click', function () {

    afiche_info.innerHTML = '' ;

    
    let parentCard = staff_btn.parentElement;
    let expt_role = parentCard.dataset.axceptRols.split(',');

    for (let worker of arr_worker) {

        if (expt_role.includes(worker.roleselect)) {

            let staff = document.createElement('div');
            staff.className = 'reception';

            staff.innerHTML = `
                <img src="/assets/img/user_.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.fname}</h3>
                    <p>${worker.roleselect}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(staff);

           
            staff.addEventListener('click', function (e) {

                if (e.target.classList.contains("return_sidebar")) return;

                chamber_staff.appendChild(staff);
                afiche_info.style.display = 'none';
            });

         
            let returnBtn = staff.querySelector(".return_sidebar");
            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                staff.remove();
                cardSmall(worker);
            });
        }
    }

    afiche_info.style.display = 'block';
});

// ****************************************************deplacer sur staff**********************************************

// ****************************************************deplacer sur vault**********************************************


let vault_btn = document.getElementById('vault_btn');
let chamber_vault = document.getElementById('chamber_vault');


vault_btn.addEventListener('click', function () {

    afiche_info.innerHTML = '' ;

    
    let parentCard = vault_btn.parentElement;
    let expt_role = parentCard.dataset.axceptRols.split(',');

    for (let worker of arr_worker) {

        if (expt_role.includes(worker.roleselect)) {

            let vaultCard = document.createElement('div');
            vaultCard.className = 'reception';

            vaultCard.innerHTML = `
                <img src="/assets/img/user_.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.fname}</h3>
                    <p>${worker.roleselect}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(vaultCard);

           
            vaultCard.addEventListener('click', function (e) {

                if (e.target.classList.contains("return_sidebar")) return;

                chamber_vault.appendChild(vaultCard);
                afiche_info.style.display = 'none';
                
            });

         
            let returnBtn = vaultCard.querySelector(".return_sidebar");
            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                vaultCard.remove();
                cardSmall(worker);
            });
        }
    }

    afiche_info.style.display = 'block';
});

// *************************************************************checkrooms******************************************

function renderWorkers() {
    let cardsmall = document.getElementById('cardsmall');
    cardsmall.innerHTML = '';

    arr_worker.filter((w) => !server_members.includes(w.id) && !reception_members.includes(w.id) )
    .forEach((worker) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
           <img class="afich_img" src="/assets/img/user_.webp" alt="">
            <div>
                <h2>${worker.fname}</h2>
                <p>${worker.roleselect}</p>
            </div>
        `;
        
        cardsmall.appendChild(card);
        
        card.addEventListener('click',function(){
            afihce_anfo(worker);
        })

        
    });
}


