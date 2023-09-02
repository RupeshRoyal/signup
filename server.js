const express= require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https=require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
 var firstName=req.body.fName;
 var lastName=req.body.lName;
 var emailid= req.body.email;

 var data= {
   members: [{
     email_address: emailid,
     status: "subscribed",
     merge_fields: {
       FNAME:firstName,
       LNAME:lastName
     }
   }]
 };

 const jsonData =JSON.stringify(data);

 const url= "https://us9.api.mailchimp.com/3.0/lists/12c33a4b1d";

 const options={
   method:"POST",
   auth: "rupesh:0e2dc6113181a25aaa1ee8aa3fd68285-us9"
 }
 const request = https.request(url,options,function(response){
   response.on("data",function(data){
     console.log(JSON.parse(data));
   })

    if (response.statusCode=200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
 })

request.write(jsonData);
request.end();

});

app.post("/failure",function (req,res){
  res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3600");
})


//api key
//7e273367851a6fc8de4e0a0fba028cea-us9
//cd306689db0238911f926e0975b0dd22-us9
//0e2dc6113181a25aaa1ee8aa3fd68285-us9

//unique id
//12c33a4b1d

