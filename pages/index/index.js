
var dataIndex = 0;
let t_index = -1;
//最大拖拽距离
var dragright = 198;
//touchstart点
var startX = 0,
  startY = 0;
//touchmove差值
var distanceX = 0,
  distanceY = 0;
//touchstart指向的item的index
var index = 0;
//记录touchmove的方向
var dir = "";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    wineList: [{ "groupIndex": 0 }, {  "groupIndex": 0 }],
    tag: 0,
  },
  onShow() {
    this.setData({
      tag: 0
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //点击
  itemClick: function (e) {
    if (this.endTime - this.startTime < 350) {
      var tag = e.currentTarget.id
      const index = e.currentTarget.dataset.index;
      console.log('tag======' + index)
      if (!(this.data.tag >= 997 && this.data.tag <= 999)) {
      
        console.log('========点击=========')
      }
      this.setData({
        tag: 0
      })
    }
  },
  //上架
  onSale: function (e) {
    this.setData({
      tag: e.currentTarget.id
    })
    console.log('========上架=========')
  },
  //下架
  unSale: function (e) {
    this.setData({
      tag: e.currentTarget.id
    })
    console.log('========下架=========')
  },
  //删除
  deleteWine: function (e) {
    this.setData({
      tag: e.currentTarget.id
    })
    console.log('========删除=========')
  },
  //touchstart
  startCardItem: function (e) {
    this.startTime = e.timeStamp;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    var c = e.currentTarget.dataset.id;
    dataIndex = e.currentTarget.dataset.id;
    // this.closeSwipIndex()

    var wineList = this.data.wineList;
    wineList[dataIndex].transition = "none";
    console.log('startCardItem=====' + JSON.stringify(wineList[dataIndex].transition));
    this.setData(
      {
        wineList: wineList
      });
  },
  //touchmove
  moveCardItem: function (e) {
    distanceX = e.touches[0].clientX - startX;
    distanceY = e.touches[0].clientY - startY;
    // //////console.dir(distanceX + "--" + distanceY);
    if ((Math.abs(distanceY) - 2) >= Math.abs(distanceX)) {
      // ////////console.log("%c%s", "border-bottom:1px solid green;", "识别为竖直拖拽");
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      return;
    } else {
      if (distanceX < 0) {
        // ////////console.log("%c%s", "color:#d46e17;", "左滑动")
        dir = "left";
        var opt = {
          x: distanceX,
          y: distanceY,
          dir: "left"
        }
        this.dragCardItem(opt)
      } else if (distanceX > 0) {
        // ////////console.log("%c%s", "color:#9e25dc", "右滑动")
        dir = "right";
        var opt = {
          x: distanceX,
          y: distanceY,
          dir: "right"
        }
        this.dragCardItem(opt)
      } else if (distanceX == 0) {
        // ////////console.log("%c%s", "color:25dc55", "未滑动")
      }
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      return;
    }
  },
  //drag
  dragCardItem: function (e) {
    var cardItem = this.data.wineList[dataIndex];
    var wineList = this.data.wineList;
    console.log("dragCardItem====" + dataIndex)
    if (e.dir == "right" && cardItem.right <= 1) {

      wineList[dataIndex].right = 0;
      console.log("到右边了====" + JSON.stringify(wineList[dataIndex]));
      this.setData(
        {
          wineList: wineList
        });
      this.setData({
        tag: 0
      })
      return;
    } else if (e.dir == "left" && cardItem.right >= dragright) {

      wineList[dataIndex].right = dragright;
      console.log("到左边了" + JSON.stringify(wineList[dataIndex]));
      this.setData(
        {
          wineList: wineList
        });

      return;
    }
    wineList[dataIndex].right = (cardItem.right -= e.x);
    console.log("滑动===" + JSON.stringify(wineList[dataIndex]));
    this.setData(
      {
        wineList: wineList
      });
  },
  //touchend
  endCardItem: function (e) {
    this.endTime = e.timeStamp;
    startX = 0, startY = 0;
    distanceX = 0, distanceY = 0;
    var c = e.currentTarget.dataset.id;
    var cardItem = this.data.wineList[dataIndex];
    var wineList = this.data.wineList;
    wineList[dataIndex].transition = "all .2s linear";
    this.setData(
      {
        wineList: wineList
      });

    //向左
    if (dir == "left") {
      if (cardItem.right >= 35) {

        wineList[dataIndex].right = dragright;
        this.setData(
          {
            wineList: wineList
          });

      } else {
        wineList[dataIndex].right = 0;
        this.setData(
          {
            wineList: wineList
          });
      }
    }
    //向右
    else if (dir == "right") {
      if (cardItem.right <= (dragright - 35)) {
        wineList[dataIndex].right = 0;
        this.setData(
          {
            wineList: wineList
          });
      } else {
        wineList[dataIndex].right = dragright;
        this.setData(
          {
            wineList: wineList
          });
      }
    }
  },
})