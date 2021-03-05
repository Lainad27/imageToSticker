require('dotenv').config()
const request = require('request');

const { decryptMedia, Client } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jerusalem').locale('id')
const { downloader, cekResi, removebg, urlShortener, meme, translate, getLocationData } = require('../../lib')
const { msgFilter, color, processTime, is } = require('../../utils')
const mentionList = require('../../utils/mention')
const { uploadImages } = require('../../utils/fetcher')
var fs = require("fs");
var http = require('http');
var Jimp = require("jimp");
var exec = require('child_process').exec;
const fs2 = require('fs-extra')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const { registerFont, createCanvas, loadImage } = require('canvas')
registerFont('SecularOne-Regular.ttf', { family: 'Secular' })
var data2 = fs.readFileSync('a.txt', 'utf8');
var data4 = fs.readFileSync('c.txt', 'utf8');
var data6 = fs.readFileSync('d.txt', 'utf8');
var data8 = fs.readFileSync('e.txt', 'utf8');
var data10 = fs.readFileSync('g.txt', 'utf8');
var data12 = fs.readFileSync('h.txt', 'utf8');
/*
var data1 = JSON.parse(fs.readFileSync('data1.json', 'utf8'));
const values = data1.array1;
*/
const WolframAlphaAPI = require('wolfram-alpha-api');
const puppeteer = require('puppeteer');
const waApi = WolframAlphaAPI('KEY');
var mjAPI = require("mathjax-node");
const svgToImg = require("svg-to-img");
var sizeOf = require('image-size');
const { encode } = require('html-entities');

var text = fs.readFileSync("black.txt").toString()
var textByLine = text.split("\n")
var black = textByLine
var enabled = [false, false, false, false, false, false, false, false]

const { menuId, menuEn } = require('./text') // Indonesian & English menu
const { FONT_SANS_64_WHITE } = require('jimp')
const { stream } = require('file-type')
const { FONT_SANS_64_BLACK } = require('jimp')
const { umask, stdout } = require('process')
var ValidColors = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen']

