import Mock from "mockjs";

Mock.mock("/api/setting", "get", {
  code:0,
  msg:"",
  data: {
  avatar: "http://www.duyiedu.com/source/img/logo.png", //个人空间的头像
  siteTitle: "我的个人空间", //个人空间的标题
  github: "https://github.com/DuYi-Edu", //空间主人的github地址
  qq: "3263023350", //空间主人的qq号
  qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png", //空间主人的qq二维码
  weixin: "yh777bao", //空间主人的微信
  weixinQrCode: "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png", //空间主人的微信二维码
  mail: "duyi@gmail.com", //空间主人的邮箱
  icp: "黑ICP备17001719号", //空间主人的备案号
  githubName: "DuYi-Edu", //空间主人的github名称
  favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f", //网站的favicon地址
  }
})