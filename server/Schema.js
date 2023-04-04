var mongoose = require('mongoose');

let IQC = new mongoose.Schema({
    pptfiles:[Object],
    exefiles:[Object],
    iqc:[
        {
            partname:{
             type: String,
            },
            vendorname:{
                type: String,
            },
            partcode:{
                type: String,
            },
            grndate:{
                type: String,
            },
            project:{
                type: String,
            },
            lotqty:{
                type: String,
            },
            drawno:{
                type: String,
            },
            failurerate:{
                type: String,
            },
            issuedetails:{
                type: String,
            },
            status:{
                type: String,
            }
        }
    ]
});

module.exports = mongoose.model('IQC',IQC )