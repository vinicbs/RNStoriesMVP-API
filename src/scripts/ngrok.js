require('dotenv').config();
var ngrok = require('ngrok');

(async function() {
    const url = await ngrok.connect({
      port: parseInt(process.env.PORT, 10),
      onStatusChange: status => {
        console.log(`[NGROK] status:${status}`)
      }
    })  
    if (url) {
      console.log(`[NGROK] running on ${url}`)
    }
  })()