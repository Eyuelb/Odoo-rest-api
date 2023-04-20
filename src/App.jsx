/** @jsxImportSource theme-ui */
import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes ,Navigate } from 'react-router-dom';
import { CoreRoutes } from "@routes";
import { MainPage,LoginPage } from "@views";
import { userMangerState } from '@stateManagment'
import { MessageHandler } from "@components"


function App() {
  const { isAuthenticated,user } = userMangerState();

const showContentMenus = (routesList,userAccessLevel) => {
  var allpages = [];         

        routesList.map(({ layout, pages }) =>{
          pages.map(({ path, element,parentpath,pageAccessPrivilege }) =>{
            if (userAccessLevel.some(level => pageAccessPrivilege.includes(level))) {
              allpages.push(<Route key={path}  path={`${parentpath}${path}`} element={element} exact/>)
            }
          })
        })
 
  return <Routes>{allpages}</Routes>;
}

  return (
   
    <Router>
      <Fragment>
      <MessageHandler/>
      {isAuthenticated?<MainPage chilrenpages={showContentMenus(CoreRoutes, user.roles)} />:<LoginPage/>}
      </Fragment>
    </Router>
  );
}

export default App;
