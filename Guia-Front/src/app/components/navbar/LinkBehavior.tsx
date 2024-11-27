/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import Link from 'next/link';

// Definimos una interfaz para las propiedades que puede recibir el componente
interface LinkBehaviorProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
}

// Creamos un componente funcional que utiliza forwardRef
const LinkBehavior = forwardRef<HTMLAnchorElement, LinkBehaviorProps>(
  ({ href, ...rest }, ref) => {
    return (
      <Link href={href} passHref>
        <a ref={ref} {...rest} />
      </Link>
    );
  }

);

export default LinkBehavior;