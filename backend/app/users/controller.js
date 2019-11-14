/* Model*/
const Model = require('./model');
const Contato = require('./modelContatos');
const bcrypt = require('bcrypt-nodejs');
const to = require('../../to');
const mongoose = require('mongoose');
const moment = require('moment');

/* Routes*/
exports.index = async (req, res) => {

  const filtro = {};
  filtro.active = true;

  const data = await 
    Model.find(filtro , { email:1, creationDate:1, name:1 })
      .skip( parseInt(req.query.skip) || 0)
      .limit( parseInt(req.query.limit) || 5);

  const total = await Model.countDocuments(filtro);

  const newUsers = [];
  for (let i = 0; i < data.length; i++) {
    const user = data[i];

    const contatos = await Contato.find({ user: user._id });

    let newData = JSON.parse(JSON.stringify(user));
    newData.contatos = contatos;

    newUsers.push(newData);
  }

  res.json({ total, data: newUsers });
};

exports.filter = async (req, res) => {

  const nameFilter = req.query.name ? req.query.name : '' ;

  let regex = `.*${nameFilter}.*`; 
  let dateFilter = req.query.date ? moment(new Date(req.query.date)).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD') ;

  const startDate = moment(dateFilter).startOf('day').toISOString();
  const finishDate = moment(dateFilter).endOf('day').toISOString();

  const dados = await Model.aggregate(
    [
      { 
        $match: { 
          name: {$regex: regex, $options: 'gmi'},
          creationDate: { $gte: new Date(startDate), $lte: new Date(finishDate) }
        }
      },
      {
        $lookup: {
          from: 'contacts',
          localField: '_id',
          foreignField: 'user',
          as: 'contacts',
        }
      },
      {
        $project:{ 
          'ativo':'$active',
          'login_email':'$email',
          'nome': '$name',
          'data_criacao':'$creationDate',
          'contatos':'$contacts'
        },
      },     
    ]
  )

  res.json({ total: dados.length, data: dados })
};

exports.get = async (req, res) => {
  if (req.params.user_id && mongoose.Types.ObjectId.isValid(req.params.user_id)) {
    const data = await Model.findOne({ _id: req.params.user_id }, { email: 1, creationDate: 1, name: 1 });
    if (data) {
      const contatos = await Contato.find({ user: req.params.user_id });

      let newData = JSON.parse(JSON.stringify(data));
      newData.contatos = contatos;
      console.log(newData)
      res.json({ success: true, data: newData });
    } else {
      res.json({ success: false, err: 'Error fetching user' });
    }    
  } else {
    res.json({ success: false, err: 'Error fetching user' });
  }
};

exports.new = async (req, res) => {
  req.body.createdBy = req.decoded._id;
  var model = new Model(req.body);
  const [err, data] = await to(model.save());

  if (!err && data) {

    //cadastrar contatos
    for (let i = 0; i < req.body.contatos.length; i++) {
      const contato = req.body.contatos[i];
      const cont = new Contato(contato)
      cont.user = data._id;
      await cont.save();
    }

    res.json({ success: true, data, err, form: req.body });
  } else {
    if(err.code == 11000) {
      res.json({ succsess: false, data, err: 'OPS!!! Pick another login, this one already exists', form: req.body });
    } else {
      res.json({ succsess: false, data, err: 'OPS!!! Some error has ocurred', form: req.body });
    }
  }
};

exports.delete = async (req, res) => {

  const model = await Model.findOne({ _id: req.params.user_id });

  if (model) {
    model.active = false;
    await model.save();
    res.json({ success: true });
  } else {
    res.json({ success: false, err: 'An error has occured'});
  }
};

exports.edit = async (req, res) => {
  const model = await Model.findOne({ _id: req.params.user_id});

  if (req.body.password && req.body.password !== '') {
    model.password = req.body.password;
  }

  await Contato.deleteMany({user:model._id}); // remover contatos antigos

  for (let i = 0; i < req.body.contatos.length; i++) {
    const contato = new Contato(req.body.contatos[i]);
    contato.user = model._id;
    await contato.save();
  }

  model.email = req.body.email;
  model.name = req.body.name;

  const [err, data] = await to(model.save());

  if (!err && data) {
    res.json({ success: true, data, err, form: req.body });
  } else {
    res.json({ success: false, data, err, form: req.body });
  }
};
