const router = require('express').Router()
const Account = require('./accounts-model')

const { 
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique
} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll()
    res.json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.account)
  next()
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const account = await Account.create(req.body)
    res.status(201).json(account)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', (req, res, next) => {
  try {
    res.json('hello')
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', (req, res, next) => {
  try {
    res.json('hello')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  })
})

module.exports = router;
