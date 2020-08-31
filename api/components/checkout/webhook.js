class PaymentController {
  webhook(req, res) { 
    if (req.method === "POST") {
      console.log('entro en el if')
      let body = ""; 
      req.on("data", chunk => {  
        body += chunk;
        console.log('entro aca')
      });
      req.on("end", () => {
        const data = JSON.parse(body)
        console.log(data, "webhook response"); 
        res.end("ok");
      });
    }
    return res.status(200); 
  }
}

module.exports = PaymentController;
