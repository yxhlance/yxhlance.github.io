
//点击导航更多 效果
$(function(){
	$('.nav_more_wrap').click(function() {
		$(this).find('ul').fadeToggle();
	});

	// index页面播放视频
    var playIcon = $('.play_icon');
    playIcon.click(function(){
        $(this).prev().css('display','block').trigger('play').end().css('display','none');
    });

    $(window).scroll(function(){
       var videoTag = $('.li1_pic .pic_video>video');
	    if($(this).scrollTop()>21){
            playIcon.prev().trigger('pause');
            videoTag.css('visibility','hidden');
        }else{
            videoTag.css('visibility','visible');
        }
        videoTag = null;
    })
});
//index页面轮播图淡入淡出
$(function(){
	var $ind =0,
    	carousel_time = 0,
		$dot_ul = $('.carousel_dot').find('ul'),
		$dot_li = $dot_ul.find('li'),
		$dot_len = $dot_li.length;

	function carousel_fade(ind){
        var carouseLi = $('.carousel_li');
		$dot_li.eq(ind).addClass('dot_cur').siblings().removeClass('dot_cur');
        carouseLi.eq(ind).stop(true,true).fadeIn(function(){
        	$(this).siblings().fadeOut();
		});
        carouseLi = null;
	};
	$dot_li.bind('click',function(){
        $ind = $(this).index();
        carousel_fade($ind);
	});
	$dot_ul.mouseenter(function(){
		clearInterval(carousel_time);
	}).mouseleave(function(){
		carousel_time = setInterval(function(){
			carousel_fade($ind);
			$ind++;
			if($ind===$dot_len){
				$ind = 0;
			}
		},5000);
	}).mouseleave();
	$('.carousel_li').mouseenter(function(){
		clearInterval(carousel_time);
	}).mouseleave(function(){
		$dot_ul.trigger('mouseleave');
	});

});
// 案例轮播
$(function(){
	var $case_ul = $('.cont_box').find('ul'),
        liCssWidth,
		toMoveRight,
		curDotInd = 4;

    $(window).resize(function(){
        $case_ul.attr('style','');
        scaleImg(4);

    });
    $(window).scroll(function(){
        if($(window).scrollTop()>$('.container').height()/2){
            scaleImg(4);
        }
    });
	// 轮播结束回调
	function transitionEndCallback(){
        $case_ul[0].style.transitionDuration = '0s';
        $case_ul[0].style.transform = '';
        toMoveRight ? $case_ul.append($case_ul.children().first()) : $case_ul.children().first().before($case_ul.children().last());
        $case_ul[0].removeEventListener('webkitTransitionEnd',transitionEndCallback);
        setDot(toMoveRight);
	}

	function toMove(e){
		toMoveRight = e.data.toMoveRight;
        liCssWidth = $case_ul.children().css('width');
        $case_ul[0].style.transitionDuration = '0.5s';
        $case_ul[0].style.transform = toMoveRight ? 'translateX(-' + liCssWidth + ')':'translateX(' +  liCssWidth+ ')';
        scaleImg(toMoveRight ? 5 : 3);
        $case_ul[0].addEventListener('webkitTransitionEnd',transitionEndCallback);
	}
	// 缩放图片
    function scaleImg(ind){
		if(document.body.clientWidth < 600){ return; }

        var $li = $case_ul.children();
        $li.siblings('.centerify').removeClass('centerify');
        $li.siblings('.sideify').removeClass('sideify');
        $li.eq(ind).addClass('centerify');
        $li.eq(ind-1).addClass('sideify');
        $li.eq(ind+1).addClass('sideify');
    }
    // 设置 轮播导航点
	function setDot(rightFlag){
        var $dot_ul_li = $('.cont_dot .dot_ul li');
        $dot_ul_li.siblings('.dot_s').removeClass('dot_s');
        $dot_ul_li.siblings('.dot_s2').removeClass('dot_s2');
        curDotInd = rightFlag ? (curDotInd==8 ? 0 : ++curDotInd) : (curDotInd==0 ? 8 : --curDotInd);
        $dot_ul_li.eq(curDotInd).addClass('dot_s');
        $dot_ul_li.eq(curDotInd-1).addClass('dot_s2');
        $dot_ul_li.eq(curDotInd+1).addClass('dot_s2');
	}

	$('.dire_l').click({toMoveRight:false},toMove);
	$('.dire_r').click({toMoveRight:true},toMove);

	/*campus.html */
	//campus页面 背景高度自适应
	var h_h = $('.header').height(),
        w_h = $(window).height(),
		auto_h = w_h - h_h,
		auto_h_s = auto_h * 0.7,
		_camp = $(".cam_ct>div:nth-of-type(2n+1):not(.cam-m01)");
	if(document.body.clientWidth > 900){
		$('.camp_b1').height(auto_h);
		_camp.height(Math.max(530,auto_h_s));
		$(window).resize(function(){
			var h_size = $(window).height() - $('.header').height(),
				h_size_s = h_size * 0.7;
            $('.camp_b1').height(h_size);
            _camp.height(Math.max(530,h_size_s));
		});
	}

	//页面点击下拉效果 用锚点实现的话需要设置过渡效果
	if(document.body.clientWidth > 600){
		$('.camp_icondown').bind('click',function(){
			var _targ = $(this).attr('data-target'),
				c_h = $('.camp_b7').height(),
				_h = (h_h + w_h - c_h)/2,
				_o = $(_targ).offset().top - _h;
			$('html,body').animate({scrollTop:_o},2000);
		});
	}
	// 页面应用群动画效果
	var list_ind = 0,
        tog_time,
		len = $('.b5_ct_list').find('li').length;

	function showList(ind){
		$('.b5_ct_list').find('li').eq(ind).addClass('b5_list_selected').siblings().removeClass('b5_list_selected');
		$('.b5_ct_img').find('li').eq(ind).stop(true,true).show().siblings().stop(true,true).hide();
	}

	$('.b5_ct_list').on('click','li',function(){
        list_ind = $(this).index();
        showList(list_ind);
	});

	$('.b5_ct_img').mouseenter(function(){
		clearInterval(tog_time);
	}).mouseleave(function(){
		tog_time = setInterval(function(){
            showList(list_ind);
            list_ind++;
            if(list_ind == len){ list_ind = 0;}

		},4000);
	}).mouseleave();

	/*news.html 分页*/
	/*
	* $("your className").pageBean({ //your className: 放置整个分页的盒子
	 *      perPageNum : 4  //每页显示新闻的数量
	 *      nowPage    : 1  //初始显示的页码
	 *      pageClass  : "your pageClass" //你用来放置页码的div盒子
	 *      list       : [
	 *          {
	 *              imgUrl: "图片地址",
	 *              url   : "跳转页面地址",
	 *              title : "新闻标题",
	 *              detail: "新闻描述",
	 *              time  : "发布时间"
	 *          }
	 *      ]
	 * })
	* */
	(function($){
	/*定义默认数据对象*/
		var defaults = {
            perPageNum : 4,
            nowPage     : 1,
            pageClass   : '.pg_nums',
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

        $.fn.extend({
            'pageBean' : function(options){
                var $this = $(this);
                // 先合并数据
                var opts = $.extend({}, defaults, options);
                // 设定新闻模板
                var tmpl ="<div class='news_list_item'>" +
                    "<div class='news_item_img'><img src='' alt='' /></div>" +
                    "<div class='news_item_d'>" +
                    "<h1><a href='' target='_blank'></a></h1>" +
                    "<time></time>" +
                    "<p></p>" +
                    "</div>" +
                    "</div>";
                // 设定分页模板
                var tmplPage = "<a javascrip='void(0);' class='pg_num'></a>";
                // 获取总页数
                var allPageNum = $.fn.pageBean.getPageNum(opts.list, opts.perPageNum);

                //给当前页面传入新闻
                function addPageNew(nowPage){
                    var nowPageArr = $.fn.pageBean.pagination(opts.list, nowPage, opts.perPageNum);
                    $this.find('.news_list_item').remove();
                    for(var i=0;i<nowPageArr.length;i++){
                        $this.append(tmpl);
                    }
                    for(var j=0;j<nowPageArr.length;j++){
                        $this.children('.news_list_item').eq(j).find('.news_item_img img').attr('src',nowPageArr[j].imgUrl);
                        $this.children('.news_list_item').eq(j).find('.news_item_d h1 a').attr('href',nowPageArr[j].url);
                        $this.children('.news_list_item').eq(j).find('.news_item_d h1 a').text(nowPageArr[j].title);
                        $this.children('.news_list_item').eq(j).find('.news_item_d time').text(nowPageArr[j].time);
                        $this.children('.news_list_item').eq(j).find('.news_item_d p').text(nowPageArr[j].detail);
                    }
                }
                // 给分页传页码
                for(var t=0;t<allPageNum;t++){
                    var everyPageNum = $(tmplPage).text(t+1);
                    $this.find(opts.pageClass).append(everyPageNum);
                }
                // 给分页页码绑事件
                $this.find(opts.pageClass).children('a').click(function(e){
                    var ee = event;
                    console.log(ee);
                    $(this).addClass('selected').siblings().removeClass('selected');
                    var nowPage = parseInt($(this).text());
                    addPageNew(nowPage);
                });
                // 触发第一页码的事件
                $this.find(opts.pageClass).children('a').eq(opts.nowPage-1).trigger('click');
            }
        });
	//获取总页数fun
	/*
	* param  arr : 总新闻数组
	* param  perPageNum  : 每页新闻个数
	* */
        $.fn.pageBean.getPageNum = function(arr,perPageNum){
            return Math.ceil(arr.length / perPageNum);
        };
	// 获取每页新闻数
	/*
	* param  arr : 总新闻数组
	* param  pgNum ：当前新闻页数
	* param  perPageNum : 每页新闻个数
	* */
        $.fn.pageBean.pagination = function(arr,pgNum,perPageNum){
            var perPageArr = arr.slice((pgNum-1) * perPageNum, pgNum * perPageNum);
            return perPageArr;
        };

	})(jQuery);

	// 给pageBean()传参
	$(function(){
        $('.news_ct_list').pageBean({
            list : [
                {
                    imgUrl: "../../sucai/img/news/ct32.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823319&idx=1&sn=f9093d2aa7a0f203fe0d00fcf6f5aed2" +
                    "&chksm=80c5f6deb7b27fc8806db816e3c887c940fdabe15d53c46f188076fa2e4648ed5fe0bc6807ad" +
                    "&mpshare=1&scene=23&srcid=0929rGvuzB9WdEeyn4lQ05OL#rd",
                    title : "迎新特辑 | 中央财经大学数字迎新现“新亮点”，开学活动实力圈粉",
                    detail: "9月，中央财经大学的老生陆陆续续回到校园，新生们也收拾行囊到校报到，新学期，中财学子们都开始了一场全新的求学旅程...",
                    time  : "2017-09-25"
                },
                {
                    imgUrl: "../../sucai/img/news/ct31.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823246&idx=1&sn=e4923244cbbb860f05cf65090f2b4dbb" +
                    "&chksm=80c5f607b7b27f1124c1da65e5eab8500cb66adf7f57d6062a3ba33d53e7dcf4de210698ceaf&mpshare=1&scene=23" +
                    "&srcid=0929OgxE8RvRole4ime5Io7U#rd",
                    title : "兰途出品|江苏农牧科技职业学院移动校园上线",
                    detail: "9月5日，由兰途科技承建的江苏农牧科技职业学院官方移动信息服务平台（简称“爱牧院”）上线运行啦...",
                    time  : "2017-09-08"
                },
                {
                    imgUrl: "../../sucai/img/news/ct30.jpg",
                    url   :"http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823225&idx=1&sn=78d8fce8601f2789a49893aefcc812fa" +
                    "&chksm=80c5f670b7b27f667155a57b24ea318acbbc5911858a547ee8b90f5a4e0a7b7d06dc220e64a2&mpshare=1" +
                    "&scene=23&srcid=0929yUeOcw7XKoXGWWt7w0W3#rd",
                    title : "迎新特辑|直击北京电子科技职业学院100%扫码报到",
                    detail: "​北京电子科技职业学院2017级新生报到与往年不同,新生在入校前即可下载安装移动应用“i电科”，登录APP后可随时随地了解学校情况、新闻公告...",
                    time  : "2017-09-01"
                },
                {
                    imgUrl: "../../sucai/img/news/ct33.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823148&idx=1&sn=294b4125a0034181f052a2c201d3fbb0" +
                    "&chksm=80c5f1a5b7b278b33651e12122d30f0bc7fab8009414552cdb923d3c0637fb206cbd7d37f22e&mpshare=1&scene=23" +
                    "&srcid=0929BiKcVlwY24DoYcKyPeSo#rd",
                    title : "案例|北京建外街道秀水社区“五微”线上教育平台",
                    detail: "2017年7月19日上午10:00，北京市朝阳区建外街道秀水社区在建外外交公寓的新闻媒体发布中心召开了“五微”线上学习平台的发布会...",
                    time  : "2017-08-23"
                },
                {
                    imgUrl: "../../sucai/img/news/ct29.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823116&idx=1&sn=ed48b5ca2255702e1eed72453e29c5bd" +
                    "&chksm=80c5f185b7b2789344e006025b5aba49c301a34dc4600c4f656593a928406dea69c9cc2e4b59&mpshare=1" +
                    "&scene=23&srcid=0929KS8tidLhG2eZZxQzLkfL#rd",
                    title : "河南城建学院官方APP上线，新生提前感受云端校园生活",
                    detail: "河南城建学院面向2017级新生正式推出官方校园移动微门户应用——“河南城建学院移动校园APP”，提供校园资讯、教务、办公、学习生活等功能服务...",
                    time  : "2017-08-07"
                },
                {
                    imgUrl: "../../sucai/img/news/ct28.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823113&idx=1&sn=9411233e61494c99fe6b71fa320e3cc8" +
                    "&chksm=80c5f180b7b278960b6821b10178bdcc9d1a9296a5e3b18f4e5d5f44def070bb57a35af126f4&mpshare=1&scene=23" +
                    "&srcid=0929FqqJb6E7RiozxAAKiIRL#rd",
                    title : "“i电科”APP上线，今夏启动掌上迎新服务",
                    detail: "​当前高校信息化建设正从数字校园向智慧校园迈进，随着移动智能终端设备的普及，掌上应用必将渗透到高校信息化建设的方方面面...",
                    time  : "2017-08-03"
                },
                {
                    imgUrl: "../../sucai/img/news/ct27.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823051&idx=1&sn=4b4fb8bce7a7bb91d13e01061cbe1465" +
                    "&chksm=80c5f1c2b7b278d420b76396726dffe18bc2ff0ac4682baf4b59cd3c1e2835118a6c540a3076" +
                    "&mpshare=1&scene=23&srcid=0929xMfIai2WTMwNj6GLE7cR#rd",
                    title : "上线一周年，“长安大学APP”总访问量突破两百万大关！",
                    detail: "​自2016年7月4日，兰途科技为长安大学承建官方移动应用服务平台（简称“长安大学APP”）上线至今，已经刚好整整一年...",
                    time  : "2017-07-04"
                },
                {
                    imgUrl: "../../sucai/img/news/ct26.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823021&idx=1&sn=d0e69fe3c01aacff26a0f6987ea743d6" +
                    "&chksm=80c5f124b7b27832ab2c4c778db26db4207aca9ae99001ad0f735696edbabf7167443a8a67ef" +
                    "&mpshare=1&scene=23&srcid=09296wbjqqRvAHZplZI2bdgr#rd",
                    title : "案例|看中央财经大学如何1小时内完成千人会议签到",
                    detail: "​兰途科技于近日上线启用了移动校园「会议签到」功能，校领导和老师通过移动中财大APP和微信企业号便可实现掌上会议签到...",
                    time  : "2017-06-15"
                },
                {
                    imgUrl: "../../sucai/img/news/ct9.jpg",
                    url   : "http://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658823005" +
                    "&idx=1&sn=bf01a999dc45df573a0442bf900613bb&chksm=80c5f114b7b278" +
                    "02a59fda5a9a0a1024e3971ba392ded1086aefa32027d493768ba25dd529ce" +
                    "&mpshare=1&scene=23&srcid=0614VV2F7w6nPFxlPXw1tn0S#rd",
                    title : "兰途出品|“掌上河中医”试运行上线啦",
                    detail: "​随着信息技术的发展，移动门户随之走进了校园。为了更好的服务全校教职工生，河南中医药大学网络信息中心于2016年12月起与兰途科技共同建设...",
                    time  : "2017-06-09"
                },
                {
                    imgUrl: "../../sucai/img/news/ct8.jpg",
                    url   : "http://www.caigou.com.cn/news/20170424108.shtml",
                    title : "兰途科技参加CERNET西南地区学术年会",
                    detail: "​为进一步加强西南地区各高校数字校园建设，分享信息化建设实践中的有益经验、交流信息领域的关键技术和应用，进一步促进CERNET西南地区各高校...",
                    time  : "2017-04-24"
                },
                {
                    imgUrl: "../../sucai/img/news/ct10.jpg",
                    url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822895" +
                    "&idx=1&sn=a2edd0d5dba65f9ad2b2f633ef0839a1&chksm=80c5f0a6b7b279b01ac3554" +
                    "4aa73f59fab58070d35297f510eb1ed137dafc684e8e2929e8c0f&mpshare=1&scene=23" +
                    "&srcid=0614xSalSzfg5auWBvNiaD7Y#rd",
                    title : "兰途出品|中国海洋大学移动门户“i中国海大”拉新运营活动圆满落幕",
                    detail: "​近日，兰途科技携手中国海大网络协会策划运营了“花开海大”主题摄影大赛，旨在调动师生对“i中国海大”的参与度和使用率，同时丰富中国海洋大学的校园文化生活...",
                    time  : "2017-04-18"
                },
                {
                    imgUrl: "../../sucai/img/news/ct21.jpg",
                    url   : "https://mp.weixin.qq.com/s?__biz=MzAxMDc3NjM1OA==&mid=2658822888&idx=1&sn=45e38d4850ca12e6dece79f16dff0172&" +
                    "chksm=80c5f0a1b7b279b79fa46a64162ed79a1a7e482f5c1b4b100eb4856d312ad5c8350c32699ae0&" +
                    "mpshare=1&scene=23&srcid=0614LrEPIFQNqMVvWJR0vhCZ#rd",
                    title : "由兰途科技策划运营的中财一卡通设计初赛圆满结束！",
                    detail: "4月13日，由中央财经大学网络信息中心、数字化校园建设办公室主办、校文化与传播学院承办、兰途科技协办并策划运营执行的“中央财经大学一卡通卡面设计大赛”的初赛评选工作已圆满结束...",
                    time  : " 2017-04-14"
                }
            ]
        });
        $('.first_pg').click(function(){
        	$(this).siblings('.pg_nums').children('a:first-child').trigger('click');
		});
        $('.last_pg').click(function(){
        	$(this).siblings('.pg_nums').children('a:last-child').trigger('click');
		});
        $('.next_pg').click(function(){
        	$(this).siblings('.pg_nums').children('a.selected').next().trigger('click');
		});
        $('.pre_pg').click(function(){
        	$(this).siblings('.pg_nums').children('a.selected').prev().trigger('click');
		});
	});

});