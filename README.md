
Restaurant management system

Group: 76
Name: 
Li Victor (13224696)

Application link: 

=================================================================================================================================
# Login & Register
Through the login interface, authenticated users can access the system with their username and password.

Each user has 1 username and 1 password;
e.g. {username:"Tester", password:"Tester"}

If user pass the authentication, the username used will be stored in seesion.

=================================================================================================================================
# Logout
In each page after login, users can logout their account by clicking logout button on the bottom-right hand corner of the page.

=================================================================================================================================
# CRUD service
- Create
-	A restaurant document may contain the following attributes with an example: 
	1)	Restaurant Name (Shake Shack)
	2)	Restaurant ID (00000003), restaurant id must be 8 digits
	3)	Borough (Sha Tin)
	4)	Street (null)
	5)	Restaurant Telephone (26516828), telephone number must be 8 digits
	6)	Cuisine (American)
	7)	Description (... Very nice hamburger)

Restaurant Name and Restaurant ID is mandatory, and other attributes are optional.

Create operation is post request, and all information is in body of request.

=================================================================================================================================
# CRUD service
- Read
-  There are two options to read and find restaurants list all information or searching by restaurant id.

1) List all information
	display.ejs will be displayed with all restaurant ID;
	clicking on restaurant ID, the details will be shown;

2) Searching by restaurant id
	input id of restaurant you want to find (00000003);
	id is in the body of post request, and in display.ejs restaurant id will be shown as link;
	clicking on restaurant ID, the details will be displayed;

=================================================================================================================================
# CRUD service
- Update
-	The user can update the restaurant information through the details interface.
-	Among the attribute shown above, Restaurant ID cannot be changed. Since restaurant ID is fixed, restaurant ID is searching criteria for updating information. 

-	A restaurant document may contain the following attributes with an example: 
	1)	Restaurant Name (Shake Shack)
	2)	Borough (Tung Chung)
	3)	Street (Tat Tung Road)
	4)	Restaurant Telephone (29871728), telephone number must be 8 digits
	5)	Cuisine (American)
	6)	Description (... Very nice hamburger)

	In example, we updated the borough, street and restaurant contact number.

=================================================================================================================================
# CRUD service
- Delete
-	The user can delete the restaurant information through the details interface.

=================================================================================================================================
# Restful
In this project, there are three HTTP request types, post, get and delete.
- Post 
	Post request is used for insert.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X POST -H "Content-Type: application/json" --data '{"name": "Taro & Tea", "restaurangID":"00000004"}'localhost:8099/api/item/restaurantID/00000004/name/Taro & Tea

- Get
	Get request is used for find.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X GET http://localhost:8099/api/item/restaurantID/00000002

- Delete
	Delete request is used for deletion.
	Path URL: /api/item/restaurantID/:restaurantID
	Test: curl -X DELETE localhost:8099/api/item/restaurantID/00000002

For all restful CRUD services, login should be done at first.


curl -X POST -H "Content-Type: application/json" --data '{"name": "Taro & Tea", "restaurangID":"00000004"}' http://localhost:8099/api/item/restaurantID/00000004

curl -X GET http://localhost:8099/api/item/restaurantID/00000002

curl -X DELETE http://localhost:8099/api/item/restaurantID/00000002
