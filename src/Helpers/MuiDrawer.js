import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


const MuiDrawer = ({ tabs,setActiveTab }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const mobileOpenRef = React.useRef(mobileOpen);

  const resizeHandler = () => {
    if (window.innerWidth > 600 && mobileOpenRef.current) {
      setMobileOpen(false);
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
                    window.removeEventListener("resize",resizeHandler);
                  };
  },[]);

  React.useEffect(() => {
    mobileOpenRef.current = mobileOpen;
  },[mobileOpen]);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawerWidth = 180;

  const drawer = (
    <Tabs
      value={value}
      onChange={(event,newValue) => setValue(newValue)}
      variant="scrollable"
      orientation="vertical"
      scrollButtons={false}
      aria-label="datetime tabs"
    >
      {tabs.map(text => <Tab key={text} label={text} wrapped = {true}
                            onClick = {() => {
                                                setActiveTab(text);
                                                handleDrawerClose();
                                              }}
                            />)}
    </Tabs>
  );

  return (
    <Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ m: 1, display: { sm: 'none' } }}
      >
        <MenuIcon sx={{ fontSize: '2.5rem' }}/>
      </IconButton>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="datetime apps"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          transitionDuration={{ enter: 300, exit: 250}}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default MuiDrawer;
