module.exports = function ( token , email){ 
	
	const http = require('url');
	 const nodemailer = require('nodemailer');

  const url ="http://localhost:4200/validation?token="+token+"&email="+email
     var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nsakhraouitest@gmail.com',
    pass: '$testing$'
  }
});
	
	
	 message = {
         from: "nsakhraouitest@gmail.com",
         to: email,
         subject: "email validation",
        			
		 html: '<p>Pour valider votre adresse email veuillez cliquer sur le lien si dessous</p>'+
		       '<a href=${url}> Lien </a>'+
               '<p> si le lien ne marche aps copié collé l url si dessous </p>'+
				'<p>'+url+'</p>'


    }
    transporter.sendMail(message,function(err, info) {
         if (err) {
           console.log(err)
			res.status(500).send(err)
         } else {
			console.log(info)
           res.status(200).send(true)
         }
	
	}) 
	
	
	}