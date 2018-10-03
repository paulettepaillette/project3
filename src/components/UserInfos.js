import React  from 'react';

const UserInfo = (props) => {
  const {currentUser} = props;
  // console.log("from user info",props)
    return ( 
        <div>
                    <p>Hello  {currentUser.fullName}</p>
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
                        <tr>
                          <td>Param</td>
                          <td>
                            <ul>
                              <li>One param</li>
                              
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
     );
}
 
export default UserInfo;