import PubSub from 'pubsub-js'; //我们是发布方
import moment from 'moment';
import request from '../../utils/request.js';
//获取全局实例
const appInstance = getApp();

Page({
    /**
     * 页面的初始数据
     */
    data: {
        isPlay: false, //音乐是否播放
        song: {}, //歌曲信息
        musicId: "", //歌曲id
        // backgroundAudioManager:{} //音乐播放器
        musicLink: "", //音乐链接
        currentTime: "0.00", //当前播放时间
        durationTime: "00:00", //音乐总时长
        currentWidth: 0, //当前进度条宽度
    },

    /**
     * 生命周期函数--监听页面加载——只执行一次
     */
    onLoad: function(options) {
        // console.log(options.song, 'options.song');
        //注：你传过来的不是一个完整的对象
        //原生小程序中路由传参，对参数的长度有限制，最大不能超过100个字符，超过长度会给你截掉一部分
        //options是专门用来接收路由跳转的query参数的
        // console.log(typeof options.song, 'typeof options.song');
        // console.log(JSON.parse(options.song), 'JSON.parse(options.song)');
        let musicId = options.musicId;
        this.setData({
                musicId
            })
            // console.log(musicId, 'musicId');
            // console.log(options, 'options');
            //获取音乐详情
        this.getMusicInfo(musicId)

        /***
         * 如果用户操纵系统的控制音乐播放/暂停的按钮，页面不知道，导致页面显示是否播放的状态和真实的音乐播放状态不一致
         * 解决方案：
         *  1.通过控制音频的实例去监视音乐播放/暂停
         */

        //判断当前页面音乐是否在播放
        if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === musicId) {
            //修改当前页面的音乐播放状态为true
            this.setData({
                isPlay: true
            })
        }
        //创建控制音乐播放的实例
        this.backgroundAudioManager = wx.getBackgroundAudioManager();
        //监视音乐播放/暂停
        this.backgroundAudioManager.onPlay(() => {
            // console.log('play');
            // this.setData({
            //     isPlay: true
            // })
            this.changePlayStatus(true)
                //修改全局播放的状态
                // appInstance.globalData.isMusicPlay = true;
            appInstance.globalData.musicId = musicId;

        })
        this.backgroundAudioManager.onPause(() => {
            // console.log('pause');
            // this.setData({
            //     isPlay: false
            // })
            this.changePlayStatus(false)
                //修改全局播放的状态
                // appInstance.globalData.isMusicPlay = false;
        })
        this.backgroundAudioManager.onStop(() => {
            // this.setData({
            //     isPlay: false
            // })
            this.changePlayStatus(false)
                //修改全局播放的状态
                // appInstance.globalData.isMusicPlay = false;
        })

        //监听音乐播放自然结束
        //TODO:不行啊，结束后没有自动播放下一首
        this.backgroundAudioManager.onEnded(() => {
            //自动切换下一首音乐，并且自动播放
            PubSub.publish('switchType', 'next');

            //将实时进度条的长度还原成0
            this.setData({
                currentWidth: 0,
                currentTime: "0.00"
                //这样更加保险
            })
        })

        //监听音乐播放进度
        this.backgroundAudioManager.onTimeUpdate(() => {
            // console.log('总时长', this.backgroundAudioManager.duration);
            // console.log('实时时间', this.backgroundAudioManager.currentTime);
            //格式化实时的播放时间
            let currentTime = moment(this.backgroundAudioManager.currentTime * 1000).format('mm:ss');
            let currentWidth = (this.backgroundAudioManager.currentTime / this.backgroundAudioManager.duration) * 450;
            this.setData({
                currentTime,
                currentWidth
            })
        })

        // //订阅来自recommendSong页面发布的musicId消息
        // PubSub.subscribe("musicId", (msg, musicId) => {
        //     console.log(msg, musicId);
        //     //取消订阅(订阅完拿到数据后就取消订阅，因为已经没有利用价值了)
        //     PubSub.unsubscribe("musicId");
        // })


    },

    //修改播放状态的功能函数
    changePlayStatus(isPlay) {
        this.setData({
                isPlay
            })
            //修改全局播放的状态
        appInstance.globalData.isMusicPlay = isPlay;
    },
    //获取音乐详情的功能函数
    async getMusicInfo(musicId) {
        let songData = await request('/song/detail', { ids: musicId });
        let durationTime = moment(songData.songs[0].dt).format('mm:ss')
        this.setData({
                song: songData.songs[0],
                durationTime
            })
            //动态修改窗口的标题
        wx.setNavigationBarTitle({
            title: this.data.song.name
        })
    },

    handleMusicPlay() {
        let { musicId, musicLink } = this.data
            // 点击播放或暂停的回调
        let isPlay = !this.data.isPlay;
        //修改是否播放的状态——现在已经不需要了
        // this.setData({
        //         isPlay
        //     })
        //除了要修改状态以外，还要告诉功能函数你是要播放还是暂停
        this.musicControl(isPlay, musicId, musicLink);
    },
    //控制音乐播放/暂停的功能函数
    async musicControl(isPlay, musicId, musicLink) {
        // let backgroundAudioManager = wx.getBackgroundAudioManager();
        //我们应该更早一点创建这个实例
        if (isPlay) {
            //获取音乐的播放链接
            if (!musicLink) {
                let musicLinkData = await request('/song/url', { id: musicId });
                musicLink = musicLinkData.data[0].url;
                this.setData({
                    musicLink
                })
            }
            //音乐播放
            //创建控制音乐播放的实例对象
            // let backgroundAudioManager = wx.getBackgroundAudioManager();
            // backgroundAudioManager.src = '音乐链接'
            this.backgroundAudioManager.src = musicLink
            this.backgroundAudioManager.title = this.data.song.name;
        } else {
            //暂停音乐
            this.backgroundAudioManager.pause()
                //注意：我是用let定义的变量，只能在if那个代码块中使用，else代码块它不认识
                //所以我们应该把BackgroundAudioManager这个变量提到if的外面去
        }
    },

    //点击切歌的回调
    handleSwitch(event) {
        //获取切歌的类型
        let type = event.currentTarget.id

        //我要切歌的时候先关闭当前播放的音乐
        this.backgroundAudioManager.stop();

        // console.log(type);
        //订阅来自recommendSong页面发布的musicId消息
        PubSub.subscribe("musicId", (msg, musicId) => {
                // console.log(msg, musicId);
                //获取音乐详情信息
                this.getMusicInfo(musicId);
                //自动播放当前音乐
                this.musicControl(true, musicId);
                //取消订阅(订阅完拿到数据后就取消订阅，因为已经没有利用价值了)
                PubSub.unsubscribe("musicId");
            })
            //发布消息数据给recommendSong页面
        PubSub.publish('switchType', type)
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})