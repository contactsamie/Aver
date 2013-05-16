
(function (a) {
   
    a.SetDisplay(function (pstatus, pnameofTest, pexpectedValue, pactualValue, preasonForFailingTest) {
        if (pstatus === true) {
            $('body').append('<div id="aver-display" style="padding:5px;background-color:green; color:black" >'+pnameofTest +' Passed!</div><br />');
            console.log(pnameofTest + " Passed!");
        } else {
           pnameofTest 
              $('body').append('<div id="aver-display" style="padding:5px;background-color:red; color:black" >'+pnameofTest + ' Failed! - Result Expected: ' + pexpectedValue + ', Result Getting : ' + pactualValue + ' | "' + preasonForFailingTest + '"</div><br />');
        }
    });
})(Aver);