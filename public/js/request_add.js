console.log("trying");
var socket = io.connect('http://localhost:3000');
socket.on('announcements', function(data) {
    console.log('Got announcement:', data.message);
});
var addressdata;
socket.on('userdetail', function(data) {
    var a = document.getElementById("requester");
    var user=data.user;
    addressdata=data.address;
    console.log("user "+user);
    var x = document.getElementById("adressesselect");
    x.innerText=null;
    var option = document.createElement("option");
    option.text ="سایر";
    option.value="0";
    x.add(option);
    if( user!=null)
    {
        console.log("not null");
        a.setAttribute('value', user.name);
        document.getElementById("userid").setAttribute('value', user._id);
        a.setAttribute('readonly',"readonly");
        if(addressdata!==null)
        for(q=0;q<addressdata.length;q++)
        {
            var option = document.createElement("option");
            if(typeof sherkat!=='undefined')
            if(sherkat.addressid===addressdata[q]._id.toString())
            {
                option.selected="selected";
            }
            option.text = addressdata[q].address;
            option.setAttribute('value',  addressdata[q]._id);
            x.add(option);
        }

    }
    else
    {
        document.getElementById("userid").setAttribute('value', "0");
        console.log("not user")
        a.setAttribute('value', "");
        a.removeAttribute("readonly");
    }
});
function postMessage()
{
    var a = document.getElementById("requester");
    if(a.value !== /^(9|09)(12|13|16|17|19|21|32|35|36|37|38|39)\d{7}$/)
    {
        console.log("focusout");
        if (socket) {
            console.log("sending");
            socket.emit('message',$('#phone').val());
        }
    }

}
function addressChange()
{
    var a = document.getElementById("adressesselect");
    var zone = document.getElementById("zone");
    var city = document.getElementById("city");
    var ostan = document.getElementById("ostan");
    var address = document.getElementById("address");
    var addressid = document.getElementById("adressesselect");
    if(a.options[a.selectedIndex].value !== "0")
    {
        for(q=0;q<addressdata.length;q++)
        {
                if(a.options[a.selectedIndex].value===addressdata[q]._id.toString())
                {
                    ostan.setAttribute('value', addressdata[q].ostan.toString());
                    zone.setAttribute('value', addressdata[q].zone.toString());
                    city.setAttribute('value', addressdata[q].city.toString());
                    address.setAttribute('value', addressdata[q].address.toString());
                    addressid.setAttribute('value', addressdata[q]._id.toString());
                    newaddress(addressdata[q].latlng.toString());
                }
        }
        activemap("0");
        address.setAttribute('readonly',"readonly");
        zone.setAttribute('readonly',"readonly");
        city.setAttribute('readonly',"readonly");
        ostan.setAttribute('readonly',"readonly");

    }
    else{
        activemap("1");
        console.log("zero");
        address.setAttribute('value', "");
        addressid.setAttribute('value', "0");
        zone.removeAttribute("readonly");
        city.removeAttribute("readonly");
        ostan.removeAttribute("readonly");
        address.removeAttribute("readonly");}


}
