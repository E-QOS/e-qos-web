import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description?: string;
}

export function usePageMeta({ title, description }: PageMeta) {
  useEffect(() => {
    const fullTitle = title.includes('EQOS') ? title : `${title} | EQOS Africa`;
    document.title = fullTitle;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        (metaDesc as HTMLMetaElement).name = 'description';
        document.head.appendChild(metaDesc);
      }
      (metaDesc as HTMLMetaElement).content = description;

      // Open Graph
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) (ogTitle as HTMLMetaElement).content = fullTitle;
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) (ogDesc as HTMLMetaElement).content = description;
    }

    return () => {
      document.title = 'EQOS Africa — Partenaire digital en Afrique de l\'Ouest';
    };
  }, [title, description]);
}
