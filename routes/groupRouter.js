var express = require('express');
var controller = require('../components/group')

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

//Add Group router
router.post('/v1/add', controller.createGroup)

//View User groups router
router.post('/v1/get', controller.findUserGroup)

//Edit group router
router.post('/v1/edit', controller.editGroup)

//Delte group router
router.delete('/v1/delete', controller.deleteGroup)

module.exports = router;