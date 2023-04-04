var express = require('express');
var router = express.Router();
var IQC = require('./Schema');
var multer=require('multer');
var path = require('path');
var fs = require('fs').promises;
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

const Storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './Ppt/')
    },
    filename: function (req, file, callback) {
    callback(null,Date.now()+path.extname(file.originalname));
  }
});
// const exeStorage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './excel/')
//     },
//     filename: function (req, file, callback) {
//     callback(null,Date.now()+path.extname(file.originalname));
//   }
// });


const upload = multer({ storage: Storage});
// const uploadexe = multer({ exestorage: exeStorage});

router.post('/addiqc',upload.fields([{name:'ppt',maxCount: 10},{name:'exe',maxCount: 10}]),async(req, res) => {
                const iqc = JSON.parse(req.body.iqc);
                let pptarray = [];
                let excelarray=[];
                // console.log(req.files.exe)
                //  console.log(req.pptfiles)
                if(req.files.ppt){
                req.files.ppt.forEach(element=>{
                    
                    let sliceit = element.filename.slice(0,-5);
                    async function main() {
                    const ext = '.pdf'
                    const inputPath = path.join(__dirname, `./Ppt/${element.filename}`);
                    const outputPath = path.join(__dirname,`../client/src/components/pdf/${sliceit}${ext}`);
                    const docxBuf = await fs.readFile(inputPath);
                    let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
                    await fs.writeFile(outputPath, pdfBuf);
                    }
                    main().catch(function (err) {
                        console.log(`Error converting file: ${err}`);
                    });

                    const file={
                        filename: element.filename,
                        originalname: element.originalname,
                        mimetype: element.mimetype,
                        path: element.path,
                        size:element.size
                    }
                    pptarray.push(file)
                })}
             
                if(req.files.exe){
                req.files.exe.forEach(element=>{
                    const file={
                        filename: element.filename,
                        originalname: element.originalname,
                        mimetype: element.mimetype,
                        path: element.path,
                        size:element.size
                    }
                    excelarray.push(file)
                })}

            
                const datas = new IQC({
                    pptfiles:pptarray,
                    exefiles:excelarray,
                    iqc: iqc,
                });
                await datas.save();
                res.json({ message:"Added Successfully"})
})



router.get('/getiqcdata',async(req,res)=>{
    const datas=await IQC.find()
    res.json(datas)
})

router.get('/getiqcdatas/:id/:filename',async(req,res)=>{
    const datas=await IQC.findById(req.params.id)
    res.json(datas)
})


router.post('/update/:id',upload.fields([{name:'ppt',maxCount: 10},{name:'exe',maxCount: 10}]), async(req,res)=>{
    const data = await IQC.findById(req.params.id);
    data.pptfiles?.map((get) => {
            let sliceit = get.filename.slice(0,-5);
            fs.unlink(`Ppt/${get.filename}`, (err => {
                if (err) {
                    console.log("error")
                }
                else {
                    console.log("deleted in file system")
    
                }
            }))
            fs.unlink(`../client/src/components/pdf/${sliceit}.pdf`, (err => {
                if (err) {
                    console.log("error")
                }
                else {
                    console.log("deleted in file system")
    
                }
            }))
        
    }) 
    data.exefiles?.map((get)=>{
        fs.unlink(get.path, (err => {
           if (err) {
               console.log("error")
           }
           else {
               console.log("deleted in file system")
           }
       }))
   })
    const iqc = JSON.parse(req.body.iqc);
    const datas = await IQC.findByIdAndUpdate(req.params.id);
    let pptarray = [];
    let excelarray=[];
    if(req.files.ppt){
        req.files.ppt.forEach(element=>{
            let sliceit = element.filename.slice(0,-5);
            async function main() {
            const ext = '.pdf'
            const inputPath = path.join(__dirname, `./Ppt/${element.filename}`);
            const outputPath = path.join(__dirname,`../client/src/components/pdf/${sliceit}${ext}`);
            const docxBuf = await fs.readFile(inputPath);
            let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
            await fs.writeFile(outputPath, pdfBuf);
            }
            main().catch(function (err) {
                console.log(`Error converting file: ${err}`);
            });

            const file={
                filename: element.filename,
                originalname: element.originalname,
                mimetype: element.mimetype,
                path: element.path,
                size:element.size
            }
            pptarray.push(file)
        })}
        if(req.files.exe){
        req.files.exe.forEach(element=>{
            const file={
                filename: element.filename,
                originalname: element.originalname,
                mimetype: element.mimetype,
                path: element.path,
                size:element.size
            }
            excelarray.push(file)
        })}
        datas.pptfiles=pptarray;
        datas.exefiles=excelarray;
        datas.iqc= iqc;
        await datas.save();
        res.json({message: "Updated Successfully"})
})

router.delete('/delete/:id/:secondid/:pptfilename/:exefilename', async (req, res) => {
const data = await IQC.findById(req.params.id);

data.pptfiles?.map((get) => {
    if (get.filename === req.params.pptfilename) {
        let sliceit = get.filename.slice(0,-5);
        fs.unlink(`Ppt/${get.filename}`, (err => {
            if (err) {
                console.log("error")
            }
            else {
                console.log("deleted in file system")

            }
        }))
        fs.unlink(`../client/src/components/pdf/${sliceit}.pdf`, (err => {
            if (err) {
                console.log("error")
            }
            else {
                console.log("deleted in file system")

            }
        }))
    }
})  
data.exefiles?.map((get)=>{
    if (get.filename === req.params.exefilename) {
    fs.unlink(get.path, (err => {
       if (err) {
           console.log("error")
       }
       else {
           console.log("deleted in file system")
       }
   }))}
})
          await IQC.findOneAndUpdate({_id : req.params.id},
            {$pull: {iqc : {_id: req.params.secondid} }}
          )
          
          await IQC.findOneAndUpdate({_id : req.params.id},
            {$pull: {pptfiles : {filename : req.params.pptfilename} }}
          )
          await IQC.findOneAndUpdate({_id : req.params.id},
            {$pull: {exefiles : {filename : req.params.exefilename} }}
          )

          if((data.iqc.length) === 1)
          {await IQC.findByIdAndDelete(req.params.id)}
});


module.exports = router;