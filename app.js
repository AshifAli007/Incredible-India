var     express                 = require("express"),
        bodyParser              = require("body-parser"),
        User                    = require("./models/user"),
        passport                = require("passport"),
        LocalStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        mongoose                = require("mongoose"),
        app                     = express(),
        methodOverride          = require("method-override"),
        campgrounds             = require("./models/campground"),
        Comment                 = require("./models/comment"),
        seedsDB                 = require("./seeds"),
        campgroundRoutes        = require("./routes/campgrounds"),
        commentRoutes           = require("./routes/comments"),
        flash                   = require("connect-flash"),
        authRoutes              = require("./routes/index");
        

        
mongoose.connect("mongodb://localhost:27017/Yelp_camp",{useNewUrlParser:true});
//mongoose.connect("mongodb+srv://ashif:1997*Fira@cluster0-lfttz.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true});
//mongodb+srv://ashif:<password>@cluster0-lfttz.mongodb.net/test?retryWrites=true&w=majority
//mongodb+srv://ashif:1997*Fira@cluster0-lfttz.mongodb.net/test?retryWrites=true&w=majority
app.use(bodyParser.urlencoded({extended:true}));

//seedsDB();


//campgrounds.create({
//        name:"Jama Masjid" ,
//        image:"http://www.transindiatravels.com/wp-content/uploads/jama-masjid-delhi.jpg",
//        description :"This is Biggest Mosque In  India"
//
//        },function(err,newcampground){
//            if(err){
//                console.log("Its Error");
//            }else{
//                console.log("created");
//                console.log(newcampground);
//            }
//        });

app.use(require("express-session")({
        secret : "This Is Tony Stark",
        resave : false,
        saveUninitialized : false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static("public"));
app.use(campgroundRoutes);
app.use(commentRoutes);
app.use(authRoutes);
app.use(methodOverride("_method"));


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
   
    next();
});
    


       
// app.listen(process.env.PORT,process.env.IP,function(){
//     console.log("yelpcamp Server Has Been Started");
//     });
app.listen(3000,"127.0.0.1",function(){
    console.log("yelpcamp Server Has Been Started");
    });