const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');


const router = express.Router();


router.post('/register', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword
    });
    await newUser.save();
    res.status(201).send({ success: true, message: 'Usuário registrado com sucesso!' });
  } catch (err) {
    res.status(400).send({ success: false, message: err.message });
  }
});



module.exports = router;


router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send({ success: false, message: 'Usuário ou senha incorretos' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send({ success: false, message: 'Usuário ou senha incorretos' });

    
    res.send({ success: true, message: 'Login realizado com sucesso!', balance: user.balance });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no servidor' });
  }
});


router.post('/deposit', async (req, res) => {
  if (!req.body.amount || !req.body.username) {
    return res.status(400).send({ success: false, message: 'Quantia e nome de usuário são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ success: false, message: 'Usuário não encontrado' });
    }

    user.balance += req.body.amount;
    await user.save();

    res.send({ success: true, message: 'Depósito realizado com sucesso!', balance: user.balance });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no servidor' });
  }
});


router.post('/withdraw', async (req, res) => {
  if (!req.body.amount || !req.body.username) {
    return res.status(400).send({ success: false, message: 'Quantia e nome de usuário são obrigatórios' });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ success: false, message: 'Usuário não encontrado' });
    }

    if (user.balance < req.body.amount) {
      return res.status(400).send({ success: false, message: 'Saldo insuficiente' });
    }

    user.balance -= req.body.amount;
    await user.save();

    res.send({ success: true, message: 'Saque realizado com sucesso!', balance: user.balance });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no servidor' });
  }
});


router.post('/getBalance', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).send({ success: false, message: 'Usuário não encontrado' });
    }

    res.send({ success: true, balance: user.balance });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no servidor' });
  }
});

router.get('/:username/balance', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send({ success: false, message: 'Usuário não encontrado' });
    }

    res.send({ success: true, balance: user.balance });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Erro no servidor' });
  }
});

