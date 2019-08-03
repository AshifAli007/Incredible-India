var mongoose    = require("mongoose"),
    campgrounds = require("./models/campground"),
    Comment     = require("./models/comment");
    
var data = [
        {
            name:"Jama Masjid" ,
            image:"http://www.transindiatravels.com/wp-content/uploads/jama-masjid-delhi.jpg",
            description :"This is Biggest Mosque In  India"
        },
        {
            name:"Taj Mahal", 
            image:"http://www.transindiatravels.com/wp-content/uploads/the-taj-mahal-agra.jpg",
            description : "This IS Wonder Of World"
        },
        {
            name:"Qutub Minar", 
            image:"https://c.ndtvimg.com/qutub-minar-650_625x300_1530453081066.jpg",
            description : "This Is Tallest Tower In Delhi"
        }
]

function seedsDB()    {
            campgrounds.remove({},function(err){
            if(err) {
                console.log(err);
            }
                console.log("Removed aL");
                data.forEach(function(seed){
                    campgrounds.create(seed,function(err,campground){
                        if(err){
                            console.log(err);
                        }else{
                            console.log("Added Campground");
                            Comment.create({
                                text  : "This Is Really Good Tourist Place" ,
                                author : "Ted Benk"
                            },function(err,comment){
                                if(err){
                                    console.log(err);
                                }else{
                                    
                                    campground.comments.push(comment);
                                    campground.save();//to save in database
                                    console.log("new comment created");
                                    
                                }
                            });
                        }
                    }) 
                });
            
        });
}

module.exports = seedsDB;
