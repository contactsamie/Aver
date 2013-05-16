test( "That public method for Setting up Display Avert.SD is exposed", function() {
ok( typeof(Aver.SD) == "function", "Public 'Aver.SD' must be exposed to set up display!" );
});
test( "That public method for Setting up Test Plugs Avert.PI is exposed", function() {
ok( typeof(Aver.PI) == "function", "Public 'Aver.PI' must be exposed to set up Test Plugs!" );
});
test( "That public method for starting test specification Avert.WhenTesting is exposed", function() {
ok( typeof(Aver.WhenTesting) == "function", "Public 'Aver.WhenTesting' must be exposed to enable user start test specification!" );
});