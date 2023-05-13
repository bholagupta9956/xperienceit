// This is the panel which will be used for entering the user email while registering ;

import React from "react";

const EmailPanel = () =>{
    return(<>
     <div className="emailPanel">
     <h4>User Details</h4>
           <div className="auth_input otp_form">
                <label htmlFor="number">Enter Email</label>
                <input type="email" placeholder = "Enter your 4 digit otp" />
                <label htmlFor="number">Enter Password</label>
                <input type="password" placeholder = "Enter your 4 digit otp" />
                <button>Submit</button>
            </div>
     </div>
    </>)
}

export default EmailPanel;