(function (g) {
    //todo - need to make this hold more than one display
    var Output = {};
    var thisApplication, returnCalls = {};
    var pActualValue, pExpectedValue, pCondition, pReasonForFailingTest, pStatus, pNameOfTest = {};
    //private will be made public later on
    var pOtherwiseFailBecause = function (reasonForFailingTest) {
        pReasonForFailingTest = reasonForFailingTest;
        // call the display
        if (typeof (Output) == "function") {
            Output(pStatus, pNameOfTest, pExpectedValue, pActualValue, pReasonForFailingTest);
        } else {
            console.log(pStatus + "|" + pNameOfTest + "|" + pExpectedValue + "|" + pActualValue + "|" + pReasonForFailingTest);
        }
        return pStatus;
    };
    var ensure = {
        //set the actual value
        ToMakeSure: function (actualValue) {
            pActualValue = actualValue;
            return returnCalls;
        }
    };
    var pTestFrame = function (pMethod) {
        //call the specific test plug - test plug must implement the interface function(pActualValue, pExpectedValue){};
        pStatus = pMethod(pActualValue, pExpectedValue);
        return {
            //expose the next in chain - OtherwiseFailBecause
            OtherwiseFailBecause: pOtherwiseFailBecause
        };
    };
    g.Aver = {
        // so you can use the function like so -- 'Aver.T("Sample Test 2", 10 === 100, "blaaa");'
        T: function (nameofTest, actualValue, reasonForFailingTest) {
            this.PI({
                name: "b",
                method: function (actualValue, expectedValue) {
                    return (actualValue === expectedValue);
                }
            });
            this.WhenTesting(nameofTest).ToMakeSure(actualValue).b(true).OtherwiseFailBecause(reasonForFailingTest);
        },
        //set what display name to use
        SD: function (d) {
            Output = d;
        },
        // set the test plugs
        PI: function (plg) {
            //build the function starting with the expected value
            returnCalls[plg.name] = function (expectedValue) {
                pExpectedValue = expectedValue;
                return pTestFrame(plg.method);
            };

        },
        //specify description of the test
        WhenTesting: function (nameofTest) {
            thisApplication = this;
            pNameOfTest = nameofTest;
            //expose the next chain - ToMakeSure
            return ensure;
        }
    };
})(window);