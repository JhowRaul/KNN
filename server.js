/*Single Thread*/
'use strict'

var fs = require('fs'),
    carrega_matriz = false,
    separador = /\s*,\s*/,
    p,
    i,
    matriz = [],
    arrayLinha = new Array(),
    minDist,
    arrayD = [],
    arrayD2 = []

function singleThread() {
    carrega_matriz = false



    console.log('\n---------------------------------------------')
    console.log('            KNN COM NODE.JS         ')
    console.log('\n     Leitura do arquivo iris.arff \n')
    console.log('---------------------------------------------\n')

    function readFile(err, data) {
        if (err) {
            console.error("Could not open file: %s", err)
            process.exit(1)
        }

        // Separando arquivo em posições = linhas
        var linhas = data.split(/\r?\n/)
        p = 1;
        i = 1;
        var soma = 0;

        linhas.forEach(function (linha) {
            if (carrega_matriz == true) {

                if (linha == '%') {
                    carrega_matriz = false
                } else {
                    // Separando linha em 5 posições
                    arrayLinha = linha.split(separador)

                    /*
                    for(i = 0; i <= 4; i++){
                        //Imprime cada posição da linha p
                        console.log(linha[i])                    
                    }
                    */

                    // Salva linha em Matriz
                    matriz[p] = arrayLinha

                    p = p + 1
                }
            }

            if (linha == "@DATA") {
                carrega_matriz = true
            }

        })

        // Imprime matriz
        //console.log(meu_array)

        var contador = 1;
        matriz.forEach(function (item) {
            if (matriz[contador + 1][contador] != undefined) {
                //console.log(item)

                matriz.forEach(function (linha_interna) {
                    soma = 0;
                    //console.log(linha_interna)
                    
                    for (var c = 0; c < 4; c++) {
                        soma = soma + Math.pow(item[c] - linha_interna[c], 2)                        
                    }
                    
                    var resultI = Math.sqrt(soma)
                    if(resultI < soma){
                        minDist = resultI
                        
                        arrayD = item
                        arrayD2 = linha_interna
                    }
                });
                
            }
        })
        
        
        console.log(minDist)
        console.log(arrayD)
        console.log(arrayD2)
        
    }


    fs.readFile('files/iris.arff', 'utf-8', readFile)
}

singleThread()
