import React,{useEffect,useState} from "react";
import {
    ThemeProvider,
    Label,
    Input,
    Select,
    Textarea,
    Radio,
    Checkbox,
    Box,
    Flex,
    Button,
    Slider,
    MenuButton,
    Spinner,
    Switch,
    Text,
    NavLink,
    Message,
    IconButton,
    Heading,
    Image

} from 'theme-ui';
import {loginRequest} from '@stateManagment'
export const LoginPage = () => {
    const Login = loginRequest();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault()

        if(username !== ''&& password !== ''){
            Login(username,password)
        }
    }
    return (
        <Flex
            sx={{
                alignItems: "center",
                py: 5,
                px: 4,
                width: '100%',
                height: '100%',
                borderRadius: 4,

            }}>
            <Box as='div'
                sx={{
                    maxWidth: "335px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems: "center",
                    mx: "auto",
                    py: 5,
                    px: 4,
                    borderRadius:"35px",
                    backdropFilter: 'blur(8px)',
                    boxShadow: t => `3px 3px 23px 0px ${t.colors.text}`,

                }}
            >

                <Image 
                sx={{
                    width: "30%"
                }}
                src={"/images/Che_Logo.png"} 
                />




                <Box as='form' onSubmit={handleSubmit}>
                    <Label htmlFor="username">
                        Email
                    </Label>
                    <Input
                        sx={{ display: "block", mb: 3 }}
                        id="username"
                        type="text"
                        name="email"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Label sx={{ display: "block", mb: 3 }}>
                         Password
                        <Input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Label>
                    <Button
                        sx={{
                            py: 2,
                            px: 4,
                            bg:"secondary",
                            color:"white",
                            fontWeight:"600",
                            "&:hover":{
                                bg:"buttonHover"
                            }
                            

                        }}
                        type="submit"
                    >
                        Login
                    </Button>

                </Box>
            </Box>
        </Flex>
    );
}