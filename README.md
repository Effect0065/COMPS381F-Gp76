
Customer Record Management System

Group: 76
Name: 
Li Victor (13224696)

Application link: 

=================================================================================================================================
# Login & Register
Through the login interface, authenticated users can access the system with their username and password.

Each user has 1 username and 1 password, both username and password are case sensitive;
e.g. {username:"Tester", password:"Tester"}, {username:"Test", password:"Test"}

If user pass the authentication, the username used will be stored in seesion.

User can create their account by the register page too.
The only requirement is users cant use a username that had been used by others.
There's no other restriction on username and password.

=================================================================================================================================
# Logout
After user pass the authentication, 
users can logout their account by clicking logout button on the bottom-left corner of the page.

=================================================================================================================================
# CRUD service
- Create
-	A Customer Record may contain the following attributes with an example: 
	1)	First Name		: (e.g.) Rebecca 					[Required]
	2)	Last Name		: (e.g.) Booth 						[Required]
	3)	Telephone number: (e.g.) 1-548-944-3232 			[Required]
	4)	Email			: (e.g.) sapien@icloud.couk 		[Required]
	5)	Details			: (e.g.) Just a Test 				[Optional]
	6}	RecordId		: (e.g.) 655b7dd14c741bf67b88978c	[Auto-Generated][Primary Key]

Create operation is post request, and all attributes is in body of request.

=================================================================================================================================
# CRUD service
- Read
-  There are two options to read and find Customer records:

1) By dashboard list
	dashboard.ejs will be displayed with 12 Customers record per page;
	users can go the other pages by page nav bar.
	clicking on the blue eye icon, the details of that record will be shown;

2) Searching by record keywords
	**Reminder:**
	Search bar can only search one type of keywords each time,
	so Search by full name won't return the correct result.
	(e.g.): { Rebecca Booth}
	**Correct Way to use Search bar**
	input First Name or Last Name you want to find 
	(e.g.): { Rebecca, Kelley}
	
	The input keywords is in the body of post request, 
	and in search.ejs Customer Record will be shown as the same way as dashboard.ejs does;
	clicking on the blue eye icon, the details of that record will be shown;

=================================================================================================================================
# CRUD service
- Update
-	The user can edit(update) the Customer Record through the Editor interface.
-	Among the attribute shown above, Record ID cannot be changed. 
	Since Record ID is auto generated and it's fixed, 
	Record ID is the primary key of each record. 

-	A restaurant document may contain the following attributes with an example: 
	1)	First Name		: (e.g.) Rebecca 					[Required]
	2)	Last Name		: (e.g.) Booth 						[Required]
	3)	Telephone number: (e.g.) 1-548-944-3232 			[Required]
	4)	Email			: (e.g.) sapien@icloud.couk 		[Required]
	5)	Details			: (e.g.) Just a Test 				[Optional]
	6}	RecordId		: (e.g.) 655b7dd14c741bf67b88978c	[Auto-Generated][Primary Key]

	For example, we updated the Telephone number to 1-548-944-3233. Then, the Record will be:
	
	1)	First Name		: (e.g.) Rebecca 					[Required]
	2)	Last Name		: (e.g.) Booth 						[Required]
	3)	Telephone number: (e.g.) 1-548-944-3233 			[Required]
	4)	Email			: (e.g.) sapien@icloud.couk 		[Required]
	5)	Details			: (e.g.) Just a Test 				[Optional]
	6}	RecordId		: (e.g.) 655b7dd14c741bf67b88978c	[Auto-Generated][Primary Key]

=================================================================================================================================
# CRUD service
- Delete
-	Users can delete the Customer record through the dashboard, 
	the red button on each record is the delete button.
	
	After clicking the button, a confirm page will shows up,
	shows all the details of that record.
	To Confirm Delete, Click on the red button.
	Otherwise, click on Close will bring you back to the dashboard.

=================================================================================================================================
# Restful
In this project, there are three HTTP request types, post, get and delete.
- Post 
	Post request is used for operate some commands. (e.g.) add/edit/delete records
	Path URL: /api/insert
	For curl (Mac / Linux)
	```
	curl --request POST --location "http://localhost:5000/api/insert" --header 'Content-Type: application/json' -data-raw '{"firstName": "Test","lastName": "er","details": "Tester","tel": "777","email": "tester123@gmail.com"}'
	```
	For Window PowerShell
	```
	$response = Invoke-WebRequest -Uri "http://localhost:5000/api/insert" `
		-Method Post `
		-ContentType "application/json" `
		-Body "{`n    `"firstName`": `"Test`",`n    `"lastName`": `"er`",`n    `"details`": `"Tester`",`n    `"tel`": `"777`",`n    `"email`": `"tester123@gmail.com`"`n}"
	```

- Get
	Get request is used for find specific record id.
	Path URL: /api/search/:id
	For curl (Mac / Linux)
	```
	curl --request GET  --location 'localhost:5000/api/search/655e44813ec1cba6be6f3dc7'
	```
	For Window PowerShell
	```
	$response = Invoke-WebRequest -Uri "http://localhost:5000/api/search/655e44813ec1cba6be6f3dc7"
	```
	
- Patch
	Patch  request is used for update customer record.
	Path URL: /api/update/:id
	For curl (Mac / Linux)
	```
	curl --location --request PATCH 'localhost:5000/api/update/655e44813ec1cba6be6f3dc7' --header 'Content-Type: application/json' --data-raw '{"firstName": "Test","lastName": "Tester","details": "Tester","tel": "999","email": "tester123@gmail.com"}'
	```
	For Window PowerShell
	```
	$response = Invoke-WebRequest -Uri "http://localhost:5000/api/update/655e44813ec1cba6be6f3dc7" `
    -Method Patch `
    -ContentType "application/json" `
    -Body "{`n    `"firstName`": `"Test`",`n    `"lastName`": `"er`",`n    `"details`": `"Tester`",`n    `"tel`": `"777`",`n    `"email`": `"tester123@gmail.com`"`n}"
	```

- Delete
	Delete request is used for deletion.
	Path URL: /api/delete/:id
	For curl (Mac / Linux)
	```
	curl --request DELETE --location 'localhost:5000/api/delete/655e43dba52b9529daebcccb'
	```
	For Window PowerShell
	```
	$response = Invoke-WebRequest -Uri "http://localhost:5000/api/delete/655e43dba52b9529daebcccb" -Method Delete
	```