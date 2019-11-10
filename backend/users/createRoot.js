const Model = require('./../users/model');
const config = require('../config');
const mongoose = require('mongoose');
const to = require('./../to');

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

(async function start(){
    console.log('cadastrar primeiro user');

    let rootExists = await Model.findOne({login: 'root'});
    if( rootExists) {
        console.log('user root ja existe');
    } else {
        var model = new Model({
            email: 'thiagohagy@hotmail.com',
            password: '123',
            name: 'Thiago',
        });

        const [err, data] = await to(model.save());
        console.log(err);
        if (!err && data) {
            console.log('user root cadastrado ')
        } else {
            console.log('ocorreu um erro ao cadastrar o root');
        }
    }
})();
