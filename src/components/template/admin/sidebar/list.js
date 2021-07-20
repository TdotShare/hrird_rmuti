import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function ListSidebar(props) {

    const location = props.location



    const [menuState] = useState(props.menuSidebar)

    const listMenus = menuState.map((el, index) => (
        <NavItemShort location={location} key={index} item={el} index={index} />
    ))

    return listMenus
    
}

export default ListSidebar

function NavItemShort(props) {

    let item = props.item
    let index = props.index
    let location = props.location


    return (
        <li className="nav-item">
            <Link key={index} to={`${item.url}`} className={`nav-link ${location.includes(item.path) ? 'active' : ''}`}>
                <i className={`nav-icon ${item.icon}`} />
                <p>
                    {item.name}
                </p>
            </Link>
        </li>
    )
}
