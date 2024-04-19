const router = require('express').Router()
const payment = require('../controllers/paymentController')

router.post('/create-payment',payment.createPayment)
router.get('/execute-payment',payment.executePayment)

module.exports = router;
