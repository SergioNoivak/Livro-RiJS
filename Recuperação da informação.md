# Recuperação da informação

## Introdução 

Com o surgimento de Big data e também a massificação da informação, surgiu a necessidade de uma área que estudasse formas de buscar esses dados, ou seja, recuperar informação. Muitas vezes uma simples busca não serve para se encontrar a informação que se deseja, as vezes porque são muitos os documentos  retornados, constituindo uma <b> sobrecarga de informação</b>  e também um acervo crescente de documentos informativos, uma <b>explosão informacional</b>.

![](https://storage.needpix.com/rsynced_images/white-ream-of-paper.jpg)



Um problema envolvendo recuperação poderia ser, por exemplo, buscar artigos para fazer um projeto de implementação, por exemplo, de algoritmos genéticos, uma simples busca no google pode retornar nem um nem dois artigos, e sim milhares de artigos. Qual(is) artigo(s) deve(m) ser relevante(s)? esse é um dos problemas que envolve a Recuperação da informação.

### Motivação e técnicas

A informação muitas vezes é um recurso estratégico para profissionais, empresas e até nações, portanto como decidir quais textos na web são realmente relevantes? A baixa qualidade pode prejudicar uma estratégia a tomar. A recuperação da informação vem então para também tratar a world wide web a fim de encontrar essas relevâncias.

A Recuperação da informação busca também investigar e construir técnicas para seleção de documentos relevantes a necessidade do usuário, e é geralmente representada através de expressões de busca.



### O processo

O processo de se recuperar informação é uma tarefa típica, onde se têm:

<ul>
    <li>Dados, chamados de <b>corpus de documento</b>(ENTRADA)</li>
    <li>Expressão de busca do usuário(ENTRADA)</li>
    <li>Um conjunto de documentos que serão relevantes(SAIDA)</li>
</ul>



### Aspectos da Recuperação da informação

Em um sistema que faça a recuperação da informação, se deve ter uma <b>interface</b> que permita a interação do usuário com o sistema, para fazer a classificação dos documentos, primeiro precisam ser feitas operações sobre o texto de forma que os documentos seja melhor avaliado, essas operações são <b>operações textuais</b> que consistem em retirar artigos, conjunções, preposições, acentos e caracteres que fazem o elo entre as palavras, exemplo:



 <span style="color:red">A</span> recuperação <span style="color:red">de</span> informações está rapidamente  <span style="color:red">se</span> tornando <span style="color:red">a</span> forma dominante <span style="color:red">de</span> acesso <span style="color:red">a</span> informações, ultrapassando <span style="color:red">a</span> pesquisa tradicional <span style="color:red">de</span> banco <span style="color:red">de</span> dados. 



Há também a <b>pergunta/string de busca</b> que são operações realizadas por palavras chaves ou expressões de forma que se possa fazer a busca. A busca consiste em classificar os documentos em ordem crescente ou decrescente de relevância e apresenta-lo ao usuário. Já a <b>indexação</b> consiste em criar índices para os documentos que serão adicionados ao armazenamento.

Existem também os <b>termos de indexação</b> que são uma palavra ou conjunto de palavras consecutivas no documento, são um grupo de palavras do documento que são os conceitos chaves do documento, esses termos costumam ser substantivos, o conjunto de todos os termos de indexação do documento é chamado de vocabulário.

## Modelo Booleano 



### Tokenização de um documento

Para tokenizar elementos em javascript basta fazer:

``````javascript
let fs = require('fs'), path = require('path')    

fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (!err) {

        let tokens = data.match(/\S+/g)
        console.log(tokens)

    } else {
        console.log(err);
    }
});
``````



Isso irá separar o texto em palavras separadas por espaços, dessa forma

