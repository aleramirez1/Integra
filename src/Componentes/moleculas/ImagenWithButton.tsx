import React from 'react';
import Image from '../atomos/Image';
import Button from '../atomos/Button';

type ImageWithButtonProps = {
  imageSrc: string;
  imageAlt: string;
  buttonText: string;
  onButtonClick: () => void;
};

const ImageWithButton: React.FC<ImageWithButtonProps> = ({ imageSrc, imageAlt, buttonText, onButtonClick }) => (
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex flex-col items-center">
      <Image src={imageSrc} alt={imageAlt} />
      <Button onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  </div>
);

export default ImageWithButton;
