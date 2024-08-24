const notFound = (req, res, next) => {
    res.status(404);
    res.json({ message: 'Route not found' });
  };
  
  export default notFound;
  