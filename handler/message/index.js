require('dotenv').config()
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const { downloader, cekResi, removebg, urlShortener, meme, translate, getLocationData } = require('../../lib')
const { msgFilter, color, processTime, is } = require('../../utils')
const mentionList = require('../../utils/mention')
const { uploadImages } = require('../../utils/fetcher')
var fs = require("fs");
var Jimp = require("jimp");
var exec = require('child_process').exec;
const fs2 = require('fs-extra')

const { registerFont, createCanvas, loadImage } = require('canvas')
registerFont('SecularOne-Regular.ttf', { family: 'Secular' })
var data2 = fs.readFileSync('a.txt', 'utf8');
var data4 = fs.readFileSync('c.txt', 'utf8');
var data6 = fs.readFileSync('d.txt', 'utf8');
var data8 = fs.readFileSync('e.txt', 'utf8');
var data10 = fs.readFileSync('g.txt', 'utf8');
var data12 = fs.readFileSync('h.txt', 'utf8');

var data1=JSON.parse(fs.readFileSync('data1.json', 'utf8'));
const values = data1.array1;
const WolframAlphaAPI = require('wolfram-alpha-api');
const puppeteer = require('puppeteer');
const waApi = WolframAlphaAPI('KEY');
var mjAPI = require("mathjax-node");
const svgToImg = require("svg-to-img");
var sizeOf = require('image-size');

var text = fs.readFileSync("black.txt").toString()
var textByLine = text.split("\n")
var black = textByLine
var enabled= [false,false,false,false,false,false,false,false]

const { menuId, menuEn } = require('./text') // Indonesian & English menu
const { FONT_SANS_64_WHITE } = require('jimp')
const { stream } = require('file-type')
const { FONT_SANS_64_BLACK } = require('jimp')
const { umask, stdout } = require('process')
function draw(img,ctx) {
    var buffer = createCanvas(512,512)
    var bufferctx = buffer.getContext('2d');
    bufferctx.drawImage(img, 0, 0);
    var imageData = bufferctx.getImageData(0,0,buffer.width,  buffer.height);
    var data = imageData.data;
    var removeBlack = function() {
        for (var i = 0; i < data.length; i += 4) {
            if(data[i]+ data[i + 1] + data[i + 2] < 80){ 
                data[i + 3] = 0; // alpha
            }
        } 
        ctx.putImageData(imageData, 0, 0); 
    }; 
 removeBlack(); 
} 
function trimCanvas(c) {
    var ctx = c.getContext('2d'),
        copy = createCanvas(512, 512).getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        },
        x, y;
    
    // Iterate over every pixel to find the highest
    // and where it ends on every axis ()
    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % c.width;
            y = ~~((i / 4) / c.width);

            if (bound.top === null) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x+5;
            } else if (x < bound.left && x>5) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y && x>5) {
                bound.bottom = y;
            }
        }
    }
    
    // Calculate the height and width of the content
    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // Return trimmed canvas
    return copy.canvas;
}





