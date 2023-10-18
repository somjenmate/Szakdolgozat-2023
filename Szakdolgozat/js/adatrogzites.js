function $(id)
{
    return document.getElementById(id);
}

function alertMegjelenit(uzenet)
{
    let alertBox = $('alertBox');
    alertBox.style.display='inline';
    document.getElementsByClassName('alertMessage')[0].innerHTML=uzenet;
    document.getElementsByClassName('yes')[0].addEventListener('click',function(){
        alertBox.style.display='none';
    });
}

function evfolyamSzamol(kezdesiDatum)
{
    let evfolyam=0;
    let datum=tdate=new Date().getFullYear();
    let aktualishonap=new Date().getMonth();
    let kulonbseg=datum-kezdesiDatum;
    if(aktualishonap<9)
    {
        kulonbseg--;
    }
    switch(kulonbseg)
    {
        case 0:
        {
            evfolyam=9;
            break;
        }
        case 1:
        {
            evfolyam=10;
            break;
        }
        case 2:
        {
            evfolyam=11;
            break;
        }
        case 3:
        {
            evfolyam=12;
            break;
        }
        case 4:
        {
            evfolyam=13;
            break;
        }
    }
    return evfolyam;
}

async function legutobbiTorles()
{
    if(($('lastName').value!="")&&($('lastDate').value!=""))
    {
        if($('lastName').hasAttribute('disabled')||$('lastDate').hasAttribute('disabled'))
        {
            $('lastName').removeAttribute('disabled');
            $('lastDate').removeAttribute('disabled');
        }
        else
        {
            try{
                let kuldendo={'utolsoid':$('hiddenId').value};
                let eredmeny= await fetch('./php/index.php/legutobbiTorles',{method:'POST',body:JSON.stringify(kuldendo)});
                $('lastName').value="";
                $('lastDate').value="";
                alertMegjelenit('A legutóbb felvitt adatok törlésre kerültek!');
                idLekerese();
            }
            catch(error){
                console.log(error);
            }
            $('lastName').setAttribute('disabled','disabled');
            $('lastDate').setAttribute('disabled','disabled');
        }
    }
    else
    {
        alertMegjelenit('Nincs legutóbb felvitt adat!');
    }
}

async function idLekerese()
{
    try{
        let eredmeny= await fetch('./php/index.php/idLekerese');
        let adatok=await eredmeny.json();
        if(adatok!="")
        {
            for (const adat of adatok) {
                $('hiddenId').value=adat.utolso;
            }
        }
    }
    catch(error){
        console.log(error);
    }
}

async function diakRogzites()
{
    if($('user').value!=""&&$('startdate').value!="")
    {
        try{
            let kuldendo={'nev':$('user').value,'evfolyam':evfolyamSzamol(parseInt(($('startdate').value).substring(0,4)))};
            let eredmeny= await fetch('./php/index.php/diakRogzites',{method:'POST',body:JSON.stringify(kuldendo)});
            $('lastName').value=$('user').value;
            $('lastDate').value=$('startdate').value;
            $('user').value="";
            $('startdate').value="";
            idLekerese();
        }
        catch(error){
            console.log(error);
        }
    }
    else
    {
        alertMegjelenit('Mindkét mező kitöltése kötelező!');
    }
}

async function legutobbiDiakRogzites()
{
    if($('lastName').value!=""&&$('lastDate').value!="")
    {
        try{
            let kuldendo={'nev':$('lastName').value,'evfolyam':evfolyamSzamol(parseInt(($('lastDate').value).substring(0,4))),'utolsoid':$('hiddenId').value};
            let eredmeny= await fetch('./php/index.php/legutobbiDiakRogzites',{method:'POST',body:JSON.stringify(kuldendo)});
        }
        catch(error){
            console.log(error);
        }
    }
}

function legutobbiJavitas()
{
    if(($('lastName').value!="")&&($('lastDate').value!=""))
    {
        if($('lastName').hasAttribute('disabled')||$('lastDate').hasAttribute('disabled'))
        {
            $('lastName').removeAttribute('disabled');
            $('lastDate').removeAttribute('disabled');
        }
        else
        {
            legutobbiDiakRogzites();
            alertMegjelenit('A javítás megtörtént!');
            $('lastName').setAttribute('disabled','disabled');
            $('lastDate').setAttribute('disabled','disabled');
        }
    }
    else
    {
        alertMegjelenit('Nincs legutóbb felvitt adat!');
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
$('add').addEventListener('click',diakRogzites);
$('correct').addEventListener('click',legutobbiJavitas);
$('delete').addEventListener('click',legutobbiTorles);
$('back').addEventListener('click',function(){
    window.location.replace('./valaszto.html');
});
$('logout').addEventListener('click',Kijelentkezes);