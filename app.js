var tgapi = require('./telegram-api.js').create();


setTimeout(tgapi.start.bind(tgapi), 5000);