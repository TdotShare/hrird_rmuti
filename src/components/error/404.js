import React, { useEffect } from 'react'
import { connect } from 'react-redux'


function Fourzerofour(props) {

    useEffect(() => {

        props.setTitle("404 Error Page")
        props.setPath([{ name: "หน้าหลัก", url: "" }, { name: "404 Error Page", url: null }])


    }, [props])

    return (
        <div className="error-page">
            <h2 className="headline text-warning"> 404</h2>
            <div className="error-content">
                <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Page not found.</h3>
                <p>
                    We could not find the page you were looking for. Meanwhile, you may <a href="../../index.html"> return to dashboard</a> or try using the search form.</p>
            </div>
        </div>

    )
}


const mapDispatchToProps = dispatch => {
    return {
        setTitle: (data) => dispatch({ type: 'setTitle', payload: data }),
        setPath: (data) => dispatch({ type: 'setPath', payload: data }),
    }
}

export default connect(null, mapDispatchToProps)(Fourzerofour)
