/* 自定义指令 */
// 拖拽
const drag = {
    created(el, binding) {
        el.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            const eX = e.clientX - el.offsetLeft;
            const eY = e.clientY - el.offsetTop;
            const domWidth = el.offsetWidth; // dom宽度
            const domHeight = el.offsetHeight; // dom高度
            document.onmousemove = (e) => {
                let moveX = e.clientX - eX;
                let moveY = e.clientY - eY;
                const maxWidth = window.innerWidth - domWidth;
                const maxHeight = window.innerHeight - domHeight;
                // 限制移动范围
                if (moveX <= 0) moveX = 0;
                if (moveX >= maxWidth) moveX = maxWidth;
                if (moveY <= 0) moveY = 0;
                if (moveY >= maxHeight) moveY = maxHeight;
                // console.log(moveX, moveY, maxWidth, maxHeight);
                el.style.left = moveX + "px";
                el.style.top = moveY + "px";
            };
            document.onmouseup = () => {
                document.onmousemove = null;
            };
        };
    },
};

// 自动获取焦点
const focus = {
    mounted: (el) => el.focus()
}
// 防抖点击指令
const debounceClick = {
    created(el, binding) {
        const { value: callback, arg: delay } = binding
        el.addEventListener('click', dedounce(callback, delay || 200))
    }
}
function dedounce(fn, delay) {
    let timer = 0
    return function () {
        // 首次立即执行
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(fn, delay)
    }
}
/**
 * 上下左右拉伸
 * param : width、widthL上下 height、heightT左右（默认width）
 * param min 最小值（默认160）
 * param max 最大值（默认500）
 * 需要容器内有一个class为resize移动容器
 * 页面出现滚动条会有bug， offset
 */
const stretch = {
    mounted(el, binding, vnode) {
        let direction = binding.arg || "width", self = false, move = null,dom = null;
        const directionObj = { widthL: 'width', heightT: 'height' }
        if (directionObj[binding.arg]) {
            direction = directionObj[binding.arg]
            self = true
        }
        dom = vnode.children.filter(item => item.props?.class.includes("resize"))[0].el
        if (!dom) return;
        dom.onmousedown = function (e) {
            document.onmousemove = (_e) => {
                if (direction === "width") {
                    move = parseInt(_e.clientX - el.offsetLeft);
                    if (self) move = move > 0 ? el.offsetWidth - move : -move + el.offsetWidth
                } else {
                    move = parseInt(_e.clientY - el.offsetTop);
                    if (self) move = move > 0 ? el.offsetHeight - move : -move + el.offsetHeight;
                }
                let min = binding.value?.min ? Number(binding.value?.min) : 160;
                let max = binding.value?.max ? Number(binding.value?.max) : 500;
                if (min > max) {
                    min = Number(binding.value?.max);
                    max = Number(binding.value?.min);
                }
                if (move <= min) move = min;
                else if (move >= max) move = max;
                el.style[direction] = `${move}px`;
            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
};

export {
    drag,
    focus,
    debounceClick,
    stretch
}