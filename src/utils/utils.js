const qmsg = require("../config/qmsg.json")
let vacation = require("../config/vacation.json")
const axios = require("axios");
// 处理控制台的输入函数
const parseEnvArgv = (argv) => {
    // 检查是否提供了命令行参数
    if (argv.length < 3) {
        console.log('缺少必要参数')
        process.exit(0);
    }

    // 初始化配置从qmsg中读取qmsg配置文件
    const result = {
        qmsgKey: qmsg.qmsgKey, qmsgTo: qmsg.qmsgTo
    };

    // 取出所有参数的键值对
    for (let i = 2; i < argv.length; i++) {
        const [key, value] = argv[i].split("=");
        // 处理布尔值的转换
        result[key] = value === "true" ? true : value === "false" ? false : value;
    }
    // 处理账号密码转换为数组
    let accounts = result['accounts']
    if (null != accounts) {
        let accountsTemp = []
        accounts.split(',').forEach((account, index) => {
            if (index % 2 === 0) {
                accountsTemp.push({
                    username: account
                })
            } else {
                accountsTemp[accountsTemp.length - 1].password = account
            }
        })
        result.accounts = accountsTemp
    }
    //  对控制台必要参数校验  不可缺少一组账号和签到模式
    if (null != result.accounts && 0 !== result.accounts.length && null != result.mode) {
        // 默认不重签
        result.reSign = result.reSign != null ? result.reSign : false;
        // 为account赋值签到参数
        result.accounts.forEach(account => {
            account.reSign = result.reSign
            account.sign = true
        })
        delete result.reSign;
        return result;
    } else {
        console.log('缺少必要参数，或参数不合法')
        process.exit(0);
    }
};


// 封装延迟函数
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// 检查是否需要执行函数
async function needExecute(date) {
    // 格式化字符串 "yy-dd"
    let key = date.toISOString().split('T')[0].slice(5)
    // 检查数据中是否有对应的假期或者工作日
    // 通过接口获取节假日数据 获取失败使用本地的数据
    const res = await axios.get("http://timor.tech/api/holiday/year/" + date.getUTCFullYear() + "/", {
        headers: {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
        }
    }).catch(e => {
        console.log(e.message)
    })
    let fetchData = res?.data?.holiday
    // 如果没拿到数据就用本地的数据
    vacation = fetchData ? fetchData : vacation
    let data = vacation[key]?.holiday
    if (data != null) {
        // 有值 是假期就不需要执行，取反
        return !data
    } else {
        // 无值 周六周日返回false 一到五返回ture
        return date.getDay() > 0 && date.getDay() < 6
    }
}

// 生成随机延迟时间的函数（0-20分钟，转换为毫秒）
function getRandomDelay() {
    return Math.floor(Math.random() * 30 * 60 * 1000); // 0-20分钟的毫秒数
    // return 0;
}

module.exports = {parseEnvArgv, getRandomDelay, needExecute, delay}