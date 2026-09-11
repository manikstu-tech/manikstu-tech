'use client';
import { useEffect } from 'react';
import { reticle, install } from '@reticlehq/react';

export function ReticleDev() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      install();
      reticle.connect({ token: process.env.NEXT_PUBLIC_RETICLE_TOKEN });
    }
  }, []);
  return null;
}
