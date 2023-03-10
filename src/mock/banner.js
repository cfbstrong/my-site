import Mock from "mockjs";

Mock.mock("/api/banner", "get", {
    //响应格式参考接口文档
    "code": 0,
    "msg": "",
    "data":
    [
        {
          id: "1",
          midImg: "http://mdrs.yuanjin.tech/img/20201031141507.jpg",
          bigImg: "http://mdrs.yuanjin.tech/img/20201031141350.jpg",
          title: "热爱至上",
          description: "喜欢就坚定的去做，热爱才是救赎最好的药",
        },
        {
          id: "2",
          midImg: "http://mdrs.yuanjin.tech/img/20201031205550.jpg",
          bigImg: "http://mdrs.yuanjin.tech/img/20201031205551.jpg",
          title: "勇往直前",
          description: "记得向前看，别烂在过去和梦里",
        },
        {
          id: "3",
          midImg: "http://mdrs.yuanjin.tech/img/20201031204401.jpg",
          bigImg: "http://mdrs.yuanjin.tech/img/20201031204403.jpg",
          title: "勤学多思",
          description: "少抱怨，多思考，未来才会更美好",
        },
      ]
})