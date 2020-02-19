
const cheerio = require('cheerio');
const fetch = require('node-fetch');
var request = require("request");
require("dotenv").config();

exports.listSearch = async (req, res) => {
  const item = [];
  
  await fetch(`https://search.rakuten.co.jp/search/mall/labo/?max=100000&min=1&p=1`)
    
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: true
      });

      
      

      $('.dui-card.searchresultitem').each((i, el) => {
        console.log($(el).find('.content.title').text()); //nama
        console.log($(el).find('.important').text());  //harga
        console.log($(el).find('.description.shipping.with-help').children().text()); //shipping
        console.log($(el).find('.image').children().attr('href'));  //link
        console.log($(el).find('.image').children().children().attr('src')); //image
        
        // const mercari_item = {
        //   name: $(el).find('.items-box-name').text(),
        //   price: parseFloat($(el).find('.items-box-price').text().substr(1).replace(/,/g, '')) * parseFloat(process.env.PRICE),
        //   link: $(el).attr('href'),
        //   image1: $(el).children().children().attr('data-src'),
        //   description: ''
        // }
        // mercari_item.price = (Math.round(mercari_item.price * 100) / 100).toFixed(2);
        // item.push(mercari_item);
      });
      res.json(item)
    
  }).catch(console.log("err"))
};

