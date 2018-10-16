# train-schedule
input train times and find out when they'll get to you (firebase, moment.js)


Issues: 
1. Data will be reset after a page reload and on a submit click because it's creating new variables. Any way to fix?

I need to use .push() instead of .set() somehow.

Then I can add a reset function using .set().

2. Lots of repeating code for the different columns. Any way to wrap these in functions?