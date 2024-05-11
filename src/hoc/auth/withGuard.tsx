import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@/contexts/auth';
import { PATHS } from '@/navigation/paths';

const withGuard = <T extends object,>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const GuardComponent = (props: T) => {
    const { user } = useAuth();

    if (user.token) {
      return <WrappedComponent {...props} />;
    }

    return <Navigate to={PATHS.AUTH} />;
  };

  GuardComponent.displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return GuardComponent;
};

export default withGuard;
