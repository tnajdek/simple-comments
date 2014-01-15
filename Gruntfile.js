module.exports = function(grunt) {
	var parseConfig = grunt.file.readJSON('./parse-config.json');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		symlink: {
			local: {
				files: [
					{
						expand: true,
						cwd: 'test',
						src: ['tests.js'],
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
			},
			test: {
				files: ['src/*.js', 'test/*'],
				tasks: ['mocha'],
				options: {
					spawn: false
				}
			}
		},
		mocha: {
			test: {
				options: {
					urls: [ 'http://127.0.0.1:8080/index.html' ],
					run: true
				}
			}
		},
		replace: {
			parse: {
				files: [{
					src: 'test/index.html',
					dest: 'local/index.html'
				}],
				options: {
					patterns: [
						{
							match: 'appid',
							replacement: parseConfig.appid,
							expression: false
						},
						{
							match: 'appkey',
							replacement: parseConfig.appkey,
							expression: false	
						}
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-symlink');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('develop', [
		'requirejs',
		'symlink',
		'replace'
	]);

	grunt.registerTask('default', [
		'develop',
		'connect',
		// 'mocha',
		'watch'
	]);

};