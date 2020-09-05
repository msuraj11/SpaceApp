import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [uploadState, setUploadState] = useState({
        files: '',
        fileNames: []
    });

    const {files, fileNames} = uploadState;

    const changeHandler = e => {
        setUploadState({...uploadState,
            files: [...e.target.files],
            fileNames: [...e.target.files].map(item => item.name)});
        console.log(files);
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
            alert(typeof res.data === 'string' ? res.data.msg : 'Uploaded succesfully');
            setUploadState({...uploadState, files: '', fileNames: []});
        } catch (error) {
            if (error.response.status === 500) {
                alert('Something went wrong');
                setUploadState({...uploadState, files: '', fileNames: []});
            } else {
                alert(error.response.data.msg);
            }
        }
    }

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
                <button type='submit'className='btn btn-primary btn-curved'>Upload</button>
            </form>
            <ul className='text-center my-2'>
                    {fileNames.length > 0 ? 
                        fileNames.map((item, key) => <li key={key}>{item}</li>) : 'No file Chosen'
                    }
            </ul>
        </Fragment>
    );
};

export default FileUpload;