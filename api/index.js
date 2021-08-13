//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const {Type} = require('../api/src/db');
 
// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async() => {
    try{
      const response =  await axios.get ('https://pokeapi.co/api/v2/type')
        //console.log(results.data)
        const results = response.data.results.map((el) => {
            return {
                name: el.name
            }
            //await Type.create ({name: el.name}) para con el map ir creando uno por uno , ir metiendo a la DB y la funcion llev un await porque esta usando un metodo dentro 
        })
        //console.log(results) trae string de nombres y para retornar como objeto debemos meterlo entre objetos 
        await Type.bulkCreate(results) // mete todo a la base de datos, aqui hacer un get a types para ver si trae los types 
    }catch (error){
      console.log(error);
    } finally {
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    }
  });
});
