<?php

class Route{
    private $url;
    private $erkezettAdatok;
    private $nev;

    public function __construct($teljesUrl)
    {
        $this->url=explode('/',$teljesUrl);
        $this->erkezettAdatok=json_decode(file_get_contents('php://input'),true);
    }

    public function vizsgalat(){
        switch (end($this->url)) {
            case 'bejelentkezesiAdatLekerese':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->bejelentkezes($this->erkezettAdatok['fnev'],$this->erkezettAdatok['jelszo']);
                    break;
                }
            case 'diakRogzites':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->diakRogzites($this->erkezettAdatok['nev'],$this->erkezettAdatok['evfolyam']);
                    break;
                }
            case 'idLekerese':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->utolsoIdLekerese();
                    break;
                }
            case 'legutobbiDiakRogzites':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->legutobbiDiakRogzites($this->erkezettAdatok['nev'],$this->erkezettAdatok['evfolyam'],$this->erkezettAdatok['utolsoid']);
                    break;
                }
            case 'legutobbiTorles':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->legutobbiDiakTorles($this->erkezettAdatok['utolsoid']);
                    break;
                }
            case 'targykorokLekeres':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->targykorokLekerese();
                    break;
                }
            case 'targykorEredmenyRogzites':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->targykorEredmenyRogzitese($this->erkezettAdatok['diak_azon'],$this->erkezettAdatok['tech_targykor_azon'],$this->erkezettAdatok['ttk_ertekeles']);
                    break;
                }
            case 'targykorEredmenyModositas':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->targykorEredmenyModositasa($this->erkezettAdatok['ttk_ertekeles_azon'],$this->erkezettAdatok['ttk_ertekeles']);
                    break;
                }
            case 'targyEredmenyRogzites':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->targyEredmenyRogzitese($this->erkezettAdatok['diak_azon'],$this->erkezettAdatok['tech_targy_azon'],$this->erkezettAdatok['tt_ertekeles'],$this->erkezettAdatok['kelleupdate']);
                    break;
                }
            case 'EgytargyEredmenyRogzites':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->egyTargyEredmenyRogzitese($this->erkezettAdatok['diak_azon'],$this->erkezettAdatok['egy_targy_azon'],$this->erkezettAdatok['et_ertekeles'],$this->erkezettAdatok['kelleupdate']);
                    break;
                }
            case 'techTargykorErtekelesekLekeres':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->techTargykorErtekelesekLekerese();
                    break;
                }
            case 'techTargyErtekelesekLekeres':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->techTargyErtekelesekLekerese();
                    break;
                }
            case 'EgyTargyErtekelesekLekeres':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->EgyTargyErtekelesekLekerese();
                    break;
                }
            case 'osszesTanuloLekeres':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->osszesTanuloLekerese();
                    break;
                }
            case 'evfolyamNoveles':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->evfolyamNovelese();
                    break;
                }
            case 'utolsoEvesTorles':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->utolsoEvesTorlese();
                    break;
                }
            case 'Kijelentkezes':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->logOut();
                    break;
                } 
            case 'isLoggedIn':
                {
                    $nyilvantartas=new Nyilvantartas();
                    echo $nyilvantartas->loggedIn();
                    break;
                } 
            default:
                {
                    echo "Hello";
                    break;
                }
        }
    }
}

?>