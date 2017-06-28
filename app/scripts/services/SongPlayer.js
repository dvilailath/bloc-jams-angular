 (function() {
     function SongPlayer() {
         var SongPlayer = {};
         
         /**
         * @desc set Current song to play
         * @type {Object}
         */
         var currentSong = null;
         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;
         
         /**
         * @function SongPlayer.play
         * @desc Plays a song after checking to see if anything is playing or stopped.
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
             if (currentSong !== song) {
             /**
             * @function setSong
             * @desc Stops currently playing song and loads new audio file as currentBuzzObject
             * @param {Object} song
             */
             var setSong = function(song) {
                if (currentBuzzObject) {
                    currentBuzzObject.stop();
                    currentSong.playing = null;
                }

                currentBuzzObject = new buzz.sound(song.audioUrl, {
                    formats: ['mp3'],
                    preload: true
                });

                currentSong = song;
             };
             
             setSong(song);
             playSong(song);
            }
         };
         
         /**
         * @function SongPlayer.pause
         * @desc Pauses a song that is playing and stops currently playing song and currentBuzzObject;
         * @param {Object} song
         */
         SongPlayer.pause = function(song) {
             currentBuzzObject.pause();
             song.playing = false;
         };
         
         /**
         * @function playSong
         * @desc Plays a song that is paused and resumes currently playing song and currentBuzzObject;
         * @param {Object} song
         */
         
         playSong = function(song) {
             currentBuzzObject.play();
             song.playing = true;
         }
          
         
         return SongPlayer;
     }
    
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();