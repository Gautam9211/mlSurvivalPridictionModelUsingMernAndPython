import sys
def check(argv):
    import joblib
    import numpy as np
    loaded_model = joblib.load("./src/model_joblib")
    # array = [5,3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0] 
    print(f"this is argv ::{argv}")
    array = [argv[1],argv[2],argv[3],argv[4],argv[5],argv[6],argv[7],argv[8],argv[9],argv[10],argv[11]]
    #each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
    z = np.asarray(array).reshape(1,-1)
    predicted_value= loaded_model.predict(z)
    print(predicted_value)
if __name__ == "__main__":
    check(sys.argv)




