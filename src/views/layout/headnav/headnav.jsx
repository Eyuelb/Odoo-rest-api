/** @jsxImportSource theme-ui */
import React, { useEffect } from "react";
import {
    UserCircleIcon,
    LanguageIcon,
    ClockIcon,
    CreditCardIcon,
    Bars3Icon,
    SwatchIcon
} from "@heroicons/react/24/solid";
import { IconButton, Input, Flex, Select, Box } from 'theme-ui';
import { logoutRequest, useUpdatePageLayout, useOpenSidenav, useOpenMiniSidenav, useHeadnavStick, useDarkMode } from '@stateManagment'


export const HeadNav = () => {
    const Logout = logoutRequest();

    const updatePageLayout = useUpdatePageLayout();
    const openSidenav = useOpenSidenav();
    const openMiniSidenav = useOpenMiniSidenav();
    const headnavStick = useHeadnavStick();
    const darMode = useDarkMode();

    return (
        <Flex as="nav" sx={{
            display: 'flex',
            alignItems: 'center',
            position: headnavStick && 'fixed',
            top: 0,
            left: 0,
            width: "100%",
            padding: !headnavStick && '10px 5px',
            justifyContent: 'space-between',
            transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
            zIndex: "10"


        }}>

            <Flex sx={{
                width: '100%',
                height: '100%',
                background: !headnavStick && "primary",
                borderRadius: !headnavStick && '35px',
                backdropFilter: 'blur(8px)',
                display: "flex",
                alignItems: "center",
                padding: '0px 15px',
                boxShadow: t => !headnavStick && `0px 1px 4px 0px ${t.colors.text}`,

            }}>
                <div
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: headnavStick && openSidenav ? openMiniSidenav ? '48px' : '226px' : "0px"

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
                        <Bars3Icon strokeWidth={3} className="h-6 w-6 text-inherit" sx={{
                            '&:hover': {
                                color: 'iconHover',
                            }
                        }}
                        />
                    </IconButton>
                </div>
                <div className="flex items-center ml-auto">


                    <IconButton
                        variant="navIconButton"
                        className="grid xl:hidden"
                        onClick={() => Logout()}
                    >

                        <UserCircleIcon strokeWidth={3} className="h-6 w-6  text-inherit" 
                        sx={{
                            '&:hover': {
                                color: 'iconHover',
                            }
                        }}
                        />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        className="grid xl:hidden"
                        onClick={() => console.log("updatePageLayout('openLanguageConfigurator', !openLanguageConfigurator)")}
                    >
                        <LanguageIcon strokeWidth={3} className="h-6 w-6 text-inherit" sx={{
                            '&:hover': {
                                color: 'iconHover',
                            }
                        }}
                        />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        className="grid xl:hidden">
                        <ClockIcon strokeWidth={3} className="h-6 w-6 text-inherit" 
                        sx={{
                            '&:hover': {
                                color: 'iconHover',
                            }
                        }}
                        />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        className="grid xl:hidden">
                        <CreditCardIcon strokeWidth={3} className="h-6 w-6 text-inherit" sx={{
                            '&:hover': {
                                color: 'iconHover',
                            }
                        }}
                        />
                    </IconButton>
                    <IconButton
                        variant="navIconButton"
                        onClick={() => updatePageLayout('darkMode', !darMode)}
                    >
                        <SwatchIcon className="h-6 w-6 text-inherit" sx={{
                            '&:hover': {
                                color: 'iconHover',
                            }
                        }}
                        />
                    </IconButton>

                </div>

            </Flex>

        </Flex>
    )
}