import React, { Fragment, useState } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import WallpaperIcon from '@material-ui/icons/Wallpaper'
import Chip from '@material-ui/core/Chip';
import Refresh from '@material-ui/icons/Refresh';

const FileUpload = ({setAlert}) => {
    const [files, setFiles] = useState('');
    const [fileNames, setFileNames] = useState([]);

    const changeHandler = e => {
        setFiles([...e.target.files]);
        setFileNames([...e.target.files].map(item => item.name));
    };

    const handleRefresh = () => {
        setFiles('');
        setFileNames([]);
    };

    const submitHandler = async e => {
        e.preventDefault();
        const formData = new FormData();
        for (const item of files) {
            formData.append('file', item);
        }
        try {
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setAlert({type: 'success',
                msg: res.data && (typeof res.data.msg === 'string') ? res.data.msg : 'Uploaded succesfully'});
            setFiles('');
            setFileNames([]);
            // getAllFigs(); 7.5_0.03_52.0_100.0.png
        } catch (error) {
            setFiles('');
            setFileNames([]);
            setAlert({type: 'error', msg: (error && error.response.data.error) || 'something went wrong'});
        }
    };

    return (
        <Fragment>
            <form className='text-center my-2' onSubmit={submitHandler}>
                <input
                    type="file"
                    name='file'
                    className="custom-file-input"
                    id="customFile"
                    onChange={changeHandler}
                    multiple
                    formEncType='multipart/form-data'
                />
                <label htmlFor="customFile" className="m">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    type="submit"
                >
                    Upload
                </Button>
                <IconButton aria-label="refresh" component="span" className="m" onClick={handleRefresh}>
                    <Refresh />
                </IconButton>
            </form>
            <div className='chips'>
                {fileNames.length > 0 ? 
                    fileNames.map((item, key) =>
                        <Chip
                            key={key}
                            variant="outlined"
                            icon={<WallpaperIcon />}
                            label={`${key+1}. ${item}`}
                            className='m'
                        />) : null
                }
            </div>
        </Fragment>
    );
};

export default FileUpload;