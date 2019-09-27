var isStoppword = require('./stopwords.json');
let expression = require('./expression')
var fs = require('fs'),
    path = require('path')
filePath = path.join(__dirname, 'documentos/');
let scanf = require('scanf');


let remover_stoppwords = (tokens) => {
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    let indices = [];
    tokens.forEach(element => {
        if (!isStoppword[element] && !format.test(element))
            indices.push(element.replace(',;.', ''))

    });

    console.log(indices)
    return indices;
}



const testFolder = './documentos/';
let query = scanf("%S");




async function decidirArquivo(file){

    return new Promise(function (resolveArquivo, rejectArquivo) {
        fs.readFile(filePath + file, {
            encoding: 'utf-8'
        }, function (err, data) {
            if (!err) {

                let tokens = data.match(/\S+/g)
                let indices = remover_stoppwords(tokens);

                let string_de_indices = "";
                indices.forEach((el) => {
                    string_de_indices += "" + el + " "
                })
                var parsed = new expression(query);
                let relevante = parsed.test(string_de_indices);

                resolveArquivo(relevante ? file : null)
            } else {
                console.log(err);
            }
        });
    })
}

async function lerDiretorio(){

    return new Promise(function (resolveDiretorio, rejectDiretorio) {
        let arquivosRelevantes = []
        fs.readdir(testFolder,async (err, files) => {
        
            for(let i = 0 ;i<files.length;i++){
                let leitura = await decidirArquivo(files[i])
                if(leitura!=null)
                    arquivosRelevantes.push(leitura)
            }
            resolveDiretorio(arquivosRelevantes)

        })
    })
}

lerDiretorio().then(arquivosRelevantes=>{

    console.log('arquivosRelevantes: ',arquivosRelevantes)
})


