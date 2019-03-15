import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Drawer } from '@material-ui/core';
import { history } from '../_helpers';

class Menu extends React.Component {
    handleClick = (path) => {
        history.push(path);
    }
    
    render(){
        
        const items = [
            {title: 'Home',  path: '/'},
            {title: 'Logout',  path: '/login'}
        ];

        return (
            <Drawer>
                <List style={{width:240}}>
                    {items.map(item => (
                        <ListItem
                            key ={item.title}
                            button
                            onClick={()=> this.handleClick(item.path) }
                            >
                            <ListItemText primary={item.title}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        );
    }
}


const connectedMenu = connect()(Menu);
export { connectedMenu as Menu };