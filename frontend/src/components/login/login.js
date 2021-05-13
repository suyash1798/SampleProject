import { Button, Card, Grid, InputLabel, TextField } from "@material-ui/core";
import axios from "axios";
import { useContext, useState } from "react";
import { addLocalStorageToken, emailRegex } from "../../shared/utils";
import { AuthContext } from "../../store/auth";
import "./login.css";
import { navigate } from "@reach/router"

function Login() {
    const authCtx = useContext(AuthContext);
    const [errors,setError] = useState({})
    const [data,setData] = useState({})
    
    const onLogin = async (event)=>{
        event.preventDefault();
        console.log(errors);
        if(!errors['email'] && !errors['password']){
          const res = await axios.post('auth/login',data)
          addLocalStorageToken(res.data.token);
          authCtx.setUserDetails(res.data.user);
          navigate('post-list') 
        }
    }
    
    const validations = (input,value)=>{
      setData(data=>{
        data[input] = value
        return data;
      })
      console.log(input,value)
      if(input === 'email'){
        if(!emailRegex.test(value)){
          setError(error=>({...error,email:'Enter a valid Email'}))
        }else{
          setError(error=>({...error,email:null}))
        }
      }
      if(input === 'password'){
        if(value.length < 5){
          setError(error=>({...error,password:'Enter a valid Email'}))
        }else{
          setError(error=>({...error,password:null}))
        }
      }
    }
    
    const onHandleChange = (event)=>{
     
      validations(event.target.name,event.target.value)
    }
    
    return (
      <Card variant="outlined" className="login-card">
        <Grid container direction="column">
          <form onSubmit={onLogin}>
            <Grid container direction="column" alignItems="stretch">
              <Grid
                container
                direction="column"
                alignItems="stretch"
                className="login-fields"
              >
                <InputLabel>Email:</InputLabel>
                <TextField name="email" variant="outlined" {...(errors['email'] && {helperText:errors['email'] , error:true} )} onChange={onHandleChange}/>
              </Grid>
              <Grid
                container
                direction="column"
                alignItems="stretch"
                className="login-fields"
              >
                <InputLabel>Password:</InputLabel>
                <TextField
                  id="outlined-basic"
                  name="password"
                  variant="outlined"
                  type="password"
                  {...(errors['password'] && {helperText:errors['password'], error:true} )}
                  onChange={onHandleChange}
                />
              </Grid>
              <Button variant="contained" className="login-fields" type="submit">
                Login
              </Button>
            </Grid>
          </form>
        </Grid>
      </Card>
    );
}

export default Login;
