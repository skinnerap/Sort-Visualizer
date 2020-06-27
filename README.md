# Sort-Visualizer
Author: Alexander P Skinner
Publishing Date: June 27, 2020
Description: This project shows popular sorting algorithms visually in an HTML page.

Basics:
  - This project is written in HTML, CSS, and Javascript
  - The javascript generates a bunch of divs that are inserted into a container
  - All of these divs have a css property 'maxWidth' that defines the length randomly,
    which we use to apply the sorting algorithms.
  - The sorting algorithms are synchronous functions in nature, but to visualize them
    we change them to asynchronous functions using async/await javascript functionality.
  - The asynchronous functions utilize a sleep function that defines that speed at which
    the sorting algorithms will be visualized.
