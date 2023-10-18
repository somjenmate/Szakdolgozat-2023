function $(id)
{
    return document.getElementById(id);
}

let options=document.getElementsByClassName('targykor');
let index=0;

function alertMegjelenit(uzenet)
{
    let alertBox = $('alertBox');
    alertBox.style.display='inline';
    document.getElementsByClassName('alertMessage')[0].innerHTML=uzenet;
    document.getElementsByClassName('yes')[0].addEventListener('click',function(){
        alertBox.style.display='none';
    });
}

function targykorHozzaad(azon,targykornev)
{
    let select=$('themeselect');
    let opt=document.createElement('option');
    opt.value=azon;
    opt.innerHTML=targykornev;
    opt.classList.add('targykor');
    select.appendChild(opt);
}

async function targykorEredmenyRogzit(id, ttk_azon, input)
{
    if((input.value!="")&&(input.value>0))
    {
        if(input.value<=100)
        {
            try{
                let kuldendo={'diak_azon':id,'tech_targykor_azon':ttk_azon,'ttk_ertekeles':input.value};
                let eredmeny= await fetch('./php/index.php/targykorEredmenyRogzites',{method:'POST',body:JSON.stringify(kuldendo)});
                let adatok=await eredmeny.json();
                if(adatok!="")
                {
                    input.value="";
                    techTargykorErtekelesekLekerese();
                    //console.log(adatok);
                }
            }
            catch(error){
                console.log(error);
            }
        }
        else
        {
            alertMegjelenit('100%-nál nagyobb eredmény megadása nem lehetséges');
        }

    }
    else
    {
        alertMegjelenit('A mezők kitöltése kötelező egy 0 %-nál nagyobb eredménnyel!');
    }
}

async function targykorEredmenyModosit(ttk_ertekeles_id, input)
{
    if((input.value!="")&&(input.value>0))
    {
        if(input.value<=100)
        {
            try{
                let kuldendo={'ttk_ertekeles_azon':ttk_ertekeles_id,'ttk_ertekeles':input.value};
                let eredmeny= await fetch('./php/index.php/targykorEredmenyModositas',{method:'POST',body:JSON.stringify(kuldendo)});
                let adatok=await eredmeny.json();
                if(adatok!="")
                {
                    techTargykorErtekelesekLekerese();
                    alertMegjelenit('Az értékelés módosítása megtörtént! (id: '+ttk_ertekeles_id+')');
                }
            }
            catch(error){
                console.log(error);
            }
        }
        else
        {
            alertMegjelenit('100%-nál nagyobb eredmény megadása nem lehetséges');
        }

    }
    else
    {
        alertMegjelenit('A mező kitöltése kötelező egy 0 %-nál nagyobb eredménnyel!');
    }
}

