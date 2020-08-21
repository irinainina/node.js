const { Router } = require('express')
const todoModels = require('../models/todoModels')
const router = Router()

router.get('/', async (req, res) => {
  const todos = await todoModels.find({})

  res.render('index', {
    title: 'Todos list',
    isIndex: true,
    todos
  })
})

router.get('/create', (req, res) => {
  res.render('create', {
    title: 'Create todo',
    isCreate: true
  })
})

router.post('/create', async (req, res) => {
  const todo = new todoModels({
    title: req.body.title
  })

  await todo.save()
  res.redirect('/')
})

router.post('/complete', async (req, res) => {
  const todo = await todoModels.findById(req.body.id)

  todo.completed = !!req.body.completed
  await todo.save()

  res.redirect('/')
})

module.exports = router
