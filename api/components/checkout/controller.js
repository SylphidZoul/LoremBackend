const axios = require('axios')
const config = require('../../../config')
const store = require('./store')

const getPaymentById = (id) => {
  return store.getPaymentById(id)
}

const generateCheckoutUrl = async (body, user) => {
  const paymentDB = {
    user: user._id,
    items: body.map((product) => {
      return {
        product: {
          _id: product._id
        },
        quantity: product.quantity
      }
    }),
  }
  const paymentCreated = await store.addPayment(paymentDB)

  const products = body.map((product) => {
    return {
      id: product._id, 
      title: product.name, 
      description: product.artist, 
      picture_url: product.img,  
      quantity: product.quantity, 
      currency_id: "ARS",
      unit_price: parseFloat(product.unitPrice) 
    }
  })
  
  let preference = {
    items: products,
    external_reference: paymentCreated._id, 
    payer: { 
      name: 'TEST8TGDSKLK',
      email: 'test_user_70837165@testuser.com', 
    }, 
    payment_methods: {
      excluded_payment_types: [{id: "atm"}],
      installments: 3, 
      default_installments: 1
    }, 
    back_urls: {
      success: "https://lorem-ecommerce-sylphid.vercel.app/paymentstatus", 
      pending: "https://lorem-ecommerce-sylphid.vercel.app/paymentstatus",
      failure: "https://lorem-ecommerce-sylphid.vercel.app/paymentstatus"
    },
    marketplace: 'Lorem eCommerce',
    notification_url: "https://lorem-backend.herokuapp.com/checkout/webhook/", 
    auto_return: "approved"  
  }
  
  const mercadoPagoUrl = `https://api.mercadopago.com/checkout/preferences?access_token=${config.mercadopago.access_token}`
  return axios.post(mercadoPagoUrl, preference, { 
    headers: { 
      "Content-Type": "application/json"
    }
  })

}

const handleNotifications = async (req) => {
  if (req.body.topic === 'merchant_order'){
    const url = req.body.resource

    try {
      const resp = await axios.get(`${url}?access_token=${config.mercadopago.access_token}`) 
      const { items, ...payment } = resp.data

      const updatedPayment = {
        order_status: payment.order_status,
        payment_status: payment.payments.length > 0
          ? payment.payments[payment.payments.length - 1].status
          : 'pending',
        total: payment.total_amount,
        transaction: payment
      }

      const Saved = await store.updatePayment(payment.external_reference, updatedPayment)
      console.log(Saved)

    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = {
  getPaymentById,
  generateCheckoutUrl,
  handleNotifications
}