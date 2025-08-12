import pandas as pd
import pickle
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# Load dataset
df = pd.read_csv('data/dataset.csv')

# Combine symptoms per row
symptoms = df.iloc[:, 1:].apply(lambda x: x.dropna().tolist(), axis=1)

# One-hot encode symptoms
mlb = MultiLabelBinarizer()
X = mlb.fit_transform(symptoms)

# Save the symptom list for later
with open("model/symptom_list.pkl", "wb") as f:
    pickle.dump(mlb.classes_, f)

# Target variable
y = df['Disease']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
with open('model/disease_model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Print performance metrics
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))
