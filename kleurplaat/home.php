<?php

declare(strict_types=1);

?>


<!DOCTYPE HTML>
<html>

<head>
    <meta charset=utf-8>
    <title>Kleurplaat</title>
    <link rel="stylesheet" href="kleurplaat.css">
    <script src="kleurplaat.js" defer></script>
</head>

<body>
    <!--START WRAPPER-->
    <div class="wrapper">

        <h1>Kleurplaat</h1>
        
        <div id="kleurplaat">

        </div>
        
        <div id="keuzeopties">
            <div id="veldgrootte">
                <h3>Maak een blanco kleurplaat: </h3>
                <label for="hoogte">Hoogte: </label>
                <input type="number" id="hoogte" name="hoogte" value="20" max="99" min="1" required>
                <br>
                <label for="breedte">Breedte: </label>
                <input type="number" id="breedte" name="breedte" value="20" max="29" min="1" required>
                <br>
                <label for="celgrootte">Celgrootte: </label>
                <input type="number" id="celgrootte" name="celgrootte" value="50" max="100" min="1" required>
                <label for="celgrootte">px</label>
                <br>
                <button id="veldgrootte_toepassen">Toepassen</button>
            </div>

            <div id="kleurkeuze">
                <h3>Selecteer een kleur: </h3>
                <input type="radio" id="rood" name="kleur" value="red">
                <label for="rood" id="labelRood">Rood</label><br>
                <input type="radio" id="groen" name="kleur" value="green">
                <label for="groen" id="labelGroen">Groen</label><br>
                <input type="radio" id="blauw" name="kleur" value="blue">
                <label for="blauw" id="labelBlauw">Blauw</label><br>
                <input type="radio" id="wit" name="kleur" value="white" checked>
                <label for="wit" id="labelWit">Wit</label>
            </div>
        </div>
        <div id="exportImport">
            <button id="exporteer">Exporteer</button>
            <div id="importeer">
                <label for="fileToUpload">Importeer</label>
                <input type=file id="fileToUpload" name="fileToUpload" accept="application/json">
            </div>
        </div>




    </div>
    <!--END WRAPPER-->

</body>

</html>