/** @jsxImportSource theme-ui */

import React from "react";
import { IconButton, Divider, Spinner, Flex } from 'theme-ui';
import { HeadNav, Sidenav } from '@views'
import { CoreRoutes } from "@routes";
import { useOpenSidenav,useOpenMiniSidenav,useHeadnavStick,useUser } from '@stateManagment'


export const MainPage = ({ chilrenpages }) => {
    const user = useUser();
    const openSidenav = useOpenSidenav();
    const openMiniSidenav  = useOpenMiniSidenav();
    const headnavStick  = useHeadnavStick();
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
                {openSidenav && <Sidenav routes={CoreRoutes} brandImg='/images/Che_Logo_html.png' userAccessLevel={user.roles} />}
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
                    className="shadow-2xl"
                    sx={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '7px',
                        backdropFilter: 'blur(8px)',
                       // boxShadow: t => `0px 1px 3px 0px ${t.colors.text}`,
                        display: "block",
                        padding: '15px 15px',
                        background:"primary",

                    }}
                >
                        {chilrenpages}
                    </div>

                </div>


            </div>

        </div>
    )
}