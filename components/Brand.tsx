import Image from 'next/image';
import React from 'react';
import logo from '../public/logo.svg';

type Props = {};

export const Brand: React.ForwardRefExoticComponent<Props> = React.forwardRef(
  () => (
    <Image
      src={logo}
      height="60vw"
      objectFit="contain"
      objectPosition="center"
      alt="logo"
    />
  )
);

Brand.displayName = 'Brand';
