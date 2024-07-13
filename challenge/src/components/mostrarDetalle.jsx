

const toggleDetails = (userId) => {
  return () => {
    setShowDetails(showDetails === userId ? null : userId);
  };
}