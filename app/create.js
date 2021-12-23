module.exports = function (con){ 

/*
  con.query("CREATE DATABASE todolistsBase", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  }); 


  con.query( "create table users(user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,email VARCHAR(200) NOT NULL, name VARCHAR(100) NOT NULL, password VARCHAR(200) NOT NULL, enable  TINYINT(1) NOT NULL, token VARCHAR(200) NOT NULL,  UNIQUE (email));" , function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });


    con.query("create table todolists(todo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,user_id INT NOT NULL , title VARCHAR(100) NOT NULL ,categorie VARCHAR(100) NOT NULL ,tasks VARCHAR(800) NOT NULL  ,FOREIGN KEY(user_id)  REFERENCES users(user_id));", function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });


 /* con.query("create table tasks(task_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,todo_id INT NOT NULL , task VARCHAR(100) NOT NULL, FOREIGN KEY(todo_id) REFERENCES todolists(todo_id) );" , function (err, result) {
    if (err) throw err;
    console.log("Result: " + result);
  });*/
 
}






