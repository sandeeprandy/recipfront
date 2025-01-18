import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Apps from '@mui/icons-material/Apps';
import Dropdown from '@mui/joy/Dropdown';

export default function AppsMenu({ setFilter }) {
  const handleFilterChange = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'white' } }}
        sx={{ borderRadius: 40, color: "white", marginRight: "10px" }}
      >
        <Apps />
      </MenuButton>
      <Menu
        variant="solid"
        invertedColors
        aria-labelledby="apps-menu-demo"
        sx={{
          '--List-padding': '0.5rem',
          '--ListItemDecorator-size': '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 100px)',
          gridAutoRows: '100px',
          gap: 1,
        }}
      >
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Food")}
        >
          <ListItemDecorator>
            <Avatar>F</Avatar>
          </ListItemDecorator>
          Food
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Shopping")}
        >
          <ListItemDecorator>
            <Avatar>S</Avatar>
          </ListItemDecorator>
          Shopping
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Business")}
        >
          <ListItemDecorator>
            <Avatar>B</Avatar>
          </ListItemDecorator>
          Business
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Transport")}
        >
          <ListItemDecorator>
            <Avatar>T</Avatar>
          </ListItemDecorator>
          Transport
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Health")}
        >
          <ListItemDecorator>
            <Avatar>H</Avatar>
          </ListItemDecorator>
          Health
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("News")}
        >
          <ListItemDecorator>
            <Avatar>N</Avatar>
          </ListItemDecorator>
          News
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Events")}
        >
          <ListItemDecorator>
            <Avatar>E</Avatar>
          </ListItemDecorator>
          Events
        </MenuItem>
       
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("Delivery")}
        >
          <ListItemDecorator>
            <Avatar>D</Avatar>
          </ListItemDecorator>
          Delivery boys
        </MenuItem>
        <MenuItem
          orientation="vertical"
          onClick={() => handleFilterChange("All")}
        >
          <ListItemDecorator>
            <Avatar>A</Avatar>
          </ListItemDecorator>
          All
        </MenuItem>

      </Menu>
    </Dropdown>
  );
}
