
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./routers/people');
var People = require('./models/people');

var app = express();
var port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/v1/api', router);

mongoose.connect('mongodb://deyan:123456@ds011745.mlab.com:11745/users');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connected success!');
});

router.route('/people')

    // POST new data
    .post(function (req, res) {
        var people = new People();
            people.firstname = req.body.firstname;
            people.lastname = req.body.lastname;
            people.age = req.body.age;


        people.save(function (err) {
            if(err) throw err;
        });

        res.json({ message: 'User created!' })
    })

    // GET all data
    .get(function(req, res) {
        People.find(function(err, people) {
            if (err)
                res.send(err);

            res.json(people);
        });
    });

router.route('/people/:people_id')

    // GET user by id
    .get(function(req, res) {
        People.findById(req.params.people_id, function(err, people) {
            if (err)
                res.send(err);
            res.json(people);
        });
    })

    // UPDATE user data
    .put(function(req, res) {

        People.findById(req.params.people_id, function(err, people) {

        if (err)
            res.send(err);

            people.firstname = req.body.firstname; // updating info
            people.lastname = req.body.lastname;
            people.age = req.body.age;


        people.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Info updated!' });
        });

        });
    })

    // DELETE curent user
    .delete(function(req, res) {
        People.remove({
            _id: req.params.people_id
        }, function(err, people) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// 404 ако се въведе страница, която не съществува
app.use(function(req, res) {
    res.status(404)
       .send('404: Page not Found');
});

app.listen(port, function () {
    console.log('server run in http://localhost:' + port)
});