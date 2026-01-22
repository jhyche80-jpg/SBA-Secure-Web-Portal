# Project Title

## Table of Contents
1. [Overview](#overview)  
   1. [Features](#features)   
2. [Problem](#problem)   
   1. [Questions and Answers](#questions-and-answers)  
   2. [Step by Step Plan](#step-by-step-plan)  
  
3. [Troubleshooting](#troubleshooting)  
   1. [Problems](#problems)  
   2. [Solutions](#solutions)  
 
4. [References](#references)  
   1. [Programs Used](#programs-used)  
   2. [Websites Used](#websites-used)  

---

## Overview
Your task is to build a secure Express application that allows users to register, log in (using both their email/password and a third-party provider like GitHub), and manage a private collection of personal “bookmarks” (or notes, tasks, etc.). This project will be the culmination of all the skills you’ve acquired in this module, from hashing passwords to implementing complex OAuth 2.0 flows.

A key principle for this project is Don’t Repeat Yourself (DRY). You are encouraged to reuse and adapt the code you’ve already written in previous labs and lessons. This is a common practice in software development and a critical skill to demonstrate.
### Features
- Finds a specific user
- finds all users 
- find the all of the users 
-  create users / register the user 
- see information for user log in 
-  Add book marks to the api and delete them 
- update the bokmark 
- get information form the bookmarks.
---

## Problem
- Using a service that will be a single point of entry for all users, maniging their private data

## Step by Step Plan
Plan before building.

1. Set up project folder  
2. Make the Models
3. Make the configuration  
4. in the code map the path of the for the user information 
5. make the controller for the user
6. Local authentication APi 
7. auth.js middleware 
8. making third party authentication api 
9. Crud on the book mark 
10. testing

---
## Troubleshooting

Use a simple troubleshooting mindset.

Ask yourself:  
- What should happen right now  
- What is actually happening  
- Test one assumption at a time  

### Problems
List specific problems you faced.

1.  Bookmark controller  find all method not working 
2.  Incorrect handling of not found for the book mark 


### Solutions
Explain how you solved each problem.

1.  turns out this was my mistake findall doesn't exist 
2.  I added the handling for the product 

---

## References

### Programs Used
Example:  
- VS Code  
- Node  
- mongoose
- bcrypt  
- Postman  

### Websites Used
 
- MDN  
- Stack Overflow  
- W3Schools  







