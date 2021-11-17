import React , { useEffect , useState } from 'react'
import { connect, useSelector } from 'react-redux'
import axios from "axios"
import API from "../../../config/api"
import swal from "../../../utils/swal"
import { Link, useHistory, Redirect } from "react-router-dom";
import Navigation from '../../../config/navigation'

function Index(props) {

    const [data, setData] = useState([])

    const history = useHistory();

    const user = useSelector(state => state.user.data)
    const authenticate = useSelector(state => state.user.authenticate)

    if (authenticate) {
        <Redirect to={Navigation.PageLogin} />
    }

    useEffect(() => {
        actionGet()
        props.setTitle("จัดเรียงแผนผัง")
        props.setPath([
            { name: "หน้าหลัก", url: "" },
            { name: "จัดเรียงแผนผัง", url: null }])
    
    }, [props])

    const actionGet = () => {
        axios.get(`${API}/drawing/all`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
            .then(res => {


                if (res.data.status === "Unauthorized") {
                    history.replace(Navigation.PageLogin)
                    return
                }

                if (res.data.bypass) {
                    setData(res.data.data)
                }
            })
            .catch(err => {
                console.error(err);
            })
    }

    const actionCreate = (e) => {
        e.preventDefault();

        if (e.target.name.value === "") {
            swal.actionInfo("กรุณากรอกข้อมูลให้ครบ !")
            return
        }

        axios.post(`${API}/drawing/create`, {
            "name": e.target.name.value,
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
                    swal.actionSuccess(`เพิ่มข้อมูล ${e.target.name.value} สำเร็จ`)
                    actionGet()
                } else {
                    swal.actionInfo(`เพิ่มข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`)
                }

                console.log(res.data)
            })
            .catch(err => {
                swal.actionError()
                console.error(err);
            })
    }

    const actionDelete = (id) => {
        axios.delete(`${API}/drawing/delete/${id}`, {
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
                    swal.actionSuccess(`ลบข้อมูลสำเร็จ`)
                    actionGet()
                } else {
                    swal.actionInfo(`ลบข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง`)
                }
            })
            .catch(err => {
                swal.actionError()
                console.error(err);
            })
    }

    const actionStatus = (id) => {
        axios.get(`${API}/drawing/status/${id}`, {
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
                    swal.actionSuccess(`เปลี่ยนสถานะสำเร็จ`)
                    setData(res.data.data)
                } else {
                    swal.actionInfo(`ไม่สามารถเปลี่ยนสถานะได้ กรุณาลองใหม่อีกครั้ง`)
                }

            })
            .catch(err => {
                swal.actionError()
                console.error(err);
            })
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-folder-plus" /> เพิ่มข้อมูลกลุ่มแผนผัง</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>

                        </div>

                        <div className="card-body">
                            <form method="post" onSubmit={actionCreate}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4">ชื่อกลุ่ม</label>
                                        <input type="text" className="form-control" name="name" maxLength="60" />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">เพิ่มข้อมูล</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-layer-group" /> แผนผังทั้งหมด</h3>
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
                                        <th scope="col">#</th>
                                        <th scope="col">ชื่อกลุ่ม</th>
                                        <th scope="col">สถานะ</th>
                                        <th scope="col">สร้างเมื่อ</th>
                                        <th scope="col">แก้ไขล่าสุด</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((el, index) => {
                                            return (
                                                <tr key={index} >
                                                    <th key={index} scope="row">{index + 1}</th>
                                                    <td>{el.name}</td>
                                                    <td>{el.status ? "เปิดใช้งาน" : "ปิดการใช้งาน"}</td>
                                                    <td>{el.create_at}</td>
                                                    <td>{el.update_at}</td>
                                                    <td><Link to={`${Navigation.PageDrawing}/${el.id}`}><button type="submit" className="btn btn-primary">เพิ่มสมาชิก</button></Link></td>
                                                    <td><button onClick={() => actionStatus(el.id)} type="button" className="btn btn-primary">เปลี่ยนสถานะ</button></td>
                                                    <td><button onClick={() => actionDelete(el.id)} type="button" className="btn btn-danger">ลบข้อมูล</button></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>


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
