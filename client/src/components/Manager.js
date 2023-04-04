import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './View.css'
import { BsFillPencilFill, BsFillTrashFill, BsFillFileEarmarkPptFill } from "react-icons/bs";
import logo from './img/RURUTEK - Logo Original.svg'

export default function Manager() {
    const [search, setSearch] = useState('')
    const [all, setAll] = useState([])
    const navigate = useNavigate();
    const [toggles, setToggles] = useState(false);
    const tableRef = useRef(null);
    const today = new Date();
    var months = "0" + (today.getMonth() + 1);
    var monthcurrent = (today.getFullYear() + "-" + (months.slice(-2)));
    const [month, setMonth] = useState(monthcurrent);
    const Serverhost = "http://172.16.0.100:3003/";
    const addtask = `/`;


    function deleteIQC(id,secondid,pptfilename,exefilename) {
        if (window.confirm(" Are you sure to delete ")) {
        axios.delete(`http://172.16.0.100:3003/delete/${id}/${secondid}/${pptfilename}/${exefilename}`)
        window.location.reload(false)
        // .then((e) => window.location.reload(e));
    }
}
    useEffect(() => {
        axios.get('http://172.16.0.100:3003/getiqcdata').then(res => setAll(res.data))
    }, [])
    const searches = (got) => { 
        return got.partname.toLowerCase().includes(search) || got.vendorname.toLowerCase().includes(search) || got.status.toLowerCase().includes(search) ||  got.project.toLowerCase().includes(search) || got.lotqty.toLowerCase().includes(search) || got.failurerate.toLowerCase().includes(search) || got.issuedetails.toLowerCase().includes(search) || got.partcode.toLowerCase().includes(search)
    }

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <div className="content-wrapper">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                        <img src={logo} width='125px'></img>
                            <div className="navbar-nav align-items-center ms-auto">
                         
                                {/* <div className="nav-item d-flex align-items-center ">

                                    <h4 className="fw-bold py-2 mt-3">Incoming Quality Control</h4>
                
                                </div> */}
                            </div>
                            <ul className="navbar-nav flex-row align-items-center ms-auto">
                                <li className="nav-item px-3">
                                    {/* <button type="button" className="btn btn-warning" id='addTask' onClick={addTask}>Add More</button> */}
                                </li>
                                <div className='row mx-auto '>
                                    <div className="col-md-6">
                                        <input type="month" value={month} name="name" className="form-control" id="name" onChange={(e) => setMonth(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6">
                                        <input className="form-control" placeholder='Search...' onChange={(e) => { setSearch(e.target.value) }}></input>
                                    </div>
                                </div>

                                <li className="nav-item ">
                                    <a className="btn btn-success text-white" href={addtask} id='addIQC'>
                                        Add IQC
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <br />
                    <div className="container card-body">

                        <div className="bg-light rounded h-100 p-4" style={{ boxShadow: '0 0 0.375rem 0.25rem rgb(161 172 184 / 15%)' }} >
                            {/* <div className="section-title"> */}
                            <h5 className="fw-bold text-center"> Incoming Quality Control</h5>
                            {/* </div> */}
                            {/* <div className='row mx-auto '>
                                        <div className="col-md-3">
                                            <input type="month" value={month} name="name" className="form-control" id="name" onChange={(e) => setMonth(e.target.value)} required />
                                        </div>
                                        <div className="col-md-3">
                                            <input className="form-control" placeholder='Search...' onChange={(e) => { setSearch(e.target.value) }}></input>
                                        </div>
                                    </div> */}
                            <br></br>
                            <div className="card-body" id='overflowlol'>
                                <div id='overflowview' className="table-responsive">
                                    <table ref={tableRef} className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th className="text-center">GNR Date</th>
                                                <th className="text-center">Part Name</th>
                                                <th className="text-center">Part Code</th>
                                                <th className="text-center">Vendor Name</th>
                                                <th className="text-center">Project/Model</th>
                                                <th className="text-center">Lot Qty</th>
                                                <th className="text-center">Drawing Number</th>
                                                <th className="text-center">Issue Details </th>
                                                <th className="text-center">Failure Rate</th>
                                                <th className="text-center">Status</th>
                                                <th className="text-center">PPT file</th>
                                                <th className="text-center">Excel file</th>
                                                <th className="text-center">Edit</th>
                                                <th className="text-center">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* .sort((a, b) => new Date(a.date).getDate() > new Date(b.date).getDate() ? 1 : -1) */}
                

                                     {all.map((get, index) => 
                                                get.iqc.filter((getiqc) =>
                                                    getiqc.grndate.slice(5, 7) === month.slice(-2)
                                                    && getiqc.grndate.slice(0, 4) == new Date(month).getFullYear() && searches(getiqc)).map((pro, index) =>
                                                        <tr key={index}>
                                                            <td className='text-center text-nowrap' >{pro.grndate.slice(8) + '-' + pro.grndate.slice(5, 7) + '-' + pro.grndate.slice(0, 4)}</td>
                                                            <td className='text-center text-nowrap' >{pro.partname}</td>
                                                            <td className='text-center text-nowrap' >{pro.partcode}</td>
                                                            <td className='text-center text-nowrap' >{pro.vendorname}</td>
                                                            <td className='text-center text-nowrap' >{pro.project}</td>
                                                            <td className='text-center text-nowrap' >{pro.lotqty}</td>
                                                            <td className='text-center text-nowrap' >{pro.drawno}</td>
                                                            <td className='text-center text-nowrap' >{pro.issuedetails}</td>
                                                            <td className='text-center text-nowrap' >{pro.failurerate}</td>
                                                            <td className='text-center text-nowrap' >{pro.status}</td>
                                                            <td className='text-nowrap' >  <button type='button' id='file' className='btn btn-light' onClick ={() => navigate(`/viewer/${get.pptfiles[index]?.filename}`)} style={{ padding: '0px 8px 2px 8px', borderRadius: '4px' }} ><BsFillFileEarmarkPptFill style={{ paddingBottom: '2px' }}/> {get.pptfiles[index]?.originalname}</button></td>
                                                            <td className='text-nowrap' >  <a type='button' href ={Serverhost + get.exefiles[index]?.filename} id='file' className='btn btn-light'style={{ padding: '0px 8px 2px 8px', borderRadius: '4px' }} ><BsFillFileEarmarkPptFill style={{ paddingBottom: '2px' }} download/> {get.exefiles[index]?.originalname}</a></td>
                                                            <td className='text-center text-nowrap' ><button type='button' className='btn btn-light' style={{ padding: '2px 8px 2px 8px', borderRadius: '4px' }} onClick={(e) => navigate(`/editIQC/${get._id}/${get.pptfiles[index]?.filename}`)}><BsFillPencilFill style={{ paddingBottom: '2px' }}></BsFillPencilFill></button></td>
                                                            <td className='text-center text-nowrap' ><button type='button' className='btn btn-light' style={{ padding: '2px 8px 2px 8px', borderRadius: '4px' }} onClick={(e) => deleteIQC(get._id,pro._id,get.pptfiles[index]?.filename,get.exefiles[index]?.filename)}><BsFillTrashFill style={{ paddingBottom: '2px' }} /></button></td>
                                                        </tr>)
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
