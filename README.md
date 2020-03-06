![GA logo](https://camo.githubusercontent.com/6ce15b81c1f06d716d753a61f5db22375fa684da/68747470733a2f2f67612d646173682e73332e616d617a6f6e6177732e636f6d2f70726f64756374696f6e2f6173736574732f6c6f676f2d39663838616536633963333837313639306533333238306663663535376633332e706e67)

# Project 1 
## Jacob Kleiman & Jesus Quezada
### SEI 08

<hr>

Title: Jamr<br>
Type: Project<br>
Team: Jacob Kleiman & Jesus Quezada <br>
Back-end Frameworks: Express / Node JS <br>
Front-end Frameworks: Bootstrap / Semantic UI<br>
Requirements: Full CRUD on at least one database model <br>
Goal: Allow local musicians to connect instantly in their geographical location. <br>
Goals reached: Dynamic map display, filters and group chat <br>
<hr>

# Jamr
![homepage](jamrHomepage.jpg)

## Planning
Over the intial days of the project, We drafted ERD Diagrams, and conceptualized the entire back-end of our database. We aimed to acheieve full crud on the profiles as the MVP of our project.

<hr>

![ERD](documentation/ERD_Stretch.png)

<hr>

## The basic idea

When launching the app, the user will be prompted to CREATE (register) or READ (login) to their account. From there they can UPDATE or DESTROY their profile and make them unique and customizable. Users will be able to explore and INDEX (find) fellow musicians to collaborate with.

<hr>

![ERD](documentation/screenshots/lowfi.png)

![ERD](documentation/screenshots/lowfi2.png)


<hr>

## Google Maps and Filtering Markers

To tailor the map to the user's search preferences, we figured that the user should be able to filter the map based on Instruments, Genres, or Distance... we went ahead and built a function to filter out all falsey users of the filtering conditions.

<hr>

![ERD](documentation/screenshots/filter.png)

The way to calculate the distance between two geographical coordinates was challenging at first, but very rewarding in the final product.

![ERD](documentation/screenshots/distance.png)

<hr>

##  Realtime, bi-directional communication with Socket.io

In order to achieve our chat feature we leveraged the popular 
JavaScript Socket.io library. This allowed us to have seamless 
event-driven data on the server and cilent side. 

<hr>
Server Side

![serversocket](documentation/screenshots/socketsServer.jpg)

Client Side

![serversocket](documentation/screenshots/socketsClient.jpg)

<hr>

## The UI and Branding

The creative direction of the application ui stemmed from two separate ideas encapsulated in these mood boards.

<hr>

![MoodBoard1](documentation/screenshots/mood1.png)
![MoodBoard2](documentation/screenshots/mood2.png)

The final product was an integrated version of the two ideas. Minimal, triadic, and tool-like.

<hr>

## The Typefaces and Design Assets

The type logo was created with a modified musical take on the Helvetica typeface. Subheadings and paragraphs included Vice City Sans (which adds a depth of playfulness) as well as Raleway, which provided thin, minimal style to our app.

<hr>

![MoodBoard1](documentation/screenshots/types.png)

A concept logo was also created to brand the application as a tool for finding musicicans

![MoodBoard1](documentation/screenshots/logo2.png)

<hr>

## Mid/Hi-fi Wireframes

![MoodBoard1](documentation/screenshots/midwire.png)

## Interaction Design

![MoodBoard1](documentation/screenshots/animation.png)

https://codepen.io/kleimaj/pen/dyoRyPK

## Full Implementation

![MoodBoard1](documentation/screenshots/finalmap.png)
