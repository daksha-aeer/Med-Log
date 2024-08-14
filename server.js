
const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const ejs=require("ejs");
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("static"));
const mongoose = require('mongoose')

var ObjectId = require('mongodb').ObjectID;

mongoose.connect("mongodb://localhost:27017/medlog")

const postSchema={
    name:String,
    password:String,
    phone:Number,
    weight:String,
  

}
const doctorSchema={
    doctor:String,
    clinic:String

}
const messageSchema={
    ph:Number,
    message:String
}
const patSchema={
    name:String,
weight:Number,
}
const Post=mongoose.model("Post",postSchema)
const Doc=mongoose.model("Doc",doctorSchema);
const Msg=mongoose.model("Msg",messageSchema)
const Pat=mongoose.model("Pat",patSchema)



let nme="";
app.get('/', async (req,res) => {
    const token = req.body
    res.render( 'index', {
        name : 'gfuykguy',
        token : 'dfgdyhgdtyr'
    })
})
app.get("/do",(req,res)=>{
    res.render("do");
})
app.post("/dclog",(req,res)=>{
    const doc=new Doc({
        doctor:req.body.doc,
        clinic:req.body.cl
    })
    doc.save();
    res.redirect("/mypatient")
})
app.get("/reg",(req,res)=>{
    Pat.find({},(er,cd)=>{
        if(!er){
            res.render("regpatient",{name:cd})
        }
    })
})

app.get("/usersign",(req,res)=>{
    res.render("usersign")
})
app.post("/new",(req,res)=>{

const msg= new Msg({
    ph:req.body.nu,
    message:req.body.message,

})
msg.save();
})
app.get('/mypatient', async (req,res) => {
    var id = req.params.id;
    var good_id = new ObjectId(id);
    const token = req.body
    Post.find({},(error, allDet)=>{
        if(error){
            console.log(error);
        }
        else{
            res.render('mypatient', {
                name : allDet
            })
        }
    })
})
app.get("/dashboard",(req,res)=>{
    // res.render("dashboard");
    Msg.find({ph:nme},(er,cd)=>{
        if(er){
            console.log(er);
        }else{
            res.render("dashboard",{name:cd})
            // console.log(cd);
        }
    })
})
app.post("/yes",(req,res)=>{
    var answer=req.body.ans;
   console.log(nme)
 
     Post.find({ph:nme},function(er,cd){
            if(er){
                console.log("err is:",er);
            }else{
                cd.forEach(element => {
                    const pat=new Pat({
                        name:element.name,
                        weight:element.weight,
                    })
                    pat.save();
                       
                        
                
                });
            }
                });
            
         
        })
    


app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/log",(req,res)=>{
    nme=req.body.number;
    res.redirect("/dashboard")
})

app.post("/usignin",(req,res)=>{
    var post= new Post({
        
        name:req.body.fname,
        password:req.body.pass,
        phone:req.body.phone,
        weight:req.body.weight,
        


    })
   
    post.save((er)=>{
        if(!er){
            res.redirect("/dashboard")
        }
    });
    console.log(req.body.uname, req.body.pword)
})

app.listen(80,()=>{
    console.log("started");
})

