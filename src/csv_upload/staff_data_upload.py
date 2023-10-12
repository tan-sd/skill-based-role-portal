import firebase_admin
from firebase_admin import credentials, db
import csv

################################################# CONFIGURATION #################################################
# There are two csv files that will be given, please adjust the file location/path of these files accordingly
# 1. One lists out the Staff details
staff_csv_file_name = 'staff.csv'
# 2. The other list out the Staff's skillsets
staff_skill_csv_file_name = 'staff_skill.csv'

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
with open(staff_csv_file_name, 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data[row['Staff_ID']] = {"firstname":row['Staff_FName'],"lastname":row['Staff_LName'],"department":row['Dept'],"country":row['Country'],"email":row['Email'],"accessrights":row['Role'],"skillsets":[]}

with open(staff_skill_csv_file_name , 'r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        if len(data[row['Staff_ID']]["skillsets"]) == 0:
            data[row['Staff_ID']]["skillsets"] = [row['Skill_Name']]
        else: 
            data[row['Staff_ID']]["skillsets"].append(row['Skill_Name']) 

print(data)

# Reference to your Realtime Database root
ref = db.reference(path)

# Push data to the database
try:
    ref.child("staff").set(data)
    print("Data pushed successfully")
except:
    print("Error occurred, push not successful")

firebase_admin.delete_app(firebase_admin.get_app())