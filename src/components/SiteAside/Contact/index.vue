<template>
  <ul class="contact-container">
    <li>
      <a >
        <div class="icon">
          <Icon type="github" />
        </div>
        <span>cfbstrong</span>
      </a>
    </li>
    <li>
      <a >
        <div class="icon weixin">
          <Icon type="weixin" />
        </div>
        <span>cfb661</span>
      </a>
      <div class="pop">
        <img src="@/assets/weixin.jpg" alt="">
      </div>
    </li>
    <li>
      <a href="tencent://message/?Menu=yes&uin=1563540102&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45">
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span>1563540102</span>
      </a>
      <div class="pop">
        <img src="@/assets/qq.jpg" alt="">
      </div>
    </li>
    <li>
      <a href="mailto:1563540102@qq.com">
        <div class="icon">
          <Icon type="mail" />
        </div>
        <span>1563540102@qq.com</span>
      </a>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
};
</script>

<style lang="less" scoped>
@import url("~@/styles/var.less");
.contact-container {
  padding: 20px; //清除ul自带样式
  margin: 0; //清除ul自带样式
  list-style: none; //清除ul自带样式
  color: @gray;
  @itemHeight:30px;
  li {
    height: @itemHeight;
    line-height: @itemHeight;
    margin: 14px 0;
    cursor: pointer;
    position: relative;
    &:hover{
        .pop{
            transform: scaleY(1);
        }
    }
  }
  a {
    display: flex;
    align-items: center;
    span{
      font-size: 14px;
    }
  }
  .icon {
    font-size: 26px;
    width:36px;
    &.weixin{
        font-size: 30px;
        text-indent: -2px;
    }
  }
  .pop{
    position:absolute;
    left:0;
    bottom:@itemHeight + 5px;
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 10px;
    transform: scaleY(0);
    transition: .3s;
    transform-origin: center bottom;
    &::after{
        content: '';
        display: block;
        position:absolute;
        left:50%;
        transform: translateX(-50%);
        bottom:-15px;
        width: 0;
        height: 0;
        border: 8px solid transparent;
        border-top-color:#fff ;
    }
    img{
        width: 150px;
        height: 150px;
    }
  }

}
</style>