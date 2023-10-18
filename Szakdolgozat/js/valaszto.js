function $(id)
{
    return document.getElementById(id);
}

let buttons=document.getElementsByTagName('button');

function adatRogzitesMegnyitas()
{
    open('./adatrogzites.html','_self');
}

function adminisztracioMegnyitas()
{
    open('./adminisztracio.html','_self');
}

function ertekelesekMegtekinteseLetrehoz()
{
    let egytargyEredmenyek=JSON.parse(sessionStorage.getItem("et_ertekeles"));
    let diakok=JSON.parse(sessionStorage.getItem("diakok"));
    let body=document.getElementsByTagName('body')[0];
    let container=document.createElement('div');
    container.classList.add('container','text-center','tanulok_hidden','p-1');
    container.id='evvegi_eredmenyek_container';

    let row=document.createElement('div');
    row.classList.add('row','justify-content-center');

    let tartalom=document.createElement('div');
    tartalom.classList.add('col-md-12','col-lg-10','shadow-lg','rounded','outdiv2','p-0','d-flex','flex-column','align-self-center');

    let h2=document.createElement('h2');
    h2.innerHTML="A képzési program végére elért egyetemi tárgyak értékelései";
    h2.style.color='#52796f'; h2.classList.add('mt-2');
    tartalom.appendChild(h2);

    let accordion=document.createElement('div');
    accordion.classList.add('accordion','col-12','p-4','rounded');
    accordion.id='vegsoErtekelesek';

    let van=false;
    for (const diak of diakok) {
        if(diak.diak_evfolyam==13)
        {
            van=true;
            let accordionItem=document.createElement('div');
            accordionItem.classList.add('accordion-item','mt-1','mb-1');
        
            //accordion header
            let nevCim=document.createElement('h2');
            nevCim.classList.add('accordion-header');
            let nevGomb=document.createElement('button');
            nevGomb.setAttribute("type","button");
            nevGomb.classList.add('accordion-button');
            nevGomb.style.backgroundColor="#52796f";
            nevGomb.style.color="white";
            nevGomb.innerHTML=diak.diak_nev;
            nevGomb.addEventListener('click', function() {
                let accordionContent = this.parentElement.nextElementSibling;
                if (accordionContent.style.display === 'block') {
                  accordionContent.style.display = 'none';
                } else {
                  accordionContent.style.display = 'block';
                }
              });
            nevCim.appendChild(nevGomb);
            accordionItem.appendChild(nevCim);

            //tartalom
            let tartalom2=document.createElement('div');
            tartalom2.style.display = 'none';
            let accordionItemBody=document.createElement('div');
            accordionItemBody.classList.add('accordion-body');
            accordionItemBody.classList.add('row');
            for (const egytargyEredmeny of egytargyEredmenyek) {
                if(egytargyEredmeny.diak_azon==diak.diak_azon)
                {
                    let h6=document.createElement('h6');
                    h6.style.color='#52796f';h6.classList.add('mb-2');
                    h6.innerHTML="Egyetemi tárgy azonosítója: "+egytargyEredmeny.egy_targy_azon+", elért eredmény: "+egytargyEredmeny.et_ertekeles+" %";
                    accordionItemBody.appendChild(h6);
                }
            }
            tartalom2.appendChild(accordionItemBody);
            accordionItem.appendChild(tartalom2);
            accordion.appendChild(accordionItem);
        }
    }

    if(van)
    {
        tartalom.appendChild(accordion);
    }
    else
    {
        tartalom.style.color='#52796f';
        tartalom.style.fontWeight='bold';
        tartalom.style.fontSize='2rem';
        tartalom.innerHTML='Jelenleg nincs végzős osztály!';
    }

    let form=document.createElement('form');
    let bezarBtn=document.createElement('input');
    bezarBtn.type='button';
    bezarBtn.id='close';
    bezarBtn.value='Bezárás';
    bezarBtn.classList.add('rounded','m-2');
    bezarBtn.addEventListener('click',function (){
        if($('evvegi_eredmenyek_container').classList.contains('tanulok_megjelenites'))
        {
            $('evvegi_eredmenyek_container').classList.add('tanulok_hidden');
            $('evvegi_eredmenyek_container').classList.remove('tanulok_megjelenites');
        }
        else
        {
            $('evvegi_eredmenyek_container').classList.add('tanulok_megjelenites');
            $('evvegi_eredmenyek_container').classList.remove('tanulok_hidden');
        }
        buttons[0].style.display='inline';
        buttons[1].style.display='inline';
        buttons[2].style.display='inline';
    });
    let newBtn=document.createElement('input');
    newBtn.type='button';
    newBtn.id='newYear';
    newBtn.value='Új év kezdése';
    newBtn.classList.add('rounded','m-2');
    newBtn.addEventListener('click',function(){
        ujEv();
    });
    form.appendChild(bezarBtn);
    form.appendChild(newBtn);
    tartalom.appendChild(form);
    row.appendChild(tartalom);
    container.appendChild(row);
    body.appendChild(container);
}

