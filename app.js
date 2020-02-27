const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const https = require('https');
app.use(express.static("public"));
const jsonParser = bodyParser.json()
app.use(bodyParser.urlencoded({extended:true}))

//GET
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/signup.html");
})

//POST
app.post('/', function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email

  const  data = {
  	members: [
  	{
      email_address: email,
      status: "subscribed",
      merge_fields:{
      	FNAME: firstName,
      	LNAME: lastName
      }
  	}
  	]
  };
 const jsonData = JSON.stringify(data);

const url="https://us19.api.mailchimp.com/3.0/lists/7318fb27de";

const options = {
	method:"POST",
	auth: "regis1:2bf501f70d0824c86a3c51577cdb33e4-us19"
};
const request =https.request(url, options,function(response) {

	if(response.statusCode === 200){
  		res.sendFile(__dirname + "/success.html");
  	} 
  	else{
  		res.sendFile(__dirname + "/failure.html");
  	}


    response.on("data", function(data){
  	    console.log(JSON.parse(data));
  })

});

    request.write(jsonData);
    request.end();



});



app.post('/fail', function(req, res) {
  res.redirect('/');
});











app.listen(process.env.PORT|| 3000, function(){
	console.log("Server is runing on port 3000")
})

// API KEY
//2bf501f70d0824c86a3c51577cdb33e4-us19
//list id
//7318fb27de