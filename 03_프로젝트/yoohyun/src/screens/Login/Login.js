import React, { useState } from 'react';
import './LoginStyle.css';
import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';

const WelcomeText = styled.div`
  font-weight: 700;
  font-size: 75px;
  color: white;
  padding-bottom: 30px;
  font-family: 'Advent Pro', sans-serif;
`;

const CustomTextField = styled(TextField)`
  width: 500px;
  margin-top: 8px;
  background-color: white;
`;

const RedButton = styled(Button)`
  width: 240px;
  height: 45px;
  color: error;
`;

const Login = (props) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (id === "" || password === "") {
            alert("Please fill in all fields.");
        } else {
            const loginSuccess = true;
            if (loginSuccess) {
                alert("Sign in Success!");
                navigate('/', { state: { userId: id } });
            }
        }
    };

    return (
        <div>
            <div className='Background'>
                <div className='logo'>
                    <img src='/image/modetec_logo3.png' alt="Logo" />
                    <div className='welcome'>
                        <WelcomeText>WELCOME TO MODETEC</WelcomeText>
                        <div className='loginfield'>
                            <CustomTextField
                                label="ID"
                                variant="outlined"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                            />
                            <CustomTextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='buttonfield'>
                            <Stack direction="row" spacing={2}>
                                <RedButton variant="outlined" onClick={handleLogin} color='error'>
                                    sign in
                                </RedButton>
                                <RedButton variant="contained" color='error'>
                                    sign up
                                </RedButton>
                            </Stack>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

