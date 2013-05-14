(function (g) {
    var Output = {};
    var thisApplication, returnCalls = {};
    var pActualValue, pExpectedValue, pCondition, pReasonForFailingTest, pStatus, pNameOfTest = {};
    var pOtherwiseFailBecause = function (reasonForFailingTest) {
        pReasonForFailingTest = reasonForFailingTest;
        Output(pStatus, pNameOfTest, pExpectedValue, pActualValue, pReasonForFailingTest);
        return thisApplication;
    };
    var pTestFrame = function (pMethod) {
        pStatus = pMethod(pActualValue, pExpectedValue);
        return {
            OtherwiseFailBecause: pOtherwiseFailBecause
        };
    };
    g.Aver = {
        SetUp:{},
        SetDisplay: function (d) {
            Output = d;
        },
        Plugin: function (plg) {
            returnCalls[plg.name] = function (expectedValue) {
                pExpectedValue = expectedValue;
                return pTestFrame(plg.method);
            };
        },
        WhenTesting: function (nameofTest) {
            thisApplication = this;
            pNameOfTest = nameofTest;
            return {
                ToMakeSure: function (actualValue) {
                    pActualValue = actualValue;
                    return returnCalls;
                }
            };
        }
    };
})(this);