import { Button, Grid } from "@material-ui/core";
import { useContext } from "react";
import { removeLocalStorageToken } from "../../shared/utils";
import { AuthContext } from "../../store/auth";
import { navigate } from "@reach/router"

function Navbar(props){
    
    const authCtx = useContext(AuthContext);
    // const navigate = useNavigate();
    
    const onRedirect = (path) => {
      navigate(path)
    }
    
    const onLogout = (path) => {
        removeLocalStorageToken();
        authCtx.setUserDetails(null);
        navigate(path);
    }
    return (
        <Grid
          container
          direction="row"
          justify="flex-end"
          alignItems="center"
          className="navbar-grid"
          spacing={2}
        >
          {!authCtx.user && <Grid item><Button color="primary" onClick={()=>onRedirect("enter?state=login")}>Log in</Button></Grid>}
          {!authCtx.user && <Grid item><Button variant="contained" className="signup-button" onClick={()=>onRedirect("enter?state=signup")}>
            Signup
          </Button></Grid>}
          {authCtx.user && <Grid item><p>{authCtx.user.username}</p></Grid>}
          {authCtx.user && <Grid><Button variant="contained" className="signup-button" onClick={()=>onLogout("enter?state=login")}>
            Logout
          </Button></Grid>}
        </Grid>
    )
}

export default Navbar;