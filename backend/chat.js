const dialogflow = require('@google-cloud/dialogflow');

// const dialogflowConfig = require('./config/config')
const express =require('express');
const cors = require("cors");

const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "price_neg"
})

const projectId = "price-negotiation-mh9b"
const configuration = {
  credentials: {
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC4fSoeJ1hQoCqq\n4S+JBUn80fYpngaZ/VahRXNvVH2R7qF2llSHEEaOUxgQ31hBlld8k6cSr7W+XXEQ\ny/JMd9Dp44lfWP+Coz5WB7lhgekdAsxbwnXPkinM9wc2Fq4ujzsHnE/8CI9ASQTb\nORPu46J7PLpmeJJl4bXWFe7Nz85efibviocsbfxZRjS6Y6DXHi5hehgeP4HZLT2i\nv/4OqhTylV/0ljDVHvsIFKAecLTq9DbgtX8c/e+yfvxhGpUybci5Gb59PX4jhe8z\nCCASCaRkIAGdH+wmy/oVCcm1GNfQFrDpK9059wqCKXLlkEwmVF5uiLq44SJ32GCZ\nCDLbBM9bAgMBAAECggEAVOyI7sh9xt9zxKVUFGby4AZmolG0CD6uGh62PJFQHFUU\nzln1HxdG400szteA8PAb5aSyS8/GgZLR8UFwj/K3oHK1UcbOF3y9vSxhEZmTjV80\nYyjowlwuEcPE9gkKtTQJoD88MnBeQOFb8u4bVuRCbyhNRc5K1ctIwPvnqaX3AVeX\nWEVO/YKewhW5yqPBjp204JxlnJJIbDvCJd0VgKLszUkGbugedS94J/lbhpBy3BSD\nRm1ttGusyGRrhHoHocv9EXyz68xk36kA67ZqbX6eEMJ7M/c1UxPVObtBWPaoOjsr\n+ISl85fMtM+RKwutlgnDPVq/j4wfMI91fbp+0JufwQKBgQD1TrviNLJVXCViZBB+\nVa/+aspNSaMhfKk3Qc5Npz0VtKhE4TWf9CqjQu0W83EVn0A8+mIXn94kbH4c+mQV\nJXEFP3LIwT3OeUNliAp2+kDZiLz75PJLYGRCb8AYj2RX/Ktt/GLriM5vMBMYoHxz\nQ2+YcMCkjS+tFswPmGk4p0UunQKBgQDAh8kVf+ZREorT094hd5fXC+yiOeX9qsDd\nbeq8cHN3znmZab26hBpzIhQFzukjxZCLfcZNELKfUP2mGO+O0UjOW8RgcpxczyPq\ngH/h8thgR8wCVprYsbCf+VPH692g4QkLf4zgpoT/agPWNVrIgtb7SivFKaAXHObK\nrcyxvaxYVwKBgQC7jW4THk02/FPM7Uq6/NKph4aTHvjtsn1CNTsBnhsTDGQW/cVd\nPXaYCqRxBsHwUSjxNlJnU6CpYpXtm/eHP3AxHfipyy1xPr+r0h6GJwIMEALF6J7j\nyJf/P6e0X3XN2+5KEkyjXp7O3gfLrXBZRDb/az2u0g+gnCx6xAG3AhTf9QKBgQCf\nC8zuiNC/qnyqzrwSk5QInx4lSYUYD4XxpgqjDpYko5nKRRLp0JV1BPLbdXkdBukI\ngqddJG0atTJEkxbauULWzfIk5qkK9kcqQmriQdXDe6wpRlf2qJtLHBG89rkIXL43\nFHBRaN43jOGMhFjxiTyFLFmKL3/DeCmjxv1w20pTUwKBgQDx1Cbtga9nGvcGJ+in\nqgbpK6uCnScpmFZfnsHCOdiVb2hMvS6pcLT8TrrrLg57xbUt1aJrmrX0IZ3Khnq2\nIqIzs7kd0MZLA1rOAMzsEIF9Sul0MjgUYfRc/PyOu30Sa3ppUwagdxL+rsLtQlWp\ndTKa3aVDuXZWAMycoXoncMF/yg==\n-----END PRIVATE KEY-----\n",
    client_email: "priceneg-df-server@price-negotiation-mh9b.iam.gserviceaccount.com",
  },
}

