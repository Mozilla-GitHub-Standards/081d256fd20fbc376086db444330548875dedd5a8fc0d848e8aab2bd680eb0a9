$(document).ready(function(){
    
    $('.user').val('');
    var profiles = "";
    
    //randomize the profiles
    function shuffle(o){ //v1.0
        
        //would Einstein understand this? So what makes you think you could? Let us work...
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }
    
    //how many pieces are flipped
    var flip=0;
    
    //check for the win state, 20 classes done
    var win;
    
    //timer for the game
    var timerGame;
    
    //control variables for the timer
    var _timer = 0;
    var millisecondFactor = 60;  //lesser this factor, accurate the timer will work
    var sec = 0;
    var min = 0;
    var hour = 0;
    
    //loop function to update the timer
    function runTimer() {
        _timer++;
        var millisec = _timer;
        if(millisec > millisecondFactor) {
            sec++;
            _timer = 0;
        }
        if (sec > 59) {
            min++;
            sec = 0;
        }
        if (min > 59) {
            hour++;
            min = 0;
        }
        if (hour > 23) {
            hour = 0;
        }
        var timer = '';
        if (min < 10){
            timer = '0';
        }
        timer += min;
        timer += ':';
        if (sec < 10){
            timer += '0';
        }
        timer += sec;
        timer += ':';
        if (millisec < 10){
            timer += '0';
        }
        timer += millisec;
        $('.timer').html(''+timer);
    }
    
    //reset the screen and create a new game, using the current randomized profiles
    function createGame(data){
        
        //reset the timers, we need new ones
        clearInterval(win);
        clearInterval(timerGame);
        
        //start the timer to check for the win state, 20 classes done
        win = setInterval(function(){
            if($('.done').length===20){
                $('.win').fadeIn(function(){
                    setTimeout(function(){
                        $('.win').fadeOut();
                    }, 3000);
                });
                
                //kill those bichtes
                clearInterval(win);
                clearInterval(timerGame);
            }
        }, 100);
        
        //remove all the current pieces of the game, if they are alive
        $('.game').html('');
        
        //hide the username screen
        $('.username').fadeOut();
        
        //no pieces flipped yet
        flip=0;
        
        //randomize the profiles
        var users = shuffle(data);
        
        //a simple line x column system to put the pieces in their position
        var left = 0;
        var top = 0;
        var column = 0;
        var line = 0;
        
        //create the pieces, two of each profile picture
        for (var i = 0; i<users.length; i++) {
            var profile = users[i];
            left = column*60;
            top = line*60;
            $('.game').append('<a href="#" class="piece" data-profile="'+profile.id+'" style="left:'+left+'px; top:'+top+'px"><img src="'+profile.url+'"></a>');
            column++;
            if(column===4){
                column=0;
                line++;
            }
        }
        
        //create the new game button
        $('.game').append('<button class="newGame">novo jogo</button>');
        
        //add the timer holder in the screen
        $('.game').append('<p class="timer">00:00:00</p>');
        
        //present the game screen, and show the profile pictures for one second, we are not that evil
        $('.game').fadeIn(function(){
            _timer = 0;
            sec = 0;
            min = 0;
            hour = 0;
            timerGame = setInterval(runTimer, (1000 / millisecondFactor));
        });
        setTimeout(function(){
            $('.game a img').fadeOut();
        }, 1000);
    }
    
    //variable to prevent (still a bug) maniac clicks
    var block = false;
    
    //hold the document on a variable
    var content = $(document);
    
    //create a delegate for the touch on the pieces, flip them, fry them, barrel roll
    content.delegate(".game a","click",function(){
        
        if(!block){
            block = true;
            
            //if the piece is not flipped yet and not done, we got work to do
            if(!$(this).hasClass('flipped') && !$(this).hasClass('done')){
                
                //if only one piece is flipped, we need another
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
                
                //if we have two pieces, the show may begin
                if(flip===2){
                    
                    block = true;
                    
                    flip=0;
                    
                    //if the two pieces are equal, we mark as done
                    if($('.flipped').eq(0).attr('data-profile')===$('.flipped').eq(1).attr('data-profile')){
                        $('.flipped').addClass('done');
                    }
                    
                    //the others, "we need to go back jack!"
                    setTimeout(function(){
                        
                        //remove the flipped class
                        $('.flipped').removeClass('flipped');
                        
                        //loop and search for all NOT done pieces
                        $('.game a').each(function(){
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
                    
                    //this is the flip trick, hide back all the images, to create the 3D flip effect
                    setTimeout(function(){
                        $('.game a').each(function(){
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
    
    //delegate to create a new game
    content.delegate("button.newGame","click",function(){
        
        $('.game').fadeOut(function(){
            createGame(profiles);
        });
        
    });
    
    //hide the WIN screen
    $('.win').click(function(){
        $(this).fadeOut();
    });
    
    //just a splash, just for fun
    setTimeout(function(){
        $('.splash').fadeOut();
    }, 1);
    
    //here we get the hard work done, Twitter API
    var user;
    
    //call the API of the Twitter API to request our followers profile images url
    $('button.go').click(function(){
        user = $('.user').val();
        
        //why don`t you give me cookies?
        if(user===''){
            window.alert('Preencha seu @username');
        }else{
            
            //thanks for the cookies, take your prize
            $('.user').val('Aguarde...');
            
            //do it another way, systemXRH not working, amazing!
            var scriptID = null;
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'http://jotadev.com.br/twitter/index.php?user='+user);
            script.setAttribute('id', 'xss_ajax_script');
            
            scriptID = document.getElementById('xss_ajax_script');
            if(scriptID){
                document.getElementsByTagName('head')[0].removeChild(scriptID);
            }
            
            // Insert <script> into DOM
            document.getElementsByTagName('head')[0].appendChild(script);
            
            $('#xss_ajax_script').load(function(){
                profiles = JSON.parse(JSON_DATA);
                createGame(profiles);
            });
            
            
            
        }
    });
    
});

//remove the bounce effect on the screen (we are testing on the iPhone too, maybe release it?)
$(document).bind('touchmove',function(e) {
        e.preventDefault();
    }
);