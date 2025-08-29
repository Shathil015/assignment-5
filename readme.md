1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Answer: getElementById("id"): Finds one element by id.

getElementsByClassName("class"): Finds many elements by class, gives HTMLCollection.

querySelector("css"): Finds first match using CSS selector. This method allows us to use any valid CSS selector to find an element. It can select by id, class, or any other CSS selector like attributes, pseudo-classes, etc.

querySelectorAll("css"): It selects all elements that match the CSS selector means finds all match using CSS selector, gives NodeList.

2. How do you create and insert a new element into the DOM?

   Answer: let div = document.createElement("div"); div.innerText = "Hello"; document.body.appendChild(div);