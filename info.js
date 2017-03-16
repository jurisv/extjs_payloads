/**     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         fields: ['id', 'name', 'email', "isAdmin],
 *
 *         proxy: {
 *             type: 'rest',
 *             url : '/users'
 *         }
 *     });
 */
var info = {

    REST_Methods: {
        create: 'POST',
        read: 'GET',
        update: 'PUT',
        destroy: 'DELETE'
    },

    methods: [
        //CREATE  action method
        //POST /users
        //Request payload
        {
            "id": "User-2", // internal ID generated on during client side create operation
            "firstName": "Juris",
            "lastName": "Vecvanags",
            "email": "juris@extjs.com"
        }
        ,

        //Server should respond with payload in this format upon successful execution
        //Response OK
        {
            "data": {
                "id": 2, // we performed insert in to the database and got the 'id' for the record. We have to reply back, so client and server are in sync
                "firstName": "Juris",
                "lastName": "Vecvanags",
                "email": "juris@extjs.com",
                "isAdmin": false // optionally we add field that should take place in the client side
            }
            ,
            "success": true // true|false based on actual execution
        }
        ,

        //Server should respond with payload in this format if any errors were encountered
        //Response with failure
        {
            "data": null, // no data returned, optional
            "success": false, // operation failed
            "message": {
                "code": 121, // optional error code
                "text": "Failed to insert in to database!" //error message (could be used in UI)
            }

            //Message can be of different types

            // //String
            // "message": "Operation failed"
            //
            // //Array
            // "message": [
            //     {
            //         "code": 500,
            //         "text": "Service unavailable"
            //     },
            //     {
            //         "code": 1,
            //         "text": "Maintenance until 5pm."
            //     }
            // ]
        }
        ,

        //UPDATE action method
        //PUT /users/2
        //Request payload
        {
            "id": 2,
            "isAdmin": true // Only changed fields will be sent
        }
        ,

        //Response OK
        {
            "success": true
        }
        ,

        //Response with failure
        {
            "success": false,
            "message": {
                "code": 122,
                "text": "Can't update the record!"
            }
        }
        ,

        //DELETE action method
        //DELETE /users/5
        //Request payload
        {
            "id": 5
        }
        ,

        //Response OK
        {
            "id": 5,
            "success": true
        }
        ,

        //Response with failure
        {
            "success": false,
            "message": {
                "code": 122,
                "text": "Record can't be removed. Admin privileges required!"
            }
        }
        ,

        //1. READ action method via store (client expects 1 or more records to be returned)
        //GET /users
        //Request payload
        {
            "_dc": 1489634781577, // cache busting
            "limit": 10, // used for paging. The number of records to load. If set, return only 10 records
            "start": 25, //used for paging. The start index (offset). If set return records starting from 25th record
            "page": 1, // used for paging. The page for this operation. Added for server side flexibility.

            //Additional parameters (optional)
            "sort": [ // Array. There can be more than 1 sorting entries if multi sort is enabled
                {
                    "property": "firstname", //property on which to perform sorting
                    "direction": "DESC" //ASC|DESC
                }
            ],

            "filter": [ // Array. There can be more than one filter
                {
                    "property": 'firstname',
                    "value": 'John'
                }
            ],
            "group": {"property": "age", "direction": "DESC"}

            //On top of that any properties specified within params will be exposed here.
        }
        ,
        //Response OK
        {
            "success": true,
            "data": [
                {
                    "id": 1,
                    "firstName": "Ketty",
                    "lastName": "Tester",
                    "email": "ketty_tester123@gmail.com",
                    "isAdmin": false
                },
                {
                    "id": 2,
                    "firstName": "Juris",
                    "lastName": "Vecvanags",
                    "email": "juris@extjs.com",
                    "isAdmin": true
                }
            ],
            total: 2 // total records in this table
        }
        ,

        //Response with failure
        {
            "success": false,
            "message": {
                "code": 1034,
                "text": "Server too busy. Try again later!"
            }
        },


        //2. READ directly from the Model (client expects record returned)
        // GET /users/1

        {
            "_dc": 1489634781577 // cache busting
        }
        ,
        //Response OK
        {
            "success": true,
            "data": [
                {
                    "id": 1,
                    "firstName": "Ketty",
                    "lastName": "Tester",
                    "email": "ketty_tester123@gmail.com",
                    "isAdmin": false
                }
            ]
        }
        ,

        //Response with failure
        {
            "success": false,
            "message": {
                "code": 222,
                "text": "User not found"
            }
        },

        // Response to load nested data structures
        {
            "success": true,
            "data": [{
                "id": 1,
                "name": "Peter",
                "orders": [{
                    "id": 10,
                    "total": 10.76,
                    "status": "invoiced"
                }, {
                    "id": 11,
                    "total": 13.45,
                    "status": "shipped"
                }]
            }]
        }

    ]

};
