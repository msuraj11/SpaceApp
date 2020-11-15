import React, {useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {isEmpty} from 'lodash';
import './App.css';
import FileUpload from './components/FileUpload';
import RenderImages from './components/RenderImages';

const App = () => {
  const [alertObj, setAlert] = useState(null);
  const renderAlertBox = obj => {
    setAlert(obj);
  };

  return (
    <div className='container'>
      {!isEmpty(alertObj) &&
        <Alert
          severity={alertObj.type}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                renderAlertBox({});
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertObj.msg}
        </Alert>
      }
      <h1 className='text-center'>
        <i className="fas fa-meteor"></i> Space App
      </h1>
      <FileUpload setAlert={renderAlertBox} />
      <RenderImages setAlert={renderAlertBox} />
    </div>
  );
};

export default App;
