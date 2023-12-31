import React from 'react'
import { Container, Row, Col } from "reactstrap";
import useGetData from '../custom/hooks/useGetData';
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import '../style/user.css'

const User = () => {

  const  { data:userData, loading }= useGetData('users')

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    toast.success('User Data deleted Successfully')
  };
  return (
    <section>
      <Container>
        <Row>
          <Col>
              <h4 className="fw-bold user">Users</h4>
          </Col>
          <Col lg='12' >
            <table className="table user-table w-75">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                
                {
                  loading ? <h4 className='pt-5 fw-bold user-tb'>Loading...</h4> : userData?.map(user => (
                    <tr key={user.uid} className='usertr'>
                      <td><img src={user.photoURL} /></td>
                      <td>{user.displayName}</td>
                      <td>{user.email}</td>
                      <td><button className='btn btn-danger' onClick={()=>deleteUser (user.uid)}>Delete</button></td>
                    </tr>
                  ))
                } 
                  
                
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default User