async function evfolyamNovelese()
{
    try{
        let eredmeny= await fetch('./php/index.php/evfolyamNoveles');
        let adatok=await eredmeny.json();
        if((adatok!="")&&(adatok.valasz!=""))
        {
            //console.log(adatok);
        }
    }
    catch(error){
        console.log(error);
    }
}

async function utolsoEvesTorlese()
{
    try{
        let eredmeny= await fetch('./php/index.php/utolsoEvesTorles');
        let adatok=await eredmeny.json();
        if((adatok!="")&&(adatok.valasz!=""))
        {
            console.log(adatok);
        }
    }
    catch(error){
        console.log(error);
    }
}

function ujEv()
{
    let biztos=confirm("Biztos, hogy új évet szeretne kezdeni?");
    //console.log(biztos); //ok -> true, mégse -> false
    if(biztos)
    {
        evfolyamNovelese();
        utolsoEvesTorlese();
    }
}

async function Kijelentkezes()
{
    try{
        let eredmeny=await fetch('./php/index.php/Kijelentkezes');
        let adatok= await eredmeny.text();
        console.log(adatok);
        window.location.replace('./index.html');
        
    }
    catch(error)
    {
        console.log(error);
    }
}

async function isLoggedIn()
{
    try{
        let eredmeny=await fetch('./php/index.php/isLoggedIn');
        let adatok= await eredmeny.json();
        if(adatok.url!="")
        {
            window.location.replace(adatok.url);
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

async function EgyTargyErtekelesekLekerese(){
    try{
        let eredmeny=await fetch('./php/index.php/EgyTargyErtekelesekLekeres');
        let adatok= await eredmeny.text();
        if(adatok!="")
        {
            sessionStorage.setItem("et_ertekeles",adatok);
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

async function osszesTanuloLekerese()
{
    try{
        let eredmeny=await fetch('./php/index.php/osszesTanuloLekeres');
        let adatok= await eredmeny.text();
        if(adatok!="")
        {
            sessionStorage.setItem("diakok",adatok);
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

window.addEventListener('load',EgyTargyErtekelesekLekerese);
window.addEventListener('load',osszesTanuloLekerese);
window.addEventListener('load',isLoggedIn);
window.addEventListener('load',ertekelesekMegtekinteseLetrehoz);
buttons[0].addEventListener('click',adatRogzitesMegnyitas);
buttons[1].addEventListener('click',adminisztracioMegnyitas);
buttons[2].addEventListener('click',function(){
    if($('evvegi_eredmenyek_container').classList.contains('tanulok_hidden'))
    {
        $('evvegi_eredmenyek_container').classList.add('tanulok_megjelenites');
        $('evvegi_eredmenyek_container').classList.remove('tanulok_hidden');
    }
    else
    {
        $('evvegi_eredmenyek_container').classList.add('tanulok_hidden');
        $('evvegi_eredmenyek_container').classList.remove('tanulok_megjelenites');
    }

    buttons[0].style.display='none';
    buttons[1].style.display='none';
    buttons[2].style.display='none';
});

$('logout').addEventListener('click',Kijelentkezes);