async function targyEredmenyRogzit(id, ttk_azon, input)
{
    if((input.value!="")&&(input.value>0))
    {
        if(input.value<=100)
        {
            let targykorok=JSON.parse(sessionStorage.getItem("tech_targykorok"));
            let targykorokEredmenyek=JSON.parse(sessionStorage.getItem("ttk_ertekeles"));
            let targyEredmenyek=JSON.parse(sessionStorage.getItem("tt_ertekeles"));
            let targyID=0, i=0, ujEredmeny=0, oszto=0;
            let update=false;
            while((targyID==0)&&(i<targykorok.length))
            {
                if(targykorok[i].tech_targykor_azon==ttk_azon)
                {
                    targyID=targykorok[i].tech_targy_azon;
                }
                i++;
            }
            for (const targykor of targykorok) {
                if(targykor.tech_targy_azon==targyID)
                {
                    let targykorID=targykor.tech_targykor_azon;
                    for (const targykorEredmeny of targykorokEredmenyek) {
                        if((parseInt(targykorEredmeny.tech_targykor_azon)==targykorID)&&(parseInt(targykorEredmeny.diak_azon)==id))
                        {
                            ujEredmeny+=parseFloat(targykorEredmeny.ttk_ertekeles);
                            oszto++;
                        }
                    }
                }
            }
            //következő 2 sor mert a sessionstoragebe csak utana kerül be
            ujEredmeny+=parseFloat(input.value);
            oszto++;
            ujEredmeny=ujEredmeny/oszto;
            i=0;
            let regiEredmeny;
            while((update==false)&&(i<targyEredmenyek.length))
            {
                if((parseInt(targyEredmenyek[i].tech_targy_azon)==targyID)&&(parseInt(targyEredmenyek[i].diak_azon)==id))
                {
                    update=true;
                    regiEredmeny=targyEredmenyek[i].tt_ertekeles;
                }
                i++;
            }

            try{
                let kuldendo={'diak_azon':id,'tech_targy_azon':targyID,'tt_ertekeles':ujEredmeny,'kelleupdate':update};
                let eredmeny= await fetch('./php/index.php/targyEredmenyRogzites',{method:'POST',body:JSON.stringify(kuldendo)});
                let adatok=await eredmeny.json();
                if(adatok!="")
                {
                    techTargyErtekelesekLekerese();
                    EgytargyEredmenyRogzit(id, targyID, ujEredmeny, regiEredmeny);
                    //console.log(adatok);
                }
            }
            catch(error){
                console.log(error);
            }
        }
    }
}

async function EgytargyEredmenyRogzit(id, targyID, tt_ertekeles, regi_tt_ertekeles)
{
    let targykorok=JSON.parse(sessionStorage.getItem("tech_targykorok"));
    let targyEredmenyek=JSON.parse(sessionStorage.getItem("tt_ertekeles"));
    let egytargyEredmenyek=JSON.parse(sessionStorage.getItem("et_ertekeles"));
    let egyTargyID=0, i=0, ujEredmeny=0, oszto=0;
    let ttErtekelesAzonok=new Array();
    let update=false;
    while((egyTargyID==0)&&(i<targykorok.length))
    {
        if(targykorok[i].tech_targy_azon==targyID)
        {
            egyTargyID=targykorok[i].egy_targy_azon;
        }
        i++;
    }
    for (const targykor of targykorok) {
        if(targykor.egy_targy_azon==egyTargyID)
        {
            let adottTargyID=targykor.tech_targy_azon;
            for (const targyEredmeny of targyEredmenyek) {
                if((parseInt(targyEredmeny.tech_targy_azon)==adottTargyID)&&(parseInt(targyEredmeny.diak_azon)==id))
                {
                    if(!ttErtekelesAzonok.includes(targyEredmeny.tt_ertekeles_azon))
                    {
                        ujEredmeny+=parseFloat(targyEredmeny.tt_ertekeles);
                        ttErtekelesAzonok.push(targyEredmeny.tt_ertekeles_azon);
                        oszto++;
                    }
                }
            }
        }
    }
    ujEredmeny+=parseFloat(tt_ertekeles);
    ujEredmeny-=parseFloat(regi_tt_ertekeles);
    ujEredmeny=parseFloat(ujEredmeny/oszto);
    i=0;
    while((update==false)&&(i<egytargyEredmenyek.length))
    {
        if((parseInt(egytargyEredmenyek[i].egy_targy_azon)==egyTargyID)&&(parseInt(egytargyEredmenyek[i].diak_azon)==id))
        {
            update=true;
        }
        i++;
    }

    try{
        let kuldendo={'diak_azon':id,'egy_targy_azon':egyTargyID,'et_ertekeles':ujEredmeny,'kelleupdate':update};
        let eredmeny= await fetch('./php/index.php/EgytargyEredmenyRogzites',{method:'POST',body:JSON.stringify(kuldendo)});
        let adatok=await eredmeny.json();
        if(adatok!="")
        {
            EgyTargyErtekelesekLekerese();
            //console.log(adatok);
        }
    }
    catch(error){
        console.log(error);
    }
}

