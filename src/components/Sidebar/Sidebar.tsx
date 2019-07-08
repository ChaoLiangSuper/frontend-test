import {
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import _ from 'lodash';
import React from 'react';
import { SidebarConsumer } from '../../contexts/SidebarContext';
import useStyle from './style';

const Sidebar = () => {
  const classes = useStyle();
  return (
    <SidebarConsumer>
      {(contextState) => {
        const closeSidebar = () => contextState!.toggleSidebar(null);

        return (
          <Drawer
            anchor='right'
            open={contextState!.isOpen}
            onClose={closeSidebar}
          >
            {contextState.cardData ? (
              <div className={classes.sidebar}>
                <IconButton
                  className={classes.closeButton}
                  onClick={closeSidebar}
                >
                  <Clear />
                </IconButton>
                <Typography variant='h4'>
                  {contextState.cardData.coreData.number}
                </Typography>
                <List>
                  <ListItem>
                    <div className={classes.leftColumn}>Assigned to</div>
                    <div className={classes.rightColumn}>
                      {contextState.cardData.coreData.assignee}
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className={classes.leftColumn}>Short description</div>
                    <div className={classes.rightColumn}>
                      {contextState.cardData.coreData.shortDescription}
                    </div>
                  </ListItem>
                  <ListItem>
                    <div className={classes.leftColumn}>Application</div>
                    <div className={classes.rightColumn}>
                      {contextState.cardData.coreData.application}
                    </div>
                  </ListItem>
                  {_.map(contextState.cardData.serviceData, (data, key) => (
                    <ListItem key={key}>
                      <div className={classes.leftColumn}>{key}</div>
                      <div className={classes.rightColumn}>{data}</div>
                    </ListItem>
                  ))}
                </List>
              </div>
            ) : null}
          </Drawer>
        );
      }}
    </SidebarConsumer>
  );
};

export default Sidebar;
