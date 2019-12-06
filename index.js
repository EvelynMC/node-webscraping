//Librerías

const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs-extra');

// Crea archivo en blanco para llenarlo.
const writeStream = fs.createWriteStream('modelos_ford.csv')

//Funcion asincrona
async function init() {

  const $ = await request({
    uri: 'https://www.motor.es/ford/',
    transform: body => cheerio.load(body)
  });

  //Obtener listado de modelos de cada marca a CSV:

  writeStream.write('Marca_Modelo\n');
  const websiteModelos = $('.main span section ul li h3').each((i, el) => {
    const modelo = $(el).text()
    writeStream.write(`${modelo}\n`);
    // console.log($(el).text());
  });

}

init();


  //Ejemplos
/*

  //Obtener título de la página:
  const websiteTitle = $('title');
  // console.log(websiteTitle.text());

  const websiteHeading = $('h2');
  // console.log(websiteHeading.text());

  //Obtener listado de marcas:
  const websiteMarcas = $('.main span article h3').each((i, el) => {
    // console.log(i, $(el).text());
  });


  const article = $('.article').find('a');   //Encontrar etiquetas especificas primer resultado
  console.log(article.html());

  const third_quote = $('.quote').next().next();
  console.log(third_quote.html())

  const containerClass = $('.row .col-md-8').children();
  console.log(containerClass.html());

  const quotes = $('.quote span.text').each((i, el) => {       //Recorrer todos los elementos con mismo resultado y listarlos.
  console.log(i, $(el).text())
  });

  $('.main').each((i, el) =>{
    const text = $(el).find('span.text').text()
    console.log(text)
  })
*/