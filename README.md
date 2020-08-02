# Spacing Out

## Inspiration

During this pandemic, space (specifically between people) is more important than ever! We wanted to combine our love for space with a concept that would help people socially distance during these uncertain times.

## What it does

The website tracks the user's location and displays it on a map as their character (an astronaut). The game itself is activated if they are inside of a store, which is displayed as a spaceship on the map. From there, they choose if they are on the red team (Mars) or the blue team (Neptune). They then can earn points through two different features. First, they can get "stardust", where the amount decreases as time goes on, by making their trip to the store short and sweet. Second, they can earn points by indicating that they are wearing a mask (their spacesuit) inside of the store. 

If they're at home, they're on "Earth", meaning that they can access the website and look at information, but can't play the game itself.

We hope that this game is a fun way to encourage people to social distance and wear masks while grocery shopping and running essential errands!

## How we built it

We built the website itself using HTML, Javascript, and CSS. We then used the Google Maps API for the map, and Google Firebase to store the team data in a database. The website is hosted using Github pages, with our domain (spacingout.space) obtained from Domain.com.

## Challenges we ran into

At first, we had issues with sensing if the user was in the store. Initially, we tried to use Radar.io in order to use geofencing, but unfortunately we had difficulties using the SDK. As a result, we had to calculate this distance between the user and the store and see if it was under a certain margin of error using the Google Maps API.

We also tried to use Firebase hosting for our website, but we found that our website would be up in a shorter time with our custom domain using Github pages.

## Accomplishments that we're proud of

Before this hackathon, we had never used the Google Maps API and most of us had very limited experience with databases in general. Also, none of us had ever used a custom domain name before. The very fact that we were able to create a mostly functional website with all of these components was a big accomplishment for us!  

## What we learned

We learned not only how to use all of the different APIs included in our project, but also how to put all of these components together to create a fun and space-themed solution to a real-world problem.

## What's next for Spacing Out!

We wanted to create not only a team score, but a safety level for each location/spaceship. This safety level would take into account the ratio of the number of people in the store compared to the capacity, as well as the percentage of mask-wearing people in the store.

We would also like to create a functionality for user logins, so that people can keep their points.

## Made by

> Connor Erickson
>
> Dhruv Sharma
>
> Emily Amspoker
>
> Jacob Fanale
> 
> Lily Zook
