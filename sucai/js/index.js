//index页面banner图淡入淡出效果
$(function () {
    var index = 0,
        $dot_ul = $(".d_b_dot").find("ul"),
        $dot_li = $dot_ul.find("li"),
        dot_len = $dot_li.length;

    function a(x) {
        $dot_li.eq(x).addClass("d_b_dot_s").siblings().removeClass("d_b_dot_s");
        $(".d_b").eq(x).stop(true, true).fadeIn(function () {
            $(this).siblings().fadeOut()
        });
    }
    $dot_li.bind("click",(function () {
        index = $(this).index();
        a(index);
    }));
    $dot_ul.mouseenter(function () {
        clearInterval(show);
    }).mouseleave(function () {
        show = setInterval(function () {
            a(index);
            index++;
            if (index == dot_len)index = 0;
        }, 5000);
    }).mouseleave();
    $(".d_b").mouseenter(function () {
        clearInterval(show);
    }).mouseleave(function () {
        $dot_ul.trigger('mouseleave');
    })
});
//index页面播放
$(function () {
    $(".play_icon").on('click',function () {
        $(".d_b3_video").find("video").css({"display":"block"});
        $(this).css({"display":"none"});
        $(".d_b3_video").find("video").trigger('play');
    });
});

//index页面iphone轮播效果
$(function () {
    var
        $ul = $(".d_c_ct").find("ul"),
        toMoveRight,
        curDotIndex = 4,
        transitionStatus;
    
    $(window).resize(function () {
        $ul.attr('style', '');            //动画前后，变化的是标签内style属性 所以直接消除掉style即可
        scaleImage(4);
        $(".d_c_dot_s").removeClass("d_c_dot_s");
        $(".d_c_dot").find("li").eq(4).addClass("d_c_dot_s");
    });
    
    $(window).scroll(function () {
        if ($(window).scrollTop() > $(".container").height() / 2) {
            scaleImage(4);
        }
    });
    
    function scaleImage(index) {
        if (document.body.clientWidth < 600) {
            return;
        }
        $li = $ul.children();
        $li.siblings(".centerify").removeClass("centerify");
        $li.siblings(".sideify").removeClass("sideify");
        $li.eq(index + 1).addClass("sideify");
        $li.eq(index).addClass("centerify");
        $li.eq(index - 1).addClass("sideify");
    }
    
    //设置圆点index
    function setDot(flag) {
        $(".d_c_dot_s").removeClass("d_c_dot_s");
        curDotIndex = flag ? (curDotIndex == 8 ? 0 : curDotIndex + 1) : (curDotIndex == 0 ? 8 : curDotIndex - 1);
        $(".d_c_dot").find("li").eq(curDotIndex).addClass("d_c_dot_s");
    }
    
    //动画结束回调
    function transitionEndCallback() {
        $ul[0].style.transitionDuration = "0s";
        $ul[0].style.transform = "";
        toMoveRight ? $ul.children().last().before($ul.children().first()) : $ul.children().first().before($ul.children().last());
        $ul[0].removeEventListener("webkitTransitionEnd", transitionEndCallback);
        transitionStatus = false;
    }
    
    //移动
    function move(e) {
        if (transitionStatus) {
            return;
        }
        
        var liCssWidth = $ul.children().css("width");
        
        transitionStatus = true;
        
        toMoveRight = !!e.data.toMoveRight;
        
        $ul[0].style.transitionDuration = "0.5s";

        $ul[0].style.transform = toMoveRight ? "translateX(-" + liCssWidth + ")" : "translateX(" + liCssWidth + ")";
        
        scaleImage(toMoveRight ? 5 : 3);
        
        setDot(toMoveRight);
        
        $ul[0].addEventListener('webkitTransitionEnd', transitionEndCallback);
    }
    
    //向左滑动按钮
    
    $(".t_l").click({toMoveRight: false}, move);
    $(".t_r").click({toMoveRight: true}, move);
    
    
});
//导航点击切换效果
$(function () {
    $(".nav_img").click(function () {
        $(this).find("ul").fadeToggle();
    });
});
//campus页面banner高度自适应
$(function () {
    var h = $(window).height() - $(".header").height();
    var h_m = ($(window).height() - $(".header").height()) * 0.7;
    $m = $(".cam_ct>div:nth-of-type(2n+1):not(.cam-m01)");
    if (document.body.clientWidth > 900) {
        $(".cam-m01").height(h);
        $m.height(Math.max(530, h_m));
        $(window).resize(function () {
            var h_size = $(window).height() - $(".header").height();
            $(".cam-m01").height(h_size);    //h=400
            var h_m_size = ($(window).height() - $(".header").height()) * 0.7;
            $m.height(Math.max(530, h_m_size));
        });
    }
});
//campus页面应用群动画效果
$(function () {
    var index = 0;
    var len = $(".m05_d_list").find("li").length;

    function show(index) {
        $(".m05_d_list").find("li").eq(index).addClass("m05_d_list_selected").siblings().removeClass("m05_d_list_selected");
        $(".cam-m05-box").find("li").eq(index).stop(true, true).show().siblings().stop(true, true).hide();
    }

    $(".m05_img").mouseover(function () {
        clearInterval(circle);
    }).mouseout(function () {
        show(index);
        circle = setInterval(x = function () {
            show(index);
            index++;
            if (index == len) {
                index = 0;
            }
        }, 4000);
    }).mouseout();
    $(".m05_d_list").find("li").each(function () {
        $(this).click(function () {
            index = $(this).index();
            show(index);
        });
    });


});
//campus页面点击下拉效果
$(function () {
    if (document.body.clientWidth > 600) {
        $(".cam_a_d").each(function () {
                $(this).bind("click", function () {
                        var tar = $(this).attr("data-target"),
                            c_h = $(".header").height(),
                            w_h = $(window).height(),
                            i_h = $(".cam-m05").height(),
                            h = (w_h + c_h - i_h) / 2,
                            o = $(tar).offset().top - h;
                        $("html,body").animate({
                            scrollTop: o
                        }, 2000, "easeInOutCubic")
                    }
                )
            }
        );
    }
});


