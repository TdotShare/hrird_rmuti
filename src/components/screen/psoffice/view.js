import React , { useEffect , useState } from 'react'
import { connect } from 'react-redux'
import API from "../../../config/api"
import axios from 'axios'
import Navigation from '../../../config/navigation'
import { useParams } from "react-router-dom";
import swal from '../../../utils/swal'


function Index(props) {


    let { id } = useParams();

    useEffect(() => {
        console.log(id)
    }, [])

    return ( 
        <>
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