import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

function UploadForm() {

      const [uploadFile] = useMutation(UPLOAD_FILE_MUTATION, {
        onCompleted: data => console.log(data),
        variables: {
            
        }
    });

    const onDrop = useCallback(
        ([file]) => {
            uploadFile({ variables: { file } });
        },
        [uploadFile]
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

 
         

    
    return(
        <div {...getRootProps()}>
        <input {...getInputProps()}/>
        {isDragActive ? (
            <p>Drop the files here!</p>
        ) : (
            <p>Drag and drop files here, or click to select files</p>
        )}
        <p></p>
    </div>
    )
}

const UPLOAD_FILE_MUTATION = gql`
    mutation uploadProfilePic($file: Upload!){
        uploadProfilePic(file: $file){
            url
        }
    }
`

export default UploadForm;