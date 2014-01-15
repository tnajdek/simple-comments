define(['parse'], function (Parse) {
	var SimpleComments = function(options) {
		var ApprovedComment = Parse.Object.extend("comments_approved"),
			QueuedComment = Parse.Object.extend("comments_queue");

		this.init = function() {
			this.appid = options.appid;
			this.appkey = options.appkey;
			Parse.initialize(appid, appkey);
		};

		this.getCommentsCollection = function(slug) {
			var Comments = Parse.Collection.extend({
					model: ApprovedComment,
					query: (new Parse.Query(ApprovedComment))
						.equalTo('slug', currentArticleStub)
				}),
				comments = new Comments();

			return comments;
		};

		this.comments = function(slug, allowPosting) {
			var comments = this.getCommentsCollection(slug);
			comments.fetch().then(function(items) {
				items.each(function(item) {
					console.log(item);
				});
			});
		};

		return this;
	};

	//add detection for amd
	window.SimpleComments = SimpleComments;

	return SimpleComments;
});