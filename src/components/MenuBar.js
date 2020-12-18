import React, { useContext, useState } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function MenuBar() {

  const { AuthUser, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = /*AuthUser ?*/ (
    <Menu pointing secondary fluid className="five item" size="massive" color="red">

      <Menu.Item
      active={activeItem === 'settings' } 
      name="settings" 
      onClick={handleItemClick}
      as={Link} 
      to="/testPage">
        <Icon 
        className="cog" 
        size="large"  
        color="red"
        />
      </Menu.Item>
      
      <Menu.Item 
      active={activeItem === 'home' } 
      name="home" 
      onClick={handleItemClick}
      as={Link} 
      to="/home">
        <Icon 
        className="home link icon" 
        size="big"  
        color="red"
        />
      </Menu.Item>
      
      {AuthUser ? 
      <Menu.Item 
      active={activeItem === 'profile' } 
      name="profile" 
      onClick={handleItemClick}
      as={Link} 
      to={`/profile/${AuthUser.id}`}>
        <Icon 
        className="user link big icon" 
        size="big"  
        color="red"
        />
      </Menu.Item>
      : 
        <Menu.Item 
        active={activeItem === 'profile' } 
        name="profile" 
        onClick={handleItemClick}
        as={Link} 
        to={`/profile/5fdce284158b4c0d68cfba50`}>
          <Icon 
          className="user link big icon" 
          size="big"  
          color="red"
          />
        </Menu.Item>
      }

      <Menu.Item
      active={activeItem === 'top' } 
      name="top" 
      onClick={handleItemClick}
      as={Link} 
      to="/">
        <Icon  
        className="arrow alternate circle up link icon" 
        size="big"  
        color="red"
        />
      </Menu.Item>

      <Menu.Item>
        <Icon className="sign out link icon" 
        size="large"  
        color="red"
        onClick={logout} />
      </Menu.Item>

    </Menu>


/*  ) : (


    <Menu pointing secondary size="massive" color="red">
      <Menu.Item
        name="Social Network App"
        active={activeItem === 'Social Network App'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />

        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>*/
  );


  return menuBar;
}

export default MenuBar;
