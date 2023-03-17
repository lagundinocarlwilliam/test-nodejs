const express = require("express");
const router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');

router.get("/getEmployeeData",(request,response) => {
    response.status(200).json({
        firstName: "KODEGO",
        lastName: "Bootcamp"
    });
}); 

router.post("/insertEmployee",(request,response) => {
    try{
        
        var myArr = JSON.parse(localStorage.getItem("employeeRecords")) ? JSON.parse(localStorage.getItem("employeeRecords")) : [];

        if(myArr.length > 0) { 
            var myObj = myArr.find(x => x.id == request.body["id"]) ? myArr.find(x => x.id == request.body["id"]) : {};
            var isEDExisting = Object.keys(myObj).length;
            
            if(isEDExisting) {
                console.log("Exist");

                if(request.body["lastName"] != myObj["lastName"]) {
                    console.log("Updating");
                    myObj["lastName"] = request.body["lastName"];
                } 
            } else {
                console.log("Not Exist");
                myArr.push(request.body);
            }

        } else {
            console.log("No records");
            myArr.push(request.body);
        }
        // localStorage.removeItem("employeeRecords");
        localStorage.setItem("employeeRecords",JSON.stringify(myArr));
        
        response.status(200).json({
            message: "success"
        });
    } catch {
        response.status(500).json({
            message: "failed"
        });
    }
});

module.exports = router;