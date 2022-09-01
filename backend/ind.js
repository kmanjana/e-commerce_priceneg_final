var min_price =280;
var max_price = 425;
var user_offer = 300;
var round = 2
var r1=0,r2=0,r3=0,r4=0,r5=0,r6=0;
switch(round){
    case '1' :  r1=1;r2=0;r3=0;r4=0;r5=0;r6=0;
                 break;
    case '2' :  r1=0;r2=1;r3=0;r4=0;r5=0;r6=0;
                 break;
    case '3' :  r1=0;r2=0;r3=1;r4=0;r5=0;r6=0;
                 break;
    case '4' :  r1=0;r2=0;r3=0;r4=1;r5=0;r6=0;
                 break;
    case '5' :  r1=0;r2=0;r3=0;r4=0;r5=1;r6=0;
                 break;                 
    case '6' :  r1=0;r2=0;r3=0;r4=0;r5=0;r6=1;
                 break;
}
var counter_offer = 0
function counter(counter){
    console.log("counter offer is " + counter)
}
const {PythonShell} = require("python-shell");

let options = {
    scriptPath: "E:/final yr project/e-com_web_priceneg_chatbot/backend",
    args: [min_price,max_price,user_offer,r1,r2,r3,r4,r5,r6],
};
PythonShell.run("regressor.py", options, (err,res)=>{
    if(err) console.log(err);
    if(res) {
        // console.log(res[0]);
        counter_offer=parseFloat(res[0])
        counter(counter_offer)
    }
});


// const {PythonShell} = require("python-shell");

// let options = {
//     scriptPath: "E:/final yr project/e-com_web_priceneg_chatbot/backend",
//     args: [1, 45],
// };

// PythonShell.run("regressor.py", options, (err,res)=>{
//     if(err) console.log(err);
//     if(res) {
//         console.log(res[2]);
//         var result=parseFloat(res[2])
//         console.log(result)
//     }
// });