```javascript
  'JavaScript',   'é',                'uma',           'linguagem',
  'de',           'programação',      'que',           'permite',
  'implementar',  'funcionalidades',  'mais',          'complexas',
  'em',           'páginas',          'web.',          'A',
  'cada',         'momento',          'uma',           'página',
  'web',          'faz',              'mais',          'do',
  'que',          'apenas',           'mostrar',       'informações',
  'estáticas',    'para',             'você',          '-',
  'elas',         'mostram',          'em',            'tempo',
  'real',         'conteúdos',        'atualizados,',  'ou',
  'mapas',        'interativos,',     'animações',     'gráficas',
  'em',           '2D/3D,',           'vídeos,',       'etc.,',
  'você',         'pode',             'apostar',       'que',
```



### Remoção de stoppwords

Algumas palavras não possuem relevância em textos em português, essas palavras são chamadas de stoppwords. para remover essas palavras do conjunto de tokens, crie um arquivo chamado ``stoppwords.json``  que irá conter essas palavras que não possuem tanta relevância:

``````json
{
    "que":true,
    "A":true,
    "do":true,
    "O":true,
    "etc":true,
    "a":true,
    "ao":true,
    "na":true,
    "de":true,
    "último": true,
    "é": true,
    "acerca": true,
    "agora": true,
    "algumas": true
	//TODO
}
``````

A associação da chave - ``true`` possibilitará que o código fonte carregue as stoppwords e teste se uma palavra deve ou não ser ignorada em tempo de execução de maneira eficiente.

``````javascript
let isStoppword = require('./stopwords.json');
   
let remover_stoppwords = (tokens)=>{
            let indices = [];

            tokens.forEach(element => {
                if(!isStoppword[element] )
                    indices.push(element)
                
            });
            console.log(indices);
    }
``````



Esse código acima apesar de verificar quais palavras são relevantes, ele apresenta dois erros, que são 

<ol><li>O código não trata símbolos especiais como $#%&*()@! por exemplo</li>
    <li>O código não remove pontuações
    </li></li></ol>

Observe esses problemas na lista de palavras:

``````javascript
[
  'JavaScript',   'linguagem',        'programação',     'permite',      
  'implementar',  'funcionalidades',  'complexas',       'páginas',      
  'web.',         'momento',          'página',          'web',
  'apenas',       'mostrar',          'informações',     'estáticas',    
  '-',            'elas',             'mostram',         'real',
  'conteúdos',    'atualizados,',     'mapas',           'interativos,', 
  'animações',    'gráficas',         '2D/3D,',          'vídeos,',      
  'etc.,',        'apostar',          'Javascript',      'provavelmente',
  'envolvido.',   'aprendizadoSeção', 'Javascript',      'tão',
  'fácil',        'aprender',         'HTML',            'CSS,',
  'outros',       'pilares',          'desenvolvimento', 'front-end.',   
  'Antes',        'aprender',         'JavaScript,',     'altamente',    
  'recomendável', 'aprenda',          'menos',           'estas',        
  'duas',         'tecnologias.',     'Você',            'começar',
  'módulos:',     'Começando',        'Web',             'Introdução',
  'implementar',  'funcionalidades',  'complexas',       'páginas',
  'web.',         'momento',          'página',          'web',
  'apenas',       'mostrar',          'informações',     'estáticas',
  '-',            'elas',             'mostram',         'real',
  'HTML',         'Introdução',       'CSS',             'Possuir',
  'experiência',  'outras',           'linguagens',      'programação',
  'básico',       'JavaScript,',      'apto',            'estudar',
  'tópicos',      'avançados,',       'como:',           'JavaScript',
  'aprofundado,', 'ensinado',         'Guia',            'JavaScript',
  'Referências',  'API',              'Web'
]
``````



Podemos refinar um pouco o código adicionando esses tratamentos, dessa forma:

``````javascript

    let remover_stoppwords = (tokens)=>{
            let format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            
            let indices = [];
            tokens.forEach(element => {
                if(!isStoppword[element] && !format.test(element))
                    indices.push(element.replace(',;.',''))
                
            });
            console.log(indices);
    }
    
``````

A variável ``format`` irá conter uma expressão regular que contém apenas símbolos especiais e a avaliação ``!format.test(element)`` irá adicionar a lista de índices apenas o token que não tiver caracteres especiais, já ``element.replace(',;.','')`` vai remover dos tokens as pontuações que são inúteis.

