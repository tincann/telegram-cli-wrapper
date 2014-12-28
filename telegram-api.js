var net = require('net'),
	utils = require('utils'),
	events = require('events'),
	tgcli = require('./telegram-cli-wrapper.js');



var TelegramAPI = function(){

}


module.exports = {
	create: function(){
		return new TelegramAPI();
	}
}