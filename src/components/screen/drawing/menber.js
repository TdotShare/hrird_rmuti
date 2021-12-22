import React , { useEffect , useState } from 'react'
import { connect, useSelector } from 'react-redux'
import axios from "axios"
import API from "../../../config/api"
import swal from "../../../utils/swal"
import Navigation from '../../../config/navigation'
import { useHistory, useParams, Redirect } from "react-router-dom";

function Index(props) {

    const [drawlistData, setDrawListData] = useState([])
    const [drawingData, setDrawingData] = useState([])
    const [accountData, setAccountData] = useState([])

    const history = useHistory();

    const user = useSelector(state => state.user.data)
    const authenticate = useSelector(state => state.user.authenticate)

    let { id } = useParams();

    if (authenticate) {
        <Redirect to={Navigation.PageLogin} />
    }

    const actionGet = () => {
        axios.get(`${API}/drawing/view/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.replace(Navigation.PageLogin)
                    return
                }

                //console.log(res.data.data.model)

                if (res.data.bypass) {
                    setDrawingData(res.data.data.model)
                    setAccountData(res.data.data.account_list)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const actionDrawListGet = () => {
        axios.get(`${API}/drawlist/get/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.push(Navigation.PageLogin)
                    return
                }

                if (res.data.bypass) {
                    setDrawListData(res.data.data)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const actionGetAccountPages = (number) => {
        axios.get(`${API}/drawing/view/${id}?page=${number}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.push(Navigation.PageLogin)
                    return
                }

                if (res.data.bypass) {
                    setAccountData(res.data.data.account_list)
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const actionInDrawing = (item) => {
        axios.post(`${API}/drawlist/in`, {
            "account_id": item.id,
            "drawing_id": id
        }, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.push(Navigation.PageLogin)
                    return
                }

                if (res.data.bypass) {
                    setDrawListData(res.data.data)
                } else {
                    swal.actionInfo("อาจมีข้อมูลนี้อยู่ในระบบอยู่แล้ว !")
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const actionOutDrawing = (id) => {
        axios.delete(`${API}/drawlist/out/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.push(Navigation.PageLogin)
                    return
                }

                if (res.data.bypass) {
                    swal.actionSuccess("นำรายการที่เลือกออกเรียบร้อย")
                    setDrawListData(res.data.data)
                } else {
                    swal.actionInfo("ไม่สามารถนำรายการที่เลือกออกได้ !")
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    const actionHeadDraw = (id) => {
        axios.get(`${API}/drawlist/head/${id}`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.push(Navigation.PageLogin)
                    return
                }

                if (res.data.bypass) {
                    swal.actionSuccess("เปลี่ยนสถานะหัวหลัก เรียบร้อย !")
                    setDrawListData(res.data.data)
                } else {
                    swal.actionInfo("ไม่สามารถนำรายการที่เลือกออกได้ อาจมีสถานะหัวหลักอยู่แล้ว !")
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        actionGet()
        actionDrawListGet()

        props.setTitle(`จัดการสมาชิก - ${drawingData.name ? drawingData.name : id}`)
        props.setPath([
            { name: "หน้าหลัก", url: "" },
            { name: "จัดเรียงแผนผัง", url: Navigation.PageDrawing },
            { name: `${drawingData.name ? drawingData.name : id}`, url: null }
        ])

    }, [props])

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-folder-plus" /> รายชื่อที่มีอยู่ในแผนผังปัจจุบัน</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>

                        </div>

                        <div className="card-body">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ชื่อจริง - นามสกุล</th>
                                        <th scope="col">ชื่อเล่น</th>
                                        <th scope="col">สถานะหัวหลัก</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        drawlistData.length !== 0 && (
                                            drawlistData.map((el, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td>{el.fullname}</td>
                                                        <td>{el.nickname}</td>
                                                        <td>{el.headdraw ? "เปิดใช้งาน" : "ปิดใช้งาน"}</td>
                                                        <td><button onClick={() => actionHeadDraw(el.id)} type="submit" className={`btn ${!el.headdraw ? "btn-primary" : "btn-danger"} btn-block`}>{!el.headdraw ? "เปิดใช้งานหัวหลัก" : "ปิดใช้งานหัวหลัก"}</button></td>
                                                        <td><button onClick={() => actionOutDrawing(el.id)} type="submit" className="btn btn-danger btn-block">นำออก</button></td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-users" /> รายชื่อที่สามารถทำเข้าได้</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>

                        </div>

                        <div className="card-body">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">ชื่อ</th>
                                        <th scope="col">ตำแหน่ง</th>
                                        <th scope="col">ชื่อเล่น</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        accountData.length !== 0 && (
                                            accountData.data.map((el, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td>{el.title} {el.firstname} {el.surname}</td>
                                                        <td>{el.position}</td>
                                                        <td>{el.nickname}</td>
                                                        <td><button onClick={() => actionInDrawing(el)} type="submit" className="btn btn-success">นำเข้า</button></td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                            <div style={{ paddingBottom: "1%" }}></div>



                            <nav>
                                <ul className="pagination">
                                    <li className={`page-item ${accountData.current_page === 1 && "disabled"}`}>
                                        <span style={{ cursor: "pointer" }} onClick={() => actionGetAccountPages(accountData.current_page - 1)}
                                            className="page-link">
                                            Previous
                                        </span>
                                    </li>
                                    {
                                        accountData.length !== 0 && (
                                            Array(accountData.last_page).fill(0).map((el, index) => {
                                                return (

                                                    accountData.current_page === index + 1 ?

                                                        <li key={index} className="page-item active" aria-current="page">
                                                            <span className="page-link">{index + 1}</span>
                                                        </li>

                                                        :

                                                        <li key={index} className="page-item"><span className="page-link" style={{ cursor: "pointer" }} onClick={() => actionGetAccountPages(index + 1)}>{index + 1}</span></li>
                                                )
                                            })
                                        )
                                    }
                                    <li className={`page-item ${accountData.current_page === accountData.last_page && "disabled"}`}>
                                        <span style={{ cursor: "pointer" }} onClick={() => actionGetAccountPages(accountData.current_page + 1)}
                                            className="page-link" href="#">
                                            Next
                                        </span>
                                    </li>
                                </ul>
                            </nav>

                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        setTitle: (data) => dispatch({ type: 'setTitle', payload: data }),
        setPath: (data) => dispatch({ type: 'setPath', payload: data }),
    }
}

export default connect(null, mapDispatchToProps)(Index)
