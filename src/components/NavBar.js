import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

export default function NavBar() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Typography variant = "h4" position="static">
            <IconButton
              onClick={handleDrawerOpen}
            > 
              <Menu size="large" style={{color: "white"}} ></Menu>
            </IconButton>
            MyPermit!
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer open="state.left" onClose={toggleDrawer('left', false)}>  
        <h1> Hello </h1>
      </Drawer>
    </div>
  );
}