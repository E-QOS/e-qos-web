import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Support from '../../sections/teamDetail/support';

const SupportEquipePage: React.FC = () => {
  usePageMeta({
    title: 'Équipe Support & Qualité — EQOS Africa',
    description: 'L\'équipe support client EQOS : assistance technique, formation et accompagnement pour garantir la réussite de vos projets digitaux.',
  });
  return <Support />;
};

export default SupportEquipePage;
