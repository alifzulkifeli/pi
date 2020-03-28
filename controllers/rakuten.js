
const cheerio = require('cheerio');
const fetch = require('node-fetch');
// var request = require("request");

require("dotenv").config();

exports.listSearch = (req, res) => {
  const item = [];
  fetch(`https://search.rakuten.co.jp/search/mall/laptop/?max=100000&min=1&p=1`)
    
    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: true
      });
      console.log("1"+$);
      console.log("2"+body);
      $('.items-box a').each((i, el) => {
        const mercari_item = {
          name: $(el).find('.items-box-name').text(),
          price: parseFloat($(el).find('.items-box-price').text().substr(1).replace(/,/g, '')) * parseFloat(process.env.PRICE),
          link: $(el).attr('href'),
          image1: $(el).children().children().attr('data-src'),
          description: ''
        }
        mercari_item.price = (Math.round(mercari_item.price * 100) / 100).toFixed(2);
        item.push(mercari_item);
      });
      res.json(item);
  });
};

