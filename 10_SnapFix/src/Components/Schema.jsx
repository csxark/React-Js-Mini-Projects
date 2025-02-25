export const Schema = () => {
    return (
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HomeAndConstructionBusiness",
          "name": "SERVICE-LO",
          "image": "/logo.png",
          "description": "Professional home services including carpentry, electrical, plumbing, and painting services.",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Your City",
            "addressRegion": "Your Region",
            "addressCountry": "Your Country"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "789"
          },
          "priceRange": "$$"
        })}
      </script>
    );
  };

export default Schema;