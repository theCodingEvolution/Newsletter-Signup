import express from "express"
import bodyParser from "body-parser";
import https from "https"



//const request=require("request");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile('index.html', { root: '.' })
});
app.post("/",function(req,res){

const firstName=req.body.fName;
const lastName=req.body.lName;
const email=req.body.email;

const data={
    members: [
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
            }
        }

    ]
};
var jsonData= JSON.stringify(data);

const url ="https://us21.api.mailchimp.com/3.0/lists/1ceef29151"

const options= {
    method:"POST",
    auth:  "Rajat1:fddfdec8bce706654016d9a81ac30be1-us21"
}
const request=https.request(url,options, function(response){

response.on("data",function(data){
    console.log(JSON.parse(data));
});
//statusCode holds the response status code.If 200 then ok if not then go to else.
var statusCode=response.statusCode;
console.log(statusCode);
if(statusCode==200){
    //if ok then through success page
    res.sendFile('success.html', { root: '.' })
}
else{
    // if not ok throw  the failure page
    res.sendFile('failure.html', { root: '.' })
}

});
request.write(jsonData);
request.end();


});
// when error occurs and user press try again button  below code redirects to home page//
app.post("/failure",function(req,res){
    
    res.redirect("/");
});
//for knowing if the port 3000 is ok
app.listen(process.env.PORT  || 3000, function(){
    console.log("on port 3000");
});

// API Key
// fddfdec8bce706654016d9a81ac30be1-us21

// List ID
// 1ceef29151