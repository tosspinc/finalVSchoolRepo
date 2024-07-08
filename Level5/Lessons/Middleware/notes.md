# middleware
    # what is it?
        * always use app.use().
        * app.use takes two arguments: 
            * 1st argument is the mount pass and is optional. (mount path - end point.)
            * 2nd argument is a callback function - receives the request, response objects, also "next" function.
        
    # the "Next" function
        *   moves on to the next middleware in line.