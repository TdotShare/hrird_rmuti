import React from 'react'
import Sidebar from './sidebar/index'
import { Link } from 'react-router-dom';
import './css.css'
import Navigation from '../../../config/navigation'

import { connect, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

function Index(props) {

    const history = useHistory();

    const authenticate = useSelector(state => state.user.authenticate)

    const title_brmb = useSelector(state => state.breadcrumb.title)
    const path_brmb = useSelector(state => state.breadcrumb.path)

    const actionLogout = () => {
        props.deleteUser()
        props.logoutAuth()

        history.push(`/system/${Navigation.PagePSoffice}`)
    }


    return (
        <div className="wrapper">

            <nav className="main-header navbar navbar-expand navbar-white navbar-light">

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" data-widget="pushmenu" to="#" role="button"><i className="fas fa-bars" /></Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <Link to={`${Navigation.PagePSoffice}`} className="nav-link">หน้าหลัก</Link>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        {
                            authenticate ?
                                <span style={{ cursor: "pointer" }} onClick={() => actionLogout()} className="nav-link">ออกจากระบบ</span>
                                :
                                <Link to={`${Navigation.PageLogin}`} className="nav-link">เข้าสู่ระบบ</Link>
                        }
                    </li>
                </ul>
            </nav>


            <Sidebar meunlist={props.menulist} />



            <div className="content-wrapper">

                {/* <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">{title_brmb ? title_brmb : ""}</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    {
                                        path_brmb.map((el, index) => {
                                            return (
                                                el.url === null ?
                                                    <li key={index} className="breadcrumb-item active">{el.name}</li>
                                                    :
                                                    <li key={index} className="breadcrumb-item "><Link to="#">{el.name}</Link></li>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div style={{paddingBottom : "2%"}}></div>

                

                <section className="content">
                    <div className="container-fluid">
                        {props.body}
                    </div>
                </section>

            </div>

            <footer className="main-footer">
                <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>All rights reserved.
                <div className="float-right d-none d-sm-inline-block">
                    <b>Version</b> 3.1.0
                </div>
            </footer>

            <aside className="control-sidebar control-sidebar-dark">

            </aside>

        </div>
    )
}



const mapDispatchToProps = dispatch => {
    return {
        deleteUser: () => dispatch({ type: 'deleteUser' }),
        logoutAuth: () => dispatch({ type: 'logoutAuth' }),

    }
}

export default connect(null, mapDispatchToProps)(Index)
