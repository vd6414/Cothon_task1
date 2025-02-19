const models = require('../Model/userModel');
const mongoose = require('mongoose')
require('dotenv').config();
const fetch = require('node-fetch')
const userController = {};
// console.log(User)

//const ObjectId = mongoose.Types.ObjectId;


userController.createUser = (req, res, next) => {
    const { id } = req.params;
    // if (id) return next();
    console.log(`id in createUser: `, id)
    models.User.create({ uid: id },
        function (err, doc) {
            if (err) {
                console.log(`err here`, err)
                return next(err)
            } else {
                console.log(doc)
                res.locals.user = doc;
                console.log(`saved`)
                return next();
            }

        }
    )

}
// save topics to DB after login
userController.saveTopic = (req, res, next) => {
    const { topic } = req.body;
    const { id } = req.params;


    models.User.findOne({ uid: id })
        .then(doc => {
            // console.log(`DOC: `, doc)


            doc.topics.push(topic)
            doc.save()
            console.log(doc)
            return next()
        })
        .catch(err => {
            console.log(err)
            return next(err)
        })

}

userController.getTopicsAndFetch = (req, res, next) => {
    const { id } = req.params;
    // find user
    models.User.findOne({ uid: id })
        .then((doc) => {
            // loop over doc.topics
            // fetch for each topic
            doc.topics.forEach(topic => {
                fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${topic}&api-key=` + process.env.API_KEY)
                    .then(data => data.json())
                    .then(result => {
                        const arr = [];
                        result.response.docs.forEach(obj => {
                            arr.push({
                                articleUrl: obj.web_url,
                                abstract: obj.abstract,
                                imgUrl: obj.multimedia.url
                            })
                        }); // array of objects, one for each article , push just url and abstract into arr

                        res.locals.articleArr = arr; // sent this back to front end in api.js
                        console.log(`article array `, res.locals.articleArr)
                        return next();
                    })
                    .catch(err => {
                        console.log('err here in catch in GET/Fetch')
                        return next(err);
                    })
            })

            return next();
        })
        .catch(err => {
            console.log(`err in get/fetch2`)
            return next(err);
        })
}

module.exports = userController;