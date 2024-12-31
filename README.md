# Cloud Engineer API Project

# Table of contents
1. [Introduction](#introduction)
2. [The problem](#theProblem)
3. [How to use](#howToUse)
4. [What I learned](#whatILearned)
5. [What I ran out of time for](#whatIRanOutOfTimeFor)




## Introduction <a name="introduction"></a>
Hi, my name is `Freddy Shaikh`,  
Thank you for taking the time to review me as an applicant!  
If you have any further questions, feel free to contact me at shaikhfh1@gmail.com


## The problem <a name="theProblem"></a>
See the attached Cloud Engineer Technical.docx file for a detailed explanation, but in brief:
The task is to create an API that processes historical currency exchange rates. It involves parsing a provided CSV data file and building an API that converts amounts in CAD (Canadian Dollars) to other currencies based on historical exchange rates for a given date. 

The 4 requirements are:
- Parse the CSV File (csvParser.js)
- API Endpoint (APIEndpoint.js)
- Response (responseHandler.js)
- Error Handling (responseHandler.js)


## How to use
To test functionality, simply run the "npm install" and "npm start" to download the dependencies. Then open up APIEndpoint.js file from your IDE of choice (I used VSCode), and run in with the terminal using "node .\APIEndpoint.js" in powershell. You can access the API, from: http://localhost:3000/  

I selected a `GET` header since no information is being created or destroyed. I used the Postman application to make it easier to try get requests. Simply copy any of the JSON tests from the testCases.json and paste them into postman on the body section. Make sure the http request is set to `GET` and the link is  http://localhost:3000/


## What I learned <a name="whatILearned"></a>
While I have used Javascript before for some smaller projects and even a proof of concept, I have never used it to make and run a server which has been an interesting experience. I also rarely ever used Javascript for anything logical since my go to is Python. Python, Golang, and Java are my main 3 languages so you may notice mannerisms from those 3. It has been a huge Javascript learning experience



## What I ran out of time for <a name="whatIRanOutOfTimeFor"></a>
Unfortunately I ran out of time before I was able to implement:
- Unit tests for every function, integration tests, and end-to-end tests
- Automated HTTP tests to iterate through the testCases.json file
- Better documentation
- Polishing the code
