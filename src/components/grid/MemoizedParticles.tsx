import { IOptions } from "@tsparticles/engine";
import Particles from "@tsparticles/react";
import React, { useMemo } from "react";
import { isEqual } from "lodash";

export interface ParticlesComponentProps {
  backgroundEffectsOptions?: string;
  backgroundColor: string;
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({
  backgroundEffectsOptions,
}) => {
  const backgroundEffectsOptionsMemoed = useMemo(() => {
    if (typeof backgroundEffectsOptions === "string") {
      return JSON.parse(backgroundEffectsOptions);
    } else if (typeof backgroundEffectsOptions === "object") {
      return backgroundEffectsOptions;
    }

    return null;
  }, [backgroundEffectsOptions]);

  return (
    <Particles
      id="tsparticles"
      options={backgroundEffectsOptionsMemoed as IOptions}
    />
  );
};

// prevents re-rendering when changing other settings in state, which is very common
const areEqual = (
  prevProps: ParticlesComponentProps,
  nextProps: ParticlesComponentProps
) => {
  return (
    prevProps.backgroundColor === nextProps.backgroundColor &&
    isEqual(
      nextProps.backgroundEffectsOptions,
      prevProps.backgroundEffectsOptions
    )
  );
};

export const MemoizedParticles = React.memo(ParticlesComponent, areEqual);
