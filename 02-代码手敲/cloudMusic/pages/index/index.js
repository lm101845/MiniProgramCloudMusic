/*
 * @Author: liming
 * @Date: 2021-10-05 17:10:07
 * @LastEditTime: 2021-12-15 22:33:25
 * @FilePath: \cloudMusic\pages\index\index.js
 */
// pages/index/index.js

import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //要将从接口拿到的数据显示到页面，需要你在这里初始化一下数据
    //初始化轮播图数据 
    bannerList: [],
    //初始化推荐歌单数据
    recommendList: [],
    //初始化排行榜数据
    topList: [], 
  },

  /**
   * 生命周期函数--监听页面加载
   * onLoad和onReady里面都可以发送请求，它们两个也只执行一次
   * 这里我们选择在 onLoad 里面发送请求
   */
  onLoad: async function (options) {
    // wx.request({
    //   // url: '/banner',
    //   url: 'http://localhost:3000/banner',
    //   // 继续报错：http://localhost:3000 不在以下 request 合法域名列表中，
    //   // 在小程序里面，你要发请求的话，服务器域名必须要备案，必须要在合法域名列表里面进行注册
    //   //url是开发者服务器接口地址
    //   data: {
    //     //data是求的参数，这里我们这里统一用对象
    //     type: 2
    //     //2表示iphone
    //   },
    //   success: res => {
    //     console.log('请求成功',res);
    //   },
    //   fail: err => {
    //     console.log('请求失败', err);
    //     //因为我们这里不是完整的url，只写了/banner，所以这里会报错
    //     //如果我们在H5(浏览器)里面发，是不会有这个问题的，因为浏览器检测到你前面没有写，它会帮你补齐的，而在小程序里面，它不会帮你补齐
    //   }
    // })

    //这里我们用自己封装的方式去发送请求
    // request('http://localhost:3000/banner', {type:2})
    // let result = await request('http://localhost:3000/banner', { type: 2 })
    let bannerListData = await request('/banner', { type: 2 })
    // 因为每次接下来请求的都是固定的服务器，每次都是http://localhost:3000，我们每次都写这个太麻烦
    this.setData({
      bannerList: bannerListData.banners
    })


    //获取推荐歌单数据
    let recommendListData = await request('/personalized', { limit: 10 })
    this.setData({
      recommendList: recommendListData.result
    })
    // console.log(this);
    // console.log(this.data);
    // console.log(this.data.recommendList);

    // 获取排行榜数据
    /**
     * 需求分析：
     * 1.需要根据idx的值获取对应的数据
     * 2.idx的取值范围是0-20，而我们只需要0-4
     * 3.所以我们需要发送5次请求
     * 前++和后++的区别：
     *  1.先看到运算符还是值
     *  2.如果先看到的是运算符，就先运算再赋值
     *  3.如果先看到的是值，就先赋值再运算
     */
    let index = 0;
    let resultArr = [];
    while (index < 5) { 
      index++;
      let topListData = await request('/top/list', { idx: index++ });
        // index++ 先看到的是值，所以第一把index进来，它的值就是0
      let topListItem = { name: topListData.playlist.name, tracks: topListData.playlist.tracks.slice(0, 3) };
      // splice(会修改原数组，可以对指定的数组进行增删改) slice(不会修改原数组，我们用slice)
      resultArr.push(topListItem);

      // 为解决白屏问题，我们把更新数据的代码放到这里
      // 这样不需要等待五次请求全部结束才更新，用户体验较好，但是渲染次数会多一些。
      this.setData({
        topList: resultArr
      })
    }

    // 我们在while循环里面发了5次请求，只有5次请求全部结束我们最后才更新了数组，这样会有白屏的问题

    //在循环体外面更新topList的状态值
    // 放在此处更新,会导致发送请求的过程中,页面长时间白屏,用户体验变差。
    // this.setData({
    //   topList: resultArr
    // })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
