$(document).on('ready', function () {

  var img  = 'http://scauhci.qiniudn.com/magpie.jpg';
  var link = 'http://magpie.scauhci.org/';
  var appid = '';
  var title = '';
  var desc = '这里是描述';

  $('#submit').on('click', function () {
    var marco = $('#marco').val();
    var polo = $('#polo').val();

    if (marco != '' && polo != '') {
      $(this).text('努力寻找中。。。');
      $.get('/seek/' + marco + '/' + polo, function(data) {
        if (data.status == 'empty') {
          $('#message-content').html('TA还没来过<br>分享到<em>朋友圈</em><br>让更多的TA知道');
          title = '来这里找找你想一起过七夕的那个TA！'
        } else if (data.status == 'fail') {
          if (data.followers > 0) {
            $('#message-content').html('TA好像对你没XING趣<br>但是有<em>' + data.followers + '</em>个TA想约你<br>分享到<em>朋友圈</em>让TA加入');
            title = '我在这里没找到一起过七夕的那个TA，但是有' + data.followers + '个TA想约我！你呢？';
          } else {
            $('#message-content').html('TA好像对你没XING趣<br>分享到<em>朋友圈</em>然后洗洗睡吧');
            title = '我在这里没找到一起过七夕的那个TA，但是你也许可以！';
          }
        } else if (data.status == 'success') {
          $('#message-content').html('<em>TA也对你有XING趣！</em><br>赶紧行动约TA过七夕吧！<br>然后分享到<em>朋友圈</em>炫耀一下');
          title = '我在这里找到了陪我过七夕的那个TA！';
        }
        $('#message').show().animate({opacity : 1}, 500);
      });
    }

    return false;
  });

  $('#retry').on('click', function () {
    $('#message').animate({opacity : 0}, 500, function () {
      $(this).hide();
      $('#polo').val('');
      $('#submit').text('看看TA想不想跟你过七夕');
    });
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