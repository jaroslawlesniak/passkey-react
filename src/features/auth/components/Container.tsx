import React, { PropsWithChildren } from 'react'

import { Styles } from '@/styles/types';

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='container' style={styles.container}>
      {children}
    </div>
  );
}

const styles: Styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272262',
  }
}

export default Container