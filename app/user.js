module.exports = function (app,con, cryptoJS, jwt){ 


app.get ("/api/user/checkemail/:email", function(req, res) {
	
	console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	
	 con.query( "SELECT * FROM  users WHERE  email='"+req.params.email +"'"
               , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(500).send(err)
	
				}
				if (result.length==0)
					res.status(200).send(true)
				else 
					res.status(200).send(false)
				})
				
})
				
				
				
app.get ("/api/user/checkenable/:enable", function(req, res) {
	
	console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	
	 con.query( "SELECT enable FROM  users WHERE  email='"+req.params.enable +"'"
               , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(500).send(err)
	
				}
				console.log(result)
				if (result[0].enable==0)
					res.status(200).send(false)
				else 
					res.status(200).send(true)
				})
				
				})				
				

//add user 
	app.post('/api/user/signin', function(req, res) {
		 
	 //generate token + encode password 
       console.log("signin")
       console.log(req.body)
       // var secret ="abc"
    	//var cipherpassword = cryptoJS.AES.encrypt(req.body.password, secret).toString();
     var cipherpassword = cryptoJS.SHA1(req.body.password).toString();
  console.log(cipherpassword)
       var crypto = require("crypto");
	    var token0 = jwt.sign(  {id: cipherpassword} ,crypto.randomBytes(5).toString('hex')); 

           
		  con.query( "INSERT INTO users(email,name,password,enable,token) VALUES('"+req.body.email+"','"+req.body.name+"','"+cipherpassword+"','0','"+token0+"')" 
               , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(500).send(err)
	    	     }else{
		
			   	console.log(result)
				require ('./email.js')(token0,req.body.email) 
				 res.status(200).send(true)
	       		}
		
	           });	
	})



   app.get('/api/user/enable/token/:token/email/:email', function(req, res) {
		
	  console.log(req.params.token)
	 
		  con.query( "SELECT token FROM  users WHERE email='"+req.params.email +"'"
               , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(500).send(err)
	    	     }else{
					console.log(result)
					
		             if (result[0]['token'] == req.params.token ){
				    con.query( "UPDATE users SET enable='1' WHERE email='"+req.params.email+"'" 
               		, function (err0, result0){
				 		if (err0 ){
					     console.log(err0)
	    		 		res.status(500).send(err0)
	    	     		 }
						console.log('balblabal')
					    console.log(result0)
								
								res.status(200).send(true);
								
					})
					}else {
						res.status(200).send(false);}
					
					}
						

	    })	
	
	

   } )


  app.put ('/api/user/logout/:email', function(req, res) {
		
	 con.query( "UPDATE users SET token='0' WHERE email='"+req.params.email+"'" 
               		, function (err0, result0){
				 		if (err0 ){
					     console.log(err0)
	    		 		res.status(500).send(err0)
	    	     		 }
						console.log('balblabal')
					    console.log(result0)
							if(result0.changedRows!=0 || result0.affectedRows!=0)
						res.status(200).send(true);
						else		
						res.status(200).send(false)
								
					})
	

   } )

   app.put('/api/user/login/email/', function(req, res) {
		
	   console.log("login")
       console.log(req.body)
        //var secret ="abc"
    	//var cipherpassword = cryptoJS.AES.encrypt(req.body.password, secret).toString();
    var cipherpassword = cryptoJS.SHA1(req.body.password).toString();
         console.log(cipherpassword)
        var crypto = require("crypto");
 

	    var token0 = jwt.sign(  {id: cipherpassword} ,crypto.randomBytes(5).toString('hex')); 


			console.log( cipherpassword)
	     con.query( "UPDATE users SET token='"+token0+"' WHERE email='"+req.body.email+"' AND password='"+cipherpassword+"'" 
               		, function (err0, result0){
				 		if (err0 ){
					
					     console.log(err0)
	    		 		res.status(500).send("")
	    	     		 }
						console.log(token0 )
					    console.log(result0)
						if(result0.changedRows!=0)
							res.status(200).send({token:token0});

						else		
						res.status(200).send("")
					})
   } )



   app.get('/api/user/:email', function(req, res) {
 
         console.log(req.headers.authorization)
		const token = req.headers.authorization.split(" ")[1];
		
	  console.log(token)
	 
		  con.query( "SELECT * FROM  users WHERE email='"+req.params.email +"' AND token='"+token+"'"
               , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(200).send(err)
	    	     }else{
		             console.log(result)
					res.status(200).send(result[0])
					
					}
						

	    })	
	
	

   } )

}