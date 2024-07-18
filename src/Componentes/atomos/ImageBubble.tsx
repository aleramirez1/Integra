import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

type ImageBubbleProps = {
  imageSrc: string;
  imageAlt: string;
  text: string;
};

const bubbleAnimation = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const BubbleContainer = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
  width: 100%;
  max-width: 450px; 
`;

const BubbleImage = styled.img`
  display: block;
  width: 100%;
  border-radius: 10px;
`;

const TextBubble = styled.div`
  position: absolute;
  top: -50px; 
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 40px; 
  background-color: #fff;
  border: 2px solid #00c6ff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 93, 40, 0.538);
  width: 90%; 
  font-size: 14px;
  color: #333;
  z-index: 1;
  animation: ${bubbleAnimation} 0.5s ease-out;

  @media (max-width: 640px) {
    width: 100%; 
    max-width: 100%;
    font-size: 12px;
    padding: 15px 20px; 
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: -20px; 
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;

  &::before,
  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background-color: #00c6ff;
    border-radius: 50%;
    animation: ${bubbleAnimation} 0.5s ease-out;
  }
`;

const ImageBubble: React.FC<ImageBubbleProps> = ({ imageSrc, imageAlt, text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText(''); 
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <BubbleContainer>
      <BubbleImage src={imageSrc} alt={imageAlt} />
      <TextBubble>{displayedText}</TextBubble>
      <Dots />
    </BubbleContainer>
  );
};

export default ImageBubble;
