

const cheerio = require('cheerio');
const fetch = require('node-fetch');
var request = require("request");
require("dotenv").config();

exports.listSearch =  (req, res) => {
  const item = [];
  fetch(`https://www.mercari.com/jp/search/?page=${req.query.page||1}&keyword=${req.query.search}&price_min=${req.query.min_price || ""}&price_max=${req.query.max_price || ""}`)

    .then(res => res.text())
    .then(body => {
      const $ = cheerio.load(body, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: true
      });

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






exports.productDetails = (req, res) => {
  fetch(`${req.query.uri}`)
    .then(res => res.text())
    .then(body => {

      const $ = cheerio.load(body, {
        withDomLvl1: true,
        normalizeWhitespace: false,
        xmlMode: true,
        decodeEntities: true
      });

      const relatedItems = [];
      $('.related-item-column').eq(1).children().eq(1).children().each((i, el) => {

        const mercari_item = {
          name: $(el).find('.items-box-name').text(),
          price: parseFloat($(el).find('.items-box-price').text().substr(1).replace(/,/g, '')) * parseFloat(process.env.PRICE),
          link: $(el).children().attr('href'),
          image1: $(el).find('.lazyload').attr('data-src'),
          description: ''
        }

        mercari_item.price = (Math.round(mercari_item.price * 100) / 100).toFixed(2);
        relatedItems.push(mercari_item);
        
      });

      const image = [];
      $('.owl-item-inner').each((i, el) => {
        image.push($(el).children().attr('data-src'))
      });

      const product = {
        name: $('h1.item-name').text(),
        price: $('.item-price.bold').text().split('¥', 2)[1].replace(/,/g, '') * parseFloat(process.env.PRICE),
        status: $('.item-photo').find('.item-sold-out-badge').children().text(),
        description: $('p.item-description-inner').text(),
        link: req.query.uri,
        image1: image[0],
        image2: image[1],
        image3: image[2],
        image4: image[3],
        image5: image[4],
        image6: image[5],
        image7: image[6],
        image8: image[7],
        image9: image[8],
        image10: image[9],
      }

      const item = {
        product,
        relatedItems
      };
      res.json(item);
    });

};