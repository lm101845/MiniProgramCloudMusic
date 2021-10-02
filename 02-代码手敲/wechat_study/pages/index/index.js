// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:'初始化测试数据',
    userInfo:{},   //用来存放用户的基本信息
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },

  //事件回调函数和data和生命周期函数平级。
  handleParent(){
    console.log('Parent');
  },
  handleChild(){
    console.log('Child');
  },
  //跳转至logs页面的方法
  // navigateTo的特点是，有一个后退箭头，我们点击它就可以回退
  // redirectTo的特点是：没有后退箭头，只有一个小房子
  toLogs(){
    wx.navigateTo({
    // wx.redirectTo({
    // wx.reLaunch({
      // url: 'pages/logs/logs',
      // url写法不会，路由跳转中前面必须加根路径【/】！！！
      url: '/pages/logs/logs',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log('onLoad--监听页面加载,它是最先执行的');
      // debugger; 
      //修改msg的状态数据,语法：this.setData
      //首先要知道this是谁
      // console.log(this);  //this代表当前页面的实例对象
      // 注意：this身上并没有msg属性，说明小程序并不像Vue一样实现了数据的劫持和代理
      // 在小程序中我们要拿到data，必须要先拿到data,再通过data拿到msg
      // console.log('这样写是拿不到msg数据的',this.msg)
      // console.log('这样写才能拿到msg 数据',this.data.msg);
      // 写法1：
      // this.setData({
      //   msg:'修改之后的测试数据'
      //   //在onload中修改状态数据是【同步】进行修改的
      //   // this.setData和React中的this.setState特别像，只不过React中的非自身的钩子函数中进行数据修改是【同步】的，其他都是异步的
      // })
      // console.log('这下拿到的就是修改之后的msg了',this.data.msg);

      //写法2：
      // setTimeout(() => {
      //     //这个就是小程序中的非自身的钩子函数中进行数据修改了——经过测试，它也是同步的
      //     this.setData({
      //       msg:'这个是【延迟】修改之后的msg了'
      //     })
      //     // console.log('这下拿到的就是延迟修改之后的msg了',this.data.msg)
      // }, 2000);

      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
    },

    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },
    getUserInfo(e) {
      // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    },


   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow--监听页面显示');
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady--监听页面初次渲染完成');
  },

 

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide--监听页面隐藏');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload--监听页面卸载');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})