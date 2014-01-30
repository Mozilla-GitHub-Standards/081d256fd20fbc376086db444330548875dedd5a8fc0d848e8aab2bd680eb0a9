$(document).ready(function(){
    
    function shuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    var flip=0;
    var profileID = 0;
    
    function createGame(data){
        $('.game').html('');
        $('.username').fadeOut();
        
        flip=0;
        profileID = 0;
        
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
    }
    
    var content = $(document);
    content.delegate(".game div","click",function(){
        
        var profileClick = $(this).attr('data-profile');
        
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
            }
            if(flip===2){
                flip=0;
                setTimeout(function(){
                    $('.game div').transition({
                        perspective: '100px',
                        rotateY: '0deg'
                    });
                    $('.game div').removeClass('flipped');
                    $('.game div').css({backgroundImage:'url(img/app/back.png)'});
                }, 350);
                setTimeout(function(){
                    $('.game div img').fadeOut(50);
                }, 500);
            }
        }
        
    });
    
    setTimeout(function(){
        $('.splash').fadeOut();
    }, 1);
    
    var user;
    
    $('button').click(function(){
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
                var profiles = xhr.response;
                createGame(profiles);
            };
        }
    });
    
});