import React, { Fragment, useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [uploadState, setUploadState] = useState({
        files: '',
        fileNames: [],
        imgDecoded: null
    });

    const {files, fileNames, imgDecoded} = uploadState;

    const changeHandler = e => {
        setUploadState({...uploadState,
            files: [...e.target.files],
            fileNames: [...e.target.files].map(item => item.name)});
        console.log(files);
    };

    const getAllFigs = async () => {
        try {
            const res = await axios.get('/api/getFigs');
            console.log(res.data);
            setUploadState({...uploadState, imgDecoded: res.data})
        } catch (error) {
            console.log(error);
        }
    }

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
            alert(res.data && (typeof res.data.msg === 'string') ? res.data.msg : 'Uploaded succesfully');
            setUploadState({...uploadState, files: '', fileNames: []});
            getAllFigs();
        } catch (error) {
            setUploadState({...uploadState, files: '', fileNames: []});
            alert((error && error.response.data.error) || 'something went wrong');
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
            {imgDecoded ?
                imgDecoded.map(imgDec => (
                    <img src={`data:image/png;base64,${atob(imgDec)}`} alt="space-fig"  />
                )) : null
            }
        </Fragment>
    );
};

export default FileUpload;