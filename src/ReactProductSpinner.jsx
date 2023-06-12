// ReactProductSpinner.jsx

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import preloadImages from "./preloadImages";

const ReactProductSpinner = ({
  images,
  infinite = true,
  speed = 3,
  mouseWheel = false,
  slider = false,
  sliderClass = "",
  animation = false,
}) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [speedController, setSpeedController] = useState(0);
  const [spinner, setSpinner] = useState({
    current: 0,
    size: 0,
    currentPath: null,
  });
  const [mouse, setMouse] = useState({
    isMoving: false,
    isDragging: false,
  });
  const [touch, setTouch] = useState({
    isMoving: false,
    initialX: 0,
    isDragging: false,
  });
  const [animationRequestID, setAnimationRequestID] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);

  useEffect(() => {
    handlePreload();
    initSpinner();
  }, [images]);

  const initSpinner = () => {
    setSpinner((prevState) => ({
      ...prevState,
      size: images.length,
    }));

    if (animation) {
      spinImages(0, images.length);
    } else {
      setSpinner((prevState) => ({
        ...prevState,
        currentPath: images[0],
      }));
    }
  };

  const handlePreload = () => {
    preloadImages(images).then(() => setImagesPreloaded(true));
  };

  const handleKeydown = (event) => {
    if (event.keyCode === 39) {
      event.preventDefault();
      handleMovement(lastPosition + 1);
    }
    if (event.keyCode === 37) {
      event.preventDefault();
      handleMovement(lastPosition - 1);
    }
  };

  const handleWheel = (event) => {
    if (mouseWheel) {
      event.preventDefault();
      handleMovement(event.deltaY);
    }
  };

  const handleSlider = (event) => {
    setSpinner((prevState) => ({
      ...prevState,
      current: Number(event.target.value),
      currentPath: images[event.target.value - 1],
    }));
  };

  const handleMouseDown = () => {
    if (animation) {
      stopAnimation();
    }
    setMouse((prevState) => ({
      ...prevState,
      isDragging: true,
      isMoving: true,
    }));
  };

  const handleMouseUp = () => {
    setMouse((prevState) => ({
      ...prevState,
      isMoving: false,
    }));
  };

  const handleMouseMove = (event) => {
    if (mouse.isMoving && mouse.isDragging) {
      handleMovement(event.pageX);
    }
  };

  const handleMouseDragging = () => {
    setMouse((prevState) => ({
      ...prevState,
      isDragging: false,
    }));
  };

  const handleTouchDragging = () => {
    setTouch((prevState) => ({
      ...prevState,
      isDragging: false,
    }));
  };

  const handleTouchStart = (event) => {
    event.preventDefault();
    if (animation) {
      stopAnimation();
    }
    setTouch((prevState) => ({
      ...prevState,
      isMoving: true,
      isDragging: true,
      initialX: event.touches[0].pageX,
    }));
  };

  const handleTouchEnd = () => {
    setTouch((prevState) => ({
      ...prevState,
      isMoving: false,
    }));
  };

  const handleTouchMove = (event) => {
    if (touch.isDragging) {
      const delta = -(touch.initialX - event.touches[0].pageX);
      handleMovement(delta);
    }
  };

  const spinImages = (index, lastIndex) => {
    if (index !== lastIndex) {
      setSpinner((prevState) => ({
        ...prevState,
        currentPath: images[index],
      }));
      setAnimationRequestID(
        window.requestAnimationFrame(() => spinImages(index + 1, lastIndex))
      );
    } else {
      stopAnimation();
      setSpinner((prevState) => ({
        ...prevState,
        currentPath: images[0],
      }));
      return;
    }
  };

  const stopAnimation = () => {
    if (animationRequestID) {
      window.cancelAnimationFrame(animationRequestID);
      setAnimationRequestID(null);
    }
  };

  const handleMovement = (delta) => {
    setSpeedController((prevSpeedController) => prevSpeedController + 1);
    if (speedController < speed) {
      return;
    }
    if (speedController > speed) {
      setSpeedController(0);
    }
    if (delta > lastPosition) {
      if (spinner.current >= 0 && spinner.current < spinner.size) {
        setSpinner((prevState) => ({
          ...prevState,
          current: prevState.current + 1,
          currentPath: images[prevState.current],
        }));
      } else if (infinite) {
        setSpinner((prevState) => ({
          ...prevState,
          current: 1,
          currentPath: images[0],
        }));
      }
    } else if (delta < lastPosition) {
      if (spinner.current >= 0 && spinner.current - 1 > 0) {
        setSpinner((prevState) => ({
          ...prevState,
          current: prevState.current - 1,
          currentPath: images[prevState.current - 2],
        }));
      } else if (infinite) {
        setSpinner((prevState) => ({
          ...prevState,
          current: spinner.size,
          currentPath: images[spinner.size - 1],
        }));
      }
    }
    setLastPosition(delta);
  };

  return (
    <picture className="react-product-spinner">
      {imagesPreloaded ? (
        <React.Fragment>
          <img
            tabIndex="1"
            draggable="false"
            src={spinner.currentPath}
            onKeyDown={handleKeydown}
            onMouseUp={handleMouseUp}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
          {slider && (
            <input
              type="range"
              tabIndex="1"
              min="1"
              max={spinner.size}
              value={spinner.current}
              className={`react-product-spinner-slider ${sliderClass}`}
              onInput={handleSlider}
            />
          )}
        </React.Fragment>
      ) : (
        <div>
          <p>Loading images...</p>
        </div>
      )}
    </picture>
  );
};

ReactProductSpinner.propTypes = {
  images: PropTypes.array.isRequired,
  infinite: PropTypes.bool,
  speed: PropTypes.number,
  mouseWheel: PropTypes.bool,
  slider: PropTypes.bool,
  sliderClass: PropTypes.string,
  animation: PropTypes.bool,
};

export default ReactProductSpinner;
