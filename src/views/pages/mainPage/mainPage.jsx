/** @jsxImportSource theme-ui */

import React from "react";
import { IconButton, Divider, Spinner, Flex } from 'theme-ui';
import { HeadNav, Sidenav } from '@views'
import { CoreRoutes } from "@routes";
import { usePageLayoutStore,userMangerState } from '@stateManagment'
import { Link, useLocation, NavLink } from "react-router-dom";


export const MainPage = ({ chilrenpages }) => {
    const user = userMangerState((state)=>(state.user));

    const { pageLayout, updatePageLayout } = usePageLayoutStore();
    const { openSidenav, openMiniSidenav, headnavStick } = pageLayout;

    
    return (
        <div className="min-h-screen ">
             <aside
            sx={{
                width: openSidenav ? openMiniSidenav ? '76px' : '276px' : "0px",
                transition: 'margin-left 0.2s ease-in-out',
                backdropFilter: openSidenav ? 'blur(10px)' : 'none', // add backdrop filter when sidenav is open
                background:"primary",
                position: 'fixed',
                display: openSidenav ? 'block' : 'none',
                top: 0,
                left: 0,
                zIndex: 20,
                
            }}
            
            >
                {openSidenav && <Sidenav routes={CoreRoutes} brandImg='/images/Che_Logo.png' userAccessLevel={user.roles} />}
            </aside>


            <div
                sx={{
                    marginLeft: openSidenav ? openMiniSidenav ? '76px' : '276px' : "0px",
                   // width: openSidenav ? openMiniSidenav ? '90%' : '80%' : "100%",
                    //minWidth:"400px",
                    transition: 'margin-left 0.3s ease-in-out, width 0.3s ease-in-out',

                }}
            >
                <HeadNav />
                <div
                    sx={{
                        transition: 'width 0.3s ease-in-out',
                        padding: '10px 5px',
                        width: "100%",
                        display:"block"
                    }}
                >
                    <div
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '35px',
                        backdropFilter: 'blur(8px)',
                        boxShadow: "3px 3px 23px 0px #8f8e8e",
                        display: "block",
                        padding: '15px 15px',

                    }}
                >
                        {chilrenpages}
                    </div>

                </div>


            </div>

        </div>
    )
}