const {sendMsg} = require("./utils/qmsg.js")
const md5 = require("blueimp-md5")
const modeMap = {in: "签到", out: "签退"}
const xybSign = require('./utils/xybSign.js')
const {parseEnvArgv, getRandomDelay, needExecute, delay} = require('./utils/utils.js')
let config = {}

async function run() {
    // 读取控制台参数
    let processConfig = parseEnvArgv(process.argv);
    processConfig.modeCN = modeMap[processConfig.mode];
    config = processConfig;
    // 判断周末和节假日跳过执行
    let date = new Date();
    // check day
    let executeFlag = await needExecute(date);
    let formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    let results = [`- XYB - ${formattedDate}`];
    if (!executeFlag) {
        console.log(`- XYB - ${formattedDate}`)
        results.push("脚本今天休息，望周知。")
        await sendMsg(results.join("\n"), config);
        return
    }
    // 使用 map 启动所有任务并行执行
    const tasks = config.accounts.map(async (account) => {
        // 随机延迟 0-20 分钟
        let delayTime = getRandomDelay();
        console.log(`====当前账号(${account.username})将在 ${Math.floor(delayTime / 60000)} 分钟后执行====`);
        results.push(`账号(${account.username.substr(account.username.length - 4)})推迟 ${Math.floor(delayTime / 60000)} 分钟后执行`)
        await delay(delayTime);
        console.log(`====当前账号(${account.username})开始执行====`);
        account.mode = config.mode;
        account.modeCN = config.modeCN;
        account.password = md5(account.password);
        const result = await xybSign(account);
        console.log(`====当前账号(${account.username})执行结束====`);
        return result;
    });
    // 等待所有任务完成
    results.push(...await Promise.all(tasks));
    console.log("====所有账号执行结束====");
    console.log(results.join("\n"));
    if (config.qmsgKey) {
        await sendMsg(results.join("\n"), config);
    }
}

// 启动入口
run();