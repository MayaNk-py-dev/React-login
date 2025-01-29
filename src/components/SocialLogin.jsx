import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import { useTheme } from "@mui/material/styles";

function GoogleIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.5 12.27c0-.63-.06-1.23-.18-1.82H12v3.45h5.9c-.26 1.41-1.06 2.6-2.26 3.41v2.84h3.67c2.15-1.98 3.4-4.9 3.4-8.88z" />
      <path fill="#34A853" d="M12 23c2.7 0 4.95-.9 6.6-2.43l-3.67-2.84c-1.01.67-2.31 1.06-3.93 1.06-3.02 0-5.58-2.04-6.49-4.79H1.63v3.02C3.28 20.98 7.35 23 12 23z" />
      <path fill="#FBBC05" d="M5.51 14.05A7.47 7.47 0 0 1 5.1 12c0-.7.12-1.38.32-2.05V6.93H1.63A11.96 11.96 0 0 0 0 12c0 1.87.44 3.63 1.23 5.07l4.28-3.02z" />
      <path fill="#EA4335" d="M12 4.44c1.47 0 2.78.51 3.81 1.5l2.86-2.86C16.93 1.37 14.69 0 12 0 7.35 0 3.28 2.02 1.63 4.93l4.28 3.02C6.42 5.69 8.98 4.44 12 4.44z" />
    </SvgIcon>
  );
}

function FacebookIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">
      <path
        fill="#FFFFFF"
        d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.892-4.788 4.655-4.788 1.323 0 2.461.099 2.791.143v3.24h-1.914c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z"
      />
    </SvgIcon>
  );
}

const SocialLogin = () => {
  const theme = useTheme(); // Access the current theme (light or dark)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
        width: "100%",
      }}
      >
      
            <Button 
                fullWidth
                variant="outlined"
                onClick={() => alert('Sign up with Google')}
                startIcon={<img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google" width={24} />}
                sx={{
                  borderRadius: '12px',
                  color: theme.palette.mode === 'dark' ? 'white' : 'black', // Conditional text color
                }}
              >
                Sign in with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign up with Facebook')}
              startIcon={<img src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000" alt="Google" width={24} />}
              sx={{
                borderRadius: '12px',
                color: theme.palette.mode === 'dark' ? 'white' : 'black', // Conditional text color
                }}
              >
                Sign in with Facebook
            </Button>
    </Box>
  );
};

export default SocialLogin;
