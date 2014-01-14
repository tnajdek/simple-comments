define(['parse'], function (Parse) {
	var SimpleComments = function(options) {
		var ApprovedComment = Parse.Object.extend("comments_approved"),
			QueuedComment = Parse.Object.extend("comments_queue");

		this.init = function() {
			this.appid = options.appid;
			this.appkey = options.appkey;
			Parse.initialize(appid, appkey);
		};

		this.comments = function(slug, allowPosting) {
			var Comments = Parse.Collection.extend({
					model: ApprovedComment,
					query: (new Parse.Query(ApprovedComment))
						.equalTo('slug', currentArticleStub)
				}),
				comments = new Comments();

			comments.fetch().then(function(items) {
				items.each(function(item) {
					console.log(item);
				});
			});
		};

	};

	return SimpleComments;
});