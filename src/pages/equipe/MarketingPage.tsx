import React from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import Marketing from '../../sections/teamDetail/marketing';

const MarketingPage: React.FC = () => {
  usePageMeta({
    title: 'Équipe Marketing & Business — EQOS Africa',
    description: 'L\'équipe marketing et business development d\'EQOS : croissance, partenariats stratégiques et développement commercial en Afrique de l\'Ouest.',
  });
  return <Marketing />;
};

export default MarketingPage;
