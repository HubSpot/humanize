module.exports = function(grunt) {
    grunt.initConfig({
        coffee: {
            app: {
                src: 'coffee/**/*.coffee',
                dest: 'public/',
                options: {
                    preserve_dirs: true,
                    base_path: 'coffee/',
                    bare: false
                }
            }
        },

        watch: {
            files: {
                files: '<config:coffee.src>',
                tasks: 'coffee'
            }
        },

        min: {
            dist: {
                src: 'public/src/*.js',
                dest: 'public/src/humanize.min.js'
            }
        },

        jasmine: {
            src: 'public/src/*.js',
            specs: 'public/test/*.spec.js',
            timeout: 10000,
            phantomjs: {
                'ignore-ssl-errors': true
            }
        }
    });

    grunt.loadNpmTasks('grunt-coffee');
    grunt.loadNpmTasks('grunt-jasmine-runner');

    grunt.registerTask('default', 'coffee min');
    grunt.registerTask('test', 'coffee jasmine');
};