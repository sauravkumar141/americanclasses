import React, {useState, useEffect, useCallback} from "react";
// @material-ui/core components
// @material-ui/icons
import PropTypes from "prop-types";
import axios from 'axios';
// core components
import TestSeriesContent from './TestSeriesContent';
import AddTestSeries from './AddTestSeries';
import EditTestSeries from './EditTestSeries';


var editId;
export default function TestSeries(props) {

  const {selectTestSeries, pushMessageToSnackbar} = props;

  const [isAddTestSeriesPaperOpen, setIsAddTestSeriesPaperOpen] = useState(false);
  const [isEditTestSeriesPaperOpen, setIsEditTestSeriesPaperOpen] = useState(false);
  const [testSeries, setTestSeries] =useState([]);

  const openAddTestSeriesModal = useCallback(() => {
    setIsAddTestSeriesPaperOpen(true);
  },[setIsAddTestSeriesPaperOpen]);

  const openEditTestSeriesModal = useCallback((ids) => {
    editId=ids;
    setIsEditTestSeriesPaperOpen(true);
  },[setIsEditTestSeriesPaperOpen]);

  const closeAddTestSeriesModal = useCallback(() => {
    setIsEditTestSeriesPaperOpen(false);
    setIsAddTestSeriesPaperOpen(false);
  }, [setIsAddTestSeriesPaperOpen, setIsEditTestSeriesPaperOpen]);

  const fetchTestSeries= useCallback(async() => {
    let res= await axios.get('/api/getTestSeries');
    setTestSeries(res.data.reverse());
  }, [setTestSeries]);

  useEffect(() => {
    selectTestSeries();
    fetchTestSeries()
  }, [selectTestSeries, fetchTestSeries]);

  if (isAddTestSeriesPaperOpen) {
    return <AddTestSeries
      onClose={closeAddTestSeriesModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      fetchTestSeries={fetchTestSeries}
    />
  }

  if (isEditTestSeriesPaperOpen) {
    return <EditTestSeries
      onClose={closeAddTestSeriesModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      editId={editId}
      testSeries={testSeries}
      fetchTestSeries={fetchTestSeries}
    />
  }

  return (
    <TestSeriesContent
     testSeries={testSeries}
     fetchTestSeries={fetchTestSeries}
     openAddTestSeriesModal={openAddTestSeriesModal}
     openEditTestSeriesModal={openEditTestSeriesModal}
     pushMessageToSnackbar={pushMessageToSnackbar}
      />
  );
}

TestSeries.propTypes = {
  selectTestSeries: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

/*

    
*/