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
                    banner: '/**\n * jQuery LongPoll client script.\n *\n * @license https://opensource.org/licenses/BSD-3-Clause\n * @author Viktor Khokhryakov <viktor.khokhryakov@gmail.com>\n */\n'
                }
            }
        }
    });

    grunt.registerTask('build', ['uglify']);
};
