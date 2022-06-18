import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import NotificationsContent from './NotificationContent';
import AddNotification from './AddNotification';
import EditNotification from './EditNotification';

var editId;
export default function SectionPills(props) {

  const {selectNotifications, pushMessageToSnackbar} = props;

  const [isAddPostPaperOpen, setIsAddPostPaperOpen] = useState(false);
  const [isEditNotificationPaperOpen, setIsEditNotificationPaperOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const openAddNotificationModal = useCallback(() => {
    setIsAddPostPaperOpen(true);
  }, [setIsAddPostPaperOpen]);

  const openEditNotificationtModal = useCallback((ids) => {
    editId=ids;
    setIsEditNotificationPaperOpen(true);
  },[setIsEditNotificationPaperOpen]);

  const closeAddNotificationModal = useCallback(() => {
    setIsEditNotificationPaperOpen(false);
    setIsAddPostPaperOpen(false);
  }, [setIsAddPostPaperOpen, setIsEditNotificationPaperOpen]);

  const fetchRandomMessages = useCallback(async() => {
    let res= await axios.get('/api/getNotification');
     setMessages(res.data.reverse());
  }, [setMessages]);

  useEffect(() => {
    selectNotifications();
    fetchRandomMessages();
  }, [selectNotifications, fetchRandomMessages]);


  if (isAddPostPaperOpen) {
    return <AddNotification
      onClose={closeAddNotificationModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      fetchRandomMessages={fetchRandomMessages}
    />
  }

  if (isEditNotificationPaperOpen) {
    return <EditNotification
      onClose={closeAddNotificationModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      editId={editId}
      messages={messages}
      fetchRandomMessages={fetchRandomMessages}
    />
  }

  return (
    <NotificationsContent
     messages={messages}
     fetchRandomMessages={fetchRandomMessages}
     openAddNotificationModal={openAddNotificationModal}
     openEditNotificationtModal={openEditNotificationtModal}
     pushMessageToSnackbar={pushMessageToSnackbar}
      />
  );
}

SectionPills.propTypes = {
  selectNotifications: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};