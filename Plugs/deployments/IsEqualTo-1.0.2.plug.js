(function (a) {
    var IsEqualTo = {
        name: "IsEqualTo",
        method: function (actualValue, expectedValue) {
            if (actualValue === expectedValue) {
                return true;
            } else {
                return false;
            }
        }
    };
    a.PI(IsEqualTo);
})(Aver);