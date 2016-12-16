/**
 * Created by Administrator on 2016/9/29 0029.
 */

function $id(id) {
    return document.getElementById(id)
};
function getScroll() {
    if (window.pageXOffset != null) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if (document.documentMode == "CSS1Compat") {
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
function cs(obj) {
    return console.log(obj);
}
function blockShow(obj) {
    obj.style.display = "block";
}
function noneShow(obj) {
    obj.style.display = "none";
}
function client() {
    if (window.innerHTML != null) {
        return {
            width: window.innerWidth,
            height: window.innerWidth
        }
    }
    else if (document.documentMode == "CSS1Compat"){
         return{
             width: document.documentElement.clientWidth,
             height: document.documentElement.clientHeight
         }
    }
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    }
}

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
function aniMy(obj, json, fn, time,speed) {
    clearInterval(obj.timer);
    var time = time || 24;

    obj.timer = setInterval(function () {
        var flag = true;
        for (var attr in json) {
            //返回当前属性值
            var currnets = 0;
            var step = 0;
            var speed = speed || 8;
            if (attr == "opacity") {
                currnets = Math.round(parseInt(getAttr(obj, attr) * speed)) || 0;
                step = (parseInt(json[attr] * speed) - currnets) / speed;
            }
            else {
                currnets = parseInt(getAttr(obj, attr));
                step = (json[attr] - currnets) / speed;
            }
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (attr == "opacity") {
                //高版本
                if ("opacity" in obj.style) {
                    // obj.style.opacity = json[attr];
                    obj.style.opacity = (currnets + step) / speed;
                }
                else {
                    // obj.style.filter = "alpha(opacity = " + json[attr] * 100 + ")";
                    obj.style.filter = "alpha(opacity = " + currnets + step + ")";
                }
            }
            else if (attr == "zIndex") {
                obj.style.zIndex = json[attr];
            }
            else {
                obj.style[attr] = currnets + step + "px";
            }
            if (attr == "opacity") {
                currnets = currnets / speed;
            }
            if (currnets != json[attr]) {
                flag = false;
            }
        }
        if (flag) {
            clearInterval(obj.timer);
            if (fn) {
                fn();
            }
        }
    }, time);
}
function getAttr(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return window.getComputedStyle(obj, null)[attr];
    }
}
