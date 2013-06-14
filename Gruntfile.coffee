module.exports = (grunt) ->
    grunt.initConfig
        coffee:
            config:
                options:
                    bare: false
                cwd: 'coffee/'
                expand: true
                flatten: false
                src: '**/*.coffee'
                dest: 'public/'
                ext: '.js'

        watch:
            coffee:
                files: "<%= coffee.config.src %>"
                tasks: ["coffee", "uglify"]

        uglify:
            dist:
                src: 'public/src/*.js'
                dest: 'public/dist/humanize.min.js'

        jasmine:
            options:
                specs: ['public/test/*.js']
            src: '<%= uglify.dist.dest %>'

    grunt.loadNpmTasks 'grunt-contrib-watch'
    grunt.loadNpmTasks 'grunt-contrib-uglify'
    grunt.loadNpmTasks 'grunt-contrib-coffee'
    grunt.loadNpmTasks 'grunt-contrib-jasmine'

    grunt.registerTask 'default', ['coffee', 'uglify']
    grunt.registerTask 'build', ['coffee', 'uglify', 'jasmine']
    grunt.registerTask 'test', ['coffee', 'uglify', 'jasmine']
