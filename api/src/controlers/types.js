const {Type} = require('../db');

const getTypes = async(req, res, next) => {
    try {
        const dbTypes = await Type.findAll() // devuelve un array
        if(dbTypes.length){
            return res.status(200).send (dbTypes);
        }else {
            return res.status(400).send('Types not found');
        }
    } catch (error) {
        next(error)
    }
}

module.exports =  getTypes ; 