//Technikumi tárgykör jelenlegi eredményének megjelenítése a meter elemben (lekért+ ha van beírt)
function targykorSzamol(id, ttk_azon, input, meter, label)
{
    let adatokle=sessionStorage.getItem("ttk_ertekeles");
    let adatok=JSON.parse(adatokle);
    let eredmenykiiras=0;
    let oszto=0;
    for (const adat of adatok) 
    {
        if((adat.diak_azon==id)&&(adat.tech_targykor_azon==ttk_azon))
        {
            oszto++;
            eredmenykiiras+=parseFloat(adat.ttk_ertekeles.replace('.',','));
        }
    }
    if((input.value!="")&&(input.value>0)&&(input.value<=100))
    {
        eredmenykiiras+=parseFloat(input.value);
        oszto++;
    }
    if(eredmenykiiras!=0)
    {
        eredmenykiiras=(eredmenykiiras/oszto);
    }
    meter.value=eredmenykiiras/100;
    label.innerHTML="~"+Math.round(eredmenykiiras)+"%";
}

function techTargyKiir(id, ttk_azon, meter, label)
{
    let targykorok=JSON.parse(sessionStorage.getItem("tech_targykorok"));
    let targyEredmenyek=JSON.parse(sessionStorage.getItem("tt_ertekeles"));
    let megvan=false; let i=0, targyID=0;
    while((targyID==0)&&(i<targykorok.length))
    {
        if(targykorok[i].tech_targykor_azon==ttk_azon)
        {
            targyID=targykorok[i].tech_targy_azon;
        }
        i++;
    }
    i=0;
    while((megvan==false)&&(i<targyEredmenyek.length))
    {
        if((parseInt(targyEredmenyek[i].tech_targy_azon)==targyID)&&(parseInt(targyEredmenyek[i].diak_azon)==id))
        {
            meter.value=parseFloat(targyEredmenyek[i].tt_ertekeles)/100;
            label.innerHTML="~"+Math.round(parseFloat(targyEredmenyek[i].tt_ertekeles))+"%";
            megvan=true;
        }
        i++;
    }
    if(megvan==false)
    {
        meter.value=0;
        label.innerHTML="~0%";
    }
}

function egyTargyKiir(id, ttk_azon, meter, label)
{
    let targykorok=JSON.parse(sessionStorage.getItem("tech_targykorok"));
    let egytargyEredmenyek=JSON.parse(sessionStorage.getItem("et_ertekeles"));
    let megvan=false; let i=0, egytargyID=0;
    while((egytargyID==0)&&(i<targykorok.length))
    {
        if(targykorok[i].tech_targykor_azon==ttk_azon)
        {
            egytargyID=targykorok[i].egy_targy_azon;
        }
        i++;
    }
    i=0;
    while((megvan==false)&&(i<egytargyEredmenyek.length))
    {
        if((parseInt(egytargyEredmenyek[i].egy_targy_azon)==egytargyID)&&(parseInt(egytargyEredmenyek[i].diak_azon)==id))
        {
            meter.value=parseFloat(egytargyEredmenyek[i].et_ertekeles)/100;
            label.innerHTML="~"+Math.round(parseFloat(egytargyEredmenyek[i].et_ertekeles))+"%";
            megvan=true;
        }
        i++;
    }
    if(megvan==false)
    {
        meter.value=0;
        label.innerHTML="~0%";
    }
}

