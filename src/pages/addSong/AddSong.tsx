import React, { useState, useRef } from 'react';
import Header from '../../components/header/Header';
import './index.css';
import { PlusCircleDotted, MusicNote } from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';

function AddSong() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleAudioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedAudio(event.target.files[0]);
    }
  };

  const handleImageIconClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleAudioIconClick = () => {
    if (audioInputRef.current) {
      audioInputRef.current.click();
    }
  };

  return (
    <>
      <Header />
      <div className='container'>
        <div className='add-image'>
          {selectedImage && (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt='Imagem selecionada'
              className='uploaded'
            />
          )}
          <span onClick={handleImageIconClick}>
            <PlusCircleDotted size={40} className='upload-icon' />
          </span>
          <input
            ref={imageInputRef}
            type='file'
            onChange={handleImageChange}
            accept='image/*'
            style={{ display: 'none' }}
          />
        </div>

        <div className='input-container'>
          <Form>
            <Form.Group className="mb-5" controlId="formBasicArtist">
              <Form.Label>Artist</Form.Label>
              <Form.Control type="text" placeholder="Artist's name" />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Song's title" />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicAlbum">
              <Form.Label>Album</Form.Label>
              <Form.Control type="text" placeholder="Album's name" />
            </Form.Group>
          </Form>
        </div>

        <div className='add-song'>
          {selectedAudio && (
            <audio controls>
              <source src={URL.createObjectURL(selectedAudio)} type="audio/mpeg" />
            </audio>
          )}
          <span onClick={handleAudioIconClick}>
            <MusicNote size={30} className='upload-icon' />
          </span>
          <input
            ref={audioInputRef}
            type='file'
            onChange={handleAudioChange}
            accept='audio/*'
            style={{ display: 'none' }}
          />
        </div>

        <div className='bottom-right-button'>
          <Button variant="secondary">Save</Button>
        </div>
        
      </div>
    </>
  );
}

export default AddSong;
