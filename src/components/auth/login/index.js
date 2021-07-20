import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom";
import axios from "axios"
import API from "../../../config/api"
import swal from "../../../utils/swal"
import Navigation from '../../../config/navigation'

function Index(props) {

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (e.target.username.value === "" && e.target.password.value === "") {
            swal.actionInfo("กรุณากรอกข้อมูลให้ครบ !")
            return
        }

        axios.post(`${API}/auth/login`, {
            "username": e.target.username.value,
            "password": e.target.password.value
        })
            .then(res => {
                if (res.data.bypass) {
                    props.addUser(res.data.data)
                    props.loginAuth()

                    history.push(`/system/${Navigation.PagePSoffice}`)
                } else {
                    swal.actionInfo("ไม่พบผู้ใช้งานระบบ กรุณกรอกข้อมูลใหม่อีกครั้ง !")
                }


            })
            .catch(err => {
                swal.actionError()
                console.error(err);
            })
    }


    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <b>ระบบบุคลากร สวพ. มทร.อีสาน</b>
                </div>

                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form method="post" onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" name="username" placeholder="Username" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input type="password" className="form-control" name="password" placeholder="Password" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                    </label>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>

                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    )
}


const mapDispatchToProps = dispatch => {
    return {
        addUser: (user) => dispatch({ type: 'addUser', payload: user }),
        loginAuth: () => dispatch({ type: 'loginAuth' }),

    }
}

export default connect(null, mapDispatchToProps)(Index)
