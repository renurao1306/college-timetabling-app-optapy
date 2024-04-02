import json
# import jsonpickle

# from domain import TimeTable, Course, generate_problem

def readInputData(inputFilename: str):
    print("Reading data from file", inputFilename)
    inFile = open(inputFilename)

    data = json.load(inFile)

    inFile.close()

    return(data)

# def writeInputData():

#     outFile = open("inputDataGenerated.json", "w")

#     timeTable = generate_problem()

#     pickledJson = jsonpickle.encode(timeTable, unpicklable=False)

#     print(pickledJson)

#     json.dump(pickledJson, outFile)
    
#     outFile.close()

# readInputData("inputDataGenerated.json")
# writeInputData()