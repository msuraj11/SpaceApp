import React, {Fragment, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const RenderImages = ({setAlert}) => {
  const [imgDecoded, setImages] = useState(null);
  const getAllFigs = async () => {
    try {
      const res = await axios.get('/api/getFigs');
      setImages(res.data);
    } catch (error) {
      console.log(error);
      setAlert({type: 'error', msg: (error && error.response.data.error) || 'something went wrong'});
    }
  };
  return (
    <Fragment>
      <Button variant="contained" onClick={getAllFigs}>
        Get Figs
      </Button>
      <div>{imgDecoded ? imgDecoded.length : null}</div>
      {imgDecoded
        ? imgDecoded.map((imgDec) => (
            <img
              src={`data:image/png;base64,${Object.values(imgDec)[0]}`}
              alt={`space-fig ${Object.keys(imgDec)[0]}`}
              className="fig"
              key={Object.keys(imgDec)[0]}
            />
          ))
        : null}
    </Fragment>
  );
};

export default RenderImages;
