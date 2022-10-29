let reader = require('any-text');
let fs = require('fs');
 reader.getText(`Tp_chainage.docx`).then(function (data) {
    var regex = new RegExp("Aller à la page [0-9]", "gi");
    //Récupérer le texte de chaque page
    let data_split = String(data).split(regex, String(data).split(regex).length-1)   
    // Récupérer les Aller à la page x
    matches = [...data.matchAll(regex)]
    
    let erreur_chainage= false
    for (let element =0; element<matches.length; element++)
    {
        if (parseInt(matches[element][0].match("[0-9]")[0]) > data_split.length) {
            console.log("Erreur de chainage")
        }
    }
    if(!erreur_chainage){
    for (let element=0; element < matches.length; element++)
    {
        var htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            ${data_split[element]}
            <a href="page${matches[element][0].match("[0-9]")[0]}.html">Aller à la page ${matches[element][0].match("[0-9]")[0]} <a>
        </body>
        </html>`     
        fs.writeFile(`page${element+1}.html`, htmlContent, (error) => { /* handle error */ });
    }}
});