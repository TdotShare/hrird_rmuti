import React , { useEffect , useState } from 'react'
import { connect } from 'react-redux'
import API from "../../../config/api"
import axios from 'axios'
import Navigation from '../../../config/navigation'
import { useHistory } from "react-router-dom";
import swal from '../../../utils/swal'

function Index(props) {

    const history = useHistory();
    const [data, setData] = useState([])

    const actionGet = () => {
        axios.get(`${API}/board/all`)
            .then(res => {

                if (res.data.status === "Unauthorized") {
                    history.push(Navigation.PageLogin)
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


    const actionView = () => {
        swal.actionInfo("กำลังพัฒนาระบบ ดูประวัติของบุคลากร สามาใช้งานได้เร็วๆ นี้")
    }

    useEffect(() => {

        actionGet()
        props.setTitle("ทําเนียบบุคลากร")
        props.setPath([
            { name: "หน้าหลัก", url: "", path: `` },
            { name: "ทําเนียบบุคลากร", url: null }])

    }, [props])



    return (
        <React.Fragment>
            {
                data && (
                    data.map((el, index) => {
                        return (
                            <div key={index} className="row">
                                <div className="col">
                                    <div className="card card-outline card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">{el.name}</h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                    <i className="fas fa-minus" />
                                                </button>
                                            </div>

                                        </div>

                                        <div className="card-body">
                                            <div className="row">
                                                {
                                                    el.data.map((item, i) => {
                                                        return (
                                                            <div key={i} className="col-4" style={{ cursor: "pointer", textAlign: 'center', paddingBottom: "1%" }}>
                                                                <div onClick={() => actionView()} className={`card  ${item.headdraw === 1 ? "bg-secondary" : "bg-light"}`}>
                                                                    <div className="card-body">
                                                                        <img className={`img-fluid img-thumbnail`} style={{ width: `40%` }}
                                                                            src={`https://www.mis-ird.rmuti.ac.th/evaluation/upload/profile/thumb/${item.pic_path}/${item.pic_name}`}
                                                                            alt={`${item.pic_path}`} />
                                                                        <br />
                                                                        <span>{item.fullname}  <br /> {item.position}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                )
            }
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
