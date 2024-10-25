const stripe = require('stripe')('sk_test_51M23WVAZXbnAuaLLJktMTrL2oSSQKCpqvjDDHkAK1PaYlJMFtLevnKFM9qUTjl6PjS9O3F4jGv7LsX9Yp1XUcRbR00G8JLajvz');
// Importing Firebase Admin SDK and Firestore
const admin = require('firebase-admin');
const firestore = admin.firestore();

//===================================== Create Stripe Account =================================//
const createStripeAccount = async (req, res) => {
  const serviceProviderID = req.body.serviceProviderID;
  
  try {
    const account = await stripe.accounts.create({
      type: 'express',
      country: 'CA',
      email: req.body.email,
      capabilities: {
        transfers: { requested: true },
      },
      // requested_capabilities: ['card_payment', 'transfers'],
    });

    // Updated to use Firestore instead of MongoDB
    const serviceProviderRef = firestore.collection('serviceProviders').doc(serviceProviderID);
    await serviceProviderRef.update({
      stripeAcc: account.id,
    });
    
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `http://${req.body.appUrl}`,
      return_url: `http://${req.body.appUrl}`,
      type: 'account_onboarding',
    });

    res.send(accountLink.url)
  } catch (err) {
    console.log(err)
    
  }

}

//===================================== Create Stripe Account Link =================================//
const createStripeAccountLink = async (req, res) => {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: req.body.accountId,
      refresh_url: `http://${req.body.appUrl}`,
      return_url: `http://${req.body.appUrl}`,
      type: 'account_onboarding',
    });
    console.log(accountLink)
  } catch (err) {
    console.log(err)
  }
}

//===================================== Create Payment Intent =================================//
const createPaymentIntent = async (req, res) => {
  try {
      console.log(req.body);
      const amount = req.body.amount * 100;  // Amount in cents
      const applicationFee = amount * 0.13;

      // Create a new payment intent
      const paymentIntent = await stripe.paymentIntents.create({
          amount: amount,
          currency: 'cad',
          automatic_payment_methods: {
              enabled: true,
          },
          capture_method: 'manual',
          application_fee_amount: applicationFee,
          transfer_data: {
              destination: req.body.serviceProviderAccount,
          },
      });

      console.log(paymentIntent.client_secret);

      // Updated the post record in Firestore with the payment intent ID
      const postRef = firestore.collection('posts').doc(req.body.postId);
      await postRef.update({
          paymentIntent: paymentIntent.id,
      });

      res.json({
          paymentIntent: paymentIntent.client_secret,
          publishableKey: 'pk_test_51M23WVAZXbnAuaLLQ0DTyBlLUIlAiEfXDMG08JJnObkdAfPcWosN99cklgD4fmgsnfqAt8ZDFYzCpjAyXwxwRid00007njU21F'
      });
  } catch (err) {
      console.log(err); // Logging any errors that occur
      res.status(500).json({ success: false, error: err.message });
  }
};

exports.createStripeAccount = createStripeAccount;
exports.createStripeAccountLink = createStripeAccountLink
exports.createPaymentIntent = createPaymentIntent