function ertekelesekMegtekinteseLetrehoz(nev, azon, ttk_azon)
{
    let targykorokEredmenyek=JSON.parse(sessionStorage.getItem("ttk_ertekeles"));
    let db=0, i=0;
    while((db==0)&&(i<targykorokEredmenyek.length))
    {
        if((targykorokEredmenyek[i].tech_targykor_azon==ttk_azon)&&(targykorokEredmenyek[i].diak_azon==azon))
        {
            db++;
        }
        i++;
    }
    if(db!=0)
    {
        let body=document.getElementsByTagName('body')[0];
        let container=document.createElement('div');
        container.classList.add('container','tanuloijegyek_megjelenites','text-center');
        container.id='tanuloijegyek_container';
    
        let row=document.createElement('div');
        row.classList.add('row','justify-content-center');
    
        let tartalom=document.createElement('div');
        tartalom.classList.add('col-md-12','col-lg-10','shadow-lg','rounded','outdiv2','p-0','d-flex','flex-column','align-self-center');
    
        let accordion=document.createElement('div');
        accordion.classList.add('accordion','col-12','p-4','rounded');
        accordion.id='tanuloijegyek_accordion';
    
        let form=document.createElement('form');
        let bezarBtn=document.createElement('input');
        bezarBtn.type='button';
        bezarBtn.id='jegyek_close';
        bezarBtn.value='Bezárás';
        bezarBtn.classList.add('rounded','mb-4');
        bezarBtn.addEventListener('click',function(){
            container.innerHTML="";
            $('tanulok_container').classList.add('tanulok_megjelenites');
            $('tanulok_container').classList.remove('tanulok_hidden');
            let accordion_items=document.getElementsByClassName('accordion-item');
            for (const accordion_i of accordion_items) {
                accordion_i.childNodes[1].style.display='none';
            }

        });
    
        form.appendChild(bezarBtn);
        tartalom.appendChild(accordion);
        tartalom.appendChild(form);
        row.appendChild(tartalom);
        container.appendChild(row);
        body.insertBefore(container,body.firstChild);

        $('tanulok_container').classList.add('tanulok_hidden');
        ertekelesekMegtekinteseFeltolt(nev, azon, ttk_azon);
    }
    else
    {
        if($('tanulok_container').classList.contains('tanulok_hidden'))
        {
            $('tanulok_container').classList.add('tanulok_megjelenites');
            $('tanulok_container').classList.remove('tanulok_hidden');
            $('ertekeles_rogzites_div').style.display='none';
        }
        alertMegjelenit('A választott diáknak nincs még felvitt értékelése az adott technikumi tárgykörhöz!\nKérem adjon meg legalább egy értékelést');
    }
    
}

function ertekelesekMegtekinteseFeltolt(nev, azon, ttk_azon)
{
    let targykorokEredmenyek=JSON.parse(sessionStorage.getItem("ttk_ertekeles"));
    let accordion=$('tanuloijegyek_accordion');

    let accordionItem=document.createElement('div');
    accordionItem.classList.add('accordion-item');

    //accordion header
    let h2=document.createElement('h2');
    h2.classList.add('accordion-header');
    let nevGomb=document.createElement('button');
    nevGomb.setAttribute("type","button");
    nevGomb.classList.add('accordion-button');
    nevGomb.style.backgroundColor='rgb(82, 121, 111)';
    nevGomb.style.color='white';
    nevGomb.innerHTML=nev+' - Tárgykör: '+options[$('themeselect').selectedIndex].innerText;
    nevGomb.addEventListener('click', function() {
        let accordionContent = this.parentElement.nextElementSibling;
        if (accordionContent.style.display === 'block') {
          accordionContent.style.display = 'none';
        } else {
          accordionContent.style.display = 'block';
        }
      });
    h2.appendChild(nevGomb);
    accordionItem.appendChild(h2);

    //tartalom
    let tartalom=document.createElement('div');
    tartalom.style.display = 'block';
    let accordionItemBody=document.createElement('div');
    accordionItemBody.classList.add('accordion-body');
    accordionItemBody.classList.add('row');
    let ertekelesekDiv=document.createElement('div');
    ertekelesekDiv.classList.add('col-12');
    let form=document.createElement('form');
    for (const targykorEredmeny of targykorokEredmenyek) {
        if((targykorEredmeny.tech_targykor_azon==ttk_azon)&&(targykorEredmeny.diak_azon==azon))
        {
            let inputDiv=document.createElement('div');
            let label=document.createElement('label');
            label.innerHTML="Értékelés: ";
            label.style.color='rgb(82, 121, 111)';
            let input=document.createElement('input');
            input.type='number';
            input.min=0;
            input.max=100;
            input.value=parseFloat(targykorEredmeny.ttk_ertekeles);
            input.classList.add('col-10','rounded','input','m-1');
            let hidden=document.createElement('input');
            hidden.type='hidden';
            hidden.value=parseInt(targykorEredmeny.ttk_ertekeles_azon); 
            input.addEventListener('change',function(){
                targykorEredmenyModosit(this.nextSibling.value,this);
            });

            inputDiv.appendChild(label);
            inputDiv.appendChild(input);
            inputDiv.appendChild(hidden);
            form.appendChild(inputDiv);
        }
    }
    
    ertekelesekDiv.appendChild(form);
    accordionItemBody.appendChild(ertekelesekDiv);
    tartalom.appendChild(accordionItemBody);
    accordionItem.appendChild(tartalom);
    accordion.appendChild(accordionItem);
}