//为新闻动态增加分页
/**
 * 为新闻页面增加新的翻页插件
 * create by santree on 2016/9/7
 * usage: $("your className").pageBean({
 *      perPageNum : 4  //每页现实的数量
 *      nowPage    : 1  //初始显示的页码
 *      pageClass  : "your pageClass" //你用来放置页码的div
 *      list       : [
 *          {
 *              imgUrl: "图片地址",
 *              url   : "跳转页面地址",
 *              title : "新闻标题",
 *              detail: "新闻描述",
 *              time  : "发布时间"
 *          }
 *          //每个新闻动态都按照以上对象格式封装作为数组
 *      ]
 * })
 * PS : 在录入新闻是记住时间最近的放在最前面，永远按照在头部加入新闻的原则，时间顺序是从上到下
 *
 */
(function ($) {
    $.fn.extend({
        "pageBean" : function (options) {
            //合并默认配置和自定义配置
            var opts = $.extend({}, defaults, options);

            //设定新闻模版
            var tmpl =
                "<div class='n_ct_m'>"
                + "<div class='n_ct_img'>" + "<img src='' alt=''/>" + "</div>"
                + "<div class='new_ct_d'>"
                + "<h1>" + "<a href='' target='_blank'>" + "</a>" + "</h1>"
                + "<time>" + "</time>"
                + "<p>" + "</p>"
                + "</div>"
                + "</div>";
            //设定分页数字模板
            var tmplPage = "<a class='pg_num' href='javascript:void(0);'>" + "</a>";

            this.each(function () {
                var $this = $(this);
                //获取总页数
                var allPageNum = $.fn.pageBean.getPageNum(opts.list, opts.perPageNum);

                //传入页码数目
                for (var i = 0; i < allPageNum; i++) {
                    var nowPage = $(tmplPage).text(i + 1);
                    $this.find(opts.pageClass).append(nowPage);
                }
                //为每一页的页码绑定事件
                $this.find(opts.pageClass).children("a").on('click', function () {
                    $(this).addClass("select");
                    $(this).siblings().removeClass("select");
                    var nowPage = parseInt($(this).text());
                    addNewpage(nowPage);
                });
                //触发默认第一页的点击时间
                $this.find(opts.pageClass).children("a").eq(opts.nowPage - 1).trigger('click');
                //为当前页数传入内容
                function addNewpage(nowPage) {
                    $this.find(".n_ct_m").remove();
                    var nowPageArr = $.fn.pageBean.pagination(opts.list, nowPage, opts.perPageNum);
                    for (var i = 0; i < nowPageArr.length ; i++) {
                        $this.append(tmpl);
                    }
                    for (var j = 0; j < nowPageArr.length; j++){
                        $(".n_ct_m").eq(j).find(".n_ct_img img").attr("src", nowPageArr[j].imgUrl);
                        $(".n_ct_m").eq(j).find(".new_ct_d h1 a").attr("href", nowPageArr[j].url);
                        $(".n_ct_m").eq(j).find(".new_ct_d h1 a").text(nowPageArr[j].title);
                        $(".n_ct_m").eq(j).find(".new_ct_d time").text(nowPageArr[j].time);
                        $(".n_ct_m").eq(j).find(".new_ct_d p").text(nowPageArr[j].detail);
                    }
                }
            })
        }
    });
    //定义默认配置
    var defaults ={
        perPageNum : 4,
        nowPage    : 1,
        pageClass  : ".pgNum",
        list: [
            {
                imgUrl: "img/news/ct1.jpg",
                url   : "http://www.ccidnet.com/2016/0129/10092455.shtml",
                title : "兰途科技，移动校园门户的黑马",
                detail: "在15年三月十二届全国人大三次会议上，李克强总理在政府工作报告中首次提出“互联网+”行动计划。7月，经李克强总理签批，国务院日前印发《关于积极推进...",
                time  : "2016.01.29"
            },
            {
                imgUrl: "img/news/ct2.jpg",
                url   : "http://it.msn.com.cn/077636/555560998284b.shtml",
                title : "兰途科技:搭建互联网+校园移动门户平台",
                detail: "2016年1月8日，河南省教育科研网2016年工作会议在新乡医学院成功召开。本次会议以“‘互联网+’时代网络中心的定位与发展”为主题，由河南省教育科研网主办...",
                time  : "2016.01.21"
            },
            {
                imgUrl: "img/news/ct3.jpg",
                url   : "http://www.ccidnet.com/2016/0115/10083737.shtml",
                title : "我叫兰途科技，这是我的年终报告",
                detail: "伴随着岁月急匆匆的步履，2015年已进入倒计时。回首这一年，发生了好多大事儿，抗战70周年93大阅兵、北京申冬奥成功、世界那么大我想去看看、屠呦呦...",
                time  : "2016.01.15"
            },
            {
                imgUrl: "img/news/ct5.jpg",
                url   : "http://edu.21cn.com/news/terminal/10/11489.html",
                title : "兰途科技参加中国高教学会教育信息化分会理事会议",
                detail: "11月20日，中国高等教育学会教育信息化分会理事会议与江苏省教育信息化10周年年会在江苏南京召开。会上，兰途科技随新开普电子作为理事单位代表，与江苏省...",
                time  : "2015.11.24"
            }
        ]
    };

    /**
     *  根据总的list和每页数目以及当前页数来确定当夜的list为什么
     * @param arr
     * @param pgNum
     * @param perPageNum
     * @returns {Array.<T>|ArrayBuffer|Blob|string|*}
     */
    $.fn.pageBean.pagination = function (arr, pgNum, perPageNum) {
        var perPageArr = arr.slice( (pgNum-1) * perPageNum, pgNum * perPageNum );
        return perPageArr;
    };

    /**
     *  根据总的list和每页数目来确定总页数
     * @param arr
     * @param perPageNum
     * @returns {number}
     */
    $.fn.pageBean.getPageNum = function (arr, perPageNum) {
        var allPageNum = Math.ceil( arr.length / perPageNum );
        return allPageNum;
    };

})(jQuery);
$(function () {
    $(".n_ct_list").pageBean({
        list : [
	        {
		        imgUrl: "img/news/ct32.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823319&idx=1&sn=f9093d2aa7a0f203fe0d00fcf6f5aed2" +
                        "&chksm=80c5f6deb7b27fc8806db816e3c887c940fdabe15d53c46f188076fa2e4648ed5fe0bc6807ad" +
                        "&mpshare=1&scene=23&srcid=0929rGvuzB9WdEeyn4lQ05OL#rd",
		        title : "迎新特辑 | 中央财经大学数字迎新现“新亮点”，开学活动实力圈粉",
		        detail: "9月，中央财经大学的老生陆陆续续回到校园，新生们也收拾行囊到校报到，新学期，中财学子们都开始了一场全新的求学旅程...",
		        time  : "2017-09-25"
	        },
            {
		        imgUrl: "img/news/ct31.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823246&idx=1&sn=e4923244cbbb860f05cf65090f2b4dbb" +
		                "&chksm=80c5f607b7b27f1124c1da65e5eab8500cb66adf7f57d6062a3ba33d53e7dcf4de210698ceaf&mpshare=1&scene=23" +
		                "&srcid=0929OgxE8RvRole4ime5Io7U#rd",
		        title : "兰途出品|江苏农牧科技职业学院移动校园上线",
		        detail: "9月5日，由兰途科技承建的江苏农牧科技职业学院官方移动信息服务平台（简称“爱牧院”）上线运行啦...",
		        time  : "2017-09-08"
	        },
	        {
		        imgUrl: "img/news/ct30.jpg",
		        url   :"http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823225&idx=1&sn=78d8fce8601f2789a49893aefcc812fa" +
                       "&chksm=80c5f670b7b27f667155a57b24ea318acbbc5911858a547ee8b90f5a4e0a7b7d06dc220e64a2&mpshare=1" +
                       "&scene=23&srcid=0929yUeOcw7XKoXGWWt7w0W3#rd",
		        title : "迎新特辑|直击北京电子科技职业学院100%扫码报到",
		        detail: "​北京电子科技职业学院2017级新生报到与往年不同,新生在入校前即可下载安装移动应用“i电科”，登录APP后可随时随地了解学校情况、新闻公告...",
		        time  : "2017-09-01"
	        },
	        {
		        imgUrl: "img/news/ct33.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823148&idx=1&sn=294b4125a0034181f052a2c201d3fbb0" +
                        "&chksm=80c5f1a5b7b278b33651e12122d30f0bc7fab8009414552cdb923d3c0637fb206cbd7d37f22e&mpshare=1&scene=23" +
                        "&srcid=0929BiKcVlwY24DoYcKyPeSo#rd",
		        title : "案例|北京建外街道秀水社区“五微”线上教育平台",
		        detail: "2017年7月19日上午10:00，北京市朝阳区建外街道秀水社区在建外外交公寓的新闻媒体发布中心召开了“五微”线上学习平台的发布会...",
		        time  : "2017-08-23"
	        },
	        {
		        imgUrl: "img/news/ct29.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823116&idx=1&sn=ed48b5ca2255702e1eed72453e29c5bd" +
                        "&chksm=80c5f185b7b2789344e006025b5aba49c301a34dc4600c4f656593a928406dea69c9cc2e4b59&mpshare=1" +
                        "&scene=23&srcid=0929KS8tidLhG2eZZxQzLkfL#rd",
		        title : "河南城建学院官方APP上线，新生提前感受云端校园生活",
		        detail: "河南城建学院面向2017级新生正式推出官方校园移动微门户应用——“河南城建学院移动校园APP”，提供校园资讯、教务、办公、学习生活等功能服务...",
		        time  : "2017-08-07"
	        },
	        {
		        imgUrl: "img/news/ct28.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823113&idx=1&sn=9411233e61494c99fe6b71fa320e3cc8" +
                        "&chksm=80c5f180b7b278960b6821b10178bdcc9d1a9296a5e3b18f4e5d5f44def070bb57a35af126f4&mpshare=1&scene=23" +
                        "&srcid=0929FqqJb6E7RiozxAAKiIRL#rd",
		        title : "“i电科”APP上线，今夏启动掌上迎新服务",
		        detail: "​当前高校信息化建设正从数字校园向智慧校园迈进，随着移动智能终端设备的普及，掌上应用必将渗透到高校信息化建设的方方面面...",
		        time  : "2017-08-03"
	        },
	        {
		        imgUrl: "img/news/ct27.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823051&idx=1&sn=4b4fb8bce7a7bb91d13e01061cbe1465" +
                        "&chksm=80c5f1c2b7b278d420b76396726dffe18bc2ff0ac4682baf4b59cd3c1e2835118a6c540a3076" +
                        "&mpshare=1&scene=23&srcid=0929xMfIai2WTMwNj6GLE7cR#rd",
		        title : "上线一周年，“长安大学APP”总访问量突破两百万大关！",
		        detail: "​自2016年7月4日，兰途科技为长安大学承建官方移动应用服务平台（简称“长安大学APP”）上线至今，已经刚好整整一年...",
		        time  : "2017-07-04"
	        },
	        {
		        imgUrl: "img/news/ct26.jpg",
		        url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823021&idx=1&sn=d0e69fe3c01aacff26a0f6987ea743d6" +
                        "&chksm=80c5f124b7b27832ab2c4c778db26db4207aca9ae99001ad0f735696edbabf7167443a8a67ef" +
                        "&mpshare=1&scene=23&srcid=09296wbjqqRvAHZplZI2bdgr#rd",
		        title : "案例|看中央财经大学如何1小时内完成千人会议签到",
		        detail: "​兰途科技于近日上线启用了移动校园「会议签到」功能，校领导和老师通过移动中财大APP和微信企业号便可实现掌上会议签到...",
		        time  : "2017-06-15"
	        },
            {
                imgUrl: "img/news/ct9.jpg",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823005" +
                "&idx=1&sn=bf01a999dc45df573a0442bf900613bb&chksm=80c5f114b7b278" +
                "02a59fda5a9a0a1024e3971ba392ded1086aefa32027d493768ba25dd529ce" +
                "&mpshare=1&scene=23&srcid=0614VV2F7w6nPFxlPXw1tn0S#rd",
                title : "兰途出品|“掌上河中医”试运行上线啦",
                detail: "​随着信息技术的发展，移动门户随之走进了校园。为了更好的服务全校教职工生，河南中医药大学网络信息中心于2016年12月起与兰途科技共同建设...",
                time  : "2017-06-09"
            },
            {
                imgUrl: "img/news/ct8.jpg",
                url   : "http://www.caigou.com.cn/news/20170424108.shtml",
                title : "兰途科技参加CERNET西南地区学术年会",
                detail: "​为进一步加强西南地区各高校数字校园建设，分享信息化建设实践中的有益经验、交流信息领域的关键技术和应用，进一步促进CERNET西南地区各高校...",
                time  : "2017-04-24"
            },
            {
                imgUrl: "img/news/ct10.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822895" +
                "&idx=1&sn=a2edd0d5dba65f9ad2b2f633ef0839a1&chksm=80c5f0a6b7b279b01ac3554" +
                "4aa73f59fab58070d35297f510eb1ed137dafc684e8e2929e8c0f&mpshare=1&scene=23" +
                "&srcid=0614xSalSzfg5auWBvNiaD7Y#rd",
                title : "兰途出品|中国海洋大学移动门户“i中国海大”拉新运营活动圆满落幕",
                detail: "​近日，兰途科技携手中国海大网络协会策划运营了“花开海大”主题摄影大赛，旨在调动师生对“i中国海大”的参与度和使用率，同时丰富中国海洋大学的校园文化生活...",
                time  : "2017-04-18"
            },
            {
                imgUrl: "img/news/ct21.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822888&idx=1&sn=45e38d4850ca12e6dece79f16dff0172&" +
                "chksm=80c5f0a1b7b279b79fa46a64162ed79a1a7e482f5c1b4b100eb4856d312ad5c8350c32699ae0&" +
                "mpshare=1&scene=23&srcid=0614LrEPIFQNqMVvWJR0vhCZ#rd",
                title : "由兰途科技策划运营的中财一卡通设计初赛圆满结束！",
                detail: "4月13日，由中央财经大学网络信息中心、数字化校园建设办公室主办、校文化与传播学院承办、兰途科技协办并策划运营执行的“中央财经大学一卡通卡面设计大赛”的初赛评选工作已圆满结束...",
                time  : " 2017-04-14"
            },
            {
                imgUrl: "img/news/ct11.jpg",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822883" +
                "&idx=1&sn=4ddcd64b8f4cf2765f8db6d1dada3171&chksm=80c5f0aab7b279bc0106232" +
                "caae15dc67ca460dac10cab0442ae509eb8d74f1dcd5a7dd39517&mpshare=1&scene=23" +
                "&srcid=0614rOb9Dv1U4t3VJNZcNlvd#rd",
                title : "听说，西安电子科技大学发布了一款新产品...",
                detail: "4月10日，西安电子科技大学信息化建设处面向全校发布了一款程序员实力锻造的新产品。这是一款由兰途科技提供技术支持，采用兰途跨平台校园门户系统...",
                time  : "2017-04-12"
            },
            {
                imgUrl: "img/news/ct12.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822873&idx=1" +
                "&sn=f2c3391136ae9137b95613edab8a79d3&chksm=80c5f090b7b27986048d253eeaab14418fc13c" +
                "2a67634c6ba83605be9b601d07d40fa97d748a&mpshare=1&scene=23&srcid=061449RcrJ6abiCnMmxeNvpw#rd",
                title : "兰途出品|北京建筑大学企业号，畅享移动校园新体验",
                detail: "迄今，微信已建立起订阅号、服务号、企业号和小程序四大体系。相对于APP，越来越多的高校利用微信上搭载移动应用，开启校园信息化新模式...",
                time  : "2017-04-11"
            },
            {
                imgUrl: "img/news/ct13.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822842" +
                "&idx=1&sn=79e4b8ad18836ae7c9721758f4e31070" +
                "&chksm=80c5f0f3b7b279e5f6ed59f67e84dbc22f96a4b19bba50fde6f5c14f5123080772e82b106679" +
                "&mpshare=1&scene=23&srcid=0614MU4hMSMxoJNdHVuJoVmI#rd",
                title : "兰途出品 | 河工贸移动校园上线使用率过半",
                detail: "日前，兰途科技参与建设提供技术服务支持的河南工业贸易职业学院移动校园（以下简称“河工贸移动校园”）已圆满完成，并获得了广大师生的欢迎和认可...",
                time  : "2017-03-29"
            },
            {
                imgUrl: "img/news/ct14.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822828" +
                "&idx=1&sn=70a4d73d8afc085d559bd769eed32e75" +
                "&chksm=80c5f0e5b7b279f32c36c93b13e325b14618f2583b0bd30f7653f38d2f8ebb709fd27c193e47" +
                "&mpshare=1&scene=23&srcid=061409IeWScVbs9nX3lSxyqg#rd",
                title : "兰途出品|西南石油大学“移动校园”上线！",
                detail: "移动校园建设主要为学校提供了基于教务、通知、办公、教学、生活等20项服务广大师生的常用应用，并且统一的应用管理平台还支持后期的应用扩展，非常方便...",
                time  : "2017-03-22"
            },
            {
                imgUrl: "img/news/ct15.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822791&idx=1&sn=a546cef4a2b56d619c1efbe4743c0278" +
                "&chksm=80c5f0ceb7b279d8b9ce5d15c38bd404ec7f02e97e8f076a37d73c0d0c1011c52b799c4a3089" +
                "&mpshare=1&scene=23&srcid=0614awRN2zKhDYXaLt0F4Kel#rd",
                title : "西南财经大学：99%掌上离校，学生快速办理毕业手续",
                detail: "还有不到四个月的时间，各大高校老师又要开始忙于办理毕业生离校手续。在很多高校，每年六月的离校高峰期，来回奔波提交资料、办理离校毕业证书...",
                time  : " 2017-03-13"
            },
            {
                imgUrl: "img/news/ct16.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822781&idx=1&sn=29ddf153210991e192edace50e396ffe&" +
                "chksm=80c5f034b7b2792293ae4aea0f73821d87b38c6f3caba7d08e0766cb97013507348cf9191589&" +
                "mpshare=1&scene=23&srcid=0614EaxcBysafq2UIMShZu0W#rd",
                title : "兰途出品|广西师范学院移动校园平台建设完成，支持后期应用扩展",
                detail: "经过为期三月的开发建设，广西师范学院移动校园统一服务平台已经建设完成并准备面向全校上线。本次的移动校园建设主要为学校提供了基于教务、通知、办公、教学、生活等20项服务广大师生的常用应用...",
                time  : " 2017-03-09"
            },
            {
                imgUrl: "img/news/ct17.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822719" +
                "&idx=1&sn=2ec93fdc1bc7050d1f50f03807f9e4b5&" +
                "chksm=80c5f076b7b27960fcb1440153cfda0063eed1f1572d259e44e72f675285983ffd56e044aea3" +
                "&mpshare=1&scene=23&srcid=0614etsjtNn53N4HW1luhcas#rd",
                title : "兰途出品|中国海洋大学移动校园今日上线试运行",
                detail: "对于全新移动校园平台“i中国海大”的初次上线试运营，学校网络与信息中心领导小组的老师给予了特别的重视，分别在校官网（学校最具权威的宣传展示渠道）投放了首页宣传图和发布了上线公告...",
                time  : " 2017-01-10"
            },
            {
                imgUrl: "img/news/ct3.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822703&idx=1" +
                "&sn=f5658474c121e0fb7ea763a0e94fdce3" +
                "&chksm=80c5f066b7b279703c76fa7c3c58b146c55e2fdb900c05404613448135a5bc28548aa12709d5" +
                "&mpshare=1&scene=23&srcid=0614Nwl8UiatgUK1G8BXEbao#rd",
                title : "专题|中青政基于微信企业号的高校移动信息化实践与运行",
                detail: "近年来，移动互联网的浪潮给高校信息化建设带来了很多挑战，但同时也带来了新的发展机遇，移动信息化建设成为当前高校信息化建设一个重要的建设方向。自腾讯于2014年下半年推出微信企业号后，更是给高校移动信息化建设提供了便利的条件...",
                time  : " 2016-12-23"
            },
            {
                imgUrl: "img/news/ct4.jpg",
                url   : "http://www.sohu.com/a/121980615_555566",
                title : "兰途科技 为高校构建长久持续的移动信息化服务",
                detail: "　随着网络基础设施的不断完善，以及信息系统的不断上线，当前多数高校信息化服务管理开始向移动端发展。移动信息化服务平台(APP、微信端)为高校信息化服务管理拓展了一种新的模式，是校园未来信息化管理和服务的重要平台。",
                time  : "2016-12-19"
            },
            {
                imgUrl: "img/news/ct19.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822675&idx=1&sn=703cb8226cc6f5f7da2a43e15e346851&" +
                "chksm=80c5f05ab7b2794c1283668abd39b690f65ac741ae1c086ce38e70bded9422d00efe8d1b56ad&" +
                "mpshare=1&scene=23&srcid=0614HCU3cwOMOCePAc6iYJYG#rd",
                title : "盘点北京交通大学官方微信企业号那些好“玩”的应用",
                detail: "上周我们给大家介绍了北京交通大学的官方移动信息服务平台——北交移动门户APP日均访问量破万。并在文章结尾卖了一个小关子：北京交通大学的微信企业号也运营得有声有色，今日就为大家揭晓答案...",
                time  : " 2016-12-08"
            },
            {
                imgUrl: "img/news/ct20.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822661&" +
                "idx=1&sn=52c29d00fa4c6b0c0664066b9891041e&" +
                "chksm=80c5f04cb7b2795a5200085208bdaab51071d53a83a269f0eed04661664c07667377777de57b&" +
                "mpshare=1&scene=23&srcid=0614PYZeQBsfRWhlUdQRAlpu#rd",
                title : "由兰途科技承建的北交移动门户日均访问量破万",
                detail: "由兰途科技承建、北京交通大学官方出品的北交移动门户APP以“贴心服务、体验顺畅、关注学生”等特色深受北交师生喜爱，并且以每日平均10000+的访问量赢得师生广泛关注和使用...",
                time  : " 2016-12-01"
            },
            {
                imgUrl: "img/news/ct22.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822653&" +
                "idx=1&sn=41fdf48598fbfa933d42719110aa4a21&" +
                "chksm=80c5f3b4b7b27aa28968d18bee54fa6f8e29eb133e19d055a864c61a2280f331a76c097fd322&" +
                "mpshare=1&scene=23&srcid=0614SAUaY3a5cagRNninBI2Z#rd",
                title : "兰途出品|北京第二外国语大学移动校园正式上线",
                detail: "由兰途科技承建的北京第二外国语大学官方移动信息服务平台（简称“移动二外”）已经全线上线试运行啦，这一举措，让北京第二外国语大学进入移动信息服务新时代...",
                time  : " 2016-11-25"
            },
            {
                imgUrl: "img/news/ct23.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822613&idx=1&sn=cd73e3a78c38379cef9603d8c73bf519&" +
                "chksm=80c5f39cb7b27a8a8bf4f50d8cb08c765cf35d59260dbfc43637bfa4c4a225c0cc4fc1772176&" +
                "mpshare=1&scene=23&srcid=0614CE9HEdbmmXoNq3Mo9LOH#rd",
                title : "兰途出品|技能MAX的长安大学移动信息服务平台上线啦！",
                detail: "由兰途科技承建的长安大学官方移动信息服务平台（简称“长安大学APP”）已经全线上线试运营啦，这一举措，让长安大学进入全新移动信息服务新时代...",
                time  : " 2016-11-09"
            },
            {
                imgUrl: "img/news/ct5.jpg",
                url   : "http://sanwen8.cn/p/553c6z6.html",
                title : "兰途科技洪叶：保持专注 只为更好的智慧校园体验 | 晓数专访",
                detail: "在移动互联浪潮与“十三五”规划中教育部提出加快教育信息化发展的双重推动下，“互联网+教育”概念被迅速传播，高校逐渐启程踏上智慧校园之路，而越来越多的厂商、资本也纷纷瞄准了这一巨大潜力的市场。",
                time  : "2016-11-07"
            },
            {
                imgUrl: "img/news/ct24.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822565&idx=1&" +
                "sn=51ca21c030a894ff64082c9606785c41&" +
                "chksm=80c5f3ecb7b27afa7739c0eccfce771056cf379e05701b03efd7a1980fd80540da4e04322a20&" +
                "mpshare=1&scene=23&srcid=0614SSH0aG4tSfkH5yIxvG4I#rd",
                title : "兰途出品|移动中财大拉新运营活动圆满结束！",
                detail: "2016年10月12日，借中央财经大学“百团大战”之际，兰途科技与学校一起策划组织了新一轮的移动中财大拉新运营活动...",
                time  : " 2016-10-14"
            },
            {
                imgUrl: "img/news/ct25.jpg",
                url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&" +
                "mid=2658822510&idx=1&sn=57d049ea48717f5a482ff819c0410fa7&" +
                "mpshare=1&scene=23&srcid=0614BhhSeIrXyMx2yXEs5IYW#rd",
                title : "高校APP开学迎新出大招：手机报道、全景校园、学长帮忙...",
                detail: "从8月31日起，各大高校陆续进入开学迎新季。为奏响新生入校第一乐章，各大高校“奇招”、“新招”花样百出，利用校园官方APP推出手机迎新报道、全景校园、选号服务、学长帮忙...",
                time  : "2016-09-06"
            },
            {
                imgUrl: "img/news/ct2.jpg",
                url   : "http://edu.enorth.com.cn/system/2016/08/22/031118032.shtml",
                title : "兰途科技，运用企业号提供智慧校园解决方案",
                detail: "据了解，由兰途科技筹建的北建移动门户微信企业号2.5.9已于近日正式上线。该企业号是基于智慧校园推出的微信第三方应用。根据学生反映，自北建移动门户上线以来，全校部分师生已经关注并绑定了此微信企业号...",
                time  : "2016-08-22"
            },
            {
                imgUrl: "img/news/ct7.png",
                url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822255&idx=1&sn=78803a2334935c00c97e04abaa652824&scene=23&srcid=08033ger5lTW8DS1OAkBzDpb#rd",
                title : "兰途出品 | 中财移动门户上线！",
                detail: "中财掌上校园正式开学了！兰途科技承建的中央财经大学官方移动门户正式上线，现已登陆苹果、安卓各大应用市场，在校师生可第一时间前往下载使用...",
                time  : "2016-05-30"
            },
            {
                imgUrl: "img/news/ct6.png",
                url   : "http://edu.enorth.com.cn/system/2016/05/26/030988669.shtml",
                title : "兰途科技出品：中青政“移动校园”上线",
                detail: "昨日，中国青年政治学院“移动校园”正式上线，成为中青政“智慧校园”发展又一里程碑。同时，兰途科技“移动智慧校园”家族正式增添一名新成员...",
                time  : "2016-05-26"
            },
            {
                imgUrl: "img/news/ct1.jpg",
                url   : "http://www.ccidnet.com/2016/0129/10092455.shtml",
                title : "兰途科技，移动校园门户的黑马",
                detail: "在15年三月十二届全国人大三次会议上，李克强总理在政府工作报告中首次提出“互联网+”行动计划。7月，经李克强总理签批，国务院日前印发《关于积极推进...",
                time  : "2016-01-29"
            },
            {
                imgUrl: "img/news/ct3.jpg",
                url   : "http://www.ccidnet.com/2016/0115/10083737.shtml",
                title : "我叫兰途科技，这是我的年终报告",
                detail: "伴随着岁月急匆匆的步履，2015年已进入倒计时。回首这一年，发生了好多大事儿，抗战70周年93大阅兵、北京申冬奥成功、世界那么大我想去看看、屠呦呦...",
                time  : "2016-01-15"
            },
            {
                imgUrl: "img/news/ct5.jpg",
                url   : "http://edu.21cn.com/news/terminal/10/11489.html",
                title : "兰途科技参加中国高教学会教育信息化分会理事会议",
                detail: "11月20日，中国高等教育学会教育信息化分会理事会议与江苏省教育信息化10周年年会在江苏南京召开。会上，兰途科技随新开普电子作为理事单位代表，与江苏省...",
                time  : "2015-11-24"
            }

        ]
    });
    $(".first_pg").on('click', function () {
        $(".pgNum a:first-child").trigger('click');
    });
    $(".last_pg").on('click', function () {
        $(".pgNum a:last-child").trigger('click');
    });
    $(".pre_pg").on('click', function () {
        $(".pg_num.select").prev().trigger('click');
    });
    $(".next_pg").on('click', function () {
        $(".pg_num.select").next().trigger('click');
    })
});