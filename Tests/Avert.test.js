
var WasDisplayCalled=false;
var parameterPassedToDisplay={};
var setUpSampleDisplayPlugin=function(){
WasDisplayCalled=false;
parameterPassedToDisplay={};
(function (a) {
    a.SD(function (pstatus, pnameofTest, pexpectedValue, pactualValue, preasonForFailingTest) {
	WasDisplayCalled=true;
        var t = {
            a: pstatus,
            b: pnameofTest,
            c: pexpectedValue,
            d: pactualValue,
            e: preasonForFailingTest
        };
		parameterPassedToDisplay=t;
    });
})(Aver);
};
var nameOfSampleTestPlug="testPlug";//critical to test setup!!!!!
var WasTestPlugCalled=false;
var passedActualValue={};
var passedExpectedValue={};
var setUpSampleTestPlug=function(){
passedActualValue={};
passedExpectedValue={};
 WasTestPlugCalled=false;
(function (a) {
    var IsEqualTo = {
        name: nameOfSampleTestPlug,
        method: function (actualValue, expectedValue) {
		WasTestPlugCalled=true;
		passedActualValue=actualValue;
        passedExpectedValue=expectedValue;
		
            return true;
        }
    };
    a.PI(IsEqualTo);
})(Aver);

};

test( "That public method for Setting up Display Avert.SD is exposed", function() {
ok( typeof(Aver.SD) == "function", "Public 'Aver.SD' must be exposed to set up display!" );
});

test( "That public method for Setting up Test Plugs Avert.PI is exposed", function() {
ok( typeof(Aver.PI) == "function", "Public 'Aver.PI' must be exposed to set up Test Plugs!" );
});

test( "That public method for starting test specification Avert.WhenTesting is exposed", function() {
ok( typeof(Aver.WhenTesting) == "function", "Public 'Aver.WhenTesting' must be exposed to enable user start test specification!" );
});

test( "making sure local variable Aver.WhenTesting.ToMakeSure is  exposed", function() {
ok( typeof(Aver.WhenTesting().ToMakeSure) == "function", "local 'Aver.WhenTesting.ToMakeSure' must be accesible!" );
});

test( "making sure internal testplug Aver.WhenTesting.ToMakeSure.Is is  exposed", function() {
ok( typeof(Aver.WhenTesting().ToMakeSure().Is) == "function", "internal test plug 'Aver.WhenTesting.ToMakeSure.Is' must be accesible!" );
});

test( "That public short method for  test specification Avert.T is exposed", function() {
ok( typeof(Aver.T) == "function", "short method for  test specification Avert.T must be exposed!" );
});

test( "sample test 'true' using internal test plug  USING SHORT FORM TEST  must pass", function() {
ok( Aver.T("", true, ""), "testing 'true' using internal test plug  USING SHORT FORM TEST  must pass");
});

test( "sample test 'false' using internal test plug USING SHORT FORM TEST must fail", function() {
ok(!Aver.T("", false, ""), "testing 'false' using internal test plug  USING SHORT FORM TEST  must fail");
});

test( "sample test 'true' using internal test plug  USING SHORT LONG TEST  must pass", function() {
ok( Aver.WhenTesting("").ToMakeSure(true).Is(true).OtherwiseFailBecause(""), "testing 'true' using internal test plug  USING LONG FORM TEST  must pass");
});

test( "sample test 'false' using internal test plug USING LONG FORM TEST must fail", function() {
ok(!Aver.WhenTesting("").ToMakeSure(false).Is(true).OtherwiseFailBecause(""), "testing 'false' using internal test plug  USING LONG FORM TEST  must fail");
});

test( "when a display plugin is present, display plugin should be invoked to create the display after the SHORT form test has been executed", function() {
setUpSampleDisplayPlugin();
Aver.T("", false, "");
ok(WasDisplayCalled, "Display plugin should be called after invoking the SHORT form test");
});

test( "when a display plugin is present, display plugin should be invoked to create the display after the LONG form test has been executed", function() {
setUpSampleDisplayPlugin();
Aver.WhenTesting("").ToMakeSure(true).Is(true).OtherwiseFailBecause("");
ok(WasDisplayCalled, "Display plugin should be called after invoking the LONG form test");
});

test( "when a display plugin is present, display plugin should NOT be invoked to create the display before test has been executed", function() {
setUpSampleDisplayPlugin();
ok(!WasDisplayCalled, "Display plugin should NOT be called before invoking the short form test");
});



test( "when a test plug "+nameOfSampleTestPlug+" is present, "+nameOfSampleTestPlug+" method should be NOT! invoked  after the SHORT form test has been executed", function() {
setUpSampleTestPlug();
Aver.T("", false, "");
ok(!WasTestPlugCalled, " "+nameOfSampleTestPlug+" method  should be called after invoking the SHORT form test");
});

test( "when a test plug "+nameOfSampleTestPlug+" is present, "+nameOfSampleTestPlug+" method should be invoked  after the LONG form test has been executed", function() {
setUpSampleTestPlug();
Aver.WhenTesting("").ToMakeSure(true)[nameOfSampleTestPlug](true).OtherwiseFailBecause("");
ok(WasTestPlugCalled, " "+nameOfSampleTestPlug+" method  should be called after invoking the LONG form test");
});

test( "when a test plug "+nameOfSampleTestPlug+" is present, "+nameOfSampleTestPlug+" method  should NOT be invoked  before test has been executed", function() {
setUpSampleTestPlug();
ok(!WasTestPlugCalled, ""+nameOfSampleTestPlug+" method   should NOT be called before invoking the short form test");
});


test( "when a test plug "+nameOfSampleTestPlug+" is present, correct actualValue  parameter must be passed to the testplug  "+nameOfSampleTestPlug+" when test is invocked", function() {
setUpSampleTestPlug();
var actualValue="12345";
var expectedValue="678910";
setUpSampleTestPlug();
Aver.WhenTesting("").ToMakeSure(actualValue)[nameOfSampleTestPlug](expectedValue).OtherwiseFailBecause("");
ok(actualValue===passedActualValue, "Correct actual value must be passed to the testplugs when test is invoked");
});

test( "when a test plug "+nameOfSampleTestPlug+" is present, correct expectedValue  parameter must be passed to the testplug  "+nameOfSampleTestPlug+" when test is invocked", function() {
setUpSampleTestPlug();
var actualValue="12345";
var expectedValue="678910";
setUpSampleTestPlug();
Aver.WhenTesting("").ToMakeSure(actualValue)[nameOfSampleTestPlug](expectedValue).OtherwiseFailBecause("");
ok(expectedValue===passedExpectedValue, " Correct expected value must be passed to the testplugs when test is invoked");
});