// const sessionId = '997753'
// const languageCode = 'en-US'
const sessionClient = new dialogflow.SessionsClient(configuration)

const detectIntent = async (languageCode, queryText, sessionId) =>{

    let sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);


//   console.log('message ' + message)
  let request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: queryText,
        languageCode: languageCode,
      },
    },
  };

    const responses = await sessionClient.detectIntent(request)
    let para;
    // var counter_offer;
    
      //console.log(JSON.stringify(responses))
    const result = responses[0].queryResult;   //result from dialogflow

    if(result.intent.displayName == "product_search"){  
      console.log("modi " + result.parameters.fields.product_list.stringValue);
      para = result.parameters.fields.product_list.stringValue
    }
    if(result.intent.displayName == "accept_negprice"){  
      // console.log("modi " + result.parameters.fields.product_list.stringValue);
      para = true
    }
    if(result.intent.displayName == "lessthanminprice"){  
      // console.log("modi " + result.parameters.fields.product_list.stringValue);
      para = "less"
    }
      return {
          response: result.fulfillmentText,
          intent_name : result.intent.displayName,
          parameter : para
      };
      

}
// detectIntent('en','Show me products','12345678')
const webApp = express();
webApp.use(cors());
// Webapp settings
webApp.use(express.urlencoded({
    extended: true
}));
webApp.use(express.json());



const test = express.Router()
// Dialogflow route
function router(){
test.post('/', async (req, res) => {

    // let languageCode = req.body.languageCode;
    let queryText = req.body.text;
    let sessionId = req.body.userName;
    let command = req.body.command;
    console.log("command is " +command)
    if(command == 'other' || command == "end" || command == "useroffer_lessthan_minprice"){
      let responseData = await detectIntent('en', queryText, sessionId);
      console.log(responseData)
      res.send(responseData);
    }
    else if (command == "###nego"){
      let pid = req.body.pid
      console.log(pid);
      db.query("select p.p_name,p.img,p.price,p.brand,s.shop_name from products p, shop s where p.shop_id=s.shop_id and p.pid = ?",[pid],
      (err,result)=>{
        if(err){
          return console.log(err)
        }
        
        console.log(result);
        res.send(result);
        
      })
    }
    else if(command =='counteroffer'){
      var counter_offer;
      let useroffer = req.body.useroffer;
      let round = req.body.round;
      var min_price =req.body.minprice;
      var max_price = req.body.maxprice;
      // var user_offer = 300;
      var user_offer = useroffer;
      // var round = 1;
      console.log("round "+round);
      
      var r1=0,r2=0,r3=0,r4=0;
      switch(round){
          case '1' :  r1=1;r2=0;r3=0;r4=0;
                 break;
          case '2' :  r1=0;r2=1;r3=0;r4=0;
                 break;
          case '3' :  r1=0;r2=0;r3=1;r4=0;
                 break;
          case '4' :  r1=0;r2=0;r3=0;r4=1;
                 break;
       }
       
      // function counter(counter){
      //     console.log("counter offer is " + counter)
          
      // }
      const {PythonShell} = require("python-shell");

      let options = {
          scriptPath: "E:/final yr project/e-com_web_priceneg_chatbot/backend",
          args: [min_price,max_price,user_offer,r1,r2,r3,r4],
      };
      PythonShell.run("regressor.py", options, (err,result)=>{
          if(err) console.log(err);
          if(result) {
        // console.log(res[0]);
          counter_offer=parseFloat(result[0])
            // counter(counter_offer)
            console.log("counter1 "+counter_offer)
            res.send({counter_offer,user_offer,round,min_price,max_price});
          }
      });
      
    //   function x () {
    //     setTimeout(function () {
    //         console.log("done");
    //         console.log("counter2 is " +counter_offer)
    //         para = counter_offer
    //         console.log("para is " + para);
    //         res.send({counter_offer});
    //     }, 6000);
    // }
    
    // x();
      

    }
    
});
return test;
}
module.exports = router;
// Start the server
// webApp.listen(PORT, () => {
//     console.log('Server is up and running at '+PORT);
// });