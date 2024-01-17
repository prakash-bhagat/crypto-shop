// Custom middleware to check for a specific header
const routesProtection = (req, res, next) => {
  // Check for the presence of a custom header
  if (req.get('X-Not-A-Browser') === 'true') {
    // If the header is present, proceed to the route
    next();
  } else {
    // If the header is not present, respond with a forbidden status
    res.status(403).send('Forbidden');
  }
};


module.exports = {routesProtection}