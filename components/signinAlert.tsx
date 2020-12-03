import { signinAlertRef } from "./refs"
import * as React from 'react';

const SigninAlert = () => {


    return (
        <div ref={signinAlertRef} className="ed-modal">
            <div className="ed-main">
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <i className="fa fa-times" aria-hidden="true" onClick={() => { signinAlertRef.current.style.display = 'none' }}></i>
                </div>
                <p>You need to be signed in</p>

                <div className="ed-btns">

                </div>
            </div>
        </div>
    )
}

export default SigninAlert