import React, {useState, useEffect, useCallback} from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import ResultContent from './ResultContent';
import AddResult from './AddResult';
import EditResult from './EditResult';

var editId;
export default function SectionPills(props) {

  const {selectResults, pushMessageToSnackbar} = props;

  const [isAddResultPaperOpen, setIsAddResultPaperOpen] = useState(false);
  const [isEditResultPaperOpen, setIsEditResultPaperOpen] = useState(false);
  const [results, setResults] = useState([]);

  const openAddResultModal = useCallback(() => {
    setIsAddResultPaperOpen(true);
  },[setIsAddResultPaperOpen]);

  const openEditResultModal = useCallback((ids) => {
    editId=ids;
    setIsEditResultPaperOpen(true);
  },[setIsEditResultPaperOpen]);

  const closeAddResultModal = useCallback(() => {
    setIsEditResultPaperOpen(false);
    setIsAddResultPaperOpen(false);
  }, [setIsAddResultPaperOpen, setIsEditResultPaperOpen]);

  
  const fetchRandomResults = useCallback(async() => {
    let res= await axios.get('/api/getResult');
    setResults(res.data.reverse());
  }, [setResults]);

  useEffect(() => {
    selectResults();
    fetchRandomResults();
  }, [selectResults, fetchRandomResults]);

  if (isAddResultPaperOpen) {
    return <AddResult
      onClose={closeAddResultModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      fetchRandomResults={fetchRandomResults}
    />
  }

  if (isEditResultPaperOpen) {
    return <EditResult
      onClose={closeAddResultModal}
      pushMessageToSnackbar={pushMessageToSnackbar}
      editId={editId}
      results={results}
      fetchRandomResults={fetchRandomResults}
    />
  }

  return (
    <ResultContent
     results={results}
     fetchRandomResults={fetchRandomResults}
     openAddResultModal={openAddResultModal}
     openEditResultModal={openEditResultModal}
     pushMessageToSnackbar={pushMessageToSnackbar}
      />
  );
}

SectionPills.propTypes = {
  selectResults: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
  
};