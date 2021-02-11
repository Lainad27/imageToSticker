<div align="center">
 
# Whatsapp Bot - sticker creator

</div>



## Features

| Sticker Creator |                Feature           |
| :-----------: | :--------------------------------: |
|       ✅       | Send Image of Message as Sticker |
|       ✅       | Sticker Meme Maker               |
|       ✅       | Animated Sticker Meme Maker      |

| Other         |                Feature           |
| :-----------: | :--------------------------------: |
|       ✅       | Compiler                         |
|       ✅       | Mathjax                          |
|       ✅       | Wolfram Alpha                    |

## Getting Started

This project require NodeJS v12.

### Install
Clone this project

```bash
> git clone https://github.com/Lainad27/imageToSticker.git
> cd imageToSticker
```

Install the dependencies:

```bash
> npm install
```

if an error does happen, do 

```bash
> npm install sharp
```

### Usage
1. run the Whatsapp bot

```bash
> npm start
```

Also, to use the Wolfram alpha API go to https://developer.wolframalpha.com/portal/myapps/ and fill the api key (searck KEY) in \handler\message\index.js .

after running it you need to scan the qr

## Troubleshooting
Make sure all the necessary dependencies are installed: https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md

Fix Stuck on linux, install google chrome stable: 
```bash
> wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
> sudo apt install ./google-chrome-stable_current_amd64.deb
```
