import React, { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css'; // import first
import { toast,ToastContainer } from 'react-toastify'; // then this
import { userMangerState } from '@stateManagment'


export const MessageHandler = () =>{
	const { loginSuccess, loginSuccessMessage, loginError,loginErrorMessage,userMangerStateCleaner } = userMangerState();


    useEffect(() => {
		if (loginSuccess) {
			toast.success(loginSuccessMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
			userMangerStateCleaner()
		}
		if (loginError) {
			toast.error(loginErrorMessage, {
				// Set to 5sec
				position: toast.POSITION.BOTTOM_RIGHT, autoClose: 5000
			})
			userMangerStateCleaner()
		}
	}, [loginSuccess,loginError]);

    return(
        <div>
            <ToastContainer />
        </div>
    )

}