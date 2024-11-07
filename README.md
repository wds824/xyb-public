# XYB 自动签到签退

支持的功能：

- 随机延迟签到签退
- 智能跳过节假日
- Qmsg消息推送

执行方式：

1. 安装node.js环境
2. 修改Qmsg推送配置 src/config/qmsg.js
3. 安装依赖 `npm i`
4. 执行命令 并补全参数 `node src/index.js  mode=? reSign=? accounts=?`

**参数说明：**

- mode: 取值in或者out，签到或者签退
- reSign: 取值true或者false 如果已经签到是否重新签到
- accounts: 账号密码中间用英文逗号隔开，比如`accounts=account1,password1,account2,password2`

​	

**如何配置linux服务器自动执行任务：**

> 使用Linux Cron服务定时任务，实现自动签到

1. 上传文件到服务器
2. 修改QMSG，安装node，安装依赖
3. 配置cron

```bash
crontab -e # 编辑定时任务列表

# 使用示例 注意替换账号配置 这里使用了打包后的文件，如果你没有打包请修改，或者打包
4 30 7 * * * /usr/local/node14/bin/node /root/tool/xyb/dist/xyb.js mode=in reSign=false accounts=? >> /root/tool/xyb/logs/log.txt
5 10 18 * * * /usr/local/node14/bin/node /root/tool/xyb/dist/xyb.js mode=out reSign=true accounts=? >> /root/tool/xyb/logs/log.txt
```



**谢鸣：**

二开源码: https://github.com/CncCbz/xybSign

节假日接口(vacation.json): https://timor.tech/api/holiday/

Qmsg: https://qmsg.zendee.cn/