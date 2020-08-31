const axios = require('axios')
const config = require('../../../config')

const generateCheckoutUrl = (body, user) => {
  const mercadoPagoUrl = `https://api.mercadopago.com/checkout/preferences?access_token=${config.mercadopago.access_token}`

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
    external_reference: "Lorem eCommerce", 
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
    notification_url: "https://lorem-backend-sylphid.vercel.app/checkout/webhook/", 
    auto_return: "approved"  
  }
  
  /* mercadopago.configure({access_token: config.mercadopago.access_token})
  return mercadopago.preferences.create(preference) */

  return axios.post(mercadoPagoUrl, preference, { 
    headers: { 
      "Content-Type": "application/json"
    }
  })

}

const test = (data) => {
  console.log(data)
}

module.exports = {
  generateCheckoutUrl,
  test
}