/** @jsxImportSource theme-ui */
import React, { useEffect } from "react";
import {
    UserCircleIcon,
    LanguageIcon,
    BellIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
    SwatchIcon
} from "@heroicons/react/24/solid";
import { IconButton, Input, Flex, Select, Box } from 'theme-ui';
import { usePageLayoutStore, logoutRequest } from '@stateManagment'


export const HeadNav = () => {
    const updatePageLayout = usePageLayoutStore((state) => (state.updatePageLayout));
    const { openSidenav, openMiniSidenav, openConfigurator, headnavStick, openLanguageConfigurator } = usePageLayoutStore((state) => (state.pageLayout));
    const Logout = logoutRequest();


    return (
        <Flex as="nav" sx={{
            display: 'flex',
            alignItems: 'center',
            position: headnavStick&&'fixed',
            top: 0,
            left: 0,
            width: "100%",
            padding: !headnavStick&&'10px 5px',
            justifyContent: 'space-between',
            transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
            zIndex:"10"
            
        }}>

            <Flex sx={{
                width: '100%',
                height: '100%',
                borderRadius: !headnavStick&&'35px',
                backdropFilter: 'blur(8px)',
                display: "flex",
                alignItems: "center",
                padding: '0px 15px',
                boxShadow: t => !headnavStick&&`3px 3px 23px 0px ${t.colors.text}`,

            }}>
                <div
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft:headnavStick&&openSidenav ? openMiniSidenav ? '76px' : '276px' : "0px"
                    // "@media (min-width: 1280px)": {
                    //     marginLeft: headnavStick?openSidenav?"18rem":"1rem":"0px",
                    //   },
                    // "@media (min-width: 1480px)": {
                    //     marginLeft: headnavStick?openSidenav?"22rem":"1rem":"0px",
                    //   },
                    
                }}>
                    <IconButton
                        variant="iconButton"
                        onClick={() => {
                            updatePageLayout('openSidenav', !openSidenav)
                            // updatePageLayout('openMiniSidenav', !openMiniSidenav)
                        }}
                    >
                        <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>
                </div>
                <div className="flex items-center ml-auto">
                    <div className="mr-auto md:mr-4 md:w-56 p-3">
                        <Input label="Type here" />
                    </div>

                    <IconButton
                        variant="navIconButton"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => Logout()}
                    >

                        <UserCircleIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        color="blue-gray"
                        className="grid xl:hidden"
                        onClick={() => updatePageLayout('openLanguageConfigurator', !openLanguageConfigurator)}
                    >
                        <LanguageIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        color="blue-gray"
                        className="grid xl:hidden">
                        <ClockIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        color="blue-gray"
                        className="grid xl:hidden">
                        <CreditCardIcon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        color="blue-gray"
                        onClick={() => updatePageLayout('openConfigurator', !openConfigurator)}
                    >
                        <SwatchIcon className="h-6 w-6 text-blue-gray-500" />
                    </IconButton>

                </div>

            </Flex>

        </Flex>
    )
}