// Exported function accepts two parameters.  The first it referes to as 'object'
// the second is an array, 'props', which contains all other parameters passed to
// the function
module.exports = function(object, ...props) {
    // 'errors' is an array to hold statements about any of the 'props' properties 
    // of 'object' that do not satisfy the specified conditions
    const errors = [];
  
    // itterates through the array of given properties  ('props') and tests
    // them against the specified conditions
    props.forEach(singleProperty => {

      if (object[singleProperty] === undefined || object[singleProperty] === '') {
        errors.push(`No ${singleProperty} specified.`);
      }
    });
  
    // Checks if any variables were pushed to the errors array and returns those
    // varriables as a single error statement
    if (errors.length) {
      return { error: errors.join(' ')
      };
    }
  
    // Returns null if no errors were found
    return null;
  };