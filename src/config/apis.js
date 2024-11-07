const apis = {
    login: "login/login.action",
    accountInfo: "account/LoadAccountInfo.action",
    projects: "student/progress/ProjectList.action",
    tasks: "student/progress/ProjectProgressInfo.action", //周报
    weekBlogStatus: "student/blog/Plan!getDefault.action",
    weekReportsDate: "student/blog/LoadBlogDate!weekYear.action",
    weekReports: "student/blog/LoadBlogDate!week.action",
    weelBlogSave: "student/blog/Blog!save.action",
    weelBlogSubmit: "student/blog/Blog!getSubmitData.action", //签到
    clockDefault: "student/clock/GetPlan!getDefault.action", //planId => traineeId
    clockDetail: "student/clock/GetPlan!detail.action", //traineeId => postInfo
    clock: "student/clock/Post!autoClock.action", //首次签到
    clockNew: "student/clock/PostNew.action", //重新签到或签退
    // clockUpdate: "student/clock/PostNew!updateClock.action", //更新最近的签到/签退记录，已有签退记录时无法更新之前的签到记录
    clockUpdate: "student/clock/Post!updateClock.action", // reClock
    // clockNew: "student/clock/Post!autoClock.action", //临时接口
    // clockUpdate: "student/clock/postTemporary!updateClock.action", // reClock 临时接口
    //上传
    uploadInfo: "uploadfile/commonPostPolicy.action", //oss info
    uploadFile: "https://xyb001.oss-cn-hangzhou.aliyuncs.com/",
    duration: "behavior/Duration.action",
    ip: "behavior/Duration!getIp.action", // 地图api
    map: "https://restapi.amap.com/v3/geocode/regeo",
};
module.exports = {apis};