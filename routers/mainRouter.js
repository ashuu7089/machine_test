const router = require('express').Router()
const userRouter = require('../routers/userRouter')
const paymentRouter = require('../routers/paymentRouter')

router.use('/', userRouter)
router.use('/', paymentRouter)

module.exports = router;
