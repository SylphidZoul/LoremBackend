const axios = require('axios')
const config = require('../../../config')
const store = require('./store')

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
  console.log(paymentCreated)

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
      success: "https://lorem-ecommerce-sylphid.vercel.app", 
      pending: "https://lorem-ecommerce-sylphid.vercel.app",
      failure: "https://lorem-ecommerce-sylphid.vercel.app"
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

const handleNotifications = (req) => {
  if (req.body.topic === 'merchant_order'){
    const url = req.body.resource
    axios.get(`${url}?access_token=${config.mercadopago.access_token}`)
      .then((resp) => {
        console.log(resp.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }
}

module.exports = {
  generateCheckoutUrl,
  handleNotifications
}