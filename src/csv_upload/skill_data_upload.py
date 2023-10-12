import firebase_admin
from firebase_admin import credentials, db
import csv

################################################# CONFIGURATION #################################################
# There is one csv file that will be given, please adjust the file location/path of these files accordingly
# 1. It lists out the skill descriptions
skill_csv_file_name = 'skill.csv'

# Initialize Firebase Admin SDK, ensure the path of the json key is correct.
cred = credentials.Certificate("./skill-net-1311-firebase-admin-key.json")

# Specify your Realtime Database URL (this URL is usually consistent, no need to adjust it - UNLESS, something breaks.)
database_url = "https://skill-net-1311-default-rtdb.asia-southeast1.firebasedatabase.app" 

################################################# CONFIGURATION #################################################

firebase_admin.initialize_app(cred, {
   'databaseURL': database_url
})

# Initialize the data variable to push into the database, and the path reference
# Data to upload
data = {
    'key1': 'value1',
    'key2': 'value2',
}

# Path to your Realtime Database root
path = '/'

# Read the csv files using csv module, these lines of code will populate the data variable for pushing
with open(skill_csv_file_name, 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data[row['Skill_Name']] = row['Skill_Desc']

print(data)

# Reference to your Realtime Database root
ref = db.reference(path)

# Push data to the database
try:
    ref.child("skill").set(data)
    print("Data pushed successfully")
except:
    print("Error occurred, push not successful")

firebase_admin.delete_app(firebase_admin.get_app())