import React from 'react';

type ImageProps = {
  src: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-32 h-32 object-contain mb-4" />
);

export default Image;
