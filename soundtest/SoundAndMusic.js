var audioFormat;

function setFormat() {
    var audio = new Audio();
    if (audio.canPlayType("audio/mp3")) {
        audioFormat = ".mp3";
    } else {
        audioFormat = ".ogg";
    }
}

function SoundOverlapsClass() {
    this.load = function (filenameWithPath) {
        setFormat();

        this.altSoundTurn = false;
        this.mainSound = new Audio(filenameWithPath + audioFormat)
        this.altSound = new Audio(filenameWithPath + audioFormat)
    }

    this.play = function() {
        if(this.altSoundTurn) {
            this.altSound.currentTime = 0;
            this.altSound.play();
        } else{
            this.mainSound.currentTime = 0;
            this.mainSound.play();
        }
        this.altSoundTurn = !this.altSoundTurn
    }
}

function BackgroundMusicClass()	{
    var	musicSound	= null;
            
    this.loopSong = function(filenameWithPath)	{
            setFormat();
            
            if(musicSound	!= null)	{
                    musicSound.pause();
                    musicSound	= null;
            }
            musicSound	= new Audio(filenameWithPath+audioFormat);
            musicSound.loop	= true;
            musicSound.play();
    }
    
    this.startOrStopMusic = function()	{
            if(musicSound.paused)	{
                    musicSound.play();
            }	else	{
                    musicSound.pause();
            }
    }
}