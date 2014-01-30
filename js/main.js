$(document).ready(function(){
    
    var profiles = "";
    
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    var flip=0;
    var win;
    
    function createGame(data){
        
        clearInterval(win);
        
        win = setInterval(function(){
            if($('.done').length===20){
                window.alert('voce venceu');
                clearInterval(win);
            }
        }, 100);
        
        $('.game').html('');
        $('.username').fadeOut();
        
        flip=0;
        
        var users = shuffle(data);
        var left = 0;
        var top = 0;
        var column = 0;
        var line = 0;
        for (var i = 0; i<users.length; i++) {
            var profile = users[i];
            left = column*60;
            top = line*60;
            $('.game').append('<div class="piece" data-profile="'+profile.id+'" style="left:'+left+'px; top:'+top+'px"><img src="'+profile.url+'"></div>');
            column++;
            if(column===4){
                column=0;
                line++;
            }
        }
        $('.game').append('<button class="newGame">novo jogo</button>');
        $('.game').fadeIn();
    }
    
    var block = false;
    var content = $(document);
    content.delegate(".game div","click",function(){
        
        if(!block){
            block = true;
            if(!$(this).hasClass('flipped') && !$(this).hasClass('done')){
                if(flip<2){
                    $(this).transition({
                        perspective: '100px',
                        rotateY: '180deg'
                    });
                    $(this).find('img').fadeIn(300);
                    $(this).css({backgroundImage:'url(img/app/front.png)'});
                    $(this).addClass('flipped');
                    flip++;
                    block = false;
                }
                if(flip===2){
                    
                    block = true;
                    
                    flip=0;
                    
                    if($('.flipped').eq(0).attr('data-profile')===$('.flipped').eq(1).attr('data-profile')){
                        $('.flipped').addClass('done');
                    }
                    
                    setTimeout(function(){
                        
                        $('.flipped').removeClass('flipped');
                        
                        $('.game div').each(function(){
                            if(!$(this).hasClass('done')){
                                $(this).transition({
                                    perspective: '100px',
                                    rotateY: '0deg'
                                });
                                $(this).removeClass('flipped');
                                $(this).css({backgroundImage:'url(img/app/back.png)'});
                            }
                        });
                        
                        block = false;
                        
                    }, 350);
                    setTimeout(function(){
                        $('.game div').each(function(){
                            if(!$(this).hasClass('done')){
                                $(this).find('img').fadeOut(50);
                            }
                        });
                        block = false;
                    }, 500);
                }
            }
        }
        
    });
    
    content.delegate("button.newGame","click",function(){
        
        $('.game').fadeOut(function(){
            createGame(profiles);
        });
        
    });
    
    setTimeout(function(){
        $('.splash').fadeOut();
    }, 1);
    
    var user;
    
    $('button.go').click(function(){
        user = $('.user').val();
        if(user===''){
            window.alert('Preencha seu @username');
        }else{
            $('.user').val('Aguarde...');
            var xhr = new XMLHttpRequest({ mozSystem: true });
            xhr.open("GET", "http://179.111.137.145/twitter/index.php", true);
            xhr.responseType="json";
            xhr.send();
            xhr.onload = function(){
                profiles = xhr.response;
                createGame(profiles);
            };
        }
    });
    
});