function accordionItemHozzaad(nev,azon)
{
    let accordion=$('tanulokAccordion');

    let accordionItem=document.createElement('div');
    accordionItem.classList.add('accordion-item','mt-1','mb-1');

    //accordion header
    let h2=document.createElement('h2');
    h2.classList.add('accordion-header');
    let nevGomb=document.createElement('button');
    nevGomb.setAttribute("type","button");
    nevGomb.classList.add('accordion-button');
    nevGomb.style.backgroundColor="#52796f";
    nevGomb.style.color="white";
    nevGomb.innerHTML=nev+' - Tárgykör: '+options[$('themeselect').selectedIndex].innerText;
    nevGomb.addEventListener('click',function(){
        targykorSzamol(this.parentElement.nextSibling.firstChild.firstChild.firstChild.childNodes[3].value, $('themeselect').value, this.parentElement.nextSibling.firstChild.firstChild.firstChild.childNodes[1], this.parentElement.nextSibling.firstChild.childNodes[1].childNodes[1],this.parentElement.nextSibling.firstChild.childNodes[1].childNodes[2]);
        techTargyKiir(this.parentElement.nextSibling.firstChild.firstChild.firstChild.childNodes[3].value, $('themeselect').value, this.parentElement.nextSibling.firstChild.childNodes[1].childNodes[4], this.parentElement.nextSibling.firstChild.childNodes[1].childNodes[5]);
        egyTargyKiir(this.parentElement.nextSibling.firstChild.firstChild.firstChild.childNodes[3].value, $('themeselect').value, this.parentElement.nextSibling.firstChild.childNodes[1].childNodes[7], this.parentElement.nextSibling.firstChild.childNodes[1].childNodes[8]);
    });
    nevGomb.addEventListener('click', function() {
        let accordionContent = this.parentElement.nextElementSibling;
        if (accordionContent.style.display === 'block') {
          accordionContent.style.display = 'none';
        } else {
          accordionContent.style.display = 'block';
        }
      });
    h2.appendChild(nevGomb);
    accordionItem.appendChild(h2);

    //tartalom
    let tartalom=document.createElement('div');
    tartalom.id="collapse"+index;
    tartalom.style.display = 'none';
    let accordionItemBody=document.createElement('div');
    accordionItemBody.classList.add('accordion-body');
    accordionItemBody.classList.add('row');
    let szazalekDiv=document.createElement('div');
    szazalekDiv.id='szazalekDiv';
    szazalekDiv.classList.add('col-md-5','col-sm-12','col-12','mb-4');
    let form=document.createElement('form');
    form.classList.add('input-group','align-items-center');
    let label1=document.createElement('label');
    label1.innerHTML='Elért eredmény';
    label1.style.color='rgb(82, 121, 111)';
    form.appendChild(label1);
    let input=document.createElement('input');
    input.type='number';
    input.min=0;
    input.max=100;
    input.addEventListener('change', function(){
        targykorSzamol(this.nextSibling.nextSibling.value, $('themeselect').value, this, this.parentElement.parentElement.nextSibling.firstChild.nextSibling, this.parentElement.parentElement.nextSibling.firstChild.nextSibling.nextSibling) ;
    });
    input.classList.add('col-10','rounded','input');
    form.appendChild(input);
    let label2=document.createElement('label');
    label2.innerHTML='%';
    label2.classList.add('col-1','m-1');
    label2.style.transform='none';
    label2.style.fontSize='1.5rem';
    form.appendChild(label2);
    let hiddenId=document.createElement('input');
    hiddenId.type='hidden';
    hiddenId.value=azon;
    form.appendChild(hiddenId);
    let kuldbuttn=document.createElement('input');
    kuldbuttn.type='button';
    kuldbuttn.value='Rögzít';
    kuldbuttn.addEventListener('click',function(){
        targykorEredmenyRogzit(this.previousSibling.value, $('themeselect').value, this.previousSibling.previousSibling.previousSibling);
        targyEredmenyRogzit(this.previousSibling.value, $('themeselect').value, this.previousSibling.previousSibling.previousSibling);
    });
    kuldbuttn.addEventListener('click', function() {
        let accordionContent = this.parentElement.parentElement.parentElement.parentElement;
        if (accordionContent.style.display === 'block') {
          accordionContent.style.display = 'none';
        } else {
          accordionContent.style.display = 'block';
        }
    });
    kuldbuttn.classList.add('col-md-11','col-sm-12','col-12', 'rounded','mt-2');
    form.appendChild(kuldbuttn);
    szazalekDiv.appendChild(form);
    accordionItemBody.appendChild(szazalekDiv);

    let jelenlegiAllasDiv=document.createElement('div');
    jelenlegiAllasDiv.classList.add('col-md-5','col-sm-12','col-12','mb-4');
    let label3=document.createElement('label');
    label3.innerHTML="Technikumi tárgykör jelenlegi eredménye";
    label3.style.color='#52796f';
    jelenlegiAllasDiv.appendChild(label3);
    let meterTargykor=document.createElement('meter');
    meterTargykor.min=0;
    meterTargykor.low=0.34;
    meterTargykor.high=0.60;
    meterTargykor.optimum=0.80;
    meterTargykor.max=1;
    meterTargykor.classList.add('col-8');
    jelenlegiAllasDiv.appendChild(meterTargykor);
    let label4=document.createElement('label');
    label4.style.color='#52796f';
    jelenlegiAllasDiv.appendChild(label4);

    let label5=document.createElement('label');
    label5.innerHTML="Technikumi tárgy jelenlegi eredménye";
    label5.style.color='#52796f';
    jelenlegiAllasDiv.appendChild(label5);
    let meterTargy=document.createElement('meter');
    meterTargy.min=0;
    meterTargy.low=0.34;
    meterTargy.high=0.60;
    meterTargy.optimum=0.80;
    meterTargy.max=1;
    meterTargy.classList.add('col-8');
    jelenlegiAllasDiv.appendChild(meterTargy);
    let label6=document.createElement('label');
    label6.style.color='#52796f';
    jelenlegiAllasDiv.appendChild(label6);

    let label7=document.createElement('label');
    label7.innerHTML="Egyetemi tárgy jelenlegi eredménye";
    label7.style.color='#52796f';
    jelenlegiAllasDiv.appendChild(label7);
    let meterEgyTargy=document.createElement('meter');
    meterEgyTargy.min=0;
    meterEgyTargy.low=0.34;
    meterEgyTargy.high=0.60;
    meterEgyTargy.optimum=0.80;
    meterEgyTargy.max=1;
    meterEgyTargy.classList.add('col-8');
    jelenlegiAllasDiv.appendChild(meterEgyTargy);
    let label8=document.createElement('label');
    label8.style.color='#52796f';
    jelenlegiAllasDiv.appendChild(label8);

    accordionItemBody.appendChild(jelenlegiAllasDiv);

    let jegyekDiv=document.createElement('div');
    jegyekDiv.classList.add('col-md-2','col-sm-12','col-12');
    let form2=document.createElement('form');
    let jegyekBtn=document.createElement('input');
    jegyekBtn.type='button';
    jegyekBtn.value='Értékelések';
    jegyekBtn.addEventListener('click',function(){
        ertekelesekMegtekinteseLetrehoz(nev, azon, $('themeselect').value);
    });
    jegyekBtn.classList.add('col-12', 'rounded');
    form2.appendChild(jegyekBtn);
    jegyekDiv.appendChild(form2);
    accordionItemBody.append(jegyekDiv);

    tartalom.appendChild(accordionItemBody);
    index++;
    accordionItem.appendChild(tartalom);
    accordion.appendChild(accordionItem);
    $('tanulok_container').style.height+=100+'vw';
}

