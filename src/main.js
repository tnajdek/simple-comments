define(['parse', 'mustache', 'text!tpl/comment.mustache'],
	function (Parse, Mustache, commentTemplate) {
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
						.equalTo('slug', slug)
				}),
				comments = new Comments();

			return comments;
		};

		this.comments = function(containerId, slug, allowPosting) {
			var comments = this.getCommentsCollection(slug),
				container = document.querySelector(containerId),
				promise = new Parse.Promise();

			comments.fetch().then(function(items) {
				var comments = '';

				items.each(function(item) {
					var comment = Mustache.render(commentTemplate, {
						name: item.get('name'),
						text: item.get('comment'),
						date: item.get('createdAt'),
						hash: item.get('hash')
					});
					if(comment) {
						comments += comment;
					}
				});
				container.innerHTML = comments;
				promise.resolve();
			});

			return promise;
		};

		this.init();
		return this;
	};

	//add detection for amd
	window.SimpleComments = SimpleComments;

	return SimpleComments;
});