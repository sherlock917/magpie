$(document).on('ready', function () {

  var img  = 'http://www.baidu.com/img/baidu_sylogo1.gif';
  var link = 'http://www.baidu.com/';
  var appid = '';
  var title = '';
  var desc = '';

  $('#submit').on('click', function () {
    var marco = $('#marco').val();
    var polo = $('#polo').val();

    $.get('/seek/' + marco + '/' + polo, function(data) {
      if (data.status == 'empty') {
        alert('empty');
      } else if (data.status == 'fail') {
        alert('fail');
      } else if (data.status == 'success') {
        alert('success');
      }
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