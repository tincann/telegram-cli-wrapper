telegram-cli-wrapper
===================
[![Build Status](https://travis-ci.org/tincann/telegram-cli-wrapper.svg)](https://travis-ci.org/tincann/telegram-cli-wrapper)

Nodejs wrapper that communicates with the Telegram API.

Underlyingly makes use of telegram-cli (https://github.com/vysheng/tg).

##Installation

1. To run it locally run the following command:

 `git clone --recursive git@github.com:tincann/telegram-cli-wrapper.git`
  
  The `--recursive` argument is important, as it will also install the submodules of tg. 

2. Afterwards install all dependencies by running:

  `sudo apt-get install libreadline-dev libconfig-dev libssl-dev libevent-dev make`

3. Then run:

  `npm install`

 This will compile the code in the included tg submodule into the `tg/bin` directory.

##Running it the first time

While in the root of this project, first run the binary in the `tg/bin` directory by doing:

`./tg/bin/telegram-cli -k tg/server.pub`

Then you should set up access to a telegram account by following the steps in the cli. Please refer to the README of the cli (https://github.com/vysheng/tg).

After this is done you can use the TelegramAPI object in the lib directory. Usage example:

```javascript
var tgapi = require('./lib/telegram-api.js');

tgapi.connect(function(connection){
    connection.on('message', function(message){
        console.log('message:', message);
    });
});
```


##Windows

Haven't tested this for Windows (yet)
