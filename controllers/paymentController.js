const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: process.env.client_id,
  client_secret: process.env.client_secret
});

// Create payment
const createPayment = async (req, res) => {
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel'
    },
    transactions: [{
      amount: {
        total: '10.00',
        currency: 'USD'
      },
      description: 'Sample Transaction'
    }]
  };

  paypal.payment.create(paymentData, (error, payment) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to create payment' });
    } else {
      const approvalUrl = payment.links.find(link => link.rel === 'approval_url').href;
      res.redirect(approvalUrl); // Redirect user to PayPal for payment authorization
    }
  });
}

// Execute payment
const executePayment =  async (req, res) => {
  const { paymentId, token, PayerID } = req.query;
  const executePaymentData = {
    payer_id: PayerID,
    transactions: [{
      amount: {
        currency: 'USD',
        total: '10.00' // Total amount of the payment
      }
    }]
  };

  paypal.payment.execute(paymentId, executePaymentData, (error, payment) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to execute payment' });
    } else {
      // Payment executed successfully
      return res.redirect('/success'); // Redirect to success page
    }
  });
}

module.exports = {
    createPayment,
    executePayment
}
