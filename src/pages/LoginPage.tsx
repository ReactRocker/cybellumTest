import React, {useState} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { setEmail, setPassword } from '../redux/slices/inputReducer';
import { login } from '../services';
import { loginSuccess } from '../redux/slices/auth';
import { useHistory } from "react-router-dom";
import { userToken } from '../types/index';
import Cylbellum from "./../imges/react-test-wrong-credentials 1.png"

const useStyles = makeStyles({
  container: {
    display:'flex',
    flexDirection: "row",
  },
  img: {
    height: '100vh'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainInfo: {
    margin: '100px 0px 50px 50px',
  },
  h1: {
    fontSie: 26,
    fontWeight: '500',
    color: '#53616A',
  },
  span: {
    fontSize: 15,
    opacity: '50%',
    color: '#53616A',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    width: 540,
    margin: '0px 0px 50px 50px',
  },
  label: {
    color: '#707886',
    fontSize: 16,
  },
  inputType: {
    boxSizing:"border-box",
    backgroundColor: '#f3f5f7',
    outline: 'none',
    borderRadius: 3,
    fontSize: 16,
    color: ' #000',
    width: 370,
    "& input": {
      padding: "9px 14px",
    }
  },
  formButton: {
    backgroundColor: '#5e8751',
    fontWeight: '600',
    borderRadius: 4,
    fontSize: 16,
    color: '#fff',
  },
  errorMessage: {
    color: 'red',
    fontSize: 13, 
  },
});

export default function LoginPage() {

  const classes = useStyles();
  const dispatch = useAppDispatch();
  const emailValue = useAppSelector((state) => state.inputSlice.email);
  const passwordValue = useAppSelector((state) => state.inputSlice.password);
  const [emailIsEmpty,setEmailIsEmpty] = useState<boolean>(false);
  const [passwordIsEmpty, setPasswordIsEmpty] = useState<boolean>(false);

  const borderEmail = emailIsEmpty ? '1px solid red' : '1px solid #000';
  const borderPassword = passwordIsEmpty ? '1px solid red' : '1px solid #000';
  const [badCredentials, setBadCredentials] = useState<boolean>(false);
  const history = useHistory();

  const formHandler = (e: React.FormEvent<{ value: unknown }>) => {
    e.preventDefault();
    
    if (emailValue === '') {
      setBadCredentials(false);
      setPasswordIsEmpty(false);
      setEmailIsEmpty(true);
      return;
    }
    if (passwordValue === '') {
      setBadCredentials(false);
      setPasswordIsEmpty(true);
      return;
    }
  
    const bodyFormData = new FormData();
    bodyFormData.append('sub_tenant_id', 'company');
    bodyFormData.append('username', `${emailValue}`);
    bodyFormData.append('password', `${passwordValue}`);
    login(bodyFormData)
    .then(data => {
      if (data.access_token !== undefined) {
        const userData : userToken = {
          access_token: data.access_token,
          refresh_token: data.refresh_token
        };
        document.cookie = `testUser=${JSON.stringify(userData)}`
        dispatch(loginSuccess(userData));
        history.push('/');
      }
      setBadCredentials(true)
    })

  };

  return (
      <Box
          className={classes.container}
      >
        <Box>
          <img
              className={classes.img}
              src={Cylbellum}
              alt="Cylbellum-img"
              loading="lazy"
          />
        </Box>
      <Box className={classes.root}>
          <Box className={classes.mainInfo}>
            <h1 className={classes.h1}>Log in</h1>
            <span className={classes.span}>
              Enter your Email and Password. If you don't have
              <br/>
              an account, please,
              see your email invitation{' '}
            </span>
          </Box>
          <Box
            className={classes.form}
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e: any) => formHandler(e)}
          >
            <label className={classes.label} htmlFor="email">
              Email
            </label>
            <TextField
              value={emailValue}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className={classes.inputType}
              sx={{border: `${borderEmail}`}}
              id="email"
              variant="outlined"
            />
            {!badCredentials && emailIsEmpty && <span className={classes.errorMessage}>Email required</span>}
            <label className={classes.label} htmlFor="passwords">
              Password
            </label>
            <TextField
              value={passwordValue}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              type="password"
              className={classes.inputType}
              sx={{border: `${borderPassword}`}}
              id="passwords"
              variant="outlined"
            />
             {!badCredentials && passwordIsEmpty && <span className={classes.errorMessage}>Password required</span>}
             {badCredentials && <span className={classes.errorMessage}>Wrong Credentials</span>}
            <Button
              sx={{
                width: '200px',
                marginLeft: '170px',
                marginTop: '40px'
              }}
              size="large"
              type="submit"
              variant="contained"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
  );
}
