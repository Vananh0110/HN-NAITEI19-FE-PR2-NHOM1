import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';

import './List.css';

const MovieDetail = ({ movieId, movieStatus }) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://localhost:8000/movies/${movieId}`);
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const handlePlayClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const categoriesString = movie && movie.categories.join(', ');

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="item">
          <div
            className="view"
            onMouseEnter={() => setShowPlayButton(true)}
            onMouseLeave={() => setShowPlayButton(false)}
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="movie__image"
            />
            <span className="iconFilm">
              <img src={movie.iconFilm} alt="" />
            </span>
            {movie.linkPreview && showPlayButton && (
              <div className="overlay">
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlayCircleOutlined />}
                  size="large"
                  onClick={handlePlayClick}
                  className="play-button"
                />
              </div>
            )}
          </div>
          <div className="content">
            <a href="#" className="movie__title">
              {movie.name}
            </a>
            <div className="movies__categories">
              <strong>Thể loại: </strong>
              {categoriesString}
            </div>
            <div className="movie__duration">
              <strong>Thời lượng: </strong>
              {movie.duration} phút
            </div>
            <div className="movie__openDate">
              <strong>Ngày khởi chiếu: </strong>
              {movie.openDate}
            </div>
          </div>
        </div>
      )}

      <Modal
        title={movie && 
          <div className="preview__title">
            TRAILER - {movie.name}
          </div>
          }
        visible={modalVisible}
        onCancel={handleCloseModal}
        footer={null}
        centered
        destroyOnClose
        width = {700}
        height = {600}
        style={{ maxHeight: '80vh' }}
      >
        {movie && (
          <div className="flex items-center justify-center h-full pb-6">
            <iframe
              width="560"
              height="315"
              src={movie.linkPreview}
              title={movie.name}
              allowFullScreen
          ></iframe>
          </div>
          
        )}
      </Modal>
    </>
  );
};

export default MovieDetail;
