
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import TemplateIndex from '../components/template/admin/index'

import LoginScreen from '../components/auth/login/index'

import PsofficeScreen from '../components/screen/psoffice/index'


import DrawingScreen from '../components/screen/drawing/index'
import DrawingMenberScreen from '../components/screen/drawing/menber'

import Error404Screen from '../components/error/404'

import Navigation from '../config/navigation'

function Index(props) {


    const [menuAdminState] = useState([
        { name: "จัดเรียงแผนผัง", url: `/system/${Navigation.PageDrawing}`, icon: "fas fa-list-ol", path: `${Navigation.PageDrawing}` },
    ])





    return (

        <Router basename={`/hr`} >
            <Route exact path={`/`} component={() => <Redirect to={`/system/${Navigation.PagePSoffice}`} />} />
            <Route exact path={`${Navigation.PageLogin}`} component={() => <LoginScreen />} />
            <Route path={`/system`} component={() => <TemplateIndex
                menulist={menuAdminState}
                body={
                    <Switch>
                        <Route exact path={`/system`} component={() => <PsofficeScreen />} />
                        <Route exact path={`/system/${Navigation.PagePSoffice}`} component={() => <PsofficeScreen />} />


                        <Route exact path={`/system/${Navigation.PageDrawing}`} component={() => <DrawingScreen />} />
                        <Route exact path={`/system/${Navigation.PageDrawing}/:id`} component={() => <DrawingMenberScreen />} />
                        <Route path={`*`} component={() => <Error404Screen />} />
                    </Switch>
                } />} />
        </Router>

    )
}

export default connect(null, null)(Index)
