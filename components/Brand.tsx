import Image from 'next/image';
import logo from 'public/logo.svg';
import React from 'react';

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
