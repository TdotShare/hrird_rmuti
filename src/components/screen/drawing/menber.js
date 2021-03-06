import React, { useEffect, useState } from 'react'
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
    const [loadingData, setLoading] = useState(false)

    const history = useHistory();

    const user = useSelector(state => state.user.data)
    const authenticate = useSelector(state => state.user.authenticate)

    let { id } = useParams();


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

        //setLoading(true)

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

                console.log(res.data.data.account_list)

                if (res.data.bypass) {

                    setAccountData(res.data.data.account_list)
                }

            })
            .catch(err => {
                console.error(err);
            })

        // setTimeout(() => {
        //     setLoading(false)
        // }, 2000);
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
                    swal.actionInfo("???????????????????????????????????????????????????????????????????????????????????????????????? !")
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
                    swal.actionSuccess("????????????????????????????????????????????????????????????????????????????????????")
                    setDrawListData(res.data.data)
                } else {
                    swal.actionInfo("????????????????????????????????????????????????????????????????????????????????????????????? !")
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
                    swal.actionSuccess("????????????????????????????????????????????????????????? ??????????????????????????? !")
                    setDrawListData(res.data.data)
                } else {
                    swal.actionInfo("????????????????????????????????????????????????????????????????????????????????????????????? ??????????????????????????????????????????????????????????????????????????? !")
                }

            })
            .catch(err => {
                console.error(err);
            })
    }

    useEffect(() => {
        actionGet()
        actionDrawListGet()

        props.setTitle(`???????????????????????????????????? - ${drawingData.name ? drawingData.name : id}`)
        props.setPath([
            { name: "????????????????????????", url: "" },
            { name: "??????????????????????????????????????????", url: Navigation.PageDrawing },
            { name: `${drawingData.name ? drawingData.name : id}`, url: null }
        ])

    }, [])

    if (!authenticate) {
        return <Redirect to={Navigation.PageLogin} />
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="col">
                    <div className="card card-outline card-primary">
                        <div className="card-header">
                            <h3 className="card-title"><i className="fas fa-folder-plus" /> ????????????????????????????????????????????????????????????????????????????????????????????????</h3>
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
                                        <th scope="col">???????????????????????? - ?????????????????????</th>
                                        <th scope="col">????????????????????????</th>
                                        <th scope="col">????????????????????????????????????</th>
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
                                                        <td>{el.headdraw ? "??????????????????????????????" : "???????????????????????????"}</td>
                                                        <td><button onClick={() => actionHeadDraw(el.id)} type="submit" className={`btn ${!el.headdraw ? "btn-primary" : "btn-danger"} btn-block`}>{!el.headdraw ? "???????????????????????????????????????????????????" : "????????????????????????????????????????????????"}</button></td>
                                                        <td><button onClick={() => actionOutDrawing(el.id)} type="submit" className="btn btn-danger btn-block">???????????????</button></td>
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
                            <h3 className="card-title"><i className="fas fa-users" /> ???????????????????????????????????????????????????????????????????????????</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>

                        </div>

                        <div className="card-body">

                            {
                                loadingData ?

                                    <div className="d-flex justify-content-center">
                                        <div className="spinner-border" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    </div>

                                    :

                                    <>
                                        <table className="table table-striped table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">????????????</th>
                                                    <th scope="col">?????????????????????</th>
                                                    <th scope="col">????????????????????????</th>
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
                                                                    <td><button onClick={() => actionInDrawing(el)} type="submit" className="btn btn-success">??????????????????</button></td>
                                                                </tr>
                                                            )
                                                        })
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                        <div style={{ paddingBottom: "1%" }}></div>

                                    </>
                            }


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
