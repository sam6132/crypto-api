let litecore = require('litecore-lib');
let privatekey = new litecore.PrivateKey(litecore.Networks.testnet);
let address = privatekey.toAddress(litecore.Networks.testnet);

console.log(privatekey);
console.log(address);
//from  
//6f160ac737c70ee649038574120462985fa6b64f04dc03f924d98d1385be45ee
//mqEPJ4nEvTvVYrzBuD5xqiYnDTBinF5YWP

//to
//n32v8r3NrtEFm1vyhPjabJpuqicbh9W2z8
//c24d300c7e70561197e8fff04203bb10e1330bb6bba091b9b22bc8ab6555e7c7

//test
//mgyKwNwftJHHwzdDQ2xwhd9UaMakJf2wHy
//4c8a366a5f19fc4099166a3c7c1fc70fcc67472c16487d4de16ed868ecb49f94

//mmpoLxXZhyYhpFCpVZGqBEWrRghxLgzG9d
//8ce552fee71b28272e070fffb7ba908f36b36087faa160997f7ace3287fdfbfe

//new
//mu2RNKBrFznRcsXc9WVswP4hJxJkTb9ygv
//a6d9e3c9aadadc3bf2e7226034d1ec0dd067c796ce1ffa18e22db6cf19235d1f