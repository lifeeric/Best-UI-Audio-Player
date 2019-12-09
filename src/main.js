// this is the project files
require('./index.html');
require('./main.scss');
require('./images/Poster1.jpg');
require('../node_modules/materialize-css/sass/materialize.scss');
require('../node_modules/material-icons/iconfont/material-icons.scss');

// also you should upload audio file here if you're using webpack
require('./sounds/Song1.mp3');
require('./sounds/Song2.mp3');
require('./sounds/Song3.mp3');

require('./images/Poster1.jpg');
require('./images/Poster2.jpg');
require('./images/Poster3.jpg');




// Here is the Actual Code //

const Songs  = ['Song1', 'Song2', 'Song3'];
const poster = ['Poster1', 'Poster2', 'Poster3'];



// get the Play button in order to take some action
let playMe = document.getElementsByClassName('player__controls__buttons__play')[0];

// get the title element from player UI
let titleOfSong = document.getElementsByClassName('player__controls__title')[0];

// we keep audio object here
let audio = new Audio();

// next, prev button
let prev = document.getElementsByClassName('player__controls__buttons__prev')[0];
let next = document.getElementsByClassName('player__controls__buttons__next')[0];
// song number set it to 0
let trackMe = 0;






// When DOM loaded without any file like css,
window.addEventListener('DOMContentLoaded', () => {

    // assign src to that
    audio.src = `/sounds/${Songs[trackMe]}.mp3`;

    // set title of the song
    titleOfSong.textContent = `${Songs[trackMe]}`;

    // invoked the timer function, so that we show the exact time of the song, but there was problem
    // getting the duration of the song, I came across with the below solution thankfull
    audio.play();
    audio.volume = 0; // no sound, if played
    setTimeout(() => {
        audio.currentTime = 0; // set starting point to 0sec
        audio.pause();

        timer();
        audio.volume = 1;
    }, 500);
    


});






// the action is here, when user clicks on play button, so play it
playMe.addEventListener('click', () => {

    // now play it, get excited, woooooooooohaaaaaaa!

    // change the play button to pause
    //let pauseMe = playMe.children[0].innerHTML === 'pause'; 

    if( audio.paused ) // if it's paused, so play it
        playMe.children[0].innerHTML = "pause", audio.play();
    else
        playMe.children[0].innerHTML = "play_arrow", audio.pause();

});



// Show the timer
const timer = () => {

    let cur = audio.currentTime // for getting the current time, initial is 0
    let dur = audio.duration; // total time
   
    // divide it for getting percentage
    let per = cur / dur;
    document.getElementsByClassName('player__controls__timing__seek-bar__done')[0].style.width = 100 * per + 'px';

    // if the cur is reached to end
    if( cur === dur && !audio.loop )
    {

        // for Single Loop only
        if( countLoop === 1 ){
            changeSong(trackMe);
            countLoop = 0;
            return;
        }

        changeSong(trackMe++);
    }

    // invoke timeElapsed
    cur = timeElapsed(cur);
    dur = timeElapsed(dur);

    // render it
    document.getElementById('current-time').innerHTML = cur;
    document.getElementById('duration').innerHTML = dur;
}



// Time Elapsed
const timeElapsed = time => {

    let sec = Math.floor(time % 60); // find seconds
    let min = Math.floor(time / 60); // find mins

    if ( sec < 10)
        sec = '0' + sec;
    if ( min < 10)
        min = '0' + min;

    // return it
    return min + ':' + sec; 
}




// update seek bar and time
audio.addEventListener('timeupdate', timer)









// hand the next and prev button
next.onclick = () => {
    trackMe++;
    changeSong(trackMe);
}

prev.onclick = () => {
    trackMe--;
    changeSong(trackMe);
}

const changeSong = () => {

    if(trackMe >= Songs.length ) trackMe = 0;
    if( trackMe < 0 ) trackMe = Songs.length -1;
    audio.src = `/sounds/${Songs[trackMe]}.mp3`;
    titleOfSong.innerHTML = `${Songs[trackMe]}`
    document.getElementsByTagName('img')[0].src = `/images/${poster[trackMe]}.jpg`;
    document.getElementsByTagName('img')[1].src = `/images/${poster[trackMe]}.jpg`; 
    
    // I'm getting very late for going to seelp, I'm writing the code, but I don't know I'm doing

    timer();
    audio.play();
    playMe.children[0].innerHTML = "pause";
}




// for Volume
let volUp = document.getElementById('volUp');
let volDm = document.getElementById('volDm');
let mute  = document.getElementById('mute');
let volume = 0.5;
volUp.onclick = () => {
    Changevolume( Math.floor(volume += 0.1))
}

volDm.onclick = () => {
    Changevolume(Math.floor(volume -= 0.1))
}

mute.onclick = () => {
    audio.volume = 0;
}

const Changevolume = Vol => {
    console.log(volume)
    if( Vol > 1 ) volume = 1;
    if ( Vol < 0) volume = 0;
    audio.volume = volume;
}


// for loop

let loop = document.getElementById('loop');
let loopOnce = document.getElementById('loopOnce');
let countLoop;

loop.onclick = () => {
    audio.loop = true;
};

loopOnce.onclick = () => {
    countLoop = 1;
}
// for shuffle

let shuffle = document.getElementById('shuffle');

shuffle.onclick = () => {

    for(let i = Songs.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = Songs[i]
        Songs[i] = Songs[j]
        Songs[j] = temp
    }

    for(let i = poster.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = poster[i]
        poster[i] = poster[j]
        poster[j] = temp
    }

}