var assert = chai.assert;
describe('SimpleComments', function() {
	var sp;

	beforeEach(function() {
		sp = window.SimpleComments({
			'appid': PARSE_APP_ID,
			'appkey': PARSE_APP_KEY
		});

		console.log('before every test', sp);
	});

	it('should obtain approved comments collection', function(done){
		comments = sp.getCommentsCollection('test1');
		comments.fetch().then(function(items) {
			assert.lengthOf(items, 1, "Should fetch one approved comment");
			done();
		});
	});
});