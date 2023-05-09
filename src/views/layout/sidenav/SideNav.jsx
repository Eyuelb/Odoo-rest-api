/** @jsxImportSource theme-ui */
import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { useOpenSidenav,useOpenMiniSidenav } from '@stateManagment'
import { Flex, Box, Heading, Image, Button } from 'theme-ui';
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export const Sidenav = ({ brandImg, brandName, routes, userAccessLevel }) => {

    const openSidenav = useOpenSidenav();
    const openMiniSidenav  = useOpenMiniSidenav();

    return (
        <div
                    sx={{
                        height: '100vh',
                        width: '100%',
                        position: 'fixed',
                        // display: openSidenav ? 'block' : 'none',
                        top: 0,
                        left: 0,
                        transition: 'margin-right 4s ease-in-out 1s;',
                        padding: '10px 5px',
                        zIndex: openSidenav ? 30 : 'auto', // increase z-index when sidenav is open to make sure it overlays the blurred background
                    }}
                >
                    <div
                    className="shadow-2xl"
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '35px',
                            backdropFilter: 'blur(8px)',
                            boxShadow: t => `0px 1px 4px 0px ${t.colors.text}`,
                            display: "flex",
                            alignItems: "center"

                        }}
                    >
                        <div
                            sx={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '35px',
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                                background: "primary"

                            }}
                        >

                            <Link to="/" className="flex items-center w-full justify-center ">
                                <Image
                                    sx={{
                                        width: openMiniSidenav?"100%":"30%",
                                        padding: openMiniSidenav?"":"12px 0px",
                                        marginTop:openMiniSidenav?"":"12px",

                                    }}
                                    src={brandImg} />
                            </Link>

                            <div className="w-full ">

                                {

                                    routes.map(({ layout, title, pages, showInSidenav }, key) => (
                                        showInSidenav && 
                                        <ul key={key} className="flex flex-col items-center w-full border-t"
                                            sx={{
                                                borderColor: "secondary"
                                            }}
                                        >
                                            {/* {title && (
                                        <li className=" flex items-center flex-row p-1 ml-2">
                                            <Heading as='h2'>
                                             { title}
                                            </Heading>
                                        </li>

                                    )} */}
                                            {/* <div className="mb-1"></div> */}
                                            {pages.map(({ icon, name, path, sidenavlinked, pageAccessPrivilege }, key) => (
                                                (sidenavlinked === true) && userAccessLevel.some(level => pageAccessPrivilege.includes(level)) ?
                                                    <li key={key} className="w-full">
                                                        <NavLink to={path}>
                                                            {({ isActive }) => (
                                                                <div
                                                                    sx={{
                                                                        display: 'flex',
                                                                        alignItems: 'center',
                                                                        justifyContent: 'center',
                                                                        width: "auto",
                                                                        fontSize:"0.875rem",
                                                                        fontWeight: "500",
                                                                        lineHeight: "1.5",
                                                                        padding: "0px 3px",
                                                                      //  marginTop: "3px",
                                                                        bg: isActive && 'navHover',
                                                                        color: isActive && 'navIconHover',
                                                                        '&:hover': {
                                                                            bg: 'navHover',
                                                                            color: 'navIconHover',
                                                                        }
                                                                    }}
                                                                >
                                                                    <div className="w-full flex items-center flex-row p-2 ">
                                                                    <span className="flex justify-center">
                                                                       {icon}
                                                                    </span>
                                                                        {/* <span className="mr-1">{icon}</span> */}
                                                                        <p
                                                                            style={{
                                                                                transitionDelay: `${key + 3}00ms`,
                                                                            }}
                                                                            className={`whitespace-pre duration-500 ml-2 "${openMiniSidenav && "opacity-0 translate-x-28 overflow-hidden"
                                                                                }`}
                                                                        >
                                                                            {name}
                                                                        </p>
                                                                        {/* <span className="ml-2 text-sm font-medium">{name}</span> */}
                                                                    </div>
                                                                </div>)}
                                                        </NavLink>
                                                    </li> : ''
                                            ))}
                                        </ul>
                                    ))}
                            </div>

                            <Link className="flex items-center justify-center w-full h-16 mt-auto" to="/logout">
                               {openMiniSidenav?<svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>:<div><ArrowRightOnRectangleIcon className="w-6 h-6" /> Logout</div>} 
                            </Link>
                        </div>
                        {/* Insert side navigation content here */}
                    </div>
                </div>
    )

}












