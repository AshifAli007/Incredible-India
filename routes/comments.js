var express         = require("express");
var router          = express.Router();

var campgrounds     = require("../models/campground");
var Comment         =require("../models/comment");
var methodOverride  = require("method-override");
var middleware      = require("../middleware");

router.use(methodOverride("_method"));
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    
    next();
});
//===========================
//Comment Routes
//===========================
router.get("/campground/:id/comments/new",middleware.isLoggedIn,function(req,res){
    campgrounds.findById(req.params.id,function(err,foundCampground){
       if(err) {
           console.log(err);
       }else{
               res.render("comments/newcomment.ejs",{campground : foundCampground}); 
       }
    });

});
router.post("/campground/:id/comments",middleware.isLoggedIn,function(req,res){
        var text1 = req.body.comment; 
        var author1 = req.body.author;
        
        campgrounds.findById(req.params.id,function(err,campground){
            if(err) {
                console.log(err);
            }else{
                    console.log(campground);
                    Comment.create({
                        text : text1,
                        author : author1
            },function(err,comment){
                    if(err){
                        console.log(err);
                    }else{
                                comment.author.id = req.user._id;
                                comment.author.username = req.user.username;
                                comment.save()
                                
                                campground.comments.push(comment);
                                campground.save();
                                res.redirect("/campground/"+ campground._id);
                    }

            });
    }   


    });


});
router.get("/campground/:id/comments/:idc/edit",middleware.checkAuthorisationComment,function(req,res){
    Comment.findById(req.params.idc,function(err,foundComment){
        if(err) {
            console.log(err);
        }else{
            res.render("comments/commentedit.ejs",{comment : foundComment,campground_id : req.params.id});
        }
    });
         
});
router.put("/campground/:id/comments/:idc",middleware.checkAuthorisationComment,function(req,res){
                
            var comment ={
                text : req.body.comment
            }
            Comment.findByIdAndUpdate(req.params.idc,comment,function(err,foundComment){
                    if(err){
                        res.redirect("back")
                    }else{
                        res.redirect("/campground/"+req.params.id);
                    }
            }) ;
});

router.delete("/campground/:id/comments/:idc",middleware.checkAuthorisationComment,function(req,res){
        Comment.findByIdAndRemove(req.params.idc,function(err){
                if(err){
                    res.redirect("back");
                }else{
                    res.redirect("/campground/"+req.params.id);
                }
        }) ;
});



module.exports = router;