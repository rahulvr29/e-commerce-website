 import React, {useState} from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../style/login.css'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../firebase.config'
import { setDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] =useState('')
  const [confirmPassword, setConfirmPassword] =useState()
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signup = async(e)=>{
    e.preventDefault();
    setLoading(true)
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password, confirmPassword);

      const user = userCred.user
      const storageRef =ref(storage, `images/${Date.now() + userName}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on((error)=> {
        toast.error(error.message)
      }, ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
          updateProfile(user,{
            displayName:userName,
            photoURL:downloadURL,
          });

          await setDoc(doc(db,'users', user.uid),{
            uid: user.uid,
            displayName: userName,
            email,
            photoURL:downloadURL,
          })
        })
      })
      setLoading(false)
      toast.success('Account Created')
      navigate('/login')
      console.log(user)
    } catch (error) {
      toast.error('something went wrong')
    }
  }

  return (
    <Helmet title=' SignUp'>
        <section>
          <Container>
            <Row>
              {
                loading ? (
                  <Col lg='12' className='text-center'>
                    <h5 className="fw-bold">Loading.....</h5>
                  </Col>
                ) : (
                  <Col lg='6' className='m-auto text-center'>
                <h3 className="fw-bold mb-4"> SignUp</h3>

                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='form__group'>
                    <input type="text" placeholder='Enter Username'value={userName} onChange={e=> setUserName(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="email" placeholder='Enter Email'value={email} onChange={e=> setEmail(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="password" placeholder='Enter Your Password' value={password} onChange={e=> setPassword(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="password" placeholder='Confirm Password' value={confirmPassword} onChange={e=> setConfirmPassword(e.target.value)}/>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type="file"  onChange={e=> setFile(e.target.files[0])}/>
                  </FormGroup>
                  <button className="shop__btn login__btn" type="submit">Create an account</button>
                  <p>Already have an account?
                  <Link to='/login'> Login</Link>
                  </p>
                </Form>
              </Col>
                )
              }
            </Row>
          </Container>
        </section>
    </Helmet>
  )
}

export default SignUp;