import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";
export default function Menuitem({ data, subMenu, expand, setExpand, location, switchNav }) {
    return (
        <>
            {
                subMenu && subMenu.length > 0 ? (
                    <li onClick={() => setExpand(data.name)} className="nav-item">
                        <div className={(expand === data.name) ? "nav-link main-selected" : "nav-link"} data-toggle="collapse" aria-controls="form-elements">
                            <i className={data.icon} />
                            <span className="menu-title">{data.name}</span>
                            <i className="menu-arrow" />
                        </div>
                        <div className={(expand === data.name) ? "collapse show" : "collapse"} id="form-elements">
                            <ul className="nav flex-column sub-menu">
                                {
                                    subMenu.map((ele, ind) => (
                                        <li key={ind} className="nav-item" onClick={switchNav} data-toggle="offcanvas"><Link onClick={data.onClick} className={(location === ele.to) ? "nav-link selected" : "nav-link"} to={ele.to}>{ele.name}</Link></li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                ) : (
                    <NavLink
                        activeClassName="act"
                        to={data.to}
                        onClick={(e) => {
                            setExpand(data.name);
                            switchNav();
                        }}
                        className="nav-item">
                        <div className={(expand === data.name) ? "nav-link main-selected" : "nav-link"}>
                            <i className={data.icon} />
                            <span className="menu-title">{data.name}</span>
                        </div>
                    </NavLink>
                )
            }
        </>
    )
}
