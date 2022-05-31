//=========================================================================
/*
 * 통신환경 구현 
 *  - node.js javascript 런타임 프로그램
 *  - AWS EC2
 *  - AWS RDS
 *  - Express 모듈을 사용한 Android Application 과의 HTTP Communication
 *  - 사용자 로그인 / 회원가입 (data DB insert)
 *  - Android/server file transfer program
 * */
//=========================================================================
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var multer, storage, path, crypto;
multer = require('multer')
path = require('path');
crypto = require('crypto');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//=========================================================================
// node server
app.listen(3001,function () { 
    console.log('server running...');
});

// DB connection
var connection = mysql.createConnection({
    host: "kpu-database.***.ap-northeast-2.rds.amazonaws.com",
    user: "***",
    database: "***",
    password: "***",
    port: 3306
});
//=========================================================================
// 사용자 회원가입 
app.post('/user/join', function (req, res) {
    console.log(req.body);
    var userEmail = req.body.userEmail;
    var userPwd = req.body.userPwd;
    var userName = req.body.userName;

    var sql = 'INSERT INTO Users (UserEmail, UserPwd, UserName) VALUES (?, ?, ?)';
    var params = [userEmail, userPwd, userName];

    connection.query(sql, params, function (err, result) {
        var resultCode = 404;
        var message = 'error has occured';

        if (err) {
            console.log(err);
        } else {
            resultCode = 200;
            message = 'succeed register.';
        }

        res.json({
            'code': resultCode,
            'message': message
        });
    });
});

// 사용자 로그인 
app.post('/user/login', function (req, res) {
    var userEmail = req.body.userEmail;
    var userPwd = req.body.userPwd;
    var sql = 'select * from Users where UserEmail = ?';

    connection.query(sql, userEmail, function (err, result) {
        var resultCode = 404;
        var message = 'error has occured';

        if (err) {
            console.log(err);
        } else {
            if (result.length === 0) {
                resultCode = 204;
                message = 'Non-exist account!';
            } else if (userPwd !== result[0].UserPwd) {
                resultCode = 204;
                message = 'Wrong pwd';
            } else {
                resultCode = 200;
                message = 'succesful' + result[0].UserName + 'welcome!';
            }
        }

        res.json({
            'code': resultCode,
            'message': message
        });
    })
});
//========================================================================
// Include the node file module
var fs = require('fs');

// file transfer  
storage = multer.diskStorage({
    destination: './video_andToser/',
    filename: function(req, file, cb) {
     cb(null,file.originalname); 
    }
  });


// Post file
//안드로이드 -> 서버 파일전송
app.post("/upload",multer({storage: storage}).single('upload'), function(req, res) {
    console.log(req.file);
    console.log(req.body);
  //  res.redirect("/uploads/" + req.file.filename);
    console.log(req.file.filename);
    return res.status(200).end();
  });

// 서버 -> 안드로이드 파일 전송 
app.get('/ExtractedVideo/:upload', function (req, res){
  file = req.params.upload;
  console.log(req.params.upload+" file uploads complete");
  var video = fs.readFileSync(__dirname + "/ExtractedVideo/" + file);
  res.writeHead(200, {'Content-Type': 'video/*' });
  res.end(video, 'binary');

});
//==============================================================
// android 통신 후 서버측 처리 
var client=mysql.createConnection({
	user:'***',
	password:'***',
	database:'androidDB'
});

// 다운로드시 insert 정보 결과 보냄(to android)
app.post('/accessDB', function(request, response){
 		console.log('Select title videoTBL Database');
	client.query('SELECT title FROM videoTBL', function(error, results){

                response.send(results);
                console.log(results);

                //android transport content code

        });
 
});


// txt 파일 생성
app.post('/CrashEvent', function(request, response){
        console.log(request.body.CrashEventArray);
        console.log(request.body.CrashEventArray.length);
        console.log(request.body.VideoTitle);


        response.send('success');
        fs.writeFile('./txt_andToser/'+request.body.VideoTitle+'.txt',
		request.body.CrashEventArray.toString(), function(error){
                if(error!=null){
                        console.log('error!!');
                }
        }
        );

});
