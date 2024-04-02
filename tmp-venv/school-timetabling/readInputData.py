import json
import jsonpickle

# from domain import TimeTable, Lesson, generate_problem

def readInputData():
    inFile = open("inputDataGenerated.json")

    data = json.loads(json.load(inFile))

    inFile.close()

    return(data)

def writeInputData():

    outFile = open("inputDataGenerated.json", "w")

    timeTable = generate_problem()

    pickledJson = jsonpickle.encode(timeTable, unpicklable=False)

    print(pickledJson)

    json.dump(pickledJson, outFile)
    
    outFile.close()

readInputData()
# writeInputData()