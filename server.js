  var port = process.env.PORT; // Port of server

  //Libraries
  var getenv = require('getenv'); // Library for Enviroment Variables, Used for Db Conn
  var mysql = require('promise-mysql'); // Mysql Library, With Node Promises
  var bodyParser = require('body-parser'); // Library for parsing data
  var jsonParser = bodyParser.json(); // Using Data type Json
  var cors = require("cors"); // Library for handling access headers
  var multer  = require('multer');
  var fs = require('fs');
  var spawn = require("child_process").spawn;
  var user = {};

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, 'temp.png') //Appending .jpg
    }
  })

  var upload = multer({ storage: storage });
  var pythonProcess = spawn('python',["Ml/script.py"]);
  pythonProcess.stdout.on('data', async function (data){
  // user.name = data.name;
  // user.time = Math.floor(Date.now() / 1000);
  let [user] = await con.query(`SELECT * FROM Users WHERE Name = ${data.name}`);
  var userId = user.UUID;
  let settings = await con.query(`SELECT * FROM Settings WHERE User = ${userId}`);
  //var data = {};
  for (let setting in settings){
    if(setting.Switch == 6){
      let update = await con.query(`UPDATE Switchs SET Status = ${setting.Status} WHERE SUID = ${setting.Switch}`);
    } else {
      let update = await con.query(`UPDATE Switchs SET Status = ${settings.Status}, R = ${setting.R}, G = ${setting.G} , B = ${setting.B} WHERE SUID = ${setting.Switch}`);
    }
  }

  });

  //Server Don't worry about this
  var express = require('express'); // Framework for Node
  var app = express(); // Establishing Express App
  app.use(express.logger());
  app.use(cors()); // Cors to Handle Url Authentication
  app.use(bodyParser.json()); // Using Body Parser
  app.set('jwtTokenSecret', 'D2A8EC7BF22AECBEB745FDAAA892CDCD8A678D4E94C6452D58AD92C4D861A0C0839DEA1057CA539810FADF9806090D9EB6F610FE1AF6BC2A0DEA3D69455116AE'); // JWT Secret
  var server = app.listen(port); // Set Port

  console.log(getenv('IP'));
  console.log(getenv('C9_USER'));
  //DataBase connection using promises
  var con = null;
  mysql.createConnection({
      host: getenv('IP'),
      user: getenv('C9_USER'),
      password: "",
      database: "c9"
  }).then(function(connection) { con = connection });

  app.use("/", express.static("./client/"));

  var type = upload.single('media');
  app.get('/getLights',async function(req, res) {
      
  });


  app.post('/postreq', type, (req, res, next) => {
    //console.log(req);
      var imgfile = req.file;
      console.log(imgfile);
     /* fs.writeFile('./images/test.jpg', imgfile.encoding, function(err){
          if (err) throw err
          console.log('File saved.');
          res.send('yay!');
      }); */
      res.send("Dumbass");
  });
  app.post("/login",async function(req, res) {
    var name = req.body.name;
     let [user] = await con.query(`SELECT * FROM Users WHERE Name = "${name}"`);
     res.status(200).json({
       details : user
     });

  });
  app.get('/kappa', (req, res) => {
    res.send('keepo');
  })
  app.get("/getDetails",async function(req,res){
    let switches =  await con.query(`SELECT * FROM Switchs`);
    res.status(200).json({
      switches : switches
    });
  });
  app.post("/updateSwitch",async function(req,res){
    var switchId = req.body.id;
    var status = req.body.status;
    let update = await con.query(`UPDATE Switchs SET Status = ${status} WHERE SUID = ${switchId}`);
    res.status(200).json({
      message : "Updated Sucessful"
    });
  });