module.exports = msgHandler = async (client, message) => {
    
        const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, isGif, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const groupMembers = isGroupMsg ? await client.getGroupMembersId(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        try { 
        // Bot Prefix
        const prefix = '#'
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const url = args.length !== 0 ? args[0] : ''
        const uaOverride = process.env.UserAgent

        var pres_bud = message.content
        


        if (isMedia) {pres_bud=caption}
        
        if (enabled.includes(true) && !black.includes(message.author) && (!msgFilter.isFiltered2(message.author) || message.fromMe)) {
            if ( enabled[0] && message.chatId== '972584080120-1591728975@g.us' && (pres_bud.startsWith('adverguy') || pres_bud.includes('נטפליקס'))) {
                try {
                  if (!message.fromMe) {msgFilter.addFilter2(message.author)}
                  await client.sendTextWithMentions(message.chatId,fs.readFileSync('Rajwanmsg.txt', 'utf8'), message.id);
                  await client.sendImageAsSticker(message.chatId, fs.readFileSync('Rajwan.txt', 'utf8')); 
              } catch (error) {
                  console.error(error) 
              }
              }
              if (enabled[1] && pres_bud.includes('צבאן') && message.chatId == '972584080120-1591728975@g.us'){
                try {
                    if (!message.fromMe) {msgFilter.addFilter2(message.author)}
                    await client.sendImageAsSticker(message.chatId, fs.readFileSync('tsaban.txt', 'utf8')); 
                } catch (error) {
                    console.error(error) 
                }
            }
              if (enabled[2] && (message.author== '972544883303@c.us'|| message.fromMe) && pres_bud.startsWith('changestr ')) {
                try {
                  fs.writeFileSync('Rajwanmsg.txt', pres_bud.substring(10));
                  await client.reply(message.chatId, 'message changed to \n' + fs.readFileSync('Rajwanmsg.txt', 'utf8'), message.id);
              } catch (error) {
                  console.error(error) 
              }
              }
              
              if (enabled[3] && message.chatId == '972584080120-1591728975@g.us' && pres_bud.includes('2') && (!message.fromMe)  && !isMedia) {
                    if (!message.fromMe) {msgFilter.addFilter2(message.author)}
                    await client.sendFile(message.chatId, '2.pdf' , 'חחחחחחחח אמרת 2 איזה מצחיק אני.pdf', 'חחחחחחחח אמרת 2 איזה מצחיק אני', message.id); 
              }
              if (enabled[4] && message.chatId == '972584080120-1591728975@g.us' && pres_bud.includes('6') && (!message.fromMe) && !isMedia) {
                try {
                  if (!message.fromMe) {msgFilter.addFilter2(message.author)}
                  await client.sendFile(message.chatId, '6.pdf' , 'חחחחחחחח אמרת 6 איזה מצחיק אני.pdf', 'חחחחחחחח אמרת 6 איזה מצחיק אני', message.id); 
              } catch (error) {
                  console.error(error) 
              }
              }
              if (enabled[5] && pres_bud.includes('@someone')) {
                try {
                  if (!message.fromMe) {msgFilter.addFilter2(message.author)}
                  /*
                    client.getAllMessagesInChat(message.chatId).then(async function (alls) {
                    await client.sendTextWithMentions(message.chatId, "@" + alls[Math.floor(Math.random() * alls.length)].author.substring(0,12), message.id);
                  })*/
                  await client.sendTextWithMentions(message.chatId, "@" + values[parseInt(Math.random() * values.length)], message.id);
              } catch (error) {
                  console.error(error) 
              }
              }
            }
            jmp:
        // [BETA] Avoid Spam Message
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        //
        if (!isCmd && !isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname)) }
        if (!isCmd && isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // [BETA] Avoid Spam Message
        msgFilter.addFilter(from)
        
        switch (command) {
        // Menu and TnC
        case 'speed':
        case 'ping':
            await client.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
            break
        case 'menu':
        case 'help':
            if (arg=='#help '|| arg=='#help'){
            await client.reply(from,'Hello. This is a bot that does cool things for Whatsapp.\n Avialable commands: ping,help,sticker,fakesticker,contactsticker,botstat,wolf,mj,black,toggle.\n send "#help [command]" for command info',id);
        }
        else{
            switch(arg){
                case 'speed':
                case 'ping':
                    client.reply(from,'check ping of bot. aliases: speed,ping.',id)
                break
                case 'menu':
                case 'help':
                    client.reply(from,'list commands, or #help [command] to get info about command. aliases: help,menu.',id)
                break
                case 'sticker':
                case 's':
                case 'stiker':
                case 'sticker2':
                case 's2':
                case 'stiker2': 
                client.reply(from,'reply to image or send image with: #s [color] [outline] expand[if you want to expand] top text, bottom text. aliases: sticker,s,stiker,sticker2,stiker,s2.',id)
                break
                case 'fakesticker':
                case 'fs': 
                client.reply(from,'fake a sticker image with #fs [time] | [message] | [name] | [phone number]. Or, you can reply to a message: #fs for a real sticker. will work with images that are sent with the message or quoted. aliases: fakesticker,fs.',id)
                    break
                case 'contactsticker':
                case 'cs':
                    client.reply(from, 'fake a sticker with contact with #cs [time] | [message] | [contact name]. Or, you can reply to a message: #cs [contact name] for a real sticker. will work with images that are sent with the message or quoted. aliases: contactsticker,cs.', id)
                break
                case 'botstat':
                    client.reply(from,'stats about this bot. aliases: botstat.',id)
                break
                case 'wolf': 
                client.reply(from,'search in wolfram alpha with #wolf [what you want to search]. aliases: wolf.',id)
                    break
                case 'mj': 
                client.reply(from,'Caution: works very badly, dont use. complie message to mathjax with #mj [what you want to complie]. aliases: mj.',id)
                    break
                case 'toggle':
                    client.reply(from,'for shana Aleph mods and me. #toggle [list of 0 and 1, e.g: 1,0,1,1,1,0]. to enable [netflix, tsaban, changestr, 2,6, at-someone]. if there is no argument, then if there is anything enabled #toggle will disable all, else #toggle will enable all. aliases: toggle.',id)
                break
                default:
                    client.reply(from,'thats not a command.',id)
            }
        }
            break
            /*
        case 'tnc':
            await client.sendText(from, menuId.textTnC())
            break
        case 'menu':
        case 'help':
            await client.sendText(from, menuId.textMenu(pushname))
                .then(() => ((isGroupMsg) && (isGroupAdmins)) ? client.sendText(from, 'Menu Admin Grup: *#menuadmin*') : null)
            break
        case 'menuadmin':
            if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]', id)
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            await client.sendText(from, menuId.textAdmin())
            break
        case 'donate':
        case 'donasi':
            await client.sendText(from, menuId.textDonasi())
            break
        */
        // Sticker Creator
        /*
        case 'sticker':
        case 's':
        case 'stiker': {
            if ((isMedia || isQuotedImage) && args.length === 0) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                client.sendImageAsSticker(message.chatId, imageBase64).then(() => {
                    client.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                })
            }  else if ((isMedia || isQuotedImage) && args.length >1) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                var imageCaption = args.slice(1).join(' ');
                var loadedImage;
                Jimp.read(mediaData)
                    .then(function (image) {
                        loadedImage = image;
                        if (args[0].toLowerCase()=="white") {return Jimp.loadFont(FONT_SANS_64_WHITE);}
                        else {return Jimp.loadFont(FONT_SANS_64_BLACK);}
                    })
                    .then(function (font) {
                        loadedImage.resize(512, 512).print(font, 10, 10, imageCaption).getBase64(Jimp.AUTO, (err, res) => {
                            client.sendImageAsSticker(message.chatId, res)
                          })
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            } else {
                await client.reply(from, 'Wrong Format', id)
            }
            break
        }
        */
        case 'sticker':
        case 's':
        case 'stiker':
        case 'sticker2':
        case 's2':
        case 'stiker2': {            
            if (isMedia &&(mimetype === 'video/mp4' && message.duration < 10 || mimetype === 'image/gif' && message.duration < 10)) {
                const mediaData = await decryptMedia(message, uaOverride)
                client.reply(from, 'this will take a while to process.', id)
                const filename = `./media/input.${mimetype.split('/')[1]}`
                fs.writeFileSync(filename, mediaData)
                var width
                var height
                if (message.width>message.height) {width=240;height=240*message.height/message.width}
                else {height=240;width=240*message.width/message.height}
                exec(`gify ${filename} ./media/output.gif --fps=${30-2*message.duration} --scale=240:240`, async function (error, stdout, stderr) {
                    const gif = fs.readFileSync('./media/output.gif', { encoding: "base64" })
                    await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                })//
            }
            else if (!isQuotedImage && (quotedMsg!=null) &&(quotedMsgObj.mimetype === 'video/mp4' && quotedMsgObj.duration < 10 || quotedMsgObj.mimetype === 'image/gif' && quotedMsgObj.duration < 10)) {
                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                client.reply(from, 'this will take a while to process.', id)
                const filename = `./media/input.${quotedMsgObj.mimetype.split('/')[1]}`
                fs.writeFileSync(filename, mediaData)
                var width
                var height
                if (quotedMsgObj.width>quotedMsgObj.height) {width=240;height=240*quotedMsgObj.height/quotedMsgObj.width}
                else {height=240;width=240*quotedMsgObj.width/quotedMsgObj.height}
                exec(`gify ${filename} ./media/output.gif --fps=${30-2*quotedMsgObj.duration} --scale=240:240`, async function (error, stdout, stderr) {
                    const gif = fs.readFileSync('./media/output.gif', { encoding: "base64" })
                    await client.sendImageAsSticker(from, `data:image/gif;base64,${gif.toString('base64')}`)
                })//
            }
            else if ((isMedia || isQuotedImage) && args.length > 2) {
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                loadImage(mediaData).then((image) => {
                    
                    if (args[2].toLowerCase()=='expand'){
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        ctx.drawImage(image, 0, 0, image.width, image.height, 0,0,512,512)
                        var meme = arg.split('expand').slice(1).join(' ')
                        if (!meme.includes(',')) {top=meme}
                        else {var top = meme.split(',')[0]; var bottom = meme.split(',').slice(1).join(' ')}
                    }
                    else{
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        var meme = args.slice(2).join(' ')
                        if (!meme.includes(',')) {top=meme}
                        else {var top = meme.split(',')[0]; var bottom = meme.split(',').slice(1).join(' ')}
                        
                    }
                    ctx.font = '64px "Secular"'
                    ctx.fillStyle = args[0];
                    ctx.strokeStyle = args[1];
                    ctx.lineWidth = 5;
                    if (top!=undefined){
                        words = top.split(' ')
                        top2 =''
                        var i=0
                        while (i != words.length){
                            if (ctx.measureText(words.slice(0,i+1).join(' ')).width>450){
                                if (i==0){
                                    top2 += words.slice(0,1).join(' ')+'\n'
                                    words=words.slice(i+1)
                                }
                                else{
                                    top2 += words.slice(0,i).join(' ')+'\n'
                                    words=words.slice(i)
                                }
                                i=-1
                            }
                            i++
                        }
                        top2+=words.join(' ')
                        if (top2!='' && !top.includes('\n')) {top=top2}
                        for (i=0;i<top.split('\n').length;i++){
                            ctx.strokeText(top.split('\n')[i], canvas.width/2 - (ctx.measureText(top.split('\n')[i]).width / 2), 40+48*(i));
                            ctx.fillText(top.split('\n')[i], canvas.width/2 - (ctx.measureText(top.split('\n')[i]).width / 2), 40+48*(i));
                        }
                    }
                    if (bottom!=undefined){
                        words = bottom.split(' ')
                        bottom2 =''
                        var i=0
                        while (i != words.length){
                            if (ctx.measureText(words.slice(0,i+1).join(' ')).width>450){
                                if (i==0){
                                    bottom2 += words.slice(0,1).join(' ')+'\n'
                                    words=words.slice(i+1)
                                }
                                else{
                                    bottom2 += words.slice(0,i).join(' ')+'\n'
                                    words=words.slice(i)
                                }
                                i=-1
                            }
                            i++
                        }
                        bottom2+=words.join(' ')
                        if (bottom2!='' && !bottom.includes('\n')) {bottom=bottom2}
                        for (i=0;i<bottom.split('\n').length;i++){
                            ctx.strokeText(bottom.split('\n')[i], canvas.width/2 - (ctx.measureText(bottom.split('\n')[i]).width / 2), 500-48*(bottom.split('\n').length-i-1));
                            ctx.fillText(bottom.split('\n')[i], canvas.width/2 - (ctx.measureText(bottom.split('\n')[i]).width / 2), 500-48*(bottom.split('\n').length-i-1));
                        }
                    }
                    ctx.fill();
                    ctx.stroke();
                    client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                  })
                }
                else if ((isMedia || isQuotedImage) && args.length ===1) {
                    if (arg != 'expand') {await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #'+command+' [color] [outline] expand[if you want to expand] top text, bottom text', id);}
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    loadImage(mediaData).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        ctx.drawImage(image, 0, 0, image.width, image.height, 0,0,512,512)
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                    }
                    else if ((isMedia || isQuotedImage) && args.length ===0) {
                        
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        loadImage(mediaData).then((image) => {
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            if (image.height>image.width){
                                ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                            }
                            else{
                                ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                            }
                            client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                          })
                        }
                else {
                    await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #'+command+' [color] [outline] expand[if you want to expand] top text, bottom text', id)
            }
            break
        }
        case 'fakesticker':
        case 'fs': {
            var args2 = arg.split('|')
            if (args2.length > 3 && !isQuotedImage&&!isMedia) {
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data2
            var start = 38;
            start = start + (args2[1].split('\n').length-1)*19
            data3 = (data3).replace('FLAG_TIME',args2[0]).replace('FLAG_MSG',args2[1]).replace('FLAG_NAME',args2[2]).replace('FLAG_PHONE',args2.slice(3).join(' ')).replace('38px', start.toString()+'px');
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        
        else if (quotedMsg !=null && args.length===0 && !isQuotedImage&&!isMedia ){
            var current = new Date();
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data2
            var purephone = quotedMsgObj.sender.id.slice(0,-5)
            var start = 38;
            start = start + (quotedMsgObj.content.split('\n').length-1)*19
            var phonenumber = "+" + purephone.slice(0,3) + " " + purephone.slice(3,5) + "-"+ purephone.slice(5,8) + "-"+ purephone.slice(8,12)
            data3 = (data3).replace('FLAG_TIME',current.getHours().toString() + ":" + current.getMinutes().toString()).replace('FLAG_MSG',quotedMsgObj.content).replace('FLAG_NAME',quotedMsgObj.sender.pushname).replace('FLAG_PHONE',phonenumber).replace('38px', start.toString()+'px');
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        else if (isQuotedImage && args.length===0){
            if (quotedMsgObj.caption==null){
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                var current = new Date();
                var image = Buffer.from(mediaData.toString('base64'), 'base64');
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data6
            var purephone = quotedMsgObj.sender.id.slice(0,-5)
            var phonenumber = "+" + purephone.slice(0,3) + " " + purephone.slice(3,5) + "-"+ purephone.slice(5,8) + "-"+ purephone.slice(8,12)
            var width = 330
            var im = sizeOf(image);

            if (im.height>im.width){
                var height = 330
            }
            else{
                if (330*im.height/im.width<138){
                var height = 138
            }
            else{
                var height = 330*im.height/im.width
            }
            }
            var prec = 'style="height: 100%;"'
            if (height==330){prec = 'style="width: 100%;"'}
            data3 = (data3).replace('FLAG_TIME',current.getHours().toString() + ":" + current.getMinutes().toString()).replace('FLAG_IMAGE',imageBase64).replace('FLAG_NAME',quotedMsgObj.sender.pushname).replace('148',height).replace('330',width).replace('FLAG_PHONE',phonenumber).replace('style="height: 100%;"', prec);
        
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        else{
            const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                var current = new Date();
                var image = Buffer.from(mediaData.toString('base64'), 'base64');
                var purephone = quotedMsgObj.sender.id.slice(0,-5)
                var phonenumber = "+" + purephone.slice(0,3) + " " + purephone.slice(3,5) + "-"+ purephone.slice(5,8) + "-"+ purephone.slice(8,12)
    
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data8
            var width = 330
            var im = sizeOf(image);
            if (im.height>im.width){
                var height = 330
            }
            else{
                if (330*im.height/im.width<138){
                var height = 138
            }
            else{
                var height = 330*im.height/im.width
            }
            }
            var start = 57;
            start = start + (quotedMsgObj.caption.split('\n').length-1)*19
            var prec = 'style="height: 100%;"'
            if (height==330){prec = 'style="width: 100%;"'}
            
            data3 = (data3).replace('FLAG_TIME',current.getHours().toString() + ":" + current.getMinutes().toString()).replace('FLAG_MSG',quotedMsgObj.caption).replace('FLAG_NAME',quotedMsgObj.sender.pushname).replace('FLAG_PHONE',phonenumber).replace('57px', start.toString()+'px').replace('FLAG_IMAGE',imageBase64).replace('148',height).replace('330',width).replace('style="width: 100%;"', prec);
        
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        }
        else if ((isQuotedImage||isMedia) && args2.length> 3){
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                var current = new Date();
                var image = Buffer.from(mediaData.toString('base64'), 'base64');
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            if (args2[1]==''){var data3 = data6;}
            else{var data3 = data8}
            var width = 330
            var im = sizeOf(image);
            if (im.height>im.width){
                var height = 330
            }
            else{
                if (330*im.height/im.width<138){
                var height = 138
            }
            else{
                var height = 330*im.height/im.width
            }
            }
            var start = 57;
            start = start + (args2[1].split('\n').length-1)*19
            var prec = 'style="height: 100%;"'
            if (height==330){prec = 'style="width: 100%;"'}
            data3 = (data3).replace('FLAG_TIME',args2[0]).replace('FLAG_MSG',args2[1]).replace('FLAG_NAME',args2[2]).replace('FLAG_PHONE',args2.slice(3).join(' ')).replace('57px', start.toString()+'px').replace('FLAG_IMAGE',imageBase64).replace('148',height).replace('330',width).replace('style="width: 100%;"', prec);
        
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        else {
            await client.reply(from, 'Wrong Format. valid input: #'+command+' [time] | [message] | [name] | [phone number]. Or, you can reply to a message: #fs', id)
    }
            break
        }
        case 'contactsticker':
        case 'cs': {
            var args2 = arg.split('|')
            if (args2.length > 2 && !isQuotedImage&& !isMedia) {
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data4
            var start = 38;
            start = start + (args2[1].split('\n').length-1)*19
            data3 = (data3).replace('FLAG_TIME',args2[0]).replace('FLAG_MSG',args2[1]).replace('FLAG_NAME',args2[2]).replace('38px', start.toString()+'px');
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        
        else if (quotedMsg !=null && arg!='#cs' && arg!='#cs ' && !isQuotedImage&& !isMedia){
            var current = new Date();
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data4
            var start = 38;
            start = start + (quotedMsgObj.content.split('\n').length-1)*19
            data3 = (data3).replace('FLAG_TIME',current.getHours().toString() + ":" + current.getMinutes().toString()).replace('FLAG_MSG',quotedMsgObj.content).replace('FLAG_NAME',arg).replace('38px', start.toString()+'px');
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        
        else if (isQuotedImage && args2.length===1){
            if (quotedMsgObj.caption==null){
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                var current = new Date();
                var image = Buffer.from(mediaData.toString('base64'), 'base64');
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data10
            var width = 330
            var im = sizeOf(image);

            if (im.height>im.width){
                var height = 330
            }
            else{
                if (330*im.height/im.width<138){
                var height = 138
            }
            else{
                var height = 330*im.height/im.width
            }
            }
            var prec = 'style="height: 100%;"'
            if (height==330){prec = 'style="width: 100%;"'}
            data3 = (data3).replace('FLAG_TIME',current.getHours().toString() + ":" + current.getMinutes().toString()).replace('FLAG_IMAGE',imageBase64).replace('FLAG_NAME',arg).replace('148',height).replace('330',width).replace('style="height: 100%;"', prec);
        
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        
        
        else{
            const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                var current = new Date();
                var image = Buffer.from(mediaData.toString('base64'), 'base64');
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            var data3 = data12
            var width = 330
            var im = sizeOf(image);
            if (im.height>im.width){
                var height = 330
            }
            else{
                if (330*im.height/im.width<138){
                var height = 138
            }
            else{
                var height = 330*im.height/im.width
            }
            }
            var start = 57;
            start = start + (quotedMsgObj.caption.split('\n').length-1)*19
            var prec = 'style="height: 100%;"'
            if (height==330){prec = 'style="width: 100%;"'}
            
            data3 = (data3).replace('FLAG_TIME',current.getHours().toString() + ":" + current.getMinutes().toString()).replace('FLAG_MSG',quotedMsgObj.caption).replace('FLAG_NAME',arg).replace('57px', start.toString()+'px').replace('FLAG_IMAGE',imageBase64).replace('148',height).replace('330',width).replace('style="width: 100%;"', prec);
        
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        }
        
        else if ((isQuotedImage||isMedia) && args2.length> 2){
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                var current = new Date();
                var image = Buffer.from(mediaData.toString('base64'), 'base64');
            var canvas = createCanvas(512,512)
            var ctx = canvas.getContext('2d')
            if (args2[1]==''){var data3 = data10;}
            else{var data3 = data12}
            var width = 330
            var im = sizeOf(image);
            if (im.height>im.width){
                var height = 330
            }
            else{
                if (330*im.height/im.width<138){
                var height = 138
            }
            else{
                var height = 330*im.height/im.width
            }
            }
            var start = 57;
            start = start + (args2[1].split('\n').length-1)*19
            var prec = 'style="height: 100%;"'
            if (height==330){prec = 'style="width: 100%;"'}
            data3 = (data3).replace('FLAG_TIME',args2[0]).replace('FLAG_MSG',args2[1]).replace('FLAG_NAME',args2[2]).replace('57px', start.toString()+'px').replace('FLAG_IMAGE',imageBase64).replace('148',height).replace('330',width).replace('style="width: 100%;"', prec);
        
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setContent(data3);
                var base64 = await page.screenshot({ encoding: "base64" })
                await browser.close();
                loadImage('data:image/png;base64,' + base64).then((image) => {
                
                    draw(image,ctx)
                    var ne1 = trimCanvas(canvas)
                    loadImage(ne1.toDataURL()).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height>image.width){
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256-256*image.width/image.height ,0 ,512*image.width/image.height,512)
                        }
                        else{
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0 ,256-256*image.height/image.width ,512,512*image.height/image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL())
                      })
                })
            })()
        }
        
        else {
            await client.reply(from, 'Wrong Format. valid input: #'+command+' [time] | [message] | [contact name]. Or, you can reply to a message: #'+command+' [contact name]', id)
    }
            break
        }
        /*
        case 'stikergif':
        case 'stickergif':
        case 'gifstiker':
        case 'gifsticker': {
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (is.Giphy(url)) {
                const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                if (!getGiphyCode) { return client.reply(from, 'Gagal mengambil kode giphy', id) }
                const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                client.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    client.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                }).catch((err) => console.log(err))
            } else if (is.MediaGiphy(url)) {
                const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                if (!gifUrl) { return client.reply(from, 'Gagal mengambil kode giphy', id) }
                const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                client.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                    client.reply(from, 'Here\'s your sticker')
                    console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                }).catch((err) => console.log(err))
            } else {
                await client.reply(from, 'maaf, untuk saat ini sticker gif hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
            }
            break
        }
        // Video Downloader
        case 'tiktok':
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!is.Url(url) && !url.includes('tiktok.com')) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid. [Invalid Link]', id)
            await client.reply(from, `_Scraping Metadata..._ \n\n${menuId.textDonasi()}`, id)
            downloader.tiktok(url).then(async (videoMeta) => {
                const filename = videoMeta.authorMeta.name + '.mp4'
                const caps = `*Metadata:*\nUsername: ${videoMeta.authorMeta.name} \nMusic: ${videoMeta.musicMeta.musicName} \nView: ${videoMeta.playCount.toLocaleString()} \nLike: ${videoMeta.diggCount.toLocaleString()} \nComment: ${videoMeta.commentCount.toLocaleString()} \nShare: ${videoMeta.shareCount.toLocaleString()} \nCaption: ${videoMeta.text.trim() ? videoMeta.text : '-'}`
                await client.sendFileFromUrl(from, videoMeta.url, filename, videoMeta.NoWaterMark ? caps : `⚠ Video tanpa watermark tidak tersedia. \n\n${caps}`, '', { headers: { 'User-Agent': 'okhttp/4.5.0', referer: 'https://www.tiktok.com/' } }, true)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            }).catch(() => client.reply(from, 'Gagal mengambil metadata, link yang kamu kirim tidak valid. [Invalid Link]', id))
            break
        case 'ig':
        case 'instagram':
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!is.Url(url) && !url.includes('instagram.com')) return client.reply(from, 'Maaf, link yang kamu kirim tidak valid. [Invalid Link]', id)
            await client.reply(from, `_Scraping Metadata..._ \n\n${menuId.textDonasi()}`, id)
            downloader.insta(url).then(async (data) => {
                if (data.type == 'GraphSidecar') {
                    if (data.image.length != 0) {
                        data.image.map((x) => client.sendFileFromUrl(from, x, 'photo.jpg', '', null, null, true))
                            .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    }
                    if (data.video.length != 0) {
                        data.video.map((x) => client.sendFileFromUrl(from, x.videoUrl, 'video.jpg', '', null, null, true))
                            .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    }
                } else if (data.type == 'GraphImage') {
                    client.sendFileFromUrl(from, data.image, 'photo.jpg', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                } else if (data.type == 'GraphVideo') {
                    client.sendFileFromUrl(from, data.video.videoUrl, 'video.mp4', '', null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                }
            })
                .catch((err) => {
                    console.log(err)
                    if (err === 'Not a video') { return client.reply(from, 'Error, tidak ada video di link yang kamu kirim. [Invalid Link]', id) }
                    client.reply(from, 'Error, user private atau link salah [Private or Invalid Link]', id)
                })
            break
        case 'twt':
        case 'twitter':
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!is.Url(url) & !url.includes('twitter.com') || url.includes('t.co')) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid. [Invalid Link]', id)
            await client.reply(from, `_Scraping Metadata..._ \n\n${menuId.textDonasi()}`, id)
            downloader.tweet(url).then(async (data) => {
                if (data.type === 'video') {
                    const content = data.variants.filter(x => x.content_type !== 'application/x-mpegURL').sort((a, b) => b.bitrate - a.bitrate)
                    const result = await urlShortener(content[0].url)
                    console.log('Shortlink: ' + result)
                    await client.sendFileFromUrl(from, content[0].url, 'video.mp4', `Link Download: ${result} \n\nProcessed for ${processTime(t, moment())} _Second_`, null, null, true)
                        .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                        .catch((err) => console.error(err))
                } else if (data.type === 'photo') {
                    for (let i = 0; i < data.variants.length; i++) {
                        await client.sendFileFromUrl(from, data.variants[i], data.variants[i].split('/media/')[1], '', null, null, true)
                            .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                            .catch((err) => console.error(err))
                    }
                }
            })
                .catch(() => client.sendText(from, 'Maaf, link tidak valid atau tidak ada media di link yang kamu kirim. [Invalid Link]'))
            break
        case 'fb':
        case 'facebook':
            if (args.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!is.Url(url) && !url.includes('facebook.com')) return client.reply(from, 'Maaf, url yang kamu kirim tidak valid. [Invalid Link]', id)
            await client.reply(from, '_Scraping Metadata..._ \n\nTerimakasih telah menggunakan bot ini, kamu dapat membantu pengembangan bot ini dengan menyawer melalui https://saweria.co/donate/yogasakti atau mentrakteer melalui https://trakteer.id/red-emperor \nTerimakasih.', id)
            downloader.facebook(url).then(async (videoMeta) => {
                const title = videoMeta.response.title
                const thumbnail = videoMeta.response.thumbnail
                const links = videoMeta.response.links
                const shorts = []
                for (let i = 0; i < links.length; i++) {
                    const shortener = await urlShortener(links[i].url)
                    console.log('Shortlink: ' + shortener)
                    links[i].short = shortener
                    shorts.push(links[i])
                }
                const link = shorts.map((x) => `${x.resolution} Quality: ${x.short}`)
                const caption = `Text: ${title} \n\nLink Download: \n${link.join('\n')} \n\nProcessed for ${processTime(t, moment())} _Second_`
                await client.sendFileFromUrl(from, thumbnail, 'videos.jpg', caption, null, null, true)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            })
                .catch((err) => client.reply(from, `Error, url tidak valid atau tidak memuat video. [Invalid Link or No Video] \n\n${err}`, id))
            break
        // Other Command
        case 'meme':
            if ((isMedia || isQuotedImage) && args.length >= 2) {
                const top = arg.split('|')[0]
                const bottom = arg.split('|')[1]
                const encryptMedia = isQuotedImage ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                const getUrl = await uploadImages(mediaData, false)
                const ImageBase64 = await meme.custom(getUrl, top, bottom)
                client.sendFile(from, ImageBase64, 'image.png', '', null, true)
                    .then((serialized) => console.log(`Sukses Mengirim File dengan id: ${serialized} diproses selama ${processTime(t, moment())}`))
                    .catch((err) => console.error(err))
            } else {
                await client.reply(from, 'Tidak ada gambar! Untuk membuka cara penggnaan kirim #menu [Wrong Format]', id)
            }
            break
        case 'resi':
            if (args.length !== 2) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
            if (!kurirs.includes(args[0])) return client.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
            console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
            cekResi(args[0], args[1]).then((result) => client.sendText(from, result))
            break
        case 'translate':
            if (args.length != 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!quotedMsg) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
            translate(quoteText, args[0])
                .then((result) => client.sendText(from, result))
                .catch(() => client.sendText(from, '[Error] Kode bahasa salah atau server bermasalah.'))
            break
        case 'ceklok':
        case 'ceklokasi':
            if (!quotedMsg || quotedMsg.type !== 'location') return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
            const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
            if (zoneStatus.kode !== 200) client.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
            let data = ''
            for (let i = 0; i < zoneStatus.data.length; i++) {
                const { zone, region } = zoneStatus.data[i]
                const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                data += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
            }
            const text = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${data}`
            client.sendText(from, text)
            break
        // Group Commands (group admin only)
        case 'kick':
            if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]', id)
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup! [Bot Not Admin]', id)
            if (mentionedJidList.length === 0) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
            for (let i = 0; i < mentionedJidList.length; i++) {
                if (groupAdmins.includes(mentionedJidList[i])) return await client.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                await client.removeParticipant(groupId, mentionedJidList[i])
            }
            break
        case 'promote':
            if (!isGroupMsg) return await client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]', id)
            if (!isGroupAdmins) return await client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            if (!isBotGroupAdmins) return await client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup! [Bot not Admin]', id)
            if (mentionedJidList.length != 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format, Only 1 user]', id)
            if (groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut sudah menjadi admin. [Bot is Admin]', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.promoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Request diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
            break
        case 'demote':
            if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]', id)
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            if (!isBotGroupAdmins) return client.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup! [Bot not Admin]', id)
            if (mentionedJidList.length !== 1) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format, Only 1 user]', id)
            if (!groupAdmins.includes(mentionedJidList[0])) return await client.reply(from, 'Maaf, user tersebut tidak menjadi admin. [user not Admin]', id)
            if (mentionedJidList[0] === botNumber) return await client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            await client.demoteParticipant(groupId, mentionedJidList[0])
            await client.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
            break
        case 'bye':
            if (!isGroupMsg) return client.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup! [Group Only]', id)
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            client.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => client.leaveGroup(groupId))
            break
        case 'del':
            if (!isGroupAdmins) return client.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup! [Admin Group Only]', id)
            if (!quotedMsg) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            if (!quotedMsgObj.fromMe) return client.reply(from, 'Maaf, format pesan salah silahkan periksa menu. [Wrong Format]', id)
            client.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            break
        */
        //case 'tagall':
        //case 'everyone':
            /**
            * This is Premium feature.
            * Check premium feature at https://trakteer.id/red-emperor/showcase or chat Author for Information.
            */
            //client.reply(from, 'ehhh, what\'s that??? \n Check premium feature at https://trakteer.id/red-emperor/showcase or chat Author for Information', id)
            //break
        
        case 'botstat': {
            const loadedMsg = await client.getAmountOfLoadedMessages()
            const chatIds = await client.getAllChatIds()
            const groups = await client.getAllGroups()
            client.sendText(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`)
            break
        }
        case 'wolf': {
            try {
                var fuckyu = await waApi.getSimple({i: message.body.substring(6), ip: '140.82.121.4'});
                var createdUser = await client.sendImage(message.chatId, fuckyu); 
                // business logic goes here
            } catch (error) {
                console.error(error) // from creation or business logic
                await client.reply(message.chatId, error.message, message.id);
            }
            break
        }
        case 'mj':
            mjAPI.typeset({
                math: arg,
                format: "TeX", // or "inline-TeX", "MathML"
                svg:true,      // or svg:true, or html:true
              }, async function (data) {
                if (!data.errors) {
                console.log(data.svg);
                try {
                  const png = await svgToImg.from(data.svg).toPng({ encoding: "base64" });
                  console.log("data:image/png;base64," + png);
                  var createdUser = await client.sendImage(message.chatId, "data:image/png;base64," + png); 
                }catch (error) {
                  console.error(error)}
                }
            });
            break
            case 'black':
                if (message.fromMe || isGroupAdmins){
                    black.push(quotedMsgObj.author)
                    console.log(quotedMsgObj.author)
                }
                break
            case 'schedule':
                if (message.fromMe){
                    if (parseInt(args[0]) && parseInt(args[1]) && args[1].length == 12){
                        setTimeout(() => {
                            client.sendText(args[1]+'@c.us', args.slice(2).join(' '));
                        }, parseInt(args[0])*1000)
                        client.sendTextWithMentions(message.chatId, "sending " + args.slice(2).join(' ') + " in " + args[0] + " seconds to @" + args[1], message.id);
                        }

                    else if (parseInt(args[0])){
                    setTimeout(() => {
                        client.reply(message.chatId, args.slice(1).join(' '), message.id);
                    }, parseInt(args[0])*1000)
                    client.reply(message.chatId, "sending " + args.slice(1).join(' ') + " in " + args[0] + " seconds", message.id);
                    }
                }
                else{
                    await client.reply(message.chatId, "not u its for me", message.id);
                }
                break
            case 'toggle':
                if (args.length===0){
                    if (message.fromMe || (isGroupAdmins && message.chatId == '972584080120-1591728975@g.us')){
                        if (enabled.includes(true)) { enabled = [false,false,false,false,false,false,false,false]}
                        else {enabled= [true,true,true,true,true,true,true,true]}
                        await client.reply(message.chatId, "the variable looks like: " + enabled, message.id);
                    }
                    else{
                        await client.reply(message.chatId, "its only for me and mods dummy", message.id);
                    }
            } else {
                if (message.fromMe || (isGroupAdmins && message.chatId == '972584080120-1591728975@g.us')){
                    var allows = arg.split(',')
                    for (i=0;i<arg.length;i++){
                        enabled[i]= (allows[i]=='1')
                    }
                    await client.reply(message.chatId, "the variable looks like: " + enabled, message.id);
                }
                else{
                    await client.reply(message.chatId, "its only for me and mods dummy", message.id);
                }
            }
                break
            /*
        case 'emoji':
            console.log(message.body)
            if (quotedMsg && args.length === 0) {
                var response = ''
                for (var i = 0; i < quotedMsgObj.body.length-1 ; i++){
                    c = quotedMsgObj.body.substring(i,i+4);
                    console.log(c)
                    if (isEmoji(c)){
                        console.log(c)
                        response = response.concat(' ', emoji.which(c))
                    }
                }
                await client.reply(from, response, id)
            }
            else if (args.length !== 0) {
                var response = ''
                for (var i = 0; i < arg.length; i++){
                    c = arg.substring(i,i+4);
                    console.log(c)
                    if (isEmoji(c)){
                        console.log(c)
                        response = response.concat(' ', emoji.which(c))
                    }
                }
                await client.reply(from, response, id)
            }   else {
                await client.reply(from, 'Wrong Format', id)
            }
            break
            */
        default:
            console.log(color('[ERROR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered Command from', color(pushname))
            break
        }
    } catch (err) {
        console.error(color(err, 'red'))
    }
}
