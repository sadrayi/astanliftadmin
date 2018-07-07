var mongoose=require("mongoose"),
    Schema = mongoose.Schema;

var eshterakScheme = new Schema({
    eshterakid: {
        type: Number,
        required: true,
        index: {unique: true}
    },
    eshterakname: {type: String, required: true},
    eshterakduration: {type: Number, required: true},
    maxkarbar: {type: Number, required: true},
    maxteknesian: {type: Number, required: true},
});

let eshterakModel = db.model('eshterak', eshterakScheme);

eshterakModel.addeshterak = ( eshterak) => {
    var res = eshterakModel.find({}).then(async function (res) {
        var  lastid=await res.eshterakid;
        console.log("lastid".lastid);
        lastid++;
        console.log("res".res);
        console.log("last".lastid);
        eshterak.eshterakid=lastid;
        eshterak.save(function (err) {
            if (err) console.log(err);
            // saved!
        });
    });


};
eshterakModel.getAll = () => {
    eshterakModel.find({},function (err,res) {
        if (err) console.log(err);
        return res;
    });
};
eshterakModel.getkarbarlimit = (eshterakid) => {
    eshterakModel.find({eshterakid:eshterakid},function (error,person) {
         if (error) return handleError(error);
         return person.maxkarbar;
     });
};
eshterakModel.getteknesianlimit = (eshterakid) => {
    eshterakModel.find({eshterakid:eshterakid},function (error,person) {
         if (error) return handleError(error);
         return person.maxteknesian;
     });
};
eshterakModel.geteshterakname = (eshterakid) => {
    eshterakModel.find({eshterakid:eshterakid},function (error,person) {
         if (err) return handleError(error);
         return person.eshterakname;
     });
};

module.exports =  eshterakModel;

