// material-ui
// import { useTheme } from '@mui/material/styles';
// import logo from 'assets/images/logo.png'
// import logo from "assets/images/Logo/studkz_logo.png";
const Logo = () => {
    return (
        <div>
            <span style={{ display: "flex", alignItems: "center" }}>
              <img src="/studkz_logo.png" alt="studkz_logo" style={{ height: '70px', width:'70px'}}  />
              <p
                style={{
                  fontSize: "20px",
                  color: "olivedrab",
                  marginTop: "20px",
                }}
              >
                Stud.kz
              </p>
            </span>
          </div>
    );
};

export default Logo;
