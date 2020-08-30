import React, { Fragment, useState } from 'react';
import { omit } from 'lodash';
import axios from 'axios';

const FileUpload = () => {
    const [uploadState, setUploadState] = useState({
        theta: '',
        phai: '',
        file: '',
        fileName: 'Choose file'
    });

    const {theta, phai, file, fileName} = uploadState;

    const changeHandler = e => {
        if (e.target.name === 'file') {
            setUploadState({...uploadState, file: e.target.files[0], fileName: e.target.files[0].name});
        } else {
            setUploadState({...uploadState, [e.target.name]: e.target.value});
        }
        
    };

    const submitHandler = async e => {
        e.preventDefault();
        console.log(uploadState, omit(uploadState, ['file']));
        const formData = new FormData();
        formData.append('file', file);
        formData.append('body', {...uploadState});
        try {
            const res = axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <select className="form-control" name='theta' value={theta} onChange={changeHandler}>
                        <option value=''>--Pick Theta--</option>
                        <option value='11'>11</option>
                        <option value='22'>22</option>
                        <option value='33'>33</option>
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control" name='phai' value={phai} onChange={changeHandler}>
                        <option value=''>--Pick Phai--</option>
                        <option value='11'>11</option>
                        <option value='22'>22</option>
                        <option value='33'>33</option>
                    </select>
                </div>
                <div className="custom-file">
                    <input
                        type="file"
                        name='file'
                        className="custom-file-input"
                        id="customFile"
                        onChange={changeHandler}
                    />
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                </div>
                <button type='submit'className='btn btn-primary mt-4'>Upload</button>
            </form>
        </Fragment>
    );
};

export default FileUpload;