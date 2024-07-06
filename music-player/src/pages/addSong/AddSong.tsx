import React, { useState, useRef } from 'react';
import Header from '../../components/header/Header';
import { useNavigate } from 'react-router-dom';
import './addSong.css';
import { PlusCircleDotted, MusicNote } from 'react-bootstrap-icons';
import { Button, Form } from 'react-bootstrap';
import { api, URI } from '../../enumerations/uri';

function AddSong() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedAudio, setSelectedAudio] = useState<File | null>(null);
  const [artista, setArtist] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [album, setAlbum] = useState<string>('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

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

  const handleSave = async () => {
    if (selectedImage && selectedAudio && artista && title && album) {
      const formData = new FormData();
      formData.append('artista', artista);
      formData.append('title', title);
      formData.append('album', album);
      formData.append('imgPath', selectedImage);
      formData.append('audioPath', selectedAudio);

      try {
        const response = await api.post(URI.ADD_SONG, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Música adicionada:', response.data);
        alert('Música adicionada com sucesso!');
        navigate('/');
      } catch (error) {
        console.error('Erro ao adicionar música:', error);
        alert('Erro ao adicionar música.');
      }
    } else {
      alert('Por favor, preencha todos os campos e selecione os arquivos.');
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
              <Form.Control
                type="text"
                placeholder="Artist's name"
                value={artista}
                onChange={(e) => setArtist(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Song's title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-5" controlId="formBasicAlbum">
              <Form.Label>Album</Form.Label>
              <Form.Control
                type="text"
                placeholder="Album's name"
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
              />
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
          <Button variant="secondary" onClick={handleSave}>Save</Button>
        </div>

      </div>
    </>
  );
}

export default AddSong;
