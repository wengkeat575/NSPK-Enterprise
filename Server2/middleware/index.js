// Middleware

var middleware = [];

middleware.isThisYourAccount = function (req, res, next){
	// if (req.isAuthenticated()) {
	// 	Post.findById(req.params.id, function(err, foundPost){
	// 		if (foundPost.author.id.equals(req.user._id)) {
				next();
	// 		} else{
	// 			req.flash("error","You don't have permission to do that");
	// 			res.redirect("back");
	// 		}
	// 	})
	// } else{
	// 	req.flash("error", "You don't have permission to do that!");
	// 	res.redirect("back");
	// }
}
middleware.isAdmin = function(req, res, next){
	// if (req.isAuthenticated()) {
	// 	Comment.findById(req.params.commentId, function(err, foundComment){
	// 		if (foundComment.author.id.equals(req.user._id)) {
				next();
	// 		} else{
	// 			req.flash("error", "You don't have permission to do that!");
	// 			res.redirect("back");
	// 		}
	// 	})
	// } else{
	// 	req.flash("error", "You don't have permission to do that!");
	// 	res.redirect("back");	
	// }
}

module.exports = middleware;