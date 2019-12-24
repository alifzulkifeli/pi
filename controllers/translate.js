const translating = require('@vitalets/google-translate-api');
const tunnel = require('tunnel');


exports.translate = async(req, res) => {
  translating(req.body.context, {from: 'ja', to: 'en'}, {
      agent: tunnel.httpsOverHttp({
      proxy: { 
        host: '127.0.0.1',
        proxyAuth: 'user:password',
        port: '8008' || '80',
        headers: {
          'User-Agent': 'Node'
        }
      }
    }
  )}).then(resp => {
    const text = resp.text
    res.json(text)
  }).catch(err => {
      console.error(err);
  });
}


