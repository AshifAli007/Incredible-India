var express         = require("express");
var router          = express.Router();

var campgrounds     = require("../models/campground");
var Comment         = require("../models/comment");
var  methodOverride = require("method-override");
var middleware      = require("../middleware");

router.use(methodOverride("_method"));
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    var q = req.flash("error");
      res.locals.message      = q;
    next();
});

router.get("/",function(req,res){
    res.render("landing.ejs");
});
//var campgrounds = [
//         {name:"Taj Mahal", image:"http://www.transindiatravels.com/wp-content/uploads/the-taj-mahal-agra.jpg"},
//         {name:"Jama Masjid" ,image:"http://www.transindiatravels.com/wp-content/uploads/jama-masjid-delhi.jpg"},
//         {name:"Red Fort", image:"http://www.transindiatravels.com/wp-content/uploads/the-red-fort-delhi.jpg"},
//         {name:"Golden Temple" ,image:"http://www.transindiatravels.com/wp-content/uploads/the-golden-temple-amritsar.jpg"},
//         {name:"Jaisalmer" ,image:"http://www.transindiatravels.com/wp-content/uploads/jaisalmer-fort-jaisalmer.jpg"},
//         {name:"Old Goa" ,image:"http://www.transindiatravels.com/wp-content/uploads/old-goa-1.jpg"},
//         {name:"Elephanta Caves", image:"http://www.transindiatravels.com/wp-content/uploads/elephanta-caves-mumbai.jpg"},
//         {name:"Qutub Minar", image:"https://c.ndtvimg.com/qutub-minar-650_625x300_1530453081066.jpg"},
//         {name:"New York", image:"https://images2.minutemediacdn.com/image/upload/c_crop,h_1193,w_2121,x_0,y_27/f_auto,q_auto,w_1100/v1554921558/shape/mentalfloss/18579-istock-666393322.jpg"}
//    ];
router.get("/newcamp",middleware.isLoggedIn,function(req,res){
   res.render("campgrounds/newcamp.ejs");
});
router.get("/campground",function(req,res){
    console.log(req.user);
        campgrounds.find({},function(err,campgrounds){
                if(err){
                    console.log("Its Error");
                }else{
                    
                     res.render("campgrounds/campground.ejs",{campgrounds:campgrounds});
                }
        });
        
});
router.post("/campground",middleware.isLoggedIn,function(req,res){ 
    
   var  name1           = req.body.name,
        image1          = req.body.image,
        description1    = req.body.description,
        author1         ={
            id : req.user._id,
            username : req.user.username
        }
    
    campgrounds.create({
       name: name1,
       image:image1,
       description:description1,
       author : author1
       
    },function(err,newcampground){
        if(err){
            console.log("its Error");
        }else{
            console.log("new campground created");
            console.log(newcampground);
        }
    });
    
  res.redirect("/campground");
});
router.get("/campground/:id",function(req,res){
    campgrounds.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err) {
            console.log(err);
        }else{
            console.log(foundCampground)
            res.render("campgrounds/show.ejs",{campground:foundCampground});        
        }
    });
    
});
router.get("/campground/:id/edit",middleware.checkAuthorisation,function(req,res){
       
            campgrounds.findById(req.params.id,function(err,foundCampground){
            res.render("campgrounds/editform.ejs",{campground :foundCampground}); 
         });
      });
router.put("/campground/:id",middleware.checkAuthorisation,function(req,res){
    
    var name1 = req.body.name;
    var image1 = req.body.image;
    var description1 = req.body.description;
    
    campgrounds.findByIdAndUpdate(req.params.id,{
        name : name1,
        image : image1,
        description : description1
    },function(err,updatedCampground){
        if(err){
            res.redirect("/campground");
        }else{
            res.redirect("/campground/"+ req.params.id);
        }
    });
});
router.delete("/campground/:id",middleware.checkAuthorisation,function(req,res){
    console.log("You Comes To DElete");
    campgrounds.findByIdAndRemove(req.params.id,function(err){
            if(err){
                res.redirect("/campground");
            }else{
                res.redirect("/campground");
            }
    }) ;
});


module.exports = router;