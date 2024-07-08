# Vocabulary
    #   Route
        * an event listener for an http request.
    #   Endpoint
        *  "/Item"  "/User"  : end points.
    #   Port       
        #  stay above 3000 and below 9000.
    #   Intro to REST API architecture
        *
    #   REST
        * representational state transfer
    #   Resource
        * represents a single item (object) in the database.
    #   Collection
        * a collection of similar items in a database.
            *users: sends back a collection of user data.
    #   Base (root) URL 
        * https://amazon.com
    #   API Endpoint - https://amazon.com/movies
        * make an endpoint for GET(ting) movies.
        * posting a new movie
        * put (updating) a new movie.
        * delete a movie from list.
    #   Parameters
        * /movies/:movieId
    #   Query (Query String)
        * /movies/?genre=action&year=1999
        * this would send back movies in the action genre and released in the year 1999.
    #   Client
        *  Intermediary.
    #   Request Method.
        * CRUD - Get, Post, Put, Delete

# Middleware
    *   A function that fires on the in-between.

#  Request Body (req.body)
    
# UUID 
    *   creates a unique id for each database item.

# URL Parameters
    # Parts of a url
        *   Base - https://amazon.com
        *   Endpoint - https://amazon.com/images
        *   Parameter - https://amazon.com/imgages/8573945333

    # Parameters (req.params) - GET one

# URL Queries
    # Query String - (typically used to filter results)
        *   Begins with a "?".
        *   Built of key=value pairs.
        *   Multiple Queries seperated by the "&".
