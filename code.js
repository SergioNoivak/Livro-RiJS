var isStoppword = require('./stopwords.json');



var fs = require('fs'), path = require('path')    
    filePath = path.join(__dirname, 'documentos/1.txt');


    let remover_stoppwords = (tokens)=>{
            var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            
            let indices = [];
            tokens.forEach(element => {
                if(!isStoppword[element] && !format.test(element))
                    indices.push(element.replace(',;.',''))
                
            });
            console.log(indices);
    }
    


fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {

        let tokens = data.match(/\S+/g)
        remover_stoppwords(tokens);

    } else {
        console.log(err);
    }
});