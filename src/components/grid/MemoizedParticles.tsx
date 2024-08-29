import { IOptions } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import React, { useMemo } from "react";

export interface ParticlesComponentProps {
  backgroundEffectsOptions?: string;
  backgroundColor: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({
  backgroundEffectsOptions,
}) => {
  const backgroundEffectsOptionsMemoed = useMemo(() => {
    return backgroundEffectsOptions
      ? JSON.parse(backgroundEffectsOptions)
      : null;
  }, [backgroundEffectsOptions]);

  return (
    <Particles
      id="tsparticles"
      options={backgroundEffectsOptionsMemoed as IOptions}
    />
  );
};

const areEqual = (
  prevProps: ParticlesComponentProps,
  nextProps: ParticlesComponentProps
) => {
  return prevProps.backgroundColor === nextProps.backgroundColor;
};

export const MemoizedParticles = React.memo(ParticlesComponent, areEqual);
