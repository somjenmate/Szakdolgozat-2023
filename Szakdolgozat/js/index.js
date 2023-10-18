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
        if(uzenet=="Sikeres belépés!")
        {
            //ha sikeres a belépés, átirányítjuk a kezdőoldalra:
            window.location.replace('./valaszto.html');
        }
    });
}

async function Bejelentkezes()
{
    if(($('user').value!="")&&($('passw').value!=""))
    {
        let beirtFelhNev=$('user').value;
        let beirtJelszo=$('passw').value;
        try{
            let kuldendo={'fnev':beirtFelhNev,'jelszo':beirtJelszo};
            let eredmeny= await fetch('./php/index.php/bejelentkezesiAdatLekerese',{method:'POST',body:JSON.stringify(kuldendo)});
            let adatok=await eredmeny.json();
            alertMegjelenit(adatok.valasz);
        }
        catch(error){
            console.log(error);
        }
    }
    else
    {
        alertMegjelenit('Valamelyik mező nem lett kitöltve!');
    }
    
}



$('login').addEventListener('click',Bejelentkezes);
$('passw').addEventListener('keypress',function(event){
    if(event.key==="Enter")
    {
        Bejelentkezes();
    }
});

$('replace').addEventListener('click',function(){
    alertMegjelenit('Elfelejtett jelszó pótlása céljából kérjük forduljon az alkalmazás üzemeltetőjéhez!');
});