 (function() {
     function SongPlayer(Fixtures) {
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
         * @desc Plays a song that is paused and resumes currently playing song and currentBuzzObject;
         * @param {Object} song
         */
         var playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         }
         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };
         
         /**
         * @desc set Current song to play
         * @type {Object}
         */
         SongPlayer.currentSong = null;
          
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
         };

         return SongPlayer;
     }
    
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();