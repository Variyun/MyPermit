import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton'

export default function NavBar() {
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant = "h4" position="static">
            <IconButton> 
              <Menu size="large" style={{color: "white"}} ></Menu>
            </IconButton>
            MyPermit!
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}