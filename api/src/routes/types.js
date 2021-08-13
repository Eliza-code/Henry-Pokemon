const router = require('express').Router();
const getTypes = require('../controlers/types')


router.get('/',getTypes )


module.exports = router ;