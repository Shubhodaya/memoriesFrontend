import React, {useState} from 'react'
import {Avatar,Button,Paper,Grid,Typography,Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles';
import Input from './Input';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {signin,signup } from '../../actions/auth';

const initialState = {name:'', email: '',password: '',confirmPassword: ''}

const Auth = () => {

    const classes = useStyles();

    const [showPassword, setShowPassword]=useState(false);
    const [isSignup,setIsSignup]=useState(false);
    const[formData,setFormData]= useState(initialState);
    const dispatch =useDispatch();
    const history=useHistory();
    
const handleShowPassword =() => setShowPassword((prevShowPassword) => !prevShowPassword);

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }

    }
    const handleChange=(e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const switchMode =() => {
        setIsSignup((prevIsSignup) => !prevIsSignup );
        setShowPassword(false);
    }

    const googleSuccess = async(res)=> {
           

           const token = res?.credential;
           const result = jwt_decode(token);
           
           try{
               dispatch({type:'AUTH',data:{result,token}});
               
               history.push('/');
           }catch(e){
            console.log(e);
           }

    }

    const googleFailure =(err) => {
            console.log(err);
            console.log('Sign in failed')
    }



     



  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography>{isSignup ?'Sign Up' :'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
               <Grid container spacing={2}>
               {
                isSignup && (
                    <>
                        <Input name="name" label="Name" handleChange={handleChange} autoFocus />
                      
                    </>
                )
               }
               <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
               <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}/>
                {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
               </Grid>
               <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                {isSignup ? 'Sign Up': 'Sign In'}
               </Button>
               
               <GoogleLogin
                onSuccess={googleSuccess}
                onError={googleFailure}
                />
               
             
                <Grid container justifyContent="center" style={{marginTop:"1rem", backgroundColor:"#3F51B5"}}>
                    <Grid item>
                        <Button onClick={switchMode} style={{color:"white"}}>
                             { isSignup ? 'Already have an account? Sign In': "Don't have an account? Sign Up"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth;

/* <Input name="firstName" label="First name" handleChange={handleChange} autoFocus half/>
//<Input name="lastName" label="Last name" handleChange={handleChange} half/> */