/** @jsxImportSource theme-ui */
import React from "react";
import { Link, useLocation, NavLink } from "react-router-dom";
import { usePageLayoutStore } from '@stateManagment'
import { Flex, Box, Heading, Image, Button } from 'theme-ui';
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";

export const Sidenav = ({ brandImg, brandName, routes, userAccessLevel }) => {

    const { pageLayout } = usePageLayoutStore();
    const { openSidenav, openMiniSidenav } = pageLayout

    return (
        <>
            {openMiniSidenav ? (
                <div
                    sx={{
                        height: '100vh',
                        width: '100%',
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 30,
                        // display: openSidenav ? 'block' : 'none',
                        transition: 'margin-right 4s ease-in-out 1s;',
                        padding: '10px 5px',

                    }}
                ><div
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '35px',
                        boxShadow: "3px 3px 23px 0px #8f8e8e",
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
                                background:"white"
                                
                            }}
                        >
                            {/* Insert side navigation content here */}
                            <Link to="/" className="flex items-center justify-center mt-3">
                                <Image src={brandImg} size="sm" />
                            </Link>

                            {
                                routes.map(({ layout, title, pages, showInSidenav }, key) => (
                                    showInSidenav && <ul key={key} className="flex flex-col items-center mt-3 border-t">


                                        {pages.map(({ icon, name, path, sidenavlinked, pageAccessPrivilege }, key) => (
                                            (sidenavlinked === true) && userAccessLevel.some(level => pageAccessPrivilege.includes(level)) ?
                                                <li key={key}>
                                                    <NavLink to={path} >
                                                        {({ isActive }) => (
                                                            <div
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    width: "12",
                                                                    height: "12",
                                                                    bg: isActive && 'navHover',
                                                                    '&:hover': {
                                                                        bg: 'navHover',
                                                                    }
                                                                }}>
                                                                <span className="flex justify-center">
                                                                    {icon}
                                                                </span>
                                                            </div>)}
                                                    </NavLink>
                                                </li> : ''
                                        ))}
                                    </ul>
                                ))}
                            <div>

                            </div>

                            <Link className="flex items-center justify-center w-16 h-16 mt-auto bg-gray-200 hover:bg-gray-300" to="/login">
                                <svg className="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </Link>

                        </div>

                    </div>
                </div>
            ) : (
                <div
                    sx={{
                        height: '100vh',
                        width: '100%',
                        position: 'fixed',
                        // display: openSidenav ? 'block' : 'none',
                        top: 0,
                        left: 0,
                        transition: 'margin-right 4s ease-in-out 1s;',
                        padding: '20px',
                        zIndex: openSidenav ? 30 : 'auto', // increase z-index when sidenav is open to make sure it overlays the blurred background
                    }}
                >
                    <div
                        sx={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '35px',
                            backdropFilter: 'blur(8px)',
                            boxShadow: "3px 3px 23px 0px #8f8e8e"

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
                                flexDirection: "column"
                            }}
                        >

                            <Link to="/" className="flex items-center w-full justify-center px-3 mt-3">
                                <Image
                                    sx={{
                                        width: "30%"
                                    }}
                                    src={brandImg} />
                            </Link>

                            <div className="w-full px-2">

                            {

                            routes.map(({ layout, title, pages,showInSidenav }, key) => (
                                showInSidenav&&<ul key={key} className="flex flex-col items-center w-full mt-3 border-t">
                                    {/* {title && (
                                        <li className=" flex items-center flex-row p-1 ml-2">
                                            <Heading as='h2'>
                                             { title}
                                            </Heading>
                                        </li>

                                    )} */}

                                    {pages.map(({ icon, name, path, sidenavlinked,pageAccessPrivilege }, key) => (
                                        (sidenavlinked === true)&&userAccessLevel.some(level => pageAccessPrivilege.includes(level)) ?
                                            <li key={key} className="w-full">
                                                <NavLink to={path}>
                                                {({ isActive }) => (
                                                        <div
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            width: "100%",
                                                            height: "12",
                                                            padding:"0px 3px",
                                                            borderTopLeftRadius:"3px",
                                                            borderTopRightRadius:"3px",
                                                            bg: isActive && 'navHover',
                                                            '&:hover': {
                                                                bg: 'navHover',
                                                            }
                                                        }}
                                                        >
                                                    <div className="w-full flex items-center flex-row p-2 ">
                                                       <span className="mr-1">{icon}</span>

                                                       <span className="ml-2 text-sm font-medium">{name}</span>
                                                    </div>
                                                        </div>)}
                                                </NavLink>
                                            </li> : ''
                                    ))}
                                </ul>
                            ))}
                            </div>

                            <Link className="flex items-center justify-center w-full h-16 mt-auto bg-gray-200" to="/logout">
                            <ArrowRightOnRectangleIcon className="w-6 h-6"/> Logout
                            </Link>
                        </div>
                        {/* Insert side navigation content here */}
                    </div>
                </div>
            )}






            {/*









            {

                openMiniSidenav ?
                <div >
                    <div className={`${openSidenav ? " translate-x-0 " : "-translate-x-80"} fixed inset-0 z-50 h-full w-20 transition-transform duration-300 xl:translate-x-0`}                     sx={{background: t => t.colors.primary}}>

                        <Link to="/" className="flex items-center justify-center py-2 px-4">
                            <Image src={brandImg} size="sm" />
                        </Link>
                        {
                            routes.map(({ layout, title, pages }, key) => (
                                <ul key={key} className="mb-4 flex flex-col gap-1">
                                    {title && (
                                        <div className={`relative border-b`}>
                                        </div>
                                    )}

                                    {pages.map(({ icon, name, path, sidenavlinked,pageAccessPrivilege }, key) => (
                                        (sidenavlinked === true)&&userAccessLevel.some(level => pageAccessPrivilege.includes(level)) ?
                                            <li key={key}>
                                                <NavLink to={path} >
                                                    {({ isActive }) => (
                                                    <div
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        p: 2,
                                                        bg: isActive&&'secondary',
                                                        '&:hover': {
                                                            bg: 'secondary',
                                                        }
                                                    }}>
                                                      <span className="flex justify-center">{icon}</span>
                                                    </div>)}
                                                </NavLink>
                                            </li> : ''
                                    ))}
                                </ul>
                            ))}
                    </div> </div>
                    :
                   <div  className="p-5">
                    <div className={`${openSidenav ? "-translate-x-80" : "-translate-x-80"} fixed inset-0 z-50  h-full w-72 transition-transform duration-300  xl:translate-x-0 `}
                    sx={{background: t => t.colors.primary}}>
                        <Link  to="/" className="flex items-center justify-center gap-4 py-2 px-4 mb-10 mt-4">
                            <Image
                            sx={{
                                width:"30%"
                            }}
                             src={brandImg}/>
                        </Link>
                        {

                            routes.map(({ layout, title, pages }, key) => (
                                <ul key={key} className="w-full flex flex-col gap-1">
                                    {title && (
                                        <li className=" flex items-center flex-row p-1 ml-2">
                                            <Heading as='h2'>
                                             { title}
                                            </Heading>
                                        </li>

                                    )}

                                    {pages.map(({ icon, name, path, sidenavlinked,pageAccessPrivilege }, key) => (
                                        (sidenavlinked === true)&&userAccessLevel.some(level => pageAccessPrivilege.includes(level)) ?
                                            <li key={key} >
                                                <NavLink to={path}>
                                                {({ isActive }) => (
                                                        <div
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            p: 2,
                                                            bg: isActive && 'secondary',
                                                            '&:hover': {
                                                                bg: 'secondary',
                                                            }
                                                        }}
                                                        >
                                                    <div className="w-full flex items-center flex-row p-2 ml-4">
                                                       <span className="mr-1">{icon}</span>
                                                       {name}
                                                    </div>
                                                        </div>)}
                                                </NavLink>
                                            </li> : ''
                                    ))}
                                </ul>
                            ))}
                    </div>
                    </div>
            } */}
        </>
    )

}












