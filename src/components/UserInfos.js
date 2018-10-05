import React  from 'react';

const UserInfo = (props) => {
  const {currentUser} = props;
  // console.log("from user info",props)
    return ( 
        <div>
                    <h2>Hello {currentUser.fullName} !  </h2>
                    <h3>Good to see you again</h3>
                    <br/>
                    <table className="table">
                      <thead></thead>
                      <tbody>
                        <tr>
                          <td >Name</td>
                          <td> {currentUser.fullName}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td> {currentUser.email}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
     );
}
 
export default UserInfo;