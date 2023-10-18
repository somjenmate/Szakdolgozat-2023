-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Ápr 15. 18:59
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `nyilvantartas`
--
CREATE DATABASE IF NOT EXISTS `nyilvantartas` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `nyilvantartas`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `diakok`
--

CREATE TABLE `diakok` (
  `diak_azon` int(11) NOT NULL,
  `diak_nev` varchar(255) NOT NULL,
  `diak_evfolyam` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `diakok`
--

INSERT INTO `diakok` (`diak_azon`, `diak_nev`, `diak_evfolyam`) VALUES
(3, 'Minta László', 9),
(4, 'Minta Tamás', 9),
(5, 'Minta Tamás', 9),
(6, 'Minta Péter', 9),
(7, 'Minta Máté', 9),
(8, 'Minta Nóra', 9),
(9, 'Minta Evelin', 9),
(10, 'Minta Zsanett', 9),
(31, 'Minta Tamás', 10),
(32, 'Minta Tibor', 9),
(33, 'Gipsz Tamás', 10),
(34, 'Új Bálint', 9),
(35, 'Újabb Bálint', 9),
(36, 'Első Tamás', 11),
(38, 'Gipsz Jakab', 12);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `egyetemi_targy`
--

CREATE TABLE `egyetemi_targy` (
  `egy_targy_azon` int(11) NOT NULL,
  `egy_targynev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `egyetemi_targy`
--

INSERT INTO `egyetemi_targy` (`egy_targy_azon`, `egy_targynev`) VALUES
(1, 'Web programozás I.'),
(2, 'Web programozás II.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `egyetemi_targy_ertekeles`
--

CREATE TABLE `egyetemi_targy_ertekeles` (
  `et_ertekeles_azon` int(11) NOT NULL,
  `egy_targy_azon` int(11) NOT NULL,
  `diak_azon` int(11) NOT NULL,
  `et_ertekeles` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `egyetemi_targy_ertekeles`
--

INSERT INTO `egyetemi_targy_ertekeles` (`et_ertekeles_azon`, `egy_targy_azon`, `diak_azon`, `et_ertekeles`) VALUES
(1, 1, 1, 66.2647),
(2, 1, 2, 19),
(3, 1, 9, 86.8),
(4, 1, 5, 81),
(5, 1, 34, 64.4238),
(6, 1, 4, 43.1667),
(7, 1, 35, 91),
(8, 1, 3, 75.9333);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznalo_azon` int(1) NOT NULL,
  `felhasznalo_nev` varchar(256) NOT NULL,
  `felhasznalo_jelszo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznalo_azon`, `felhasznalo_nev`, `felhasznalo_jelszo`) VALUES
(1, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `technikumi_targy`
--

CREATE TABLE `technikumi_targy` (
  `tech_targy_azon` int(11) NOT NULL,
  `tech_targynev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `technikumi_targy`
--

INSERT INTO `technikumi_targy` (`tech_targy_azon`, `tech_targynev`) VALUES
(1, 'Programozási alapok 9. évf.'),
(2, 'Webprogramozás 11. évf.'),
(3, 'Webprogramozás 12. évf.'),
(4, 'Frontend programozás tantárgy 13. évfolyam'),
(5, 'Backend programozás tantárgy 13. évfolyam');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `technikumi_targykorok`
--

CREATE TABLE `technikumi_targykorok` (
  `tech_targy_azon` int(11) NOT NULL,
  `egy_targy_azon` int(11) NOT NULL,
  `tech_targykor_azon` int(11) NOT NULL,
  `tech_targykornev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `technikumi_targykorok`
--

INSERT INTO `technikumi_targykorok` (`tech_targy_azon`, `egy_targy_azon`, `tech_targykor_azon`, `tech_targykornev`) VALUES
(1, 1, 1, 'HTML dokumentumok felépítése, egyszerű HTML elemek'),
(1, 1, 2, 'CSS stíluslapok alkalmazása'),
(1, 1, 3, 'HTML5 és CSS3'),
(1, 1, 4, 'Reszponzív oldal készítése'),
(2, 1, 5, 'Médiaelemek a HTML-ben és CSS-ben'),
(2, 1, 6, 'JavaScript változók, elágazások'),
(2, 1, 7, 'Iterációk'),
(2, 1, 8, 'Tömbök'),
(2, 1, 9, 'Függvények'),
(2, 1, 10, 'Objektumok'),
(3, 1, 11, 'Tartalomkezelő-rendszerek'),
(2, 2, 12, 'Összehasonlítás, rendezés'),
(3, 2, 13, 'Foglalt kulcsszavak, teljesítmény, tipikus hibák'),
(3, 2, 14, 'JSON adatkezelés'),
(3, 2, 15, 'AJAX '),
(4, 2, 16, 'AJAX adatbázis'),
(4, 2, 17, 'String és számfüggvények'),
(4, 2, 18, 'Dátumfüggvények'),
(5, 2, 19, 'PHP változók, konstansok, stringek'),
(5, 2, 20, 'PHP operátorok, elágazások, ciklusok'),
(5, 2, 21, 'PHP függvények, tömbök, JSON és PHP'),
(5, 2, 22, 'PHP FORM kezelés');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `technikumi_targykor_ertekeles`
--

CREATE TABLE `technikumi_targykor_ertekeles` (
  `ttk_ertekeles_azon` int(11) NOT NULL,
  `tech_targykor_azon` int(11) NOT NULL,
  `diak_azon` int(11) NOT NULL,
  `ttk_ertekeles` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `technikumi_targykor_ertekeles`
--

INSERT INTO `technikumi_targykor_ertekeles` (`ttk_ertekeles_azon`, `tech_targykor_azon`, `diak_azon`, `ttk_ertekeles`) VALUES
(1, 8, 1, 88.9),
(2, 9, 2, 100),
(3, 10, 2, 88),
(4, 13, 2, 70),
(5, 8, 1, 100),
(7, 8, 1, 96),
(8, 8, 1, 10),
(9, 8, 1, 100),
(10, 8, 2, 25),
(11, 8, 2, 10),
(12, 8, 2, 100),
(13, 8, 2, 25),
(14, 8, 1, 50),
(15, 8, 1, 56),
(16, 1, 1, 100),
(17, 1, 1, 100),
(18, 1, 1, 100),
(19, 1, 1, 10),
(20, 1, 1, 10),
(21, 1, 1, 10),
(22, 1, 1, 10),
(23, 1, 1, 10),
(24, 1, 2, 10),
(25, 1, 2, 100),
(26, 1, 1, 44),
(27, 1, 1, 44),
(28, 1, 9, 100),
(29, 1, 9, 85),
(30, 2, 9, 60),
(31, 2, 9, 100),
(32, 1, 5, 100),
(33, 1, 34, 100),
(34, 2, 34, 95),
(35, 3, 34, 80),
(36, 4, 34, 92),
(37, 5, 34, 92),
(38, 6, 34, 80),
(39, 1, 4, 100),
(40, 1, 9, 100),
(41, 1, 34, 30),
(42, 1, 34, 85),
(43, 1, 34, 100),
(44, 1, 34, 80),
(45, 1, 34, 70),
(46, 1, 34, 60),
(47, 1, 34, 50),
(48, 1, 34, 100),
(49, 1, 34, 60),
(50, 1, 34, 100),
(51, 1, 34, 10),
(52, 1, 34, 25),
(53, 1, 34, 40),
(54, 1, 34, 20),
(55, 1, 34, 10),
(56, 1, 34, 70),
(57, 1, 34, 24),
(58, 1, 34, 23),
(59, 4, 34, 55),
(60, 8, 34, 24),
(61, 1, 34, 100),
(62, 1, 34, 25),
(63, 1, 34, 100),
(64, 1, 34, 34),
(65, 1, 34, 85),
(66, 1, 34, 100),
(67, 1, 34, 20),
(68, 1, 34, 100),
(69, 1, 34, 65),
(70, 1, 34, 80),
(71, 1, 34, 80),
(72, 1, 34, 55),
(73, 1, 35, 100),
(74, 2, 35, 95),
(75, 3, 35, 80),
(76, 3, 35, 80),
(77, 4, 35, 100),
(78, 1, 3, 10),
(79, 1, 3, 8),
(80, 1, 3, 100),
(81, 3, 3, 30),
(82, 2, 3, 30),
(83, 2, 3, 20),
(84, 2, 3, 87),
(85, 1, 3, 24),
(86, 1, 3, 24),
(87, 1, 3, 23),
(88, 1, 3, 66),
(89, 1, 4, 24),
(90, 4, 3, 34),
(91, 7, 4, 24),
(92, 7, 5, 24),
(93, 7, 5, 100),
(94, 3, 3, 50),
(95, 5, 3, 100),
(96, 1, 3, 100),
(97, 1, 4, 100),
(98, 1, 4, 100),
(99, 1, 4, 20),
(100, 1, 4, 30),
(101, 1, 3, 100);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `technikumi_targy_ertekeles`
--

CREATE TABLE `technikumi_targy_ertekeles` (
  `tt_ertekeles_azon` int(11) NOT NULL,
  `tech_targy_azon` int(11) NOT NULL,
  `diak_azon` int(11) NOT NULL,
  `tt_ertekeles` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `technikumi_targy_ertekeles`
--

INSERT INTO `technikumi_targy_ertekeles` (`tt_ertekeles_azon`, `tech_targy_azon`, `diak_azon`, `tt_ertekeles`) VALUES
(1, 2, 1, 85),
(2, 1, 1, 43.8),
(3, 1, 2, 55),
(4, 1, 9, 89),
(5, 1, 5, 100),
(6, 1, 34, 63.5143),
(7, 2, 34, 65.3333),
(8, 1, 4, 62.3333),
(9, 1, 35, 91),
(10, 1, 3, 51.8667),
(11, 2, 4, 24),
(12, 2, 5, 62),
(13, 2, 3, 100);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `diakok`
--
ALTER TABLE `diakok`
  ADD PRIMARY KEY (`diak_azon`);

--
-- A tábla indexei `egyetemi_targy`
--
ALTER TABLE `egyetemi_targy`
  ADD PRIMARY KEY (`egy_targy_azon`);

--
-- A tábla indexei `egyetemi_targy_ertekeles`
--
ALTER TABLE `egyetemi_targy_ertekeles`
  ADD PRIMARY KEY (`et_ertekeles_azon`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznalo_azon`);

--
-- A tábla indexei `technikumi_targy`
--
ALTER TABLE `technikumi_targy`
  ADD PRIMARY KEY (`tech_targy_azon`);

--
-- A tábla indexei `technikumi_targykorok`
--
ALTER TABLE `technikumi_targykorok`
  ADD PRIMARY KEY (`tech_targykor_azon`);

--
-- A tábla indexei `technikumi_targykor_ertekeles`
--
ALTER TABLE `technikumi_targykor_ertekeles`
  ADD PRIMARY KEY (`ttk_ertekeles_azon`);

--
-- A tábla indexei `technikumi_targy_ertekeles`
--
ALTER TABLE `technikumi_targy_ertekeles`
  ADD PRIMARY KEY (`tt_ertekeles_azon`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `diakok`
--
ALTER TABLE `diakok`
  MODIFY `diak_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT a táblához `egyetemi_targy`
--
ALTER TABLE `egyetemi_targy`
  MODIFY `egy_targy_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT a táblához `egyetemi_targy_ertekeles`
--
ALTER TABLE `egyetemi_targy_ertekeles`
  MODIFY `et_ertekeles_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznalo_azon` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `technikumi_targy`
--
ALTER TABLE `technikumi_targy`
  MODIFY `tech_targy_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `technikumi_targykorok`
--
ALTER TABLE `technikumi_targykorok`
  MODIFY `tech_targykor_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT a táblához `technikumi_targykor_ertekeles`
--
ALTER TABLE `technikumi_targykor_ertekeles`
  MODIFY `ttk_ertekeles_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT a táblához `technikumi_targy_ertekeles`
--
ALTER TABLE `technikumi_targy_ertekeles`
  MODIFY `tt_ertekeles_azon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
