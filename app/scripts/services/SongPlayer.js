 (function() {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};
         
         /**
         * @desc set current Album so we can access the song info of our Album
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();
         
         /**
         * @desc Get song index of song
         * @type {Object}
         */
         var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
         };
         
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
        
         /**
         * @function playSong
         * @desc Plays a song
         * @param {Object} song
         */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         }
         
         /**
         * @function stopSong
         * @desc Stops a song
         * @param {Object} song
         */
         var stopSong = function(song) {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null;
         }
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         
         var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
             
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                 SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            SongPlayer.currentSong = song;
         };
         
         /**
         * @desc set Current song to play
         * @type {Object}
         */
         SongPlayer.currentSong = null;
         
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
         
         /**
         * @desc Current volume to be set
         * @type {Number}
         */
         SongPlayer.volume = 80;
         
         /**
         * @function play
         * @desc Play current or new song
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong(song);
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong(song);
                 }
            }
         };
         /**
         * @function pause
         * @desc Pause current song
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };
          
         /**
         * @function SongPlayer.previous
         * @desc Previous song is played if a current song is playing by decreasing song index
         * @param {Object} song
         */
         SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
             
            if (currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };
         
         /**
         * @function SongPlayer.next
         * @desc Next song is played incrementing current song index and stops if no song is next
         * @param {Object} song
         */
         SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex >= currentAlbum.songs.length) {
                //set curretSongIndex to 0 if you don't want song to stop
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };
                  
         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
         SongPlayer.setCurrentTime = function(time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };
         
         /**
         * @function setVolume
         * @desc Set volume of seekBar
         * @param {Number} volume
         */
         SongPlayer.setVolume = function(volume) {
             if (currentBuzzObject) {
                 currentBuzzObject.setVolume(volume);
                 console.log(volume);
             }
         };

        return SongPlayer;
    }
    
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();