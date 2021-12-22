import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from "../../../config/api"
import axios from 'axios'
import { useParams, useHistory } from "react-router-dom";
import Navigation from '../../../config/navigation'


function Index(props) {

    const history = useHistory();
    let { id } = useParams();
    const [account, setAccount] = useState([])
    const [edu, setEdu] = useState([])
    const [tran, setTran] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        actionGetProfile(id)
    }, [])

    const actionGetProfile = (id) => {
        /*
        
        note tdotdev 17/11/64 ขี้เกียจทำ ตัว pagination ถ้าขยันก็ทำต่อได้เลยดูตัวอย่างจาก drawing/menber.js ไม่ก็ไปหาตัว datatable

        */
        axios.get(`${API}/board/profile/${id}`)
            .then(res => {

                if (res.data.bypass) {
                    console.log(res.data.data)
                    setAccount(res.data.data.account)
                    setEdu(res.data.data.edu)
                    setTran(res.data.data.tran)
                    setLoading(true)
                } else {
                    history.replace(`/system/${Navigation.PagePSoffice}`)
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <>
            {
                loading ?
                    <div className="card card-widget widget-user">
                        <div className="widget-user-header bg-info">
                            <h3 className="widget-user-username">{account.title}{account.firstname} {account.surname}</h3>
                            <h5 className="widget-user-desc">{account.position}</h5>
                        </div>

                        <a rel="noreferrer" target="_blank" href={`https://www.mis-ird.rmuti.ac.th/evaluation/upload/profile/full/${account.pic_path}/${account.pic_name}`} >
                            <div className="widget-user-image">
                                <img className="img-circle elevation-2"
                                    src={`https://www.mis-ird.rmuti.ac.th/evaluation/upload/profile/thumb/${account.pic_path}/${account.pic_name}`}
                                    alt="User Avatar" />

                            </div>
                        </a>


                        <div className="card-footer">

                            <div style={{ paddingBottom: "1%" }}></div>


                            <h4>ประวัติการศึกษา</h4>

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">วุฒิการศึกษา</th>
                                        <th scope="col">GPA</th>
                                        <th scope="col">สาขา</th>
                                        <th scope="col">จบจาก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        edu.map((el, index) => {
                                            return (
                                                <tr key={index} >
                                                    <th key={index} scope="row">{index + 1}</th>
                                                    <td>{el.graduate_name}</td>
                                                    <td>{el.gpa}</td>
                                                    <td>{el.major}</td>
                                                    <td>{el.school_name}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                            <hr />

                            <h4>ประวัติการอบรม</h4>

                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">หัวข้อการอบรม</th>
                                        <th scope="col">สถานที่</th>
                                        <th scope="col">หน่วยงาน</th>
                                        <th scope="col">ปี</th>
                                        <th scope="col">วันที่เริ่ม</th>
                                        <th scope="col">วันที่สิ้นสุด</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tran.map((el, index) => {
                                            return (
                                                <tr key={index} >
                                                    <th key={index} scope="row">{index + 1}</th>
                                                    <td>{el.title}</td>
                                                    <td>{el.location}</td>
                                                    <td>{el.agency}</td>
                                                    <td>{el.year}</td>
                                                    <td>{el.start_time}</td>
                                                    <td>{el.end_time}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                    : <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

            }
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setTitle: (data) => dispatch({ type: 'setTitle', payload: data }),
        setPath: (data) => dispatch({ type: 'setPath', payload: data }),
    }
}

export default connect(null, mapDispatchToProps)(Index)