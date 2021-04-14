const { create, Client } = require('@open-wa/wa-automate')
const { color, messageLog } = require('./utils')
const msgHandler = require('./handler/message')

const start = (client = new Client()) => {
    console.log('[DEV]', color('Red Emperor', 'yellow'))
    console.log('[CLIENT] CLIENT Started!')

    // Message log for analytic

    // Force it to keep the current session
    client.onStateChanged((state) => {
        console.log('[Client State]', state)
        if (state === 'CONFLICT' || state === 'DISCONNECTED') client.forceRefocus()
    })

    // listening on message
    client.onMessage((message) => {
        // Cut message Cache if cache more than 3K
        client.getAmountOfLoadedMessages().then((msg) => (msg >= 3000) && client.cutMsgCache())
        // Message Handler
        msgHandler(client, message)
    })

    // listen group invitation
   client.onAddedToGroup(({ groupMetadata: { id }, contact: { name } }) =>
    /*
        client.getGroupMembersId(id)
            .then((ids) => {
                console.log('[CLIENT]', color(`Invited to Group. [ ${name} => ${ids.length}]`, 'yellow'))
                // conditions if the group members are less than 10 then the bot will leave the group
                if (ids.length <= 10) {
                    client.sendText(id, 'Sorry, the minimum group member is 10 user to use this bot. Bye~').then(() => client.leaveGroup(id))
                } else {
                    client.sendText(id, `Hello group members *${name}*, thank you for inviting this bot, to see the bot menu send *#menu*`)
                }
                
            })*/
            client.sendText(id, `היי, זה הבוט לאינד לוואצאפ.
            פקודות:
            • #מהירות בדקו את מהירות הבוט⏱️
            • #עזרה  פקודה זוℹ️
            • #סטטוס לקבלת סטטוס הבוט❓
            • הגיבו לתמונה #ס כדי להכין סטיקר שלה 📷
            • הגיבו לגיף/וידאו #מ כדי להכין סטיקר שלו🎞️
            • הגיבו להודעת טקסט #סמ כדי להכין סטיקר שלה📜
            • הגיבו לטקסט #סק [שם] כדי להכין סטיקר של ההודעה מהשם שכתבתם📲
            • #קורונה [שם עיר] לסטטוס הקורונה שם🦠 (דוגמא: #קורונה תל אביב)
            פקודות באנגלית:
            
            • #שועל [ביטוי מתמטי] לwolfram alpha (דוגמא: #שועל x²+3x-7=0) 🧮
            • #מט [ביטוי מתמטי] להרצת mathjax (#מט \\sum n = \\frac{n*(n+1)}{2}) 📊
            • #קמפל [שפה] [קוד]- שפה וקוד באנגלית (#קמפל python print('hey')) 🖥️
            
            
            • #עזרה [שם פקודה] לעוד מידע עליה (דוגמא: #עזרה סק)`))

    // listen paricipant event on group (wellcome message)
    client.onGlobalParicipantsChanged(async (event) => {
        // const host = await client.getHostNumber() + '@c.us'
        // if (event.action === 'add' && event.who !== host) client.sendTextWithMentions(event.chat, `Hello, Welcome to the group @${event.who.replace('@c.us', '')} \n\nHave fun with us✨`)
    })

    client.onIncomingCall((callData) => {
        // client.contactBlock(callData.peerJid)
    })
    // listen paricipant event on group (wellcome message)
    client.onGlobalParicipantsChanged(async (event) => {
        // const host = await client.getHostNumber() + '@c.us'
        // if (event.action === 'add' && event.who !== host) client.sendTextWithMentions(event.chat, `Hello, Welcome to the group @${event.who.replace('@c.us', '')} \n\nHave fun with us✨`)
    })

    client.onIncomingCall((callData) => {
        // client.contactBlock(callData.peerJid)
    })
}

const options = {
    sessionId: 'Imperial',
    headless: true,
    qrTimeout: 0,
    authTimeout: 0,
    restartOnCrash: start,
    cacheEnabled: false,
    blockCrashLogs: true,
    deleteSessionDataOnLogout: true,
    useChrome: true,
	cacheEnabled:false,
    killProcessOnBrowserClose: true,
    throwErrorOnTosBlock: false,
    viewport: { height: 1000, width: 1920 },
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
}

create(options)
    .then((client) => start(client))
    .catch((err) => new Error(err))
