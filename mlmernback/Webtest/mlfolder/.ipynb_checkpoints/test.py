import pandas as pd 
import numpy as np    
# In[34]: 
def model(): 
    df = pd.read_csv("titanic.csv")  
    
    # In[35]:    
    df.isna().sum()  
    # In[36]:
    
    
    df['Age']= df['Age'].fillna(df['Age'].mean())
    
    
    # In[37]:
    
    
    df.dropna(subset=['Embarked'],inplace=True)
    df.isna().sum()
    
    
    # In[38]:
    
    
    print(df.describe())
    print(df.shape)
    
    
    # In[39]:
    
    
    print("The number of columns present is as follows",df.columns.value_counts().sum())
    print("The columns present in the actual dataset is as follows", df.columns.tolist())
#    cols = df.columns.tolist()
    
    
    # In[40]:
    
    
    print("Visualising the dtypes",df.dtypes)
    num_cols = df.select_dtypes([np.int64,np.float64]).columns.tolist()
    num_cols.remove('PassengerId')
    print(num_cols)
    
    
    # In[41]:
    
    
    #Generating Histograms for numeric columns
    # for col in num_cols:
    #     df.hist(column=col)
    
    
    # In[42]:
    
    
    #Studying the correlation of the columns using scatter plots
    # from pandas.plotting import scatter_matrix
    
    # scatter_matrix(df[num_cols],figsize=(50,50))
    
    
    # In[43]:
    
    
    obj_cols = df.select_dtypes([np.object]).columns.tolist()
    # obj_cols.remove('Name')
    # obj_cols.remove('Cabin')
    # obj_cols.remove('Ticket')
    # print(obj_cols)
    
    
    # In[44]:
    
    
    #Plotting categorical data against frequency
    # for col in obj_cols:
    #     df[col].value_counts().plot(kind='bar')
    
    
    # In[60]:
    
    
    y = pd.Series(df['Survived'])
    drop_list = ['Survived','Name','Ticket','Cabin']
    X = df.drop(drop_list,axis=1)
    
    
    # In[46]:
    
    
    import category_encoders as ce
    encoder=ce.OneHotEncoder(handle_unknown='return_nan',return_df=True,use_cat_names=True)
    X = encoder.fit_transform(X)
    X
    
    
    # In[47]:
    
    
    from sklearn.model_selection import train_test_split
    
    
    # In[48]:
    
    
    X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,stratify=y,random_state=42)
    
    
    # In[49]:
    
    
    from sklearn.ensemble import RandomForestClassifier
    from sklearn.metrics import accuracy_score, f1_score, roc_auc_score
    
    
    # In[50]:
    
    
    model = RandomForestClassifier()
    model.fit(X_train,y_train)
    
    train_preds = model.predict(X_train)
    print("Training scores are as follows")
    print("Accuracy Score",accuracy_score(train_preds,y_train))
    print("F1 Score",f1_score(train_preds,y_train))
    print("ROC AUC Score",roc_auc_score(train_preds,y_train))
    
    
    test_preds = model.predict(X_test)
    print("Testing scores are as follows")
    print("Accuracy Score",accuracy_score(test_preds,y_test))
    print("F1 Score",f1_score(test_preds,y_test))
    print("ROC AUC Score",roc_auc_score(test_preds,y_test))
    
    
    
    import joblib
    
    
    # In[52]:
    
    
    joblib.dump(model,"model_joblib")
    
    
    # In[61]:


# Testing
    loaded_model = joblib.load("model_joblib")
    array = [5,3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0] 
    #    array = [a,b,c,d,e,f,g,h,i,j]
    #each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
    z = np.asarray(array).reshape(1,-1)
    predicted_value= loaded_model.predict(z)
    print(z)
if __name__ == "__main__":
    model()    
#
#
## In[54]:
#
#
#actual_value = y[4]
#print("Actual Value",actual_value)
#print("Predicted Value",predicted_value)


# In[ ]:

# def check():
#     import joblib
#     loaded_model = joblib.load("model_joblib")
#     array = [5,3,1.0,0.0,35.0,0,0,8.0500,1.0,0.0,0.0] 
# #    array = [a,b,c,d,e,f,g,h,i,j]
#     #each value represents a feature present in the training set Hint: the users should be able to enter their own values/(or) select from a drop down list of values to make custom predictions
#     z = np.asarray(array).reshape(1,-1)
#     predicted_value= loaded_model.predict(z)
#     return  predicted_value
    




