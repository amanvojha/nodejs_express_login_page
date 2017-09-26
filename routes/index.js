var mysql = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended : false});


var connection = mysql.createConnection({
	//details
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'data'
	
});

connection.connect(function(error){
	if(!!error){
		console.log('Error');
	}
	else {
		console.log('Connection Successful!!');
	}
	
});

module.exports = function(app){
	
	
	app.get('/', function(req,res){
		
		res.render('signIn');
	});
	
	app.get('/signUp', function(req,res){
		
		res.render('signUp');
	});
		
	app.post('/userCheck',urlencodedParser, function(req,res){
		
		console.log('Form Data Received !!');
		
		var username = req.body.username;
		var password = req.body.password;
		var dbpass;
		
		var queSel="SELECT * from user_data WHERE username='"+username+"'";
		
				
		connection.query(queSel, function(err , results){
			
			if (err)
			{
				throw err;
			}
			if(results.length)
			{
				//console.log(" Data : " + results[0].first_name);
				dbpass = results[0].password;
				
				//Matching Passwords
				if(password===dbpass)
					{
						console.log("Matched!!");
						console.log(results);
						res.render('successLogin',{data : results[0]});
					}
				else
					{
						console.log("Wrong Password");
						res.render('failedLogin');
					}
			}
			else
			{
				console.log('Wrong Credentials !!');
			}
		});
		
	
	});	
	
	app.post('/insertUser',urlencodedParser, function(req,res){
		
		console.log('Form Data Received !!');
		console.log(req.body);
		var username = req.body.username;
		var password = req.body.password;
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var dob = req.body.dob;
		var gender = req.body.gender;
		var dbpass;
		
		var queIns="INSERT into user_data (username, first_name, last_name, password, dob, gender) values ('" + username + "','" + first_name + "','" + last_name +  "','" + password + "','" + dob + "','" + gender + "')";
		
		//console.log(queIns);
				
		connection.query(queIns, function(err , results){
			
			if (err) 
				{
					throw err;
				}
			else
				{
					console.log("Data entered Successfully");
					res.render('successSignUp');
				
				}
		});
		
	
	});

	/*app.delete('/', function(req,res){
	
	});*/
	
	

};