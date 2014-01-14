requirejs.config({
	baseUrl: '/src/',
	paths: {
		text: '../bower_components/requirejs-text/text',
		mustache: '../bower_components/mustache/mustache',
		parse: '../bower_components/parse-js-sdk/lib/parse'
	},
	shim: {
		parse: {
			exports: 'Parse'
		}
	}
});


require(['main']);