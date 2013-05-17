(function () {
    // Current version is actually the current version being worked on for next release.
    // but in hte deployed context it is the current version
    var CURRENT_VERSION = '1.0.4';
    //establish the root objec - window or global
    var root = this;
    //todo - need to make this hold more than one display
    var Output = {};
    var returnCalls = {};
    var pActualValue, pExpectedValue, pCondition, pReasonForFailingTest, pStatus, pNameOfTest = {};
    var start_time = {};
    var end_time = {};
    var test_duration = {};
    //private will be made public later on
    var pOtherwiseFailBecause = function (reasonForFailingTest) {
        pReasonForFailingTest = reasonForFailingTest;
        end_time = new Date();
        test_duration = end_time.getTime() - start_time.getTime();
        var f_result = "o - passed";
        if (pStatus === false) {
            f_result = "x - failed";
        }
      
        // call the display
        if (typeof (Output) == "function") {
            Output({
            result: f_result, //can be passed or failed
            a: pStatus,
            b: pNameOfTest,
            c: pExpectedValue,
            d: pActualValue,
            e: pReasonForFailingTest,
            f: CURRENT_VERSION,
            g: test_duration
        });
        } else {
            console.log(f_result + "|expected-" + pExpectedValue + "|got-" + pActualValue + "|in-" + test_duration + "ms" + "|Aver v" + CURRENT_VERSION + "|for-" + pNameOfTest + "|r-" + pReasonForFailingTest);
       
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
    var internalTest = {
        name: "Is",
        method: function (actualValue, expectedValue) {
            return (actualValue === expectedValue);
        }
    };
    var testPlug = function (plg) {
        //build the function starting with the expected value
        returnCalls[plg.name] = function (expectedValue) {
            pExpectedValue = expectedValue;
            return pTestFrame(plg.method);
        };
    };
    var whenTesting = function (nameofTest) {
        start_time = new Date();
        pNameOfTest = nameofTest;
        //expose the next chain - ToMakeSure
        return ensure;
    };
    var output = function (d) {
        Output = d;
    };
    var shortForm = function (nameofTest, actualValue, reasonForFailingTest) {
        return this.WhenTesting(nameofTest).ToMakeSure(actualValue).Is(true).OtherwiseFailBecause(reasonForFailingTest);
    }
    root.Aver = {
        version: CURRENT_VERSION,
        // so you can use the function like so 
        /*
short form sample
=================
Aver
.T("Sample Test 2", 10 === 100, "blaaa");
*/
        T: shortForm,
        //set what display name to use
        /*
display/output plugin boiler
============================
NOTE :EVERY DISPLAY HAS ACCESS TO THE OBJECT:-
var output_data = {
            result: f_result,//can be passed or failed
            a: pstatus,
            b: pnameofTest,
            c: pexpectedValue,
            d: pactualValue,
            e: preasonForFailingTest,
			f: CURRENT_VERSION,
			g: test_duration
        };

(function (a) {
    a.SD(function (output_data) {

        //format output_data and send object to any where
    });
})(Aver);	
*/
        SD: output,
        // set the test plugs
        /*
testplug boiler
================
(function (a) {
    var IsEqualTo = {
        name: "x",
        method: function (actualValue, expectedValue) {
           //process - and must return boolean
        }
    };
    a.PI(x);
})(Aver);
*/
        PI: testPlug,
        //specify description of the test
        /*
long form sample
================
Aver
.WhenTesting(nameofTest)
.ToMakeSure(actualValue)
.Is(true)
.OtherwiseFailBecause(reasonForFailingTest);
*/
        WhenTesting: whenTesting
    };
    Aver.PI(internalTest);
}).call(this);