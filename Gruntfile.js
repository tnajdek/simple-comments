module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		symlink: {
			local: {
				files: [
					{
						expand: true,
						cwd: 'test',
						src: ['*.html', 'tests.js'],
						dest: 'local'
					},
					{
						expand: true,
						cwd: 'build',
						src: ['*.js'],
						dest: 'local'
					},
					{
						expand: true,
						cwd: 'bower_components/mocha/',
						src: ['mocha.js', 'mocha.css'],
						dest: 'local/mocha'
					},
					{
						expand: true,
						cwd: 'bower_components/chai/',
						src: ['chai.js'],
						dest: 'local/mocha'
					}
				]
			}
		},
		connect: {
			server: {
				options: {
					port: 8080,
					hostname: '*',
					base: 'local/'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					name: "../bower_components/almond/almond",
					baseUrl: "src/",
					mainConfigFile: "src/require-config.js",
					out: "build/simple-comments.js",
					optimize: 'none',
					include: ['main'],
					insertRequire: ['main'],
					stubModules: ['text'],
					preserveLicenseComments: false,
					wrap: true
				}
			}
		},
		watch: {
			js: {
				files: ['src/*.js'],
				tasks: ['develop'],
				options: {
					spawn: false
				}
			}
		},
		mocha: {
			test: {
				options: {
					urls: [ 'http://localhost:8080/index.html' ],
				},
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha');

	grunt.registerTask('develop', [
		'requirejs',
		'symlink'
	]);

	grunt.registerTask('default', [
		'develop',
		'connect',
		'watch'
	]);

};