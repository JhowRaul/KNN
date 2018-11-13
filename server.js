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
    arrayD2 = [],
    confusao = [3[3]]

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
        p = 0;
        i = 0;
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



        // Confusao [1][n] = Setosa
        // Confusao [2][n] = Versicolor
        // Confusao [3][n] = Virginica

        var tempConfusao = [0, 0, 0, 0];
        var tempConfusao2 = [0, 0, 0, 0];
        var tempConfusao3 = [0, 0, 0, 0];

        confusao[1] = tempConfusao;
        confusao[2] = tempConfusao2;
        confusao[3] = tempConfusao3;

        matriz.forEach(function (item) {

            // Imprime matriz
            //console.log(item)

            minDist = 999;


            matriz.forEach(function (linha_interna) {
                if (item != linha_interna) {

                    soma = 0;

                    // Imprime matriz (imprime 1x toda a matriz para cada linha da mesma) 
                    //console.log(linha_interna)


                    for (var c = 0; c < 4; c++) {
                        soma = soma + Math.pow(item[c] - linha_interna[c], 2)
                    }


                    var resultI = Math.sqrt(soma)
                    if (resultI < minDist) {

                        minDist = resultI;


                        arrayD = item;
                        arrayD2 = linha_interna;
                    }

                    //console.log("\n ArrayD Atual: " + arrayD[4]);
                    //console.log(" ArrayD2 Atual: " +  arrayD2[4]);



                }
            });

            //console.log("\n")
            //console.log(posicao)
            //console.log(minDist)

            //console.log("\n ArrayD Atual: " + arrayD)
            //console.log(" ArrayD2 Atual: " + arrayD2)

            // Porque Sempre da iris-virginica?


            if (arrayD[4] == "Iris-setosa") {
                //console.log("\n" + arrayD[4] + "\n" + arrayD2[4])
                switch (arrayD2[4]) {
                    case "Iris-setosa":
                        confusao[1][1] = confusao[1][1] + 1;
                        break;
                    case "Iris-versicolor":
                        confusao[1][2] = confusao[1][2] + 1;
                        break;
                    case "Iris-virginica":
                        confusao[1][3] = confusao[1][3] + 1;
                        break;
                    default:
                        console.log("Falha no switch para setosa")
                }
            }

            if (arrayD[4] == "Iris-versicolor") {
                //console.log("\n" + arrayD[4] + "\n" + arrayD2[4])
                switch (arrayD2[4]) {
                    case "Iris-setosa":
                        confusao[2][1] = confusao[2][1] + 1;
                        break;
                    case "Iris-versicolor":
                        confusao[2][2] = confusao[2][2] + 1;
                        break;
                    case "Iris-virginica":
                        confusao[2][3] = confusao[2][3] + 1;
                        break;
                    default:
                        console.log("Falha no switch para versicolor")
                }
            }

            if (arrayD[4] == "Iris-virginica") {
                //console.log("\n" + arrayD[4] + "\n" + arrayD2[4])
                switch (arrayD2[4]) {
                    case "Iris-setosa":
                        confusao[3][1] = confusao[3][1] + 1;
                        break;
                    case "Iris-versicolor":
                        confusao[3][2] = confusao[3][2] + 1;
                        break;
                    case "Iris-virginica":
                        confusao[3][3] = confusao[3][3] + 1;
                        break;
                    default:
                        console.log("Falha no switch para virginica")
                }
            }

        })

        console.log("-------------- Matriz confusão --------------");
        console.log("                   "+confusao[1][1]+" "+confusao[1][2]+" "+confusao[1][3]);
        console.log("                   "+confusao[2][1]+" "+confusao[2][2]+" "+confusao[2][3]);
        console.log("                   "+confusao[3][1]+" "+confusao[3][2]+" "+confusao[3][3]);


    }


    fs.readFile('files/iris.arff', 'utf-8', readFile)
}

singleThread()