function tanulokLekerese()
{
    let osztaly=$('classselect').value;
    let adatokle=sessionStorage.getItem("diakok");
    let adatok=JSON.parse(adatokle);
    $('tanulokAccordion').innerHTML="";
    for (const adat of adatok) 
    {
        if(adat.diak_evfolyam==osztaly)
        {
            accordionItemHozzaad(adat.diak_nev,adat.diak_azon);
        }
    }
}

async function targykorokLekerese()
{
    try{
        let eredmeny=await fetch('./php/index.php/targykorokLekeres');
        let adatok= await eredmeny.json();
        if(adatok!="")
        {
            sessionStorage.setItem("tech_targykorok",JSON.stringify(adatok));
            for (const adat of adatok) {
                targykorHozzaad(adat.tech_targykor_azon, adat.tech_targykornev);
            }
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

async function techTargykorErtekelesekLekerese(){
    try{
        let eredmeny=await fetch('./php/index.php/techTargykorErtekelesekLekeres');
        let adatok= await eredmeny.text();
        if(adatok!="")
        {
            sessionStorage.setItem("ttk_ertekeles",adatok);
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

async function techTargyErtekelesekLekerese(){
    try{
        let eredmeny=await fetch('./php/index.php/techTargyErtekelesekLekeres');
        let adatok= await eredmeny.text();
        if(adatok!="")
        {
            sessionStorage.setItem("tt_ertekeles",adatok);
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

async function Kijelentkezes()
{
    try{
        let eredmeny=await fetch('./php/index.php/Kijelentkezes');
        let adatok= await eredmeny.text();
        //console.log(adatok);
        window.location.replace('./index.html');
        
    }
    catch(error)
    {
        console.log(error);
    }
}

window.addEventListener('load',isLoggedIn);
window.addEventListener('load',targykorokLekerese);
window.addEventListener('load',techTargykorErtekelesekLekerese);
window.addEventListener('load',techTargyErtekelesekLekerese);
window.addEventListener('load',EgyTargyErtekelesekLekerese);
window.addEventListener('load',osszesTanuloLekerese);
$('seestudentlist').addEventListener('click',tanulokLekerese);
$('back').addEventListener('click',function(){
    open('./valaszto.html','_self');
});
$('logout').addEventListener('click',Kijelentkezes);

$('seestudentlist').addEventListener('click',function (){
    if($('tanulok_container').classList.contains('tanulok_hidden'))
    {
        $('tanulok_container').classList.add('tanulok_megjelenites');
        $('tanulok_container').classList.remove('tanulok_hidden');
        $('ertekeles_rogzites_div').style.display='none';
    }
    else
    {
        $('tanulok_container').classList.add('tanulok_hidden');
        $('tanulok_container').classList.remove('tanulok_megjelenites');
        $('ertekeles_rogzites_div').style.display='table';
    }

});

$('close').addEventListener('click',function (){
    if($('tanulok_container').classList.contains('tanulok_megjelenites'))
    {
        $('tanulok_container').classList.add('tanulok_hidden');
        $('tanulok_container').classList.remove('tanulok_megjelenites');
        $('ertekeles_rogzites_div').style.display='table';
    }
    else
    {
        $('tanulok_container').classList.add('tanulok_megjelenites');
        $('tanulok_container').classList.remove('tanulok_hidden');
        $('ertekeles_rogzites_div').style.display='none';
    }
});