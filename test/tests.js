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

	it('should obtain approved comments collection', function(done) {
		comments = sp.getCommentsCollection('test1');
		comments.fetch().then(function(items) {
			assert.lengthOf(items, 1, "Should fetch one approved comment");
			done();
		});
	});

	it('should populate #comments section with comments', function(done) {
		sp.comments('#comments', 'test1', false).then(function() {
			assert.lengthOf(document.querySelectorAll('#comments .comment'), 1, 'Should render approved comments');
			assert.lengthOf(document.querySelectorAll('#comments .comment-editor'), 0, 'Should not render a comment editor');
			done();
		});
	});

	it('should populate #comments section with comments and an editor', function(done) {
		sp.comments('#comments', 'test1', true).then(function() {
			assert.lengthOf(document.querySelectorAll('#comments .comment'), 1, 'Should render approved comments');
			assert.lengthOf(document.querySelectorAll('#comments .comment-editor'), 1, 'Should also render comment editor');
			done();
		});
	});

	it('should post a new comment to the queue', function(done) {
		sp.comments("#comments", 'test1', true).then(function() {
			//impement me
		});
	});
});