function draw(img, ctx) {
    var buffer = createCanvas(512, 512)
    var bufferctx = buffer.getContext('2d');
    bufferctx.drawImage(img, 0, 0);
    var imageData = bufferctx.getImageData(0, 0, buffer.width, buffer.height);
    var data = imageData.data;
    var removeBlack = function () {
        for (var i = 0; i < data.length; i += 4) {
            if (data[i] + data[i + 1] + data[i + 2] < 80) {
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
                bound.left = x + 5;
            } else if (x < bound.left && x > 5) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y && x > 5) {
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


        if (isMedia) { pres_bud = caption }

        
        // [BETA] Avoid Spam Message
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && !isGroupMsg && !message.chat.contact.isMyContact) { return console.log(color('[WHY]', 'orange'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) { return console.log(color('[SPAM]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        //
        if (!isCmd && !isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname)) }
        if (!isCmd && isGroupMsg) { return console.log('[RECV]', color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Message from', color(pushname), 'in', color(name || formattedTitle)) }
        if (isCmd && !isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname)) }
        if (isCmd && isGroupMsg) { console.log(color('[EXEC]'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle)) }
        // [BETA] Avoid Spam Message
        msgFilter.addFilter(message.author)

        switch (command) {
            // Menu and TnC
            case 'speed':
            case 'ping':
                await client.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
                break
            case 'menu':
            case 'help':
            case 'commands':
                if (arg == '#help ' || arg == '#help') {
                    await client.reply(from, 'Hello. This is a bot that does cool things for Whatsapp.\n Avialable commands: ping, help, sticker, fakesticker, contactsticker, botstat, wolf, mj, black, toggle, compile, fps.\n send "#help [command]" for command info. \n \n github: https://github.com/Lainad27/imageToSticker', id);
                }
                else {
                    switch (arg) {
                        case 'speed':
                        case 'ping':
                            client.reply(from, 'check ping of bot. aliases: speed,ping.', id)
                            break
                        case 'menu':
                        case 'help':
                        case 'commands':
                            client.reply(from, 'list commands, or #help [command] to get info about command. aliases: help,menu.', id)
                            break
                        case 'sticker':
                        case 's':
                        case 'stiker':
                        case 'sticker2':
                        case 's2':
                        case 'stiker2':
                            client.reply(from, 'reply to image or send image with: #s [color] [outline] expand[if you want to expand] top text|bottom text. aliases: sticker,s,stiker,sticker2,stiker,s2.', id)
                            break
                        case 'fakesticker':
                        case 'fs':
                            client.reply(from, 'fake a sticker image with #fs [time] | [message] | [name] | [phone number]. Or, you can reply to a message: #fs for a real sticker. will work with images that are sent with the message or quoted. aliases: fakesticker,fs.', id)
                            break
                        case 'contactsticker':
                        case 'cs':
                            client.reply(from, 'fake a sticker with contact with #cs [time] | [message] | [contact name]. Or, you can reply to a message: #cs [contact name] for a real sticker. will work with images that are sent with the message or quoted. aliases: contactsticker,cs.', id)
                            break
                        case 'botstat':
                            client.reply(from, 'stats about this bot. aliases: botstat.', id)
                            break
                        case 'wolf':
                            client.reply(from, 'search in wolfram alpha with #wolf [what you want to search]. aliases: wolf.', id)
                            break
                        case 'mj':
                            client.reply(from, 'Caution: works very badly, dont use. complie message to mathjax with #mj [what you want to complie]. aliases: mj.', id)
                            break
                        case 'toggle':
                            client.reply(from, 'for shana Aleph mods and me. #toggle [list of 0 and 1, e.g: 1,0,1,1,1,0]. to enable [netflix, tsaban, changestr, 2,6, at-someone]. if there is no argument, then if there is anything enabled #toggle will disable all, else #toggle will enable all. aliases: toggle.', id)
                            break
                            case 'compile':
                                client.reply(from, 'compile and run code with #compile [lang] [code]. available langs: ```"bash": "bash", "c": "gcc-head-c","c#": "dotnetcore-head", "coffeescript": "coffeescript-head", "cpp": "gcc-head", "elixir": "elixir-head", "go": "go-head", "java": "openjdk-head", "javascript": "nodejs-head", "lua": "lua-5.3.4", "perl": "perl-head", "php": "php-head", "python": "cpython-3.8.0", "ruby": "ruby-head", "rust": "rust-head", "sql": "sqlite-head", "swift": "swift-5.0.1", "typescript": "typescript-3.5.1", "vim-script": "vim-head", ``` .aliases: compile.', id)
                                break
                            case 'fps':
                                client.reply(from, 'reply to a video or send video with: #fps [color] [shadow] expand[if you want to expand] top text|bottom text. aliases: fps.', id)
                                break
                            default:
                            client.reply(from, 'thats not a command.', id)
                    }
                }
                break
            /*
        case 'tnc':
            await client.sendText(from, menuId.textTnC())
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
           case 'fps': {
            if (((isMedia && (mimetype === 'video/mp4' && message.duration < 60 || mimetype === 'image/gif' && message.duration < 60)) || !isQuotedImage && (quotedMsg != null) && (quotedMsgObj.mimetype === 'video/mp4' && quotedMsgObj.duration < 60 || quotedMsgObj.mimetype === 'image/gif' && quotedMsgObj.duration < 60)) && args.length<2) {
                const encryptMedia = (quotedMsg != null) ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                client.reply(from, 'this will take a while to process.', id)
                const filename = `./media/input.${encryptMedia.mimetype.split('/')[1]}`
                fs.writeFileSync(filename, mediaData)
                var command1 = ffmpeg(filename).fps(30).size('240x?').aspect('1:1');
                if (args[0] != 'expand') {command1.autopad()}
                command1.output('./media/output.webp').on('end', function () {
                    var stats = fs.statSync("./media/output.webp")
                    var fileSizeInBytes = stats.size;
                    if (fileSizeInBytes < 900000) {
                    const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                        client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #fps"})
                    }
                    else {
                        var command2 = ffmpeg(filename).size(`240x?`).fps(`${Math.floor(30*(900000/fileSizeInBytes))-1}`).aspect('1:1');
                        if (args[0] != 'expand') {command2.autopad()}
                        command2.output('./media/output.webp').on('end', function () {
                            const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                            client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #fps"})
                        }).run()
                    }
                }).run()
            }
            else if (((isMedia && (mimetype === 'video/mp4' && message.duration < 60 || mimetype === 'image/gif' && message.duration < 60)) || !isQuotedImage && (quotedMsg != null) && (quotedMsgObj.mimetype === 'video/mp4' && quotedMsgObj.duration < 60 || quotedMsgObj.mimetype === 'image/gif' && quotedMsgObj.duration < 60)) && args.length>2) {
                const encryptMedia = (quotedMsg != null) ? quotedMsg : message
                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                client.reply(from, 'this will take a while to process.', id)
                const filename = `./media/input.${encryptMedia.mimetype.split('/')[1]}`
                fs.writeFileSync(filename, mediaData)
                var command1 = ffmpeg(filename).fps(30).size('240x?').aspect('1:1');
                if (args[2].toLowerCase() != 'expand') {command1.autopad()}
                command1.output('./media/output.mp4').on('end', function () {
                    var command2 = ffmpeg('./media/output.mp4').size('240x?').aspect('1:1').fps(30);;
                    if (args[2].toLowerCase() == 'expand') {
                        var meme = arg.split('expand').slice(1).join(' ')
                        meme.replace(`'`,``).replace(String.fromCharCode(92),'')
                        if (!meme.includes('|')) { top = meme }
                        else { var top = meme.split('|')[0]; var bottom = meme.split('|').slice(1).join(' ') }
                    }
                    else {
                        var meme = args.slice(2).join(' ')
                        meme.replace(`'`,``).replace(String.fromCharCode(92),'')
                        if (!meme.includes('|')) { top = meme }
                        else { var top = meme.split('|')[0]; var bottom = meme.split('|').slice(1).join(' ') }

                    }
                    // break used here:
                    if (!ValidColors.includes(args[0].toLowerCase()) || !ValidColors.includes(args[1].toLowerCase())){return client.reply(from, 'one of the colors you entered is not valid.  valid input: reply to image or send image with: #' + command + ' [color] [shadow] expand[if you want to expand] top text|bottom text.', id);}
                    var canvas = createCanvas(240, 240)
                    var ctx = canvas.getContext('2d')
                    ctx.font = '28px "Secular"'
                    ctx.fillStyle = args[0];
                    ctx.strokeStyle = args[1];
                    ctx.lineWidth = 5;
                    if (top != undefined) {
                        top = top.split("").reverse().join("");
                        words = top.split(' ')
                        top2 = ''
                        var i = 0
                        while (i != words.length) {
                            if (ctx.measureText(words.slice(0, i + 1).join(' ')).width > 228) {
                                if (i == 0) {
                                    top2 += words.slice(0, 1).join(' ') + '\n'
                                    words = words.slice(i + 1)
                                }
                                else {
                                    top2 += words.slice(0, i).join(' ') + '\n'
                                    words = words.slice(i)
                                }
                                i = -1
                            }
                            i++
                        }
                        top2 += words.join(' ')
                        if (top2 != '' && !top.includes('\n')) { top = top2 }
                        for (i = 0; i < top.split('\n').length; i++) {
                            command2.videoFilters({ filter: 'drawtext', options: { fontfile:'SecularOne-Regular.ttf', text: top.split('\n')[i], fontsize: 28, fontcolor: args[0], x: 120-(ctx.measureText(top.split('\n')[i]).width / 2), y: (top.split('\n').length * 32 - 20 * (i)-32), shadowcolor: args[1].toLowerCase(), shadowx: 2, shadowy: 2 } })
                        }
                    }
                    if (bottom != undefined) {
                        bottom = bottom.split("").reverse().join("");
                        words = bottom.split(' ')
                        bottom2 = ''
                        var i = 0
                        while (i != words.length) {
                            if (ctx.measureText(words.slice(0, i + 1).join(' ')).width > 228) {
                                if (i == 0) {
                                    bottom2 += words.slice(0, 1).join(' ') + '\n'
                                    words = words.slice(i + 1)
                                }
                                else {
                                    bottom2 += words.slice(0, i).join(' ') + '\n'
                                    words = words.slice(i)
                                }
                                i = -1
                            }
                            i++
                        }
                        bottom2 += words.join(' ')
                        if (bottom2 != '' && !bottom.includes('\n')) { bottom = bottom2 }
                        for (i = 0; i < bottom.split('\n').length; i++) {
                            command2.videoFilters({ filter: 'drawtext', options: { fontfile:'SecularOne-Regular.ttf', text: bottom.split('\n')[i], fontsize: 28, fontcolor: args[0], x: 120-(ctx.measureText(bottom.split('\n')[i]).width / 2), y: (200 - 20 * (i)), shadowcolor: args[1].toLowerCase(), shadowx: 2, shadowy: 2 } })

                        }
                    }
                    command2.output('./media/output2.mp4').on('end', function () {
                        ffmpeg('./media/output2.mp4').output('./media/output2.webp').on('end', function () {
                            var stats = fs.statSync('./media/output2.webp')
                            var fileSizeInBytes2 = stats.size;
                            if (fileSizeInBytes2 < 900000) {
                                const gif = fs.readFileSync('./media/output2.webp', { encoding: "base64" })
                                client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                            }
                            else {
                                ffmpeg('./media/output2.mp4').fps(`${Math.floor(30*(900000/fileSizeInBytes2))-1}`).output('./media/output3.webp').on('end', function () {
                                    const gif = fs.readFileSync('./media/output3.webp', { encoding: "base64" })
                                    client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                                }).run()
                            }
                        }).run()
                    }).run()
                }).run()
            }
            else {
                await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #' + command + ' [color] [shadow] expand[if you want to expand] top text|bottom text.', id)
            }
                break
            }
            case 'sticker':
            case 's':
            case 'stiker':
            case 'sticker2':
            case 's2':
            case 'stiker2': {
                if (isMedia && (mimetype === 'video/mp4' && message.duration < 30 || mimetype === 'image/gif' && message.duration < 30)) {
                    const mediaData = await decryptMedia(message, uaOverride)
                    client.reply(from, 'this will take a while to process.', id)
                    const filename = `./media/input.${mimetype.split('/')[1]}`
                    var height = message.height
                    var width = message.width
                    var max = Math.max(height,width)
                    var min = Math.min(height,width)
                    console.log(min)
                    console.log(max)
                    if (args[0] == 'expand') {
                        fs.writeFileSync(filename, mediaData)
                        ffmpeg(filename).size('240x?').aspect('1:1').output('./media/output.webp').on('end', function () {
                            var stats = fs.statSync("./media/output.webp")
                            var fileSizeInBytes = stats.size;
                            if (fileSizeInBytes < 900000) {
                                const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                            }
                            else {
                                console.log(Math.floor(240 * Math.sqrt(680000 / fileSizeInBytes)))
                                console.log(Math.floor(240  *Math.sqrt(680000*min / fileSizeInBytes/max)))
                                console.log(Math.floor(240 * (1000000 / fileSizeInBytes)))
                                ffmpeg(filename).size(`${Math.floor(240 * (900000 / fileSizeInBytes))}x?`).aspect('1:1').output('./media/output.webp').on('end', function () {
                                    const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                    client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                                }).run()
                            }
                        }).run()
                    }
                    else {
                        fs.writeFileSync(filename, mediaData)
                        ffmpeg(filename).size('240x?').aspect('1:1').autopad().output('./media/output.webp').on('end', function () {
                            var stats = fs.statSync("./media/output.webp")
                            var fileSizeInBytes = stats.size;
                            if (fileSizeInBytes < 900000) {
                                const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                            }
                            else {
                                console.log(Math.floor(240 * Math.sqrt(680000 / fileSizeInBytes)))
                                console.log(Math.floor(240  *Math.sqrt(680000*min / fileSizeInBytes/max)))
                                console.log(Math.floor(240 * (1000000 / fileSizeInBytes)))
                                ffmpeg(filename).size(`${Math.floor(240  *Math.sqrt(900000*min / fileSizeInBytes/max))}x?`).aspect('1:1').autopad().output('./media/output.webp').on('end', function () {
                                    const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                    client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                                }).run()
                            }
                        }).run()
                    }
                }
                else if (!isQuotedImage && (quotedMsg != null) && (quotedMsgObj.mimetype === 'video/mp4' && quotedMsgObj.duration < 30 || quotedMsgObj.mimetype === 'image/gif' && quotedMsgObj.duration < 30)) {
                    const mediaData = await decryptMedia(quotedMsg, uaOverride)
                    client.reply(from, 'this will take a while to process.', id)
                    const filename = `./media/input.${quotedMsgObj.mimetype.split('/')[1]}`
                    var height = quotedMsgObj.height
                    var width = quotedMsgObj.width
                    var max = Math.max(height,width)
                    var min = Math.min(height,width)
                    console.log(min)
                    console.log(max)
                    if (args[0] == 'expand') {
                        fs.writeFileSync(filename, mediaData)
                        ffmpeg(filename).size('240x?').aspect('1:1').output('./media/output.webp').on('end', function () {
                            var stats = fs.statSync("./media/output.webp")
                            var fileSizeInBytes = stats.size;
                            if (fileSizeInBytes < 900000) {
                                const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                            }
                            else {
                                console.log(Math.floor(240 * Math.sqrt(680000 / fileSizeInBytes)))
                                console.log(Math.floor(240  *Math.sqrt(680000*min / fileSizeInBytes/max)))
                                console.log(Math.floor(240 * (1000000 / fileSizeInBytes)))
                                ffmpeg(filename).size(`${Math.floor(240 * (900000 / fileSizeInBytes))}x?`).aspect('1:1').output('./media/output.webp').on('end', function () {
                                    const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                    client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                                }).run()
                            }
                        }).run()
                    }
                    else {
                        fs.writeFileSync(filename, mediaData)
                        ffmpeg(filename).size('240x?').aspect('1:1').autopad().output('./media/output.webp').on('end', function () {
                            var stats = fs.statSync("./media/output.webp")
                            var fileSizeInBytes = stats.size;
                            if (fileSizeInBytes < 900000) {
                                const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                            }
                            else {
                                console.log(Math.floor(240 * Math.sqrt(680000 / fileSizeInBytes)))
                                console.log(Math.floor(240  *Math.sqrt(1000000*min / fileSizeInBytes/max)))
                                console.log(Math.floor(240 * (1000000 / fileSizeInBytes)))
                                ffmpeg(filename).size(`${Math.floor(240  *Math.sqrt(900000*min / fileSizeInBytes/max))}x?`).aspect('1:1').autopad().output('./media/output.webp').on('end', function () {
                                    const gif = fs.readFileSync('./media/output.webp', { encoding: "base64" })
                                    client.sendImageAsSticker(message.chatId, `data:image/gif;base64,${gif}`, {author: undefined, pack: "reply to video/gif with #s"})
                                }).run()
                            }
                        }).run()
                    }
                }
                else if ((isMedia || isQuotedImage) && args.length > 2) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    loadImage(mediaData).then((image) => {

                        if (args[2].toLowerCase() == 'expand') {
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 512, 512)
                            var meme = arg.split('expand').slice(1).join(' ')
                            if (!meme.includes('|')) { top = meme }
                            else { var top = meme.split('|')[0]; var bottom = meme.split('|').slice(1).join(' ') }
                        }
                        else {
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            if (image.height > image.width) {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                            }
                            else {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                            }
                            var meme = args.slice(2).join(' ')
                            if (!meme.includes('|')) { top = meme }
                            else { var top = meme.split('|')[0]; var bottom = meme.split('|').slice(1).join(' ') }

                        }
                        ctx.font = '64px "Secular"'
                        ctx.fillStyle = args[0];
                        ctx.strokeStyle = args[1];
                        ctx.lineWidth = 5;
                        if (top != undefined) {
                            words = top.split(' ')
                            top2 = ''
                            var i = 0
                            while (i != words.length) {
                                if (ctx.measureText(words.slice(0, i + 1).join(' ')).width > 500) {
                                    if (i == 0) {
                                        top2 += words.slice(0, 1).join(' ') + '\n'
                                        words = words.slice(i + 1)
                                    }
                                    else {
                                        top2 += words.slice(0, i).join(' ') + '\n'
                                        words = words.slice(i)
                                    }
                                    i = -1
                                }
                                i++
                            }
                            top2 += words.join(' ')
                            if (top2 != '' && !top.includes('\n')) { top = top2 }
                            for (i = 0; i < top.split('\n').length; i++) {
                                ctx.strokeText(top.split('\n')[i], canvas.width / 2 - (ctx.measureText(top.split('\n')[i]).width / 2), 64 + 64 * (i));
                                ctx.fillText(top.split('\n')[i], canvas.width / 2 - (ctx.measureText(top.split('\n')[i]).width / 2), 64 + 64 * (i));
                            }
                        }
                        if (bottom != undefined) {
                            words = bottom.split(' ')
                            bottom2 = ''
                            var i = 0
                            while (i != words.length) {
                                if (ctx.measureText(words.slice(0, i + 1).join(' ')).width > 450) {
                                    if (i == 0) {
                                        bottom2 += words.slice(0, 1).join(' ') + '\n'
                                        words = words.slice(i + 1)
                                    }
                                    else {
                                        bottom2 += words.slice(0, i).join(' ') + '\n'
                                        words = words.slice(i)
                                    }
                                    i = -1
                                }
                                i++
                            }
                            bottom2 += words.join(' ')
                            if (bottom2 != '' && !bottom.includes('\n')) { bottom = bottom2 }
                            for (i = 0; i < bottom.split('\n').length; i++) {
                                ctx.strokeText(bottom.split('\n')[i], canvas.width / 2 - (ctx.measureText(bottom.split('\n')[i]).width / 2), 480 - 64 * (bottom.split('\n').length - i - 1));
                                ctx.fillText(bottom.split('\n')[i], canvas.width / 2 - (ctx.measureText(bottom.split('\n')[i]).width / 2), 480 - 64 * (bottom.split('\n').length - i - 1));
                            }
                        }
                        ctx.fill();
                        ctx.stroke();
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to an image with #s"})
                    })
                }
                else if ((isMedia || isQuotedImage) && args.length === 1) {
                    if (arg != 'expand') { await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #' + command + ' [color] [outline] expand[if you want to expand] top text|bottom text', id); }
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    loadImage(mediaData).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 512, 512)
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to an image with #s"})
                    })
                }
                else if ((isMedia || isQuotedImage) && args.length === 0) {

                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, process.env.UserAgent)
                    loadImage(mediaData).then((image) => {
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        if (image.height > image.width) {
                            ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                        }
                        else {
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                        }
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to an image with #s"})
                    })
                }
                else {
                    await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #' + command + ' [color] [outline] expand[if you want to expand] top text|bottom text. Or, reply to video or gif with #' + command + ' expand[if you want to expand]', id)
                }
                break
            }
            case 'sfont':
                if ((isMedia || isQuotedImage) && args.length > 2 && parseInt(args[2])<129&& parseInt(args[2])>0) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    var fontSize = parseInt(args[2])
                    loadImage(mediaData).then((image) => {

                        if (args[3].toLowerCase() == 'expand') {
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, 512, 512)
                            var meme = arg.split('expand').slice(1).join(' ')
                            if (!meme.includes('|')) { top = meme }
                            else { var top = meme.split('|')[0]; var bottom = meme.split('|').slice(1).join(' ') }
                        }
                        else {
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            if (image.height > image.width) {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                            }
                            else {
                                ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                            }
                            var meme = args.slice(3).join(' ')
                            if (!meme.includes('|')) { top = meme }
                            else { var top = meme.split('|')[0]; var bottom = meme.split('|').slice(1).join(' ') }

                        }
                        ctx.font = `${fontSize}px "Secular"`
                        ctx.fillStyle = args[0];
                        ctx.strokeStyle = args[1];
                        ctx.lineWidth = 5;
                        if (top != undefined) {
                            words = top.split(' ')
                            top2 = ''
                            var i = 0
                            while (i != words.length) {
                                if (ctx.measureText(words.slice(0, i + 1).join(' ')).width > 500) {
                                    if (i == 0) {
                                        top2 += words.slice(0, 1).join(' ') + '\n'
                                        words = words.slice(i + 1)
                                    }
                                    else {
                                        top2 += words.slice(0, i).join(' ') + '\n'
                                        words = words.slice(i)
                                    }
                                    i = -1
                                }
                                i++
                            }
                            top2 += words.join(' ')
                            if (top2 != '' && !top.includes('\n')) { top = top2 }
                            for (i = 0; i < top.split('\n').length; i++) {
                                ctx.strokeText(top.split('\n')[i], canvas.width / 2 - (ctx.measureText(top.split('\n')[i]).width / 2), fontSize + fontSize * (i));
                                ctx.fillText(top.split('\n')[i], canvas.width / 2 - (ctx.measureText(top.split('\n')[i]).width / 2), fontSize + fontSize * (i));
                            }
                        }
                        if (bottom != undefined) {
                            words = bottom.split(' ')
                            bottom2 = ''
                            var i = 0
                            while (i != words.length) {
                                if (ctx.measureText(words.slice(0, i + 1).join(' ')).width > 450) {
                                    if (i == 0) {
                                        bottom2 += words.slice(0, 1).join(' ') + '\n'
                                        words = words.slice(i + 1)
                                    }
                                    else {
                                        bottom2 += words.slice(0, i).join(' ') + '\n'
                                        words = words.slice(i)
                                    }
                                    i = -1
                                }
                                i++
                            }
                            bottom2 += words.join(' ')
                            if (bottom2 != '' && !bottom.includes('\n')) { bottom = bottom2 }
                            for (i = 0; i < bottom.split('\n').length; i++) {
                                ctx.strokeText(bottom.split('\n')[i], canvas.width / 2 - (ctx.measureText(bottom.split('\n')[i]).width / 2), 500 - fontSize * (bottom.split('\n').length - i - 1));
                                ctx.fillText(bottom.split('\n')[i], canvas.width / 2 - (ctx.measureText(bottom.split('\n')[i]).width / 2), 500 - fontSize * (bottom.split('\n').length - i - 1));
                            }
                        }
                        ctx.fill();
                        ctx.stroke();
                        client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to an image with #s"})
                    })
                }
                else{
                    await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #' + command + ' [color] [outline] expand[if you want to expand] [font size<129] top text|bottom text.', id)
                }
                break
            case 'fakesticker':
            case 'כד':
            case 'fs': {
                var args2 = arg.split('|')
                if (args2.length > 3 && !isQuotedImage && !isMedia) {
                    var canvas = createCanvas(512, 512)
                    var ctx = canvas.getContext('2d')
                    var data3 = data2
                    var start = 38;
                    start = start + (args2[1].split('\n').length - 1) * 19
                    data3 = (data3).replace('FLAG_TIME', args2[0]).replace('FLAG_MSG', args2[1]).replace('FLAG_NAME', args2[2]).replace('FLAG_PHONE', args2.slice(3).join(' ')).replace('t: 38px', 't: ' + start.toString() + 'px');
                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.setContent(data3);
                        var base64 = await page.screenshot({ encoding: "base64" })
                        await browser.close();
                        loadImage('data:image/png;base64,' + base64).then((image) => {

                            draw(image, ctx)
                            var ne1 = trimCanvas(canvas)
                            loadImage(ne1.toDataURL()).then((image) => {
                                var canvas = createCanvas(512, 512)
                                var ctx = canvas.getContext('2d')
                                if (image.height > image.width) {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                }
                                client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #fs"})
                            })
                        })
                    })()
                }

                else if (quotedMsg != null && args.length === 0 && !isQuotedImage && !isMedia) {
                    var current = new Date();
                    var canvas = createCanvas(512, 512)
                    var ctx = canvas.getContext('2d')
                    var data3 = data2
                    var purephone = quotedMsgObj.sender.id.slice(0, -5)
                    var start = 38;
                    start = start + (quotedMsgObj.content.split('\n').length - 1) * 19
                    var phonenumber = "+" + purephone.slice(0, 3) + " " + purephone.slice(3, 5) + "-" + purephone.slice(5, 8) + "-" + purephone.slice(8, 12)
                    data3 = (data3).replace('FLAG_TIME', moment(t * 1000).format('HH:mm')).replace('FLAG_MSG', encode(quotedMsgObj.content)).replace('FLAG_NAME', encode(quotedMsgObj.sender.pushname)).replace('FLAG_PHONE', encode(phonenumber)).replace('t: 38px', 't: ' + start.toString() + 'px');
                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.setContent(data3);
                        var base64 = await page.screenshot({ encoding: "base64" })
                        await browser.close();
                        loadImage('data:image/png;base64,' + base64).then((image) => {

                            draw(image, ctx)
                            var ne1 = trimCanvas(canvas)
                            loadImage(ne1.toDataURL()).then((image) => {
                                var canvas = createCanvas(512, 512)
                                var ctx = canvas.getContext('2d')
                                if (image.height > image.width) {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                }
                                client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #fs"})
                            })
                        })
                    })()
                }
                else if (isQuotedImage && args.length === 0) {
                    if (quotedMsgObj.caption == null) {
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        var current = new Date();
                        var image = Buffer.from(mediaData.toString('base64'), 'base64');
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        var data3 = data6
                        var purephone = quotedMsgObj.sender.id.slice(0, -5)
                        var phonenumber = "+" + purephone.slice(0, 3) + " " + purephone.slice(3, 5) + "-" + purephone.slice(5, 8) + "-" + purephone.slice(8, 12)
                        var width = 330
                        var im = sizeOf(image);

                        if (im.height > im.width) {
                            var height = 330
                        }
                        else {
                            if (330 * im.height / im.width < 138) {
                                var height = 138
                            }
                            else {
                                var height = 330 * im.height / im.width
                            }
                        }
                        var prec = 'style="height: 100%;"'
                        if (height == 330) { prec = 'style="width: 100%;"' }
                        data3 = (data3).replace('FLAG_TIME', moment(t * 1000).format('HH:mm')).replace('FLAG_IMAGE', encode(imageBase64)).replace('FLAG_NAME', encode(quotedMsgObj.sender.pushname)).replace('148', height).replace('330', width).replace('FLAG_PHONE', encode(phonenumber)).replace('style="height: 100%;"', prec);

                        (async () => {
                            const browser = await puppeteer.launch();
                            const page = await browser.newPage();
                            await page.setContent(data3);
                            var base64 = await page.screenshot({ encoding: "base64" })
                            await browser.close();
                            loadImage('data:image/png;base64,' + base64).then((image) => {

                                draw(image, ctx)
                                var ne1 = trimCanvas(canvas)
                                loadImage(ne1.toDataURL()).then((image) => {
                                    var canvas = createCanvas(512, 512)
                                    var ctx = canvas.getContext('2d')
                                    if (image.height > image.width) {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                    }
                                    else {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                    }
                                    client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #fs"})
                                })
                            })
                        })()
                    }
                    else {
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        var current = new Date();
                        var image = Buffer.from(mediaData.toString('base64'), 'base64');
                        var purephone = quotedMsgObj.sender.id.slice(0, -5)
                        var phonenumber = "+" + purephone.slice(0, 3) + " " + purephone.slice(3, 5) + "-" + purephone.slice(5, 8) + "-" + purephone.slice(8, 12)

                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        var data3 = data8
                        var width = 330
                        var im = sizeOf(image);
                        if (im.height > im.width) {
                            var height = 330
                        }
                        else {
                            if (330 * im.height / im.width < 138) {
                                var height = 138
                            }
                            else {
                                var height = 330 * im.height / im.width
                            }
                        }
                        var start = 57;
                        start = start + (quotedMsgObj.caption.split('\n').length - 1) * 19
                        var prec = 'style="height: 100%;"'
                        if (height == 330) { prec = 'style="width: 100%;"' }

                        data3 = (data3).replace('FLAG_TIME', moment(t * 1000).format('HH:mm')).replace('FLAG_MSG', encode(quotedMsgObj.caption)).replace('FLAG_NAME', encode(quotedMsgObj.sender.pushname)).replace('FLAG_PHONE', encode(phonenumber)).replace('t: 57px', 't: ' + start.toString() + 'px').replace('FLAG_IMAGE', encode(imageBase64)).replace('148', height).replace('330', width).replace('style="width: 100%;"', prec);

                        (async () => {
                            const browser = await puppeteer.launch();
                            const page = await browser.newPage();
                            await page.setContent(data3);
                            var base64 = await page.screenshot({ encoding: "base64" })
                            await browser.close();
                            loadImage('data:image/png;base64,' + base64).then((image) => {

                                draw(image, ctx)
                                var ne1 = trimCanvas(canvas)
                                loadImage(ne1.toDataURL()).then((image) => {
                                    var canvas = createCanvas(512, 512)
                                    var ctx = canvas.getContext('2d')
                                    if (image.height > image.width) {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                    }
                                    else {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                    }
                                    client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #fs"})
                                })
                            })
                        })()
                    }
                }
                else if ((isQuotedImage || isMedia) && args2.length > 3) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    var current = new Date();
                    var image = Buffer.from(mediaData.toString('base64'), 'base64');
                    var canvas = createCanvas(512, 512)
                    var ctx = canvas.getContext('2d')
                    if (args2[1] == '' || args2[1] == ' ') { var data3 = data6; }
                    else { var data3 = data8 }
                    var width = 330
                    var im = sizeOf(image);
                    if (im.height > im.width) {
                        var height = 330
                    }
                    else {
                        if (330 * im.height / im.width < 138) {
                            var height = 138
                        }
                        else {
                            var height = 330 * im.height / im.width
                        }
                    }
                    var start = 57;
                    start = start + (args2[1].split('\n').length - 1) * 19
                    var prec = 'style="height: 100%;"'
                    if (height == 330) { prec = 'style="width: 100%;"' }
                    data3 = (data3).replace('FLAG_TIME', args2[0]).replace('FLAG_MSG', args2[1]).replace('FLAG_NAME', args2[2]).replace('FLAG_PHONE', args2.slice(3).join(' ')).replace('t: 57px', 't: ' + start.toString() + 'px').replace('FLAG_IMAGE', encode(imageBase64)).replace('148', height).replace('330', width).replace('style="width: 100%;"', prec);

                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.setContent(data3);
                        var base64 = await page.screenshot({ encoding: "base64" })
                        await browser.close();
                        loadImage('data:image/png;base64,' + base64).then((image) => {

                            draw(image, ctx)
                            var ne1 = trimCanvas(canvas)
                            loadImage(ne1.toDataURL()).then((image) => {
                                var canvas = createCanvas(512, 512)
                                var ctx = canvas.getContext('2d')
                                if (image.height > image.width) {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                }
                                client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #fs"})
                            })
                        })
                    })()
                }
                else {
                    await client.reply(from, 'Wrong Format. valid input: #' + command + ' [time] | [message] | [name] | [phone number]. Or, you can reply to a message: #fs', id)
                }
                break
            }
            case 'contactsticker':
            case 'cs': {
                var args22 = arg.split('|')
                args2 = []
                for (var j = 0; j < args22.length; j++) {
                    args2.push(encode(args22[j]))
                }
                if (args2.length > 2 && !isQuotedImage && !isMedia) {
                    var canvas = createCanvas(512, 512)
                    var ctx = canvas.getContext('2d')
                    var data3 = data4
                    var start = 38;
                    start = start + (args2[1].split('\n').length - 1) * 19
                    data3 = (data3).replace('FLAG_TIME', args2[0]).replace('FLAG_MSG', args2[1]).replace('FLAG_NAME', args2[2]).replace('t: 38px', 't: ' + start.toString() + 'px');
                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.setContent(data3);
                        var base64 = await page.screenshot({ encoding: "base64" })
                        await browser.close();
                        loadImage('data:image/png;base64,' + base64).then((image) => {

                            draw(image, ctx)
                            var ne1 = trimCanvas(canvas)
                            loadImage(ne1.toDataURL()).then((image) => {
                                var canvas = createCanvas(512, 512)
                                var ctx = canvas.getContext('2d')
                                if (image.height > image.width) {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                }
                                client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #cs"})
                            })
                        })
                    })()
                }

                else if (quotedMsg != null && arg != '#cs' && arg != '#cs ' && !isQuotedImage && !isMedia) {
                    var current = new Date();
                    var canvas = createCanvas(512, 512)
                    var ctx = canvas.getContext('2d')
                    var data3 = data4
                    var start = 38;
                    start = start + (quotedMsgObj.content.split('\n').length - 1) * 19
                    data3 = (data3).replace('FLAG_TIME', moment(t * 1000).format('HH:mm')).replace('FLAG_MSG', encode(encode(quotedMsgObj.content))).replace('FLAG_NAME', encode(arg)).replace('t: 38px', 't: ' + start.toString() + 'px');
                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.setContent(data3);
                        var base64 = await page.screenshot({ encoding: "base64" })
                        await browser.close();
                        loadImage('data:image/png;base64,' + base64).then((image) => {

                            draw(image, ctx)
                            var ne1 = trimCanvas(canvas)
                            loadImage(ne1.toDataURL()).then((image) => {
                                var canvas = createCanvas(512, 512)
                                var ctx = canvas.getContext('2d')
                                if (image.height > image.width) {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                }
                                client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #cs"})
                            })
                        })
                    })()
                }

                else if (isQuotedImage && args2.length === 1) {
                    if (quotedMsgObj.caption == null) {
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        var current = new Date();
                        var image = Buffer.from(mediaData.toString('base64'), 'base64');
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        var data3 = data10
                        var width = 330
                        var im = sizeOf(image);

                        if (im.height > im.width) {
                            var height = 330
                        }
                        else {
                            if (330 * im.height / im.width < 138) {
                                var height = 138
                            }
                            else {
                                var height = 330 * im.height / im.width
                            }
                        }
                        var prec = 'style="height: 100%;"'
                        if (height == 330) { prec = 'style="width: 100%;"' }
                        data3 = (data3).replace('FLAG_TIME', moment(t * 1000).format('HH:mm')).replace('FLAG_IMAGE', encode(imageBase64)).replace('FLAG_NAME', encode(arg)).replace('148', height).replace('330', width).replace('style="height: 100%;"', prec);

                        (async () => {
                            const browser = await puppeteer.launch();
                            const page = await browser.newPage();
                            await page.setContent(data3);
                            var base64 = await page.screenshot({ encoding: "base64" })
                            await browser.close();
                            loadImage('data:image/png;base64,' + base64).then((image) => {

                                draw(image, ctx)
                                var ne1 = trimCanvas(canvas)
                                loadImage(ne1.toDataURL()).then((image) => {
                                    var canvas = createCanvas(512, 512)
                                    var ctx = canvas.getContext('2d')
                                    if (image.height > image.width) {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                    }
                                    else {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                    }
                                    client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #cs"})
                                })
                            })
                        })()
                    }


                    else {
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        var current = new Date();
                        var image = Buffer.from(mediaData.toString('base64'), 'base64');
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        var data3 = data12
                        var width = 330
                        var im = sizeOf(image);
                        if (im.height > im.width) {
                            var height = 330
                        }
                        else {
                            if (330 * im.height / im.width < 138) {
                                var height = 138
                            }
                            else {
                                var height = 330 * im.height / im.width
                            }
                        }
                        var start = 57;
                        start = start + (quotedMsgObj.caption.split('\n').length - 1) * 19
                        var prec = 'style="height: 100%;"'
                        if (height == 330) { prec = 'style="width: 100%;"' }

                        data3 = (data3).replace('FLAG_TIME', moment(t * 1000).format('HH:mm')).replace('FLAG_MSG', encode(quotedMsgObj.caption)).replace('FLAG_NAME', encode(arg)).replace('t: 57px', 't: ' + start.toString() + 'px').replace('FLAG_IMAGE', encode(imageBase64)).replace('148', height).replace('330', width).replace('style="width: 100%;"', prec);

                        (async () => {
                            const browser = await puppeteer.launch();
                            const page = await browser.newPage();
                            await page.setContent(data3);
                            var base64 = await page.screenshot({ encoding: "base64" })
                            await browser.close();
                            loadImage('data:image/png;base64,' + base64).then((image) => {

                                draw(image, ctx)
                                var ne1 = trimCanvas(canvas)
                                loadImage(ne1.toDataURL()).then((image) => {
                                    var canvas = createCanvas(512, 512)
                                    var ctx = canvas.getContext('2d')
                                    if (image.height > image.width) {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                    }
                                    else {
                                        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                    }
                                    client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #cs"})
                                })
                            })
                        })()
                    }
                }

                else if ((isQuotedImage || isMedia) && args2.length > 2) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    var current = new Date();
                    var image = Buffer.from(mediaData.toString('base64'), 'base64');
                    var canvas = createCanvas(512, 512)
                    var ctx = canvas.getContext('2d')
                    if (args2[1] == '' || args2[1] == ' ') { var data3 = data10; }
                    else { var data3 = data12 }
                    var width = 330
                    var im = sizeOf(image);
                    if (im.height > im.width) {
                        var height = 330
                    }
                    else {
                        if (330 * im.height / im.width < 138) {
                            var height = 138
                        }
                        else {
                            var height = 330 * im.height / im.width
                        }
                    }
                    var start = 57;
                    start = start + (args2[1].split('\n').length - 1) * 19
                    var prec = 'style="height: 100%;"'
                    if (height == 330) { prec = 'style="width: 100%;"' }
                    data3 = (data3).replace('FLAG_TIME', args2[0]).replace('FLAG_MSG', args2[1]).replace('FLAG_NAME', args2[2]).replace('t: 57px', 't: ' + start.toString() + 'px').replace('FLAG_IMAGE', encode(imageBase64)).replace('148', height).replace('330', width).replace('style="width: 100%;"', prec);

                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                        await page.setContent(data3);
                        var base64 = await page.screenshot({ encoding: "base64" })
                        await browser.close();
                        loadImage('data:image/png;base64,' + base64).then((image) => {

                            draw(image, ctx)
                            var ne1 = trimCanvas(canvas)
                            loadImage(ne1.toDataURL()).then((image) => {
                                var canvas = createCanvas(512, 512)
                                var ctx = canvas.getContext('2d')
                                if (image.height > image.width) {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 256 - 256 * image.width / image.height, 0, 512 * image.width / image.height, 512)
                                }
                                else {
                                    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 256 - 256 * image.height / image.width, 512, 512 * image.height / image.width)
                                }
                                client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to a message with #cs"})
                            })
                        })
                    })()
                }

                else {
                    await client.reply(from, 'Wrong Format. valid input: #' + command + ' [time] | [message] | [contact name]. Or, you can reply to a message: #' + command + ' [contact name]', id)
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
                    var fuckyu = await waApi.getSimple({ i: arg, ip: '140.82.121.4' });
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
                    svg: true,      // or svg:true, or html:true
                }, async function (data) {
                    if (!data.errors) {
                        try {
                            /*
                            const png = await svgToImg.from(data.svg).toPng({ encoding: "base64" });
                            var createdUser = await client.sendImage(message.chatId, "data:image/png;base64," + png);
                            */
                            (async () => {
                                const browser = await puppeteer.launch();
                                const page = await browser.newPage();
                                await page.setContent(data.svg);
                                await page.waitForSelector('body > svg');          // wait for the selector to load
                                const element1 = await page.$('body > svg');
                                const boundingBox = await element1.boundingBox();
                                await page.setViewport({
                                    width: boundingBox.x,
                                    height: boundingBox.y,
                                    deviceScaleFactor: 8,
                                  });
                                var base64 = await element1.screenshot({ encoding: "base64", omitBackground: true, })
                                await client.sendImage(message.chatId, `data:image/png;base64,${base64}`)
                                await browser.close();
                            })()
                        } catch (error) {
                            console.error(error)
                        }
                    }
                });
                break
            case 'black':
                if (message.fromMe || isGroupAdmins) {
                    black.push(quotedMsgObj.author)
                    console.log(quotedMsgObj.author)
                }
                break
            case 'schedule':
                if (message.fromMe) {
                    if (parseInt(args[0]) && parseInt(args[1]) && args[1].length == 12) {
                        setTimeout(() => {
                            client.sendText(args[1] + '@c.us', args.slice(2).join(' '));
                        }, parseInt(args[0]) * 1000)
                        client.sendTextWithMentions(message.chatId, "sending " + args.slice(2).join(' ') + " in " + args[0] + " seconds to @" + args[1], message.id);
                    }

                    else if (parseInt(args[0])) {
                        setTimeout(() => {
                            client.reply(message.chatId, args.slice(1).join(' '), message.id);
                        }, parseInt(args[0]) * 1000)
                        client.reply(message.chatId, "sending " + args.slice(1).join(' ') + " in " + args[0] + " seconds", message.id);
                    }
                }
                else {
                    await client.reply(message.chatId, "not u its for me", message.id);
                }
                break
            case 'toggle':
                if (args.length === 0) {
                    if (message.fromMe || (isGroupAdmins && message.chatId == '972584080120-1591728975@g.us')) {
                        if (enabled.includes(true)) { enabled = [false, false, false, false, false, false, false, false] }
                        else { enabled = [true, true, true, true, true, true, true, true] }
                        await client.reply(message.chatId, "the variable looks like: " + enabled, message.id);
                    }
                    else {
                        await client.reply(message.chatId, "its only for me and mods dummy", message.id);
                    }
                } else {
                    if (message.fromMe || (isGroupAdmins && message.chatId == '972584080120-1591728975@g.us')) {
                        var allows = arg.split(',')
                        for (i = 0; i < arg.length; i++) {
                            enabled[i] = (allows[i] == '1')
                        }
                        await client.reply(message.chatId, "the variable looks like: " + enabled, message.id);
                    }
                    else {
                        await client.reply(message.chatId, "its only for me and mods dummy", message.id);
                    }
                }
                break
                case 'crash':
                        if (message.fromMe || (isGroupAdmins && message.chatId == '972584080120-1591728975@g.us')) {
                            await client.sendImageAsSticker(message.chatId, fs.readFileSync('Rajwan.txt', 'utf8'), {author: "אאררארכגכגךחדגכחגםןחםכחםדגדגשגדשגדשגדדגד", pack: "Did I just crash your phone? lmao."});
                    }
                    else {
                        await client.reply(message.chatId, "its only for me and mods dummy", message.id);
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

            case 'compile':
                compilers = {
                    "bash": "bash",
                    "c": "gcc-head-c",
                    "c#": "dotnetcore-head",
                    "coffeescript": "coffeescript-head",
                    "cpp": "gcc-head",
                    "elixir": "elixir-head",
                    "go": "go-head",
                    "java": "openjdk-head",
                    "javascript": "nodejs-head",
                    "lua": "lua-5.3.4",
                    "perl": "perl-head",
                    "php": "php-head",
                    "python": "cpython-3.8.0",
                    "ruby": "ruby-head",
                    "rust": "rust-head",
                    "sql": "sqlite-head",
                    "swift": "swift-5.0.1",
                    "typescript": "typescript-3.5.1",
                    "vim-script": "vim-head",
                }
                if (!compilers.hasOwnProperty(args[0])) { client.reply(message.chatId, 'please state the language after the command', message.id); }
                else {
                    var compiler = compilers[args[0]]
                    const options = {
                        method: 'POST',
                        url: 'https://wandbox.org/api/compile.json',
                        json: true,
                        body: {
                            "compiler": compiler,
                            "code": args.slice(1).join(' ')
                        },
                        timeout: 5000,

                        headers: { "Content-Type": "application/json" }
                    };
                    request(options, function optionalCallback(err, httpResponse, body) {
                        if (err) {
                            return console.error('upload failed:', err);
                        }
                        if (body.program_error){client.reply(message.chatId, "error: \n" + body.program_error, message.id);}
                        else if (!body.program_output){client.reply(message.chatId, "stop trying to trick the system it won't work", message.id);}
                        else if (body.program_output.includes('@someone')) {client.reply(message.chatId, "no tricks my dude" , message.id);}
                        else{client.reply(message.chatId, "output: \n" + body.program_output, message.id);}
                        
                    })
                }
                break
                /*
            case 'stt':
                if (!quotedMsg){
                    client.reply(message.chatId, "you need to reply to a message to use that.", message.id);
                }
                else{
                    const encryptMedia = quotedMsg
                    const _mimetype = quotedMsg.mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const audioBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    console.log(audioBase64)
                    
                    const config = {
                        encoding: encoding,
                        sampleRateHertz: 16000,
                        languageCode: 'iw-IL',
                      };
                      const audio = {
                        content: audioBase64,
                      };
                    
                }
                break
                */
            case 'split':
                var num = parseInt(arg)
                if (num>3 || num<1){
                    await client.reply(message.chatId, "max is 3, min is 1 bro", message.id);
                }
                else if (num && (isMedia || isQuotedImage) && args.length === 2) {
                    if (args[1] != 'expand') { await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #' + command + ' [color] [outline] expand[if you want to expand] top text|bottom text', id); }
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    loadImage(mediaData).then(async (image) => {
                        for (var j=0;j<num; j++){
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        var canvas2 = createCanvas(512, 512)
                        var ctx2 = canvas2.getContext('2d')
                        ctx.drawImage(image, 0, image.height*j/num, image.width/2, image.height/num, 0, 0, 512, 512)
                        ctx2.drawImage(image, image.width/2, image.height*j/num, image.width/2, image.height/num, 0, 0, 512, 512)
                        await client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to an image with #split"})
                        await client.sendImageAsSticker(message.chatId, canvas2.toDataURL(), {author: undefined, pack: "reply to an image with #split"})
                    }
                    })
                    }
                else if (num && (isMedia || isQuotedImage) && args.length === 1) {
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    loadImage(mediaData).then(async (image) => {
                        for (var j=0;j<num; j++){
                        var canvas = createCanvas(512, 512)
                        var ctx = canvas.getContext('2d')
                        var canvas2 = createCanvas(512, 512)
                        var ctx2 = canvas2.getContext('2d')
                        if (image.height/num > image.width/2) {
                            ctx.drawImage(image, 0, image.height*j/num, image.width/2, image.height/num, 256 - 256 * image.width/2 / (image.height/num), 0, 512 * image.width/2 / (image.height/num), 512)
                        }
                        else {
                            ctx.drawImage(image, 0, image.height*j/num, image.width/2, image.height/num, 0, 256 - 256 * (image.height/num) / (image.width/2), 512, 512 * (image.height/num) / (image.width/2))
                        }
                        if (image.height/num > image.width/2) {
                            ctx2.drawImage(image, image.width/2, image.height*j/num, image.width/2, image.height/num, 256 - 256 * image.width/2 / (image.height/num), 0, 512 * image.width/2 / (image.height/num), 512)
                        }
                        else {
                            ctx2.drawImage(image, image.width/2, image.height*j/num, image.width/2, image.height/num, 0, 256 - 256 * (image.height/num) / (image.width/2), 512, 512 * (image.height/num) / (image.width/2))
                        }
                        await client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to an image with #split"})
                        await client.sendImageAsSticker(message.chatId, canvas2.toDataURL(), {author: undefined, pack: "reply to an image with #split"})
                    }
                    })
                }
                else{
                    await client.reply(from, 'reply to an image or send an image with #split [number of splits] expand [if you want to expand] to split it into multiple stickers.', id); 
                }
                break
                case 'splithe':
                    var num = parseInt(arg)
                    if (num>3 || num<1){
                        await client.reply(message.chatId, "max is 3, min is 1 bro", message.id);
                    }
                    else if (num && (isMedia || isQuotedImage) && args.length === 2) {
                        if (args[1] != 'expand') { await client.reply(from, 'Wrong Format. valid input: reply to image or send image with: #' + command + ' [color] [outline] expand[if you want to expand] top text|bottom text', id); }
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        loadImage(mediaData).then(async (image) => {
                            for (var j=0;j<num; j++){
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            var canvas2 = createCanvas(512, 512)
                            var ctx2 = canvas2.getContext('2d')
                            ctx.drawImage(image, image.width/2, image.height*j/num, image.width/2, image.height/num, 0, 0, 512, 512)
                            ctx2.drawImage(image, 0, image.height*j/num, image.width/2, image.height/num, 0, 0, 512, 512)
                            await client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to image with #splithe"})
                            await client.sendImageAsSticker(message.chatId, canvas2.toDataURL(), {author: undefined, pack: "reply to image with #splithe"})
                        }
                        })
                        }
                    else if (num && (isMedia || isQuotedImage) && args.length === 1) {
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        loadImage(mediaData).then(async (image) => {
                            for (var j=0;j<num; j++){
                            var canvas = createCanvas(512, 512)
                            var ctx = canvas.getContext('2d')
                            var canvas2 = createCanvas(512, 512)
                            var ctx2 = canvas2.getContext('2d')
                            if (image.height/num > image.width/2) {
                                ctx.drawImage(image, image.width/2, image.height*j/num, image.width/2, image.height/num, 256 - 256 * image.width/2 / (image.height/num), 0, 512 * image.width/2 / (image.height/num), 512)
                            }
                            else {
                                ctx.drawImage(image, image.width/2, image.height*j/num, image.width/2, image.height/num, 0, 256 - 256 * (image.height/num) / (image.width/2), 512, 512 * (image.height/num) / (image.width/2))
                            }
                            if (image.height/num > image.width/2) {
                                ctx2.drawImage(image, 0, image.height*j/num, image.width/2, image.height/num, 256 - 256 * image.width/2 / (image.height/num), 0, 512 * image.width/2 / (image.height/num), 512)
                            }
                            else {
                                ctx2.drawImage(image, 0, image.height*j/num, image.width/2, image.height/num, 0, 256 - 256 * (image.height/num) / (image.width/2), 512, 512 * (image.height/num) / (image.width/2))
                            }
                            await client.sendImageAsSticker(message.chatId, canvas.toDataURL(), {author: undefined, pack: "reply to image with #splithe"})
                            await client.sendImageAsSticker(message.chatId, canvas2.toDataURL(), {author: undefined, pack: "reply to image with #splithe"})
                        }
                        })
                    }
                    else{
                        await client.reply(from, 'reply to an image or send an image with #splithe [number of splits] expand [if you want to expand] to split it into multiple stickers.', id); 
                    }
                    break
            default:
                console.log(color('[ERROR]', 'red'), color(moment(t * 1000).format('DD/MM/YY HH:mm:ss'), 'yellow'), 'Unregistered Command from', color(pushname))
                break
        }
    } catch (err) {
        console.error(color(err, 'red'))
    }
}
