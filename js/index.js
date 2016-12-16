/**
 * Created by lisw on 2016/12/9 0009.
 */

$(function () {

    //固定栏
    (function () {
        //获取第一个大图高度
        var pic = $('#pic');
        var height = pic.height();
        //获取fixed DOM元素
        var fixed = $('#fixed');
        //滚轮事件
        $(window).scroll(function () {
            var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (y >= height) {
                fixed.fadeIn(500);
            } else {
                fixed.fadeOut(500);
            }
        });


    })();

    //搜索栏
    (function () {
        //获取DOM元素
        var input = $('#pic_input');
        //上来就让他消失
        input.hide();
        //淡入淡出
        var pic = $('#pic');
        pic.on('mouseenter',
            function () {
                input.fadeIn(500);
            });
        pic.on('mouseleave',
            function () {
                input.fadeOut(500);
            });
        //焦点获取在input上面
        var lc = $('#lc');
        var label = $("#search_label");
        var btn = $("#pic_input > button");
        //当焦点获得时候
        lc.on('mouseenter', function () {
            //淡入淡出
            $('#pic_tp_img2').fadeIn(600);
            $('#pic_tp_img').fadeOut(600);

            lc.css({
                "border": "1px solid rgba(0,153,204,1)",
                "background-color": "rgba(255,255,255,0.5)"
            });
            btn.css("background-color", " rgba(0,153,204,0.9)");

        });

        lc.on('mouseleave', function () {
            $('#pic_tp_img').fadeIn(600);

            lc.css({
                "border": "1px solid rgba(0,153,204,0.2)",
                "background-color": "rgba(255,255,255,0.3)"
            });
            btn.css("background-color", " rgba(0,153,204,0.7)");
        });

    })();

    //轮播图
    (function () {
        var ctrlR = $('#car_r');
        var ctrlL = $('#car_l');
        var lis = $('#car_ul').children();
        var liWidth = $('#car_ul').children()[0].offsetWidth;
        var ctrlLis = $('#yuanDian_ul').children();
        var car = $('#car_lunbo');
        var cas = $('#car_cas');
        var shuBiao = $('#car')

        //console.log(liWidth);
        //确定格式
        for (var i = 1; i < lis.length; i++) {
            lis[i].style.left = liWidth + "px";
        }
        var index = 0;
        //点击右边
        ctrlR.on('click', function () {
            moveReft();
        });
        //点击左边
        ctrlL.on('click', function () {
            moveLeft();
        });
        //点击按钮
        for (var j = 0; j < ctrlLis.length; j++) {

            ctrlLis[j].that = j;

            ctrlLis[j].onclick = function () {
                /*重点 重点 重点 */
                var that = this.that;
                for (var k = 0; k < ctrlLis.length; k++) {
                    ctrlLis[k].className = '';
                }
                this.className = 'active';

                if (that > index) {
                    aniMy(lis[index], {left: -liWidth},null,24);
                    lis[that].style.left = liWidth + "px";
                } else if (that < index) {
                    aniMy(lis[index], {left: liWidth},null,24);
                    lis[that].style.left = -liWidth + "px";
                }
                index = that;
                aniMy(lis[index], {left: 0},null,24);
            }


        }


        function moveReft() {
            aniMy(lis[index], {left: -liWidth},null,24);
            ++index > lis.length - 1 ? index = 0 : index;
            lis[index].style.left = liWidth + "px";
            aniMy(lis[index], {left: 0},null,24);

            ctrl();
        }


        function moveLeft() {
            aniMy(lis[index], {left: liWidth},null,24);
            ++index > lis.length - 1 ? index = 0 : index;
            lis[index].style.left = -liWidth + "px";
            aniMy(lis[index], {left: 0},null,24);

            ctrl();
        }

        function ctrl() {
            for (var i = 0; i < ctrlLis.length; i++) {
                ctrlLis[i].className = "";
            }
            ctrlLis[index].className = "active";
        }

        //开启定时器
        var timer = null;
        timer = setInterval(moveReft, 3000);

        //鼠标经过
        //console.log(car);

        shuBiao.mouseenter(function () {
            cas.fadeIn(400);
        });
        shuBiao.mouseleave(function () {
            cas.fadeOut(400);

        });

        car.mouseenter(function () {
            clearInterval(timer);
        });

        car.mouseleave(function () {
            clearInterval(timer);
            timer = setInterval(moveReft, 3000);
        });


    })();

    //tab栏
    (function () {
        var tabHeaders = document.getElementById('tab_s_ul').children;

        var wenZis = getClassName('wen-zi');
        var contents = getClassName('tab-contents');
        var tabAs = getClassName('tab-A');
        //tab切换
        for (var i = 0; i < tabHeaders.length; i++) {
            //重要 重要 重要
            tabHeaders[i].index = i;
            tabHeaders[i].onmousemove = function () {
                for (var j = 0; j < tabHeaders.length; j++) {
                    tabHeaders[j].className = '';
                    contents[j].className = 'tab-contents';
                }
                this.className = 'color';
                contents[this.index].className = 'tab-contents show';
            }

        }
        //页面动画
        for (var i = 0; i < tabAs.length; i++) {
            //重要 重要 重要
            tabAs[i].index = i;
            tabAs[i].onmousemove = function () {
                aniMy(wenZis[this.index],{bottom:-30},null,3,50);
                console.log(111);
            };
            tabAs[i].onmouseout = function () {
                aniMy(wenZis[this.index],{bottom:-60},null,3,50);
                console.log(222);

            };

        }

        function getClassName(classname) {
            //过浏览器支持就返回
            if (document.getElementsByClassName) {
                return document.getElementsByClassName(classname);
            }
            //不支持兼任ie
            //创建数组
            var arr = [];
            //首先获取所有的标签
            var tags = document.getElementsByTagName("*");
            //遍历这个数组拿到没一个值
            for (var i = 0; i < tags.length; i++) {
                //还要进行判断如果数组里面就有多个类
                //利用split方法切割
                var arrNew = tags[i].className.split(" ");
                //遍历这个新的数组
                for (var j = 0; j < arrNew.length; j++) {
                    //如果这个标签里面的多个之中的其中一个满足这个条件
                    if (arrNew[i].className == classname) {
                        //就把这标签添加到新的数组中 注意是要的这个标签
                        arr.push(tags[i]);
                    }
                }
            }
            return arr;
        }
    })();


});