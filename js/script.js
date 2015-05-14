(function($){
  // Settings
  var repeat = localStorage.repeat || 0,
    shuffle = localStorage.shuffle || 'false',
    continous = true,
    autoplay = true,
    playlist = [
    {
        "title": "いとしき日々よ",
        "artist": "平井坚"
    },
    {
        "title": "瞳をとじて",
        "artist": "平井坚"
    },
    {
        "title": "1",
        "artist": "1"
    },
    {
        "title": "仆は君に恋をする",
        "artist": "平井坚"
    },
    {
        "title": "属于你的我的初恋",
        "artist": "平井坚"
    },
    {
        "title": "君の好きなとこ",
        "artist": "平井坚"
    }
    ] 

  // Load playlist
  for (var i=0; i<playlist.length; i++){
  var item = playlist[i];
  $('#playlist').append('<li>'+item.title+' - '+item.artist+'</li>');
  }

  // Load lyrics, using static one for now..
  $('#lyrics').append('<p>'+'爱しき日々よ  --  相恋的日子啊'+'</p>'+
    '<p>'+'たとえ时がうつろうと 缝い合わせた绊は决して解けない'+'</p>'+
    '<p>'+'假如时间可以推移 相连的羁绊是绝对不会解开'+'</p>'+
    '<p>'+'あああなたの声は 忘れれば忘れゆくほどに 焼き付いてた'+'</p>'+     
    '<p>'+'你的声音 越想忘记越 铭记不忘'+'</p>'+

    '<p>'+'あなたの手を强く握ることも あなたを抱きしめることも'+'</p>'+         
    '<p>'+'我知道用力握你的手 与你紧紧拥抱 都得不到命运的允许'+'</p>'+
    '<p>'+'许されない运命だと知ってても その笑颜に その涙に そのひたむきな思いに触れたかった 心から。。。。  '+'</p>'+                               
    '<p>'+'就算这样我还是想 抚摸那笑面 那泪水 那一心一意的思念. 发自内心..'+'</p>'+

    '<p>'+'爱しき日々よ  サヨナラは言わないで'+'</p>'+                          
    '<p>'+'相恋的日子啊 请不要说再见好吗？'+'</p>'+
    '<p>'+'あなたに会いたくて もう一度会いたくて 届くまで叫び続ける'+'</p>'+    
    '<p>'+'很想见到你 真的好想再一次见到你 我一直呼叫着直到你听到为止'+'</p>'+
    '<p>'+'忘れはしない この体が消えても'+'</p>'+                               
    '<p>'+'就算我消失了 也绝不会忘记'+'</p>'+
    '<p>'+'あなたに吹く风よ あなたに咲く花よ'+'</p>'+                           
    '<p>'+'为你唤起的风啊 为你绽开的花啊'+'</p>'+
    '<p>'+'あなたと追いかけた明日よ また会いたくて'+'</p>'+                     
    '<p>'+'和你一起追赶的明天啊 还想再见一次'+'</p>'+

    '<p>'+'今も胸に残るよ 世界で一番美しい夕阳が'+'</p>'+                       
    '<p>'+'现在还留在心中哦 '+'</p>'+ 
    '<p>'+'ああその瞳には 不安より大きな希望が辉いてた'+'</p>'+                 
    '<p>'+'世上最美的夕阳 把不安掩盖的希望在你的双眼里闪耀着'+'</p>'+

    '<p>'+'ただ近くで见つめあえるだけで 幸せのすべてを知った'+'</p>'+           
    '<p>'+'只要近近的互相凝视 就能感受幸福的真谛'+'</p>'+
    '<p>'+'道の先に哀しみが待ってても'+'</p>'+                                  
    '<p>'+'就算一个人在马路边悲哀的等待着'+'</p>'+
    '<p>'+'その愿いを その言叶を その一筋の光を守りたかった'+'</p>'+            
    '<p>'+'也想守护那个愿望 那一句话 那一寸光'+'</p>'+
    '<p>'+'いつまでも。。。'+'</p>'+                                            
    '<p>'+'直到永远'+'</p>'+

    '<p>'+'その笑颜に その涙に そのひたむきな思いに触れたかった'+'</p>'+        
    '<p>'+'但我还是想 抚摸那笑面 那泪水 那一心一意的思念.'+'</p>'+
    '<p>'+'心から。。。。'+'</p>'+                                              
    '<p>'+'发自内心..'+'</p>'+

    '<p>'+'爱しき日々よ  サヨナラは言わないで'+'</p>'+                          
    '<p>'+'相恋的日子啊 请不要说再见好吗？'+'</p>'+
    '<p>'+'あなたに会いたくて もう一度会いたくて 届くまで叫び続ける'+'</p>'+    
    '<p>'+'很想见到你 真的好想再一次见到你 我一直呼叫着直到你听到为止'+'</p>'+
    '<p>'+'忘れはしない この体が消えても'+'</p>'+                               
    '<p>'+'就算我消失了 也绝不会忘记'+'</p>'+
    '<p>'+'あなたに吹く风よ あなたに咲く花よ'+'</p>'+                           
    '<p>'+'为你唤起的风啊 为你绽开的花啊'+'</p>'+
    '<p>'+'あなたと追いかけた明日よ また会いたくて '+'</p>'+                    
    '<p>'+'和你一起追赶的明天啊 还想再见一次'+'</p>'+
    '<p>'+'爱しき日々よ いま歩きだそう '+'</p>'+                                
    '<p>'+'想恋的日子啊 现在我将踏出这一步'+'</p>');

  var time = new Date(),
    currentTrack = shuffle === 'true' ? time.getTime() % playlist.length : 0,
    trigger = false,
    audio, timeout, isPlaying, playCounts;

  var play = function(){
    audio.play();
    $('.playback').addClass('playing');
    timeout = setInterval(updateProgress, 500);
    isPlaying = true;
  }

  var pause = function(){
    audio.pause();
    $('.playback').removeClass('playing');
    clearInterval(updateProgress);
    isPlaying = false;
  }

  // Update progress
  var setProgress = function(value){
    var currentSec = parseInt(value%60) < 10 ? '0' + parseInt(value%60) : parseInt(value%60),
      ratio = value / audio.duration * 100;

    $('.timer').html(parseInt(value/60)+':'+currentSec);
    $('.progress .pace').css('width', ratio + '%');
    $('.progress .slider a').css('left', ratio + '%');
  }

  var updateProgress = function(){
    setProgress(audio.currentTime);
  }

  // Progress slider
  $('.progress .slider').slider({step: 0.1, slide: function(event, ui){
    $(this).addClass('enable');
    setProgress(audio.duration * ui.value / 100);
    clearInterval(timeout);
  }, stop: function(event, ui){
    audio.currentTime = audio.duration * ui.value / 100;
    $(this).removeClass('enable');
    timeout = setInterval(updateProgress, 500);
  }});

  // Volume slider
  var setVolume = function(value){
    audio.volume = localStorage.volume = value;
    $('.volume .pace').css('width', value * 100 + '%');
    $('.volume .slider a').css('left', value * 100 + '%');
  }

  var volume = localStorage.volume || 0.5;
  $('.volume .slider').slider({max: 1, min: 0, step: 0.01, value: volume, slide: function(event, ui){
    setVolume(ui.value);
    $(this).addClass('enable');
    $('.mute').removeClass('enable');
  }, stop: function(){
    $(this).removeClass('enable');
  }}).children('.pace').css('width', volume * 100 + '%');

  $('.mute').click(function(){
    if ($(this).hasClass('enable')){
      setVolume($(this).data('volume'));
      $(this).removeClass('enable');
    } else {
      $(this).data('volume', audio.volume).addClass('enable');
      setVolume(0);
    }
  });

  // Switch track
  var switchTrack = function(i){
    if (i < 0){
      track = currentTrack = playlist.length - 1;
    } else if (i >= playlist.length){
      track = currentTrack = 0;
    } else {
      track = i;
    }

    $('audio').remove();
    loadMusic(track);
    if (isPlaying == true) play();
  }

  // Shuffle
  var shufflePlay = function(){
    var time = new Date(),
      lastTrack = currentTrack;
    currentTrack = time.getTime() % playlist.length;
    if (lastTrack == currentTrack) ++currentTrack;
    switchTrack(currentTrack);
  }

  // Fire when track ended
  var ended = function(){
    pause();
    audio.currentTime = 0;
    playCounts++;
    if (continous == true) isPlaying = true;
    if (repeat == 1){
      play();
    } else {
      if (shuffle === 'true'){
        shufflePlay();
      } else {
        if (repeat == 2){
          switchTrack(++currentTrack);
        } else {
          if (currentTrack < playlist.length) switchTrack(++currentTrack);
        }
      }
    }
  }

  var beforeLoad = function(){
    var endVal = this.seekable && this.seekable.length ? this.seekable.end(0) : 0;
    $('.progress .loaded').css('width', (100 / (this.duration || 1) * endVal) +'%');
  }

  // Fire when track loaded completely
  var afterLoad = function(){
    if (autoplay == true) play();
  }

  // Load track
  var loadMusic = function(i){
    var random = Math.floor(1 + Math.random() * 22);
    var item = playlist[i],
      newaudio = $('<audio>').html('<source src="./music/'+item.title+' - '+item.artist+'.mp3">').appendTo('#player');
    
    $('.cover').html('<img src="./img/bg'+random+'.jpg" alt="'+item.title+'">');
    $('.tag').html('<strong>'+item.title+'</strong><span class="artist">'+item.artist+'</span>');
    $('#playlist li').removeClass('playing').eq(i).addClass('playing');
    if ($('#playlist li').eq(i).offset().top > 600) {
      $('body').scrollTo('li.playing', {duration: 1500});
    }
    $('title').text(item.title + " - " + item.artist);
    audio = newaudio[0];
    audio.volume = $('.mute').hasClass('enable') ? 0 : volume;
    audio.addEventListener('progress', beforeLoad, false);
    audio.addEventListener('durationchange', beforeLoad, false);
    audio.addEventListener('canplay', afterLoad, false);
    audio.addEventListener('ended', ended, false);

    // change background image
    $('#background').css('background-image', 'url(./img/bg' + random + '.jpg)');

    //Update font color based on background average color
    //print $('img.photo').averageColor(); // returns an object with r, g and b properties
    //print $('img.photo').averageColorAsString(); // returns "rgb(0,0,0)"
  }

  loadMusic(currentTrack);
  $('.playback').on('click', function(){
    if ($(this).hasClass('playing')){
      pause();
    } else {
      play();
    }
  });
  $('.rewind').on('click', function(){
    if (shuffle === 'true'){
      shufflePlay();
    } else {
      switchTrack(--currentTrack);
    }
  });
  $('.fastforward').on('click', function(){
    if (shuffle === 'true'){
      shufflePlay();
    } else {
      switchTrack(++currentTrack);
    }
  });
  $('#playlist li').each(function(i){
    var _i = i;
    $(this).on('click', function(){
      switchTrack(_i);
    });
  });

  if (shuffle === 'true') $('.shuffle').addClass('enable');
  if (repeat == 1){
    $('.repeat').addClass('once');
  } else if (repeat == 2){
    $('.repeat').addClass('all');
  }

  $('.repeat').on('click', function(){
    if ($(this).hasClass('once')){
      repeat = localStorage.repeat = 2;
      $(this).removeClass('once').addClass('all');
    } else if ($(this).hasClass('all')){
      repeat = localStorage.repeat = 0;
      $(this).removeClass('all');
    } else {
      repeat = localStorage.repeat = 1;
      $(this).addClass('once');
    }
  });

  $('.shuffle').on('click', function(){
    if ($(this).hasClass('enable')){
      shuffle = localStorage.shuffle = 'false';
      $(this).removeClass('enable');
    } else {
      shuffle = localStorage.shuffle = 'true';
      $(this).addClass('enable');
    }
  });
  // 监听键盘事件
  $(document).keydown(function(event){ 
    if(event.keyCode == 37){ 
      if (shuffle === 'true'){
          shufflePlay();
      } else {
          switchTrack(--currentTrack);
      }
    } else if (event.keyCode == 39){ 
      if (shuffle === 'true'){
        shufflePlay();
      } else {
        switchTrack(++currentTrack);
      }
    } else if (event.keyCode == 32){
      event.preventDefault();
      if ($('.playback').hasClass('playing')){
        pause();
      } else {
        play();
      }
    } 
  }); 
})(jQuery);