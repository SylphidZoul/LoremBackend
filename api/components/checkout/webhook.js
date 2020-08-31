class PaymentController {
  webhook(req, res) { 
    if (req.method === "POST") { 
      let body = ""; 
      req.on("data", chunk => {  
        body += chunk.toString();
      });
      req.on("end", () => {  
        console.log(body, "webhook response"); 
        res.end("ok");
      });
    }
    return res.status(200); 
  }
}

module.exports = PaymentController;
