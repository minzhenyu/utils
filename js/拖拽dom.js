 // 拖拽事件  vue @mousedown 触发 
 const dragControllerUD= function(e) {
    const box = this.$refs.box.getElementsByClassName('mid')[0]
    const resize = box.getElementsByClassName('move')[0]
    const topBox = box.getElementsByClassName('topBox')[0]
    const downBox = box.getElementsByClassName('downBox')[0]

    // 颜色改变提醒
    resize.style.background = '#818181'
    var startY = e.clientY
    resize.top = resize.offsetTop
    // 鼠标拖动事件
    document.onmousemove = function(e) {
      var endY = e.clientY
      var moveLen = resize.top + (endY - startY) // （endY - startY）=移动的距离。resize.top+移动的距离=上边区域最后的高度
      var maxT = box.clientHeight - resize.offsetHeight // 容器高度 - 上边区域的高度 = 下边区域的高度

      if (moveLen < 300) moveLen = 300 // 上边区域的最小高度为50px
      if (moveLen > maxT - 150) moveLen = maxT - 150 // 下边区域最小高度为150px

      resize.style.top = moveLen// 设置上边区域的高度

      topBox.style.height = moveLen + 'px'
      downBox.style.height = box.clientHeight - moveLen - 10 + 'px'
    }
    // 鼠标松开事件
    document.onmouseup = function() {
      // 颜色恢复
      resize.style.background = '#d6d6d6'
      document.onmousemove = null
      document.onmouseup = null
      resize.releaseCapture && resize.releaseCapture() // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
    }
    resize.setCapture && resize.setCapture() // 该函数在属于当前线程的指定窗口里设置鼠标捕获
    return false
  }