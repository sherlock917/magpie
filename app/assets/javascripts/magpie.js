$(document).on('ready', function () {

  var img  = 'http://scauhci.qiniudn.com/magpie.jpg';
  var link = 'http://magpie.scauhci.org/';
  var appid = '';
  var title = '这里是标题';
  var desc = '这里是描述';

  $('#submit').on('click', function () {
    var marco = $('#marco').val();
    var polo = $('#polo').val();

    if (marco != '' && polo != '') {
      $(this).text('努力寻找中。。。');
      $.get('/seek/' + marco + '/' + polo, function(data) {
        if (data.status == 'empty') {
          $('#message-content').html('TA还没来过<br>分享到<em>朋友圈</em><br>让更多的TA知道');
        } else if (data.status == 'fail') {
          if (data.followers > 0) {
            $('#message-content').html('TA好像对你没XING趣<br>但是有<em>' + data.followers + '</em>个TA关注了你<br>分享到<em>朋友圈</em>看看是TA是谁');
          } else {
            $('#message-content').html('TA好像对你没XING趣<br>分享到<em>朋友圈</em>然后洗洗睡吧');
          }
        } else if (data.status == 'success') {
          $('#message-content').html('<em>TA也对你有XING趣！</em><br>赶紧行动约TA过七夕吧！<br>然后分享到<em>朋友圈</em>炫耀一下');
        }
        $('#message').show().animate({opacity : 1}, 500);
      });
    }

    return false;
  });

  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    
    WeixinJSBridge.on('menu:share:appmessage', function(argv){

      WeixinJSBridge.invoke('sendAppMessage',{
        "appid": appid,
        "link": link,
        "title": title,
        "desc": desc,
        "img_url": img,
        "img_width": "200",
        "img_height": "200"
      }, function(res) {});

    });

    WeixinJSBridge.on('menu:share:timeline', function(argv) {

      WeixinJSBridge.invoke('shareTimeline', {
        "link": link,
        "title": title,
        "desc": desc,
        "img_url": img,
        "img_width": "200",
        "img_height": "200"
      }, function(res) {});

    });

  }, false);

});