import React, { useState } from 'react'
import axios from 'axios'

const ImageUpload = (props) => {
  
  const [image, updateImage] = useState('')

  function handleUpload(event) {

    event.preventDefault()
    const token = localStorage.getItem('token')

    window.cloudinary.createUploadWidget(
      {
        cloudName: 'dzt94',
        uploadPreset: 'skiresortapp',
        cropping: true
      },
      (err, result) => {
        if (result.event !== 'success') {
          return
        }
        axios.put(`/api/users/${props.match.params._id}`, { url: result.info.secure_url }, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then((res) => updateImage(res.data))
      }
    ).open()
  }
  console.log(image)

  return <>
    <div className="container container-custom">
      <img src={image.url} />
      <button
        onClick={handleUpload}
      >Upload
      </button>
    </div>
  </>
}

export default ImageUpload