import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Management from '../../sections/teamDetail/management';

const DirectionGeneralePage: React.FC = () => {
  usePageMeta({
    title: 'Direction Générale — Équipe EQOS Africa',
    description: 'Découvrez l\'équipe de direction d\'EQOS Africa : vision stratégique, leadership et pilotage de la transformation digitale en Afrique de l\'Ouest.',
  });
  return <Management />;
};

export default DirectionGeneralePage;
