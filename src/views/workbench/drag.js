// 两列拖动改变两列宽度
export function dragTwoColDiv(contentId, leftBoxId, resizeId, rightBoxId) {
    let resize = document.getElementById(resizeId);
    let leftBox = document.getElementById(leftBoxId);
    let rightBox = document.getElementById(rightBoxId);
    let box = document.getElementById(contentId);
    resize.onmousedown = function (e) {
        let startX = e.clientX;
        resize.left = resize.offsetLeft;
        document.onmousemove = function (e) {
            let endX = e.clientX;
            let moveLen = resize.left + (endX - startX);
            let maxT = box.clientWidth - resize.offsetWidth;
            if (moveLen < 150) moveLen = 150;
            if (moveLen > maxT - 150) moveLen = maxT - 150;
            resize.style.left = moveLen;
            leftBox.style.width = moveLen + 'px';
            rightBox.style.width = (box.clientWidth - moveLen - 5) + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            resize.releaseCapture && resize.releaseCapture();
        }
        resize.setCapture && resize.setCapture();
        return false;
    }
}
// 三列拖动改变div宽度
export function dragThreeColDiv(contentId, leftBoxId, resizeOne, centerBoxId, resizeTwo, rightBoxId) {
    let resizeO = document.getElementById(resizeOne);
    let resizeT = document.getElementById(resizeTwo);
    let leftBox = document.getElementById(leftBoxId);
    let rightBox = document.getElementById(rightBoxId);
    let centerBox = document.getElementById(centerBoxId);
    let box = document.getElementById(contentId);
    resizeO.onmousedown = function (e) {
        let startX = e.clientX;
        resizeO.left = resizeO.offsetLeft;
        document.onmousemove = function (e) {
            let endX = e.clientX;
            let rightW = rightBox.offsetWidth;
            let moveLen = resizeO.left + (endX - startX);
            let maxT = box.clientWidth - resizeO.offsetWidth;
            if (moveLen < 150) moveLen = 150;
            if (moveLen > maxT - rightW - 150) moveLen = maxT - rightW - 150;
            resizeO.style.left = moveLen;
            leftBox.style.width = moveLen + 'px';
            centerBox.style.width = (box.clientWidth - moveLen - rightW - 10) + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            resizeO.releaseCapture && resizeO.releaseCapture();
        }
        resizeO.setCapture && resizeO.setCapture();
        return false;
    }
    resizeT.onmousedown = function (e) {
        let startX = e.clientX;
        resizeT.left = resizeT.offsetLeft;
        document.onmousemove = function (e) {
            let endX = e.clientX;
            let leftW = leftBox.offsetWidth;
            let moveLen = resizeT.left + (endX - startX) - leftW;
            let maxT = box.clientWidth - resizeT.offsetWidth - 5;
            if (moveLen < 150) moveLen = 150;
            if (moveLen > maxT - leftW - 150) moveLen = maxT - leftW - 150;
            resizeT.style.left = moveLen;
            centerBox.style.width = moveLen + 'px';
            rightBox.style.width = (box.clientWidth - moveLen - leftW - 10) + 'px';
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            resizeT.releaseCapture && resizeT.releaseCapture();
        }
        resizeT.setCapture && resizeT.setCapture();
        return false;
    }

}
// 上下拖动改变上下两个模块的高度
export function dragTwoRowDiv(contentId, topBoxId, resizeId, downBoxId) {
    let resize = document.getElementById(resizeId);
    let topBox = document.getElementById(topBoxId);
    let downBox = document.getElementById(downBoxId);
    let box = document.getElementById(contentId);
    resize.onmousedown = function (e) {
        let startY = e.clientY;
        resize.top = resize.offsetTop;
        document.onmousemove = function (e) {
            let endY = e.clientY;
            let moveLen = resize.top + (endY - startY);
            let maxT = box.clientHeight - resize.offsetHeight;
            if (moveLen < 100) moveLen = 100;
            if (moveLen > maxT - 100) moveLen = maxT - 100;
            resize.style.top = moveLen;
            topBox.style.height = moveLen + "px";
            downBox.style.height = (box.clientHeight - moveLen - 5) + "px";
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
            resize.releaseCapture && resize.releaseCapture();
        }
        resize.setCapture && resize.setCapture();
        return false;
    }
}