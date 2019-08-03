var campgrounds = require("../models/campground");
var Comment     = require("../models/comment");
var middleware ={};


middleware.checkAuthorisation =function(req,res,next){
     if(req.isAuthenticated()){
                    campgrounds.findById(req.params.id,function(err,foundCampground){
                    if(err) {
                        res.redirect("back");
                    }else{
                        if(foundCampground.author.id.equals(req.user._id)){
                           next();
                        }else{
                            res.redirect("back");
                        }
                        
                    }
                });
        }else{
            res.redirect("back")
        }
}
middleware.isLoggedIn  =function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    
    req.flash( "error" , " Please Login First! And REmove " ) ;
    res.redirect("/login");
}
middleware.checkAuthorisationComment = function (req,res,next){
     if(req.isAuthenticated()){
                    Comment.findById(req.params.idc,function(err,foundComment){
                    if(err) {
                        res.redirect("back");
                    }else{
                        if(foundComment.author.id.equals(req.user._id)){
                           next();
                        }else{
                            res.redirect("back");
                        }
                        
                    }
                });
        }else{
            res.redirect("back")
        }
}

module.exports = middleware;
