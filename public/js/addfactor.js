    $(document).ready(function() {
        var max_fields      = 10; //maximum input boxes allowed
        var wrapper         = $(".input_fields_wrap"); //Fields wrapper
        var add_button      = $(".add_field_button"); //Add button ID

        var x = 1; //initlal text box count
        $(add_button).click(function(e){ //on add input button click
            e.preventDefault();
            if(x < max_fields){ //max input box allowed
               //text box increment
                $(wrapper).append('        <div>\n' +
                    '        <div class="x_title">\n' +
                    '            <h2>ردیف '+x+'</h2>\n' +
                    '\n' +
                    '            <div class="clearfix"></div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="form-group col-md-4 col-sm-4 ">\n' +
                    '            <label class="control-label col-md-3 col-sm-3 col-xs-12">موضوع <span class="required">*</span>\n' +
                    '            </label>\n' +
                    '            <div class="col-md-6 col-sm-6 col-xs-12">\n' +
                    '                <input id="radif['+x+'][title]" name="title" class="date-picker form-control col-md-7 col-xs-12" required="required" type="text">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="form-group col-md-4 col-sm-4 ">\n' +
                    '            <label class="control-label col-md-3 col-sm-3 col-xs-12">قیمت واحد <span class="required">*</span>\n' +
                    '            </label>\n' +
                    '            <div class="col-md-6 col-sm-6 col-xs-12">\n' +
                    '                <input id="radif['+x+'][percost]" name="percost" class="oneprice date-picker form-control col-md-7 col-xs-12" required="required" type="number">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="form-group col-md-4 col-sm-4 ">\n' +
                    '            <label class="control-label col-md-3 col-sm-3 col-xs-12">تعداد <span class="required">*</span>\n' +
                    '            </label>\n' +
                    '            <div class="col-md-6 col-sm-6 col-xs-12">\n' +
                    '                <input id="radif['+x+'][quantity]" name="quantity" class="quantity date-picker form-control col-md-7 col-xs-12" required="required" type="number">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="form-group col-md-12 col-sm-12 ">\n' +
                    '            <label class="control-label col-md-3 col-sm-3 col-xs-12">توضیحات <span class="required">*</span>\n' +
                    '            </label>\n' +
                    '            <div class="col-md-6 col-sm-6 col-xs-12">\n' +
                    '                <input id="radif['+x+'][comment]" name="comment" class="date-picker form-control col-md-7 col-xs-12"  type="text">\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '        <div class=""></div>\n' +
                    '\n' +
                    '        </div>'); //add input box
                x++;
            }
        });

        $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
            e.preventDefault(); $(this).parent('div').remove(); x--;
        })
    });

    $(document).on('keyup', '.quantity', function () {
        calculate();
    })

    $(document).on('keyup', '.net_rate', function () {
        calculate();
    })

    $(document).on('change', '.maliat', function () {
        calculate();
    })


    function calculate(){
        var maliat=0;
        var sum = 0;
        var count=0;
        var qq=0;
        document.getElementById("Grand").value=sum;
        var radif = $(document.getElementsByClassName("quantity"));
        console.log("radif:"+radif.length);
            radif.each(function (i,e) {
                console.log(parseInt(persianToEnglish(e.value)));
                if( !isNaN(parseInt(persianToEnglish(e.value))))
                    count+=parseInt(persianToEnglish(e.value));
                sum+=persianToEnglish(e.value)*persianToEnglish(document.getElementsByClassName("oneprice")[i].value);
                qq++;
        })
        document.getElementById('Grand').innerHTML = moneyformat(sum.toString());
        if( document.getElementById("arzeshafzude").value==="1")
        {
            maliat=sum*9/100;
            maliat= Math.round(maliat)
            document.getElementById('maliatcount').innerHTML =moneyformat( maliat.toString());
            document.getElementById('maliatcount1').value =( maliat.toString());
        }
        else {
            document.getElementById('maliatcount').innerHTML = moneyformat("0");
            document.getElementById('maliatcount1').value = ("0");
            maliat=0;
        }
        document.getElementById('factorcount').value =count;
        document.getElementById('total1').value = ((maliat+sum).toString());

        document.getElementById('total').innerHTML = moneyformat((maliat+sum).toString());
console.log("total1"+document.getElementById('total1').value);
    };

    function persianToEnglish(value) {
        var newValue="";
        for (var i=0;i<value.length;i++)
        {
            var ch=value.charCodeAt(i);
            if (ch>=1776 && ch<=1785) // For Persian digits.
            {
                var newChar=ch-1728;
                newValue=newValue+String.fromCharCode(newChar);
            }
            else if(ch>=1632 && ch<=1641) // For Arabic & Unix digits.
            {
                var newChar=ch-1584;
                newValue=newValue+String.fromCharCode(newChar);
            }
            else
                newValue=newValue+String.fromCharCode(ch);
        }
        return newValue;
    }
