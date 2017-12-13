Running Instructions:

1. Ensure that Node is installed on your machine (https://nodejs.org/en/download/) as well as MongoDB (https://docs.mongodb.com/manual/installation/)

2. cd into the backend, client, and dispatcher directories and run 'npm install' in each.

3. Run a mongodb instance on your machine using 'mongod' on the command line. Ensure that it is running on port 27017 (the default for Mongo). Some permissions issues can arise, see https://stackoverflow.com/questions/7948789/mongodb-mongod-complains-that-there-is-no-data-db-folder.

4. cd into the backend folder and run 'npm start'.

5. cd into the dispatcher folder and run 'npm start'. The dispatcher application should open in your browser on localhost:3000. Do the same for the client folder. This will run on localhost:3001.

6. All systems should now be communicating. All database interaction is local at this point.
