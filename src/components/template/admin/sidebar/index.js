import React , { useEffect , useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import ListSidebar from './list'
import Navigation from '../../../../config/navigation'

import { connect, useSelector } from 'react-redux'

function Index(props) {

    const [menuAdminState] = useState(props.meunlist)
    const user = useSelector(state => state.user.data)
    const authenticate = useSelector(state => state.user.authenticate)

    const location = useLocation();

    const { pathname } = location;
    const splitLocation = pathname.split("/");


    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <Link to={`/system/${Navigation.PagePSoffice}`} className="brand-link">
                <img src={`${process.env.PUBLIC_URL}/assets/logo/irdrmuti_cri.png`} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">ระบบบุคลากร สวพ.</span>
            </Link>

            <div className="sidebar">

                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        {
                            authenticate ?

                                <img src={`https://www.mis-ird.rmuti.ac.th/evaluation/upload/profile/thumb/${user.pic_path}/${user.pic_name}`} alt="userimage" className="img-circle elevation-2" />

                                :

                                <img src={`${process.env.PUBLIC_URL}/assets/image/mock/profile.png`} alt="userimage" className="img-circle elevation-2" />


                        }
                    </div>
                    <div className="info">
                        {
                            authenticate ?
                                <Link to={`/system/${Navigation.PagePSoffice}`} className="d-block">{`${user.title}${user.firstname} ${user.surname}`}</Link>
                                :
                                <Link to={`/system/${Navigation.PagePSoffice}`} className="d-block">{`ผู้เข้าเยี่ยมชมระบบ`}</Link>
                        }

                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                        <li className="nav-item">
                            <Link to={`/system/${Navigation.PagePSoffice}`} className={`nav-link ${splitLocation.includes("psoffice") ? 'active' : ''}`}>
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    ทำเนียบบุคลากร
                                </p>
                            </Link>
                        </li>



                        {
                            authenticate && (
                                <React.Fragment>
                                    <li className="nav-header">Admin</li>

                                    <ListSidebar location={splitLocation} menuSidebar={menuAdminState} />
                                </React.Fragment>
                            )
                        }

                    </ul>
                </nav>

            </div>

        </aside>
    )
}

export default connect(null, null)(Index)