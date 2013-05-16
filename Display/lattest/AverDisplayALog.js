(function (a) {
    a.SD(function (pstatus, pnameofTest, pexpectedValue, pactualValue, preasonForFailingTest) {
        var t = {
            result: "pass",
            a: pstatus,
            b: pnameofTest,
            c: pexpectedValue,
            d: pactualValue,
            e: preasonForFailingTest
        };
        if (pstatus === true) {
            t.result = "pass";
        } else {
            t.result = "fail";
        }
        console.log(t);
    });
})(Aver);