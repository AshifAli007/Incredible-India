var express = require("express");
var router  = express.Router();

var User = require("../models/user");
var passport   = require("passport");


router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    var q = req.flash("error");
      res.locals.message      = q;
    next();
});
//Auth Routes
router.get("/register",function(req,res){
    res.render("campgrounds/register.ejs"); 
});
router.post("/register",function(req,res){
    console.log(req.body.username);
    console.log(req.body.password);
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
            if(err) {
                console.log(err);
                return res.render("campgrounds/register.ejs");
            }
            passport.authenticate("local")(req,res,function(){
                res.redirect("/campground");
            });
    });
});
router.get("/login",function(req,res){
        var q =req.flash("error");
        console.log(q +"aaaaaaaa");
        res.render("campgrounds/login.ejs"); 
});
router.post("/login",passport.authenticate("local",{
    successRedirect : "/campground",
    failureRedirect : "/login"
}),function(req,res){
    
});
router.get("/logout",function(req,res){
    req.logout();
    req.flash("error","log You Out");
    res.redirect("/campground");
});

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;