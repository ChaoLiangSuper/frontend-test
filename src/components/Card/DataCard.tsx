import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import _ from 'lodash';
import React from 'react';
import { SidebarConsumer } from '../../contexts/SidebarContext';
import { ICardData } from '../../interfaces';
import useStyle from './style';

const DataCard = ({ cardData }: { cardData: ICardData }) => {
  const classes = useStyle();
  const { coreData } = cardData!;

  return (
    <SidebarConsumer>
      {(contextValue) => {
        const openSidebar = () => contextValue!.toggleSidebar(cardData!);
        return (
          <Card className={classes.card}>
            <CardActionArea onClick={openSidebar}>
              <CardContent>
                <Typography variant='body2' color='textSecondary' gutterBottom>
                  {_.capitalize(coreData.state)}
                </Typography>
                <Typography variant='h5'>{coreData.number}</Typography>
                <Typography variant='body2' color='textSecondary' noWrap>
                  {`Application: ${_.capitalize(coreData.application)}`}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  gutterBottom
                  noWrap
                >
                  {`Assignee: ${_.capitalize(coreData.assignee)}`}
                </Typography>
                <Typography variant='body2' className={classes.description}>
                  {coreData.shortDescription}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={openSidebar}>LEARN MORE</Button>
            </CardActions>
          </Card>
        );
      }}
    </SidebarConsumer>
  );
};

export default DataCard;
