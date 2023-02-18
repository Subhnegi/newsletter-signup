const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/',function(req, res){
    res.sendFile(__dirname + '/signup.html');
    
});
app.post('/',function(req, res){
    const fname=req.body.FirstName;
    const lname=req.body.LastName;
    const email=req.body.email
    
    const data ={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/73fc35cba3"
    const options = {
        method: 'POST',
        auth:"subh:1fd95e6e2ac6538fa1c5473788101098-us21"
    }
    const request=https.request(url, options,function(response)
    {
        if(response.statusCode===200)
        res.sendFile(__dirname + '/success.html');
        else
        res.sendFile(__dirname + '/failure.html');


    })
    request.write(jsonData);
    request.end();

});
app.post('/failure', function(req, res){
    res.redirect('/');
})

app.listen(process.env.PORT || 3000,function(){
    console.log('server is running');
});
// apikey="1fd95e6e2ac6538fa1c5473788101098-us21"
// listId="73fc35cba3"