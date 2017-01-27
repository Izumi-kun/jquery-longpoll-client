module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            all: {
                files: {
                    'dist/jquery.longpoll.min.js': ['src/jquery.longpoll.js']
                },
                options: {
                    banner: '/* jQuery LongPoll client script */\n'
                }
            }
        }
    });

    grunt.registerTask('build', ['uglify']);
};
