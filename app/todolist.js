module.exports = function (app, con){ 




    app.get('/api/alltodolists/:userid', function(req, res) {
		
		const token = req.headers.authorization.split(" ")[1].toString();
		
		
		  con.query( "SELECT * FROM  todolists WHERE user_id='"+req.params.userid +"' order BY  categorie"
               , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(200).send(err)
	    	     }else{
					console.log('iiiciiii')
		             console.log(result)
					res.status(200).send(result)
					
					}
						

	    })

   })


 
    app.post('/api/todolist/:userid', function(req, res) {
		
				const token = req.headers.authorization.split(" ")[1].toString();
				console.log(req.body)
	/*	con.query("SELECT IF(user_id ='"+req.params.userid+"', true, false) as status FROM users" 
		 , function (err, result){
				 if (err ){
					console.log(err)
	    		 	res.status(500).send(err)
	    	     }else
					console.log(result)
					if (!result.status)
						res.status(401).send("connexion non autorise")
				    else{*/
						//request 
						  con.query( "INSERT INTO todolists(user_id,title,categorie,tasks) VALUES('"+req.params.userid+"','"+req.body.title+"','"+req.body.categorie+"','"+req.body.tasks+"')" 
              
 

				 , function (err0, result0){
				 if (err0 ){
					console.log(err0)
	    		 	res.status(500).send(err0)
	    	     }else{
		
				console.log("ici")
			    console.log(result0)
				 res.status(200).send(true)
	       		}
		
	          // });	
						
				//	}
		})				

	
	

   })

   app.put('/api/todolist/remove/:id', function(req, res) {
		
	

   })

}