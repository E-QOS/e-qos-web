import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Technical from '../../sections/teamDetail/technical';

const TechniquePage: React.FC = () => {
  usePageMeta({
    title: 'Équipe Technique — EQOS Africa',
    description: 'L\'équipe technique EQOS : développeurs backend, frontend et DevOps qui conçoivent des solutions digitales robustes pour l\'Afrique de l\'Ouest.',
  });
  return <Technical />;
};

export default TechniquePage;
