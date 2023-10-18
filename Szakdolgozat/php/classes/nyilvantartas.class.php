<?php

class Nyilvantartas extends Mysql{
    
    public function bejelentkezes($fnev, $jelszo)
    {
        if (!empty($fnev) && !empty($jelszo)){
            $jelszo = hash('sha256', $jelszo);
            $fAdatok = "SELECT * FROM felhasznalo WHERE felhasznalo_nev = '{$fnev}' AND felhasznalo_jelszo = '{$jelszo}';";
            $ellenorzes = $this->adatokLekerese($fAdatok);
            if (isset($ellenorzes['valasz'])){
                $valasz = array('valasz' => 'Belépés sikertelen!');
            }
            else {
                $valasz = array('valasz' => 'Sikeres belépés!');
                session_start();
                $_SESSION['fnev'] = $fnev;
                $_SESSION['loggedin'] = true;
             }
        }
        else{
            $valasz = array('valasz' => 'Kérem adja meg az adatokat!');
        }
        return json_encode($valasz, JSON_UNESCAPED_UNICODE);
    }

    public function loggedIn()
    {
        if(session_status() === PHP_SESSION_NONE){
            session_start();
        }

        if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true)
        {
            $url=array('url' => 'http://localhost/Szakdolgozat/index.html');
        }
        else
        {
            $url=array('url'=>'');
        }
        
        return json_encode($url, JSON_UNESCAPED_UNICODE);
    }

    public function logOut(){
        session_start();
        unset($_SESSION['fnev']);
        unset($_SESSION['loggedin']);
        session_destroy();
    }

    public function diakRogzites($nev, $evfolyam)
    {
        $diakRogzit="INSERT INTO diakok(diak_nev,diak_evfolyam) VALUES ('{$nev}','{$evfolyam}');";
        $adatok=$this->adatokValtoztatasa($diakRogzit);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function utolsoIdLekerese()
    {
        $utolsoIdLeker="SELECT MAX(diak_azon) AS utolso FROM diakok;";
        $adatok=$this->adatokLekerese($utolsoIdLeker);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function legutobbiDiakRogzites($nev,$evfolyam,$id)
    {
        $legutobbiDiakRogzit="UPDATE diakok SET diak_nev='{$nev}',diak_evfolyam='{$evfolyam}' WHERE diak_azon='{$id}';";
        $adatok=$this->adatokValtoztatasa($legutobbiDiakRogzit);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }
    public function legutobbiDiakTorles($id)
    {
        $legutobbiDiakTorol="DELETE FROM diakok WHERE diak_azon='{$id}';";
        $adatok=$this->adatokValtoztatasa($legutobbiDiakTorol);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function targykorokLekerese()
    {
        $targykorokLekeres="SELECT * FROM technikumi_targykorok";
        $adatok=$this->adatokLekerese($targykorokLekeres);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function targykorEredmenyRogzitese($id, $ttk_azon, $eredmeny)
    {
        $targykorEredmenyRogzit="INSERT INTO technikumi_targykor_ertekeles(tech_targykor_azon,diak_azon,ttk_ertekeles) VALUES ('{$ttk_azon}','{$id}','{$eredmeny}');";
        $adatok=$this->adatokValtoztatasa($targykorEredmenyRogzit);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function targykorEredmenyModositasa($ttk_ertekeles_id, $eredmeny)
    {
        $targykorEredmenyModosit="UPDATE technikumi_targykor_ertekeles SET ttk_ertekeles='{$eredmeny}' WHERE ttk_ertekeles_azon='{$ttk_ertekeles_id}';";
        $adatok=$this->adatokValtoztatasa($targykorEredmenyModosit);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function targyEredmenyRogzitese($id, $tt_azon, $eredmeny, $update)
    {
        if($update==false)
        {
            $targyEredmenyRogzit="INSERT into technikumi_targy_ertekeles(tech_targy_azon,diak_azon,tt_ertekeles) VALUES ('{$tt_azon}','{$id}','{$eredmeny}');";
        }
        else
        {
            $targyEredmenyRogzit="UPDATE technikumi_targy_ertekeles SET tt_ertekeles='{$eredmeny}' WHERE tech_targy_azon='{$tt_azon}' AND diak_azon='{$id}';";
        }
        $adatok=$this->adatokValtoztatasa($targyEredmenyRogzit);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function egyTargyEredmenyRogzitese($id, $et_azon, $eredmeny, $update)
    {
        if($update==false)
        {
            $egyTargyEredmenyRogzit="INSERT INTO egyetemi_targy_ertekeles(egy_targy_azon,diak_azon,et_ertekeles) VALUES ('{$et_azon}','{$id}','{$eredmeny}');";
        }
        else
        {
            $egyTargyEredmenyRogzit="UPDATE egyetemi_targy_ertekeles SET et_ertekeles='{$eredmeny}' WHERE egy_targy_azon='{$et_azon}' AND diak_azon='{$id}';";
        }
        $adatok=$this->adatokValtoztatasa($egyTargyEredmenyRogzit);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function techTargykorErtekelesekLekerese()
    {
        $techTargykorErtekelesekLekeres="SELECT * FROM technikumi_targykor_ertekeles;";
        $adatok=$this->adatokLekerese($techTargykorErtekelesekLekeres);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function techTargyErtekelesekLekerese()
    {
        $techTargyErtekelesekLekeres="SELECT * FROM technikumi_targy_ertekeles;";
        $adatok=$this->adatokLekerese($techTargyErtekelesekLekeres);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function EgyTargyErtekelesekLekerese()
    {
        $EgyTargyErtekelesekLekeres="SELECT * FROM egyetemi_targy_ertekeles;";
        $adatok=$this->adatokLekerese($EgyTargyErtekelesekLekeres);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function osszesTanuloLekerese()
    {
        $osszesTanuloLekeres="SELECT * FROM diakok;";
        $adatok=$this->adatokLekerese($osszesTanuloLekeres);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function evfolyamNovelese()
    {
        $evfolyamNovel="UPDATE diakok SET diak_evfolyam=diak_evfolyam+1 WHERE diak_evfolyam!=14;";
        $adatok=$this->adatokValtoztatasa($evfolyamNovel);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }

    public function utolsoEvesTorlese()
    {
        $utolsoEvesTorol="DELETE FROM diakok WHERE diak_evfolyam=14;";
        $adatok=$this->adatokValtoztatasa($utolsoEvesTorol);
        return json_encode($adatok, JSON_UNESCAPED_UNICODE);
    }
}

?>