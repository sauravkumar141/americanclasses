import React, {useEffect, useState, useCallback} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Notifications from "@material-ui/icons/Notifications";
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import axios from 'axios';
 // core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import NavPills from "./NavPills";
import Notification from './Notification';
import styles from "./pillsStyle";

const useStyles = makeStyles(styles);

export default function SectionPills() {

  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]);

  const fetchRandomMessages = useCallback(async() => {
    let notification= await axios.get('/api/getNotification');
     setMessages(notification.data.reverse());

     let res= await axios.get('/api/getResult');
     setResults(res.data.reverse());
  }, [setMessages, setResults]);

  useEffect(() => {
    fetchRandomMessages();
  }, [fetchRandomMessages]);

  return (
    <div className={classes.section}>
      <div className={classes.container}>
        <div id="navigation-pills">
          <div className={classes.title}>
            <h1>Notification Section</h1>
          </div>
          <GridContainer style={{marginRight: "35px"}}>
            <GridItem lg={12}>
              <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 4, md: 4 },
                  contentGrid: { xs: 12, sm: 8, md: 8 }
                }}
                tabs={[
                  {
                    tabButton: "Notification",
                    tabIcon: Notifications,
                    tabContent: (
                     <Notification messages={messages} name="notification" header="Latest Messages..." />
                    )
                  },
                  {
                    tabButton: "Result",
                    tabIcon: ImportContactsIcon,
                    tabContent: (
                      <Notification messages={results} name="result" header="Latest Results..." />
                    )
                  }
                ]}
              />
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
