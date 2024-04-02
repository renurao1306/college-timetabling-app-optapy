# Here, we are demonstrating how the actual function ("define_constraints", here called "func2")
# that will be used by the constraint solver is ""curried" with another parameter

# We will be using this approach to pass the constraints input data from the JSON from main.py
# so that the "define_constraints" can access this data when OptaPy calls it

# In essence, we are wrapping an inner function with an other function that makes the
# "input1" parameter available to "func2" when it is called by OptaPy

def func1(input1):
    print("In func1", input1)
    
    def func2(input2):
        # Even though func2 will be called outside this function, the
        # parameters to func1 (outer function) are still available
        print("In func2", input1, input2)
        return input1 + input2
    
    return func2

print("Calling func1")

# func1 returns the inner function curried with the parameter 123
ret = func1(123)

print("Calling func2, ret value is", ret(345))