import React, { useRef } from 'react'
import ml5 from 'ml5';

const StyleTrans = () => {
    const newImage = useRef(null);
    const srcImage = useRef(null);
    const file = useRef(null)
    return (
        <>
            <input ref={file} type="file" name="imageFile" onChange={(e) => {
                const reader = new FileReader()
                reader.onloadend = (e) => {
                    srcImage.current.src = e.target.result;
                }
                srcImage.current.onload = () => {
                    ml5.styleTransfer('models/wave')
                    .then(styleWave => styleWave.transfer(srcImage.current))
                    .then(result => {
                        newImage.current.src = result.src;
                    })
                }
                reader.readAsDataURL(file.current.files[0])
            }} />
            <img ref={srcImage} src="" alt="変換前の画像" />
            <img ref={newImage} src="" alt="変換後の画像" />
        </>
    )
}

export default StyleTrans