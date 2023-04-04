import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios';
import logo from './img/RURUTEK - Logo Original.svg'


export default function Edit() {
    // const[file,setFile] = useState()
 
  const [uploadedpptFiles, setUploadedpptFiles] = useState([]);
  const [uploadedexeFiles, setUploadedexeFiles] = useState([]);
    const [editIQC, setEditIQC] = useState([{}]);
    const { id } = useParams();
    const navigate = useNavigate();
    const { filename } = useParams();
    const viewpage = `/ViewIQC`;
    const addpage = `/`;
    
    useEffect(()=>{
      axios.get(`http://172.16.0.100:3003/getiqcdatas/${id}/${filename}`).then((res)=>{setEditIQC(res.data)})
  },[])
// console.log(id)
//   console.log(editIQC)

    let list = editIQC.iqc?.map((list, index) =>{return list;})
    // let getpptfile = editIQC.pptfiles?.map((list, index) =>{return list;})
    // let getexefile = editIQC.exefiles?.map((list, index) =>{return list;})

    const [iqcs, setIqc] = useState(list)
    // const [gotpptfile,setGotpptfile] = useState(getpptfile)
    // const [gotexefile,setGotexefile] = useState(getexefile)

    useEffect(() => { setIqc(list)}, list )
    // useEffect(() => { setGotpptfile(getpptfile)}, getpptfile )
    // useEffect(() => { setGotexefile(getexefile)}, getexefile )


    function deleteTask(id,secondid) {
      return setIqc(() => iqcs.filter((pre) => pre._id !== id || pre.id !== secondid))
    }
  
    const handleTask = (index, event) => {
      const values = [...iqcs];
      values[index][event.target.name] = event.target.value;
      setIqc(values);
    }
    function addTask() {
      const added = {
        id: Math.floor(Math.random() * 1000),
        partname:'',
         vendorname:'',
         partcode:'',
         grndate:'',
         project:'',
         lotqty:'',
         drawno:'',
         failurerate:'',
         issuedetails:'',
         status:''
      }
      return setIqc((prev) => [...prev, added])
    }
    const handleuploadedfiles = (files) => {
      let uploadedppt = [...uploadedpptFiles];
      let uploadedexe = [...uploadedexeFiles];
      // let limitexceeded = false;
  
      // console.log(uploadedppt)
      // console.log(uploadedexe)
      // console.log(files)
  // if(files.length !== 0){
      files.some((file) => {
        if (uploadedppt.findIndex((f) => f.name === file.name) === -1 && (file.type === 'application/vnd.ms-powerpoint' || file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' )) {
          uploadedppt.push(file);
          setUploadedpptFiles(uploadedppt);
        }
        else if(uploadedexe.findIndex((f) => f.name === file.name) === -1 && (file.type === 'application/vnd.ms-excel' || file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')){
          uploadedexe.push(file);
          setUploadedexeFiles(uploadedexe);
        }
      })
    // }

  }
    const handlepptfiles = (e) => {
      const chosenfiles = Array.prototype.slice.call(e.target.files)
      // console.log(chosenfiles)
      handleuploadedfiles(chosenfiles);
    }
    const handleexefiles = (e) => {
      const chosenfiles = Array.prototype.slice.call(e.target.files)
      // console.log(chosenfiles)
      handleuploadedfiles(chosenfiles);
    }
    // console.log(uploadedpptFiles)
    // console.log(uploadedexeFiles)
    function handleSubmit(e) {
      e.preventDefault();
        const iqc = JSON.stringify(iqcs);
        const formdata = new FormData()
        for (let i = 0; i < uploadedpptFiles.length; i++) { formdata.append('ppt', uploadedpptFiles[i]) }
        for (let i = 0; i < uploadedexeFiles.length; i++) { formdata.append('exe', uploadedexeFiles[i]) }
        formdata.append('iqc', iqc);
        axios.post(`http://172.16.0.100:3003/update/${id}`, formdata).then(res => res.data.message === "Updated Succesfully" ? navigate(`/viewIQC`) : alert(res.data.message))
    }
  
    // useEffect(() => {
    //     axios.get(`http://172.16.0.155:3001/singleuser/${empid}/${id}`).then(res => setUser(res.data.user))
    //   }, [])



   
  return (
    <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">

      {/* Content wrapper */}

      <div className="content-wrapper">

        <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
          <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <img src={logo} width='125px'></img>
              <div className="navbar-nav align-items-center ms-auto">
                <h5 className="fw-bold mt-3" style={{fontSize:'19px'}}>INCOMING QUALITY CONTROL <span style={{color:'red'}}>[EDIT IQC]</span></h5>
              </div>
            <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item">
              <button type="button" className="btn btn-warning" id='addTask' onClick={addTask}>Add More</button>
            </li>
            <li className="nav-item px-3">
             <a className="btn btn-success text-white"  href={addpage} id='addIQC'>
                    Add IQC
                </a>
            
              </li>

              <li className="nav-item ">
             <a className="btn btn-success text-white"  href={viewpage} id='viewTask'>
                    View IQC
                </a>
            
              </li>
            </ul>
          </div>
        </nav>


        {/* Content */}


        <div className="container-xxl flex-grow-1 container-p-y">
  
          <div id='overflowtry'>
          {iqcs?.map((exp, index) => <>

<div className="row">
  {/* <div >
<h5 className="mb-2 fw-bold btn">IQC Details {index + 1}</h5>

</div> */}
  {/* Basic Layout */}
  <div className="col-xxl">
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center justify-content-between ">
        <h5 className="fw-bold" style={{fontSize:'16px'}}>IQC Details {index + 1}</h5>
        {/* <small className="text-muted float-end">Merged input group</small> */}
      </div>
      <div className="card-body">
        <form>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">GRN Date</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-calendar-check" /></span>
                <input type="date" className="form-control" name="grndate" id="basic-icon-default-fullname" value={exp.grndate} onChange={(e) => { handleTask(index, e) }} placeholder={`GRN Date ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">Part Name</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-rename" /></span>
                <input type="text" className="form-control" name="partname" value={exp.partname} id="basic-icon-default-fullname" onChange={e => handleTask(index, e)} placeholder={`Part Name ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Part Code</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-company2" className="input-group-text"><i className="bx bx-barcode-reader" /></span>
                <input type="text" id="basic-icon-default-company" name="partcode" value={exp.partcode} className="form-control" onChange={e => handleTask(index, e)} placeholder={`Part Code ${index + 1}`} aria-label="ACME Inc." aria-describedby="basic-icon-default-company2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 form-label" htmlFor="basic-icon-default-phone">Vendor Name</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-phone2" className="input-group-text"><i className="bx bx-group" /></span>
                <input type="text" id="basic-icon-default-phone" name="vendorname" className="form-control phone-mask" value={exp.vendorname} onChange={e => handleTask(index, e)} placeholder={`Vendor Name ${index + 1}`} aria-label="658 799 8941" aria-describedby="basic-icon-default-phone2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">Lot Qty</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-message-square-detail" /></span>
                <input type="text" className="form-control" name="lotqty" value={exp.lotqty} id="basic-icon-default-fullname" onChange={e => handleTask(index, e)} placeholder={`Lot Qty ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">Drawing No.</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-message-square-detail" /></span>
                <input type="text" className="form-control" name="drawno" value={exp.drawno} id="basic-icon-default-fullname" onChange={e => handleTask(index, e)} placeholder={`Drawing Number ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>

          {/* <div className="row justify-content-end">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">Send</button>
        </div>
      </div> */}
        </form>
      </div>
    </div>
  </div>
  {/* Basic with Icons */}
  <div className="col-xxl">
    <div className="card mb-4">
      <div className="card-header d-flex align-items-center justify-content-between flex-row-reverse">
      <button className="btn btn-danger" onClick={() => deleteTask(exp.id)} id='deleteTask'><i className="bx bx-trash" style={{paddingBottom:'2px'}}/></button>
        
        {/* <small className="text-muted float-end">Merged input group</small> */}
      </div>
      <div className="card-body">
        <form>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">ppt Upload </label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-file" /></span>
                <input type="file" className="form-control" id="basic-icon-default-fullname" onChange={(e) =>{handlepptfiles(e)}} placeholder={`Ppt Upload ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">exc Upload </label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-file" /></span>
                <input type="file" className="form-control" id="basic-icon-default-fullname" onChange={(e) =>{handleexefiles(e)}} placeholder={`Excel Upload ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 form-label" htmlFor="basic-icon-default-phone">Project / Model</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-phone2" className="input-group-text"><i className="bx bx-briefcase" /></span>
                <input type="text" id="basic-icon-default-phone"  name="project" className="form-control phone-mask" value={exp.project} onChange={e => handleTask(index, e)} placeholder={`Project/Model ${index + 1}`} aria-label="658 799 8941" aria-describedby="basic-icon-default-phone2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-fullname">Issue Detail</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-fullname2" className="input-group-text"><i className="bx bx-task-x" /></span>
                <input type="text" className="form-control" id="basic-icon-default-fullname" name="issuedetails" value={exp.issuedetails} onChange={e => handleTask(index, e)} placeholder={`Issue Details ${index + 1}`} aria-label="John Doe" aria-describedby="basic-icon-default-fullname2" />
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Failure Rate</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span id="basic-icon-default-company2" className="input-group-text"><i className="bx bx-trending-down" /></span>
                <input type="text" id="basic-icon-default-company" className="form-control" name="failurerate" value={exp.failurerate} onChange={e => handleTask(index, e)} placeholder={`Failure Rate  ${index + 1}`} aria-label="ACME Inc." aria-describedby="basic-icon-default-company2" />
              </div>
            </div>
          </div>
          <div className="row mb-1">
            <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-email">Status</label>
            <div className="col-sm-10">
              <div className="input-group input-group-merge">
                <span className="input-group-text"><i className="bx bx-stats" /></span>
                <input type="text" id="basic-icon-default-email" className="form-control"  name="status" value={exp.status} onChange={e => handleTask(index, e)} placeholder={`Status ${index + 1}`} aria-label="john.doe" aria-describedby="basic-icon-default-email2" />
                {/* <span id="basic-icon-default-email2" className="input-group-text">@example.com</span> */}
              </div>
              {/* <div className="form-text">You can use letters, numbers &amp; periods</div> */}
            </div>
          </div>

        </form>
      </div>
    </div>
  </div>         <hr></hr>
</div></>)}
              <div className="text-center">
              <button type="submit" className="btn btn-primary" id='submitTask' onClick={(e) => handleSubmit(e)}>Submit</button>
            </div>
          </div>
        </div>
        {/* / Content */}
        {/* Footer */}
        {/* / Footer */}
        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}
      {/* / Layout page */}
    </div>
    {/* Overlay */}

  </div>
  )
}
