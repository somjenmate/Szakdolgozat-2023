<?php

class Mysql{
    //tulajdonságok
    private $hely='localhost';
    private $felhasznalo='root';
    private $jelszo='';
    private $adatb='nyilvantartas';
    private $db;

    //konstruktorban új kapcsolat nyitása
    public function __construct()
    {
        $this->db=new mysqli($this->hely, $this->felhasznalo,$this->jelszo,$this->adatb);
    }

    //adatok lekérése az adatbázisból
    protected function adatokLekerese($muvelet)
    {
        if($this->db->connect_errno==0){
            $eredmeny=$this->db->query($muvelet);
            if($this->db->errno==0)
            {
                if($eredmeny->num_rows!=0)
                {
                    $valasz=$eredmeny->fetch_all(MYSQLI_ASSOC);
                }
                else
                {
                    $valasz=array('valasz'=>'');
                }
            }
            else
            {
                $valasz=array('valasz'=>$this->db->error);
            }
        }
        else
        {
            $valasz=array('valasz'=>$this->db->connect_error);
        }

        return $valasz;
    }


    //adatok felvitele az adatbázisba
    protected function adatokValtoztatasa($muvelet)
    {
        if($this->db->connect_error)
        {
            $valasz=array('valasz'=>$db->connect_error);
        }
        else
        {
            $eredmeny=$this->db->query($muvelet);
            if($this->db->affected_rows>0)
            {
                $valasz=array('valasz'=>'Siker');
            }
            else
            {
                $valasz=array('valasz'=>'Művelet végrehajtása sikertelen');
            }
        }
        return $valasz;
    }
}

?>