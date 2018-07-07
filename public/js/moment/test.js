
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-98265042-4', 'auto');
ga('send', 'pageview');

document.getElementById("convertToJalaliForm").onsubmit = function(){
    var input = document.getElementById("gregorianInput").value;
    var output = moment(input, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
    document.getElementById("jalaliOutput").innerText = output;
    return false;
};

document.getElementById("convertToGregorianForm").onsubmit = function(){
    var input = document.getElementById("jalaliInput").value;
    var output = moment.from(input, 'fa', 'YYYY/MM/DD').locale('en').format('YYYY/MM/DD');
    document.getElementById("gregorianOutput").innerText = output;
    return false;
};

document.getElementById("validateShamsiForm").onsubmit = function() {
    var output="";
    try{
        var input = document.getElementById("validatingDate").value;
        var m = moment(input, 'YYYY/MM/DD');
        if(m.isValid()){
            output = "معتبر است";
        } else {
            output = "معتبر نیست";
        }
    }
    catch(e){
        output = "معتبر نیست";
    }
    document.getElementById("ValidationOutput").innerText = output;
    return false;
};
