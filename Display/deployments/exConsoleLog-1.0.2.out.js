(function (a) {
    a.SD(function (pstatus, pnameofTest, pexpectedValue, pactualValue, preasonForFailingTest) {
        if (pstatus === true) {
            console.log(pnameofTest + " Passed!");
        } else {
            console.log(pnameofTest + " Failed! - Result Expected: " + pexpectedValue + ", Result Getting : " + pactualValue + " | '" + preasonForFailingTest + "'");
        }
    });
})(Aver);