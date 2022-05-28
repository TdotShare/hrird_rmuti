import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import API from "../../../config/api"
import axios from 'axios'
import Navigation from '../../../config/navigation'
import { useHistory } from "react-router-dom";

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


    const actionView = (item) => {
        history.push(`/system/${Navigation.PagePSoffice}/${item.account_id}`)
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
                data.length !== 0 ?
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
                                                            <div key={i} className="col-sm-12 col-md-6 col-lg-4" style={{ cursor: "pointer", textAlign: 'center', paddingBottom: "1%" }}>
                                                                <div className={`card  ${item.headdraw === 1 ? "bg-secondary" : "bg-light"}`}>
                                                                    <div className="card-body">
                                                                        <a rel="noreferrer" target="_blank" href={`https://www.mis-ird.rmuti.ac.th/evaluation/upload/profile/full/${item.pic_path}/${item.pic_name}`} >
                                                                            <img className={`img-fluid img-thumbnail`} style={{ width: `40%` }}
                                                                                src={`https://www.mis-ird.rmuti.ac.th/evaluation/upload/profile/thumb/${item.pic_path}/${item.pic_name}`}
                                                                                alt={`${item.pic_path}`} />
                                                                        </a>
                                                                        <br />
                                                                        <span onClick={() => actionView(item)} >{item.fullname}  <br /> {item.position}</span>
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

                    :

                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>

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
