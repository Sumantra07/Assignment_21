//Please read Readme.txt 
 
const http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myproject';

const hostname = '127.0.0.1';
const port = 3000;
const server = http.createServer(function (req, res) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(" Hi, I am Running on port " + port);
});

server.listen(port, hostname, function () {
  console.log("Magic happens at port 3000");
});

MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {

  console.log("Connected successfully to server");

  const db = client.db(dbName);

  console.log("database created!");


  const collects = db.collection('Employeecollection').insertMany(
    [{ Ename: "John Doe", Department: "clerical_staff", Designation: "clerk", Salary: 3000, dateofjoining: "10-11-1998", city: "New York" },
    { Ename: "Raj Kuthrapalli", Department: "Development_staff", Designation: "Developer", Salary: 50000, dateofjoining: "10-11-2008", city: "California" },
    { Ename: "Sameer Dighe", Department: "Ops_staff", Designation: "Operations Manager", Salary: 45000, dateofjoining: "10-11-2009", city: "Bangalore" },
    { Ename: "Amit Trivedi", Department: "logistic_staff", Designation: "Logistic personnel", Salary: 3500, dateofjoining: "10-11-2018", city: "Delhi" },
    { Ename: "Drupad Ray", Department: "Management", Designation: "General Manager", Salary: 50000, dateofjoining: "10-11-2006", city: "New York" },
    { Ename: "Yuni Chang", Department: "Development_staff", Designation: "Developer", Salary: 8000, dateofjoining: "10-11-2014", city: "Singapore" },
    { Ename: "Jack Ma", Department: "ops_staff", Designation: "Operational head", Salary: 46000, dateofjoining: "10-11-2007", city: "Singapore" },
    { Ename: "Ramesh powar", Department: "clerical_staff", Designation: "clerk", Salary: 3300, dateofjoining: "10-11-2015", city: "Bangalore" },
    { Ename: "Sheldon Cooper", Department: "Development_staff", Designation: "Developer", Salary: 45000, dateofjoining: "10-11-2018", city: "California" },
    { Ename: "Satya P", Department: "logistic_staff", Designation: "logistic Manager", Salary: 48000, dateofjoining: "10-11-2005", city: "Bangalore" }]
  );
  console.log("created collection...");
  // find and display only designation

  db.collection("Employeecollection").find({}, { Designation: 1, Ename: 0, Department: 0, Salary: 0, dateofjoining: 0, city: 0 }).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //find and Display the records of employee whose salary is greater than 7000    
  db.collection("Employeecollection").find({ Salary: { $gt: 7000 } }).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //Sort and Display the records of an employee based on the date of joining
  db.collection("Employeecollection").aggregate([{ $sort: { dateofjoining: 1 } }]).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //Sort and Display the records of an employee based on the salary in ascending order
  db.collection("Employeecollection").aggregate([{ $sort: { Salary: 1 } }]).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //find and Display the records of an employee whose salary in between 5000 to 40000
  db.collection("Employeecollection").find({ Salary: { $gt: 5000, $lt: 40000 } }).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //find and display all the records of an employee except whose designation is developer.
  db.collection("Employeecollection").find({ Designation: { $ne: "Developer" } }).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //Sort and display the records of an employee's city in descending order
  db.collection("Employeecollection").aggregate([{ $sort: { city: -1 } }]).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //find and display the records of an employee's whose city starts with Singapore and salary is greater than 8000
  db.collection("Employeecollection").find({ $and: [{ Salary: { $gt: 8000 } }, { city: "Singapore" }] }).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  /* As per Assignment 2 */
  // Adding 5 new entries
  db.collection('Employeecollection').insertMany(
    [{ Ename: "Stan Lee", Department: "Management", Designation: "Managing Director", Salary: 50000, dateofjoining: "10-11-1996", city: "New York" },
    { Ename: "Sloke Bhattacharyya", Department: "Development_staff", Designation: "Developer", Salary: 30000, dateofjoining: "10-11-2001", city: "California" },
    { Ename: "Sanjh Bose", Department: "Ops_staff", Designation: "Operations Manager", Salary: 42000, dateofjoining: "10-11-2002", city: "Bangalore" },
    { Ename: "Sandharbh Singh", Department: "logistic_staff", Designation: "Logistic personnel", Salary: 3500, dateofjoining: "10-11-2017", city: "Delhi" },
    { Ename: "Priya Mahapatra", Department: "Development_staff", Designation: "Developer", Salary: 10000, dateofjoining: "10-11-2018", city: "Delhi" },
    ]);
  // Print all the records
  db.collection("Employeecollection").find({}).toArray(function (err, result) {
    if (err)
      throw err;
    console.log(result);
  });
  //Drop the employee records and display
  db.collection("Employeecollection").deleteMany({ Designation: "Developer" }, function (err, obj) {
    if (err) throw err;
    
    console.log(obj.result.n + " document(s) deleted");

  });
  // finally dropping collection
  db.dropCollection("Employeecollection", function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");

  });
});


