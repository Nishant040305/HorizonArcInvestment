import csv
import json

# Initialize the structure for the JSON output
output_data = {}

# Open and read the CSV file
with open("C:/Users/Nishant Mohan/Desktop/my-vite-app/client/src/Constants/data.csv", mode='r') as input_file:
    # Your code here
    reader = csv.DictReader(input_file)
    
    for row in reader:
        state_name = row["StateName"]
        division_name = row["DivisionName"].replace(" Division", "")
        district = row["District"]
        office_name = row["OfficeName"].replace(" B.O", "").replace(" S.O", "").replace(" RS SO", "").replace(" SO","").replace(" BO","").replace(" GPO","").strip()
        
        # Check if the state exists in the output data, if not, add it
        if state_name not in output_data:
            output_data[state_name] = {}
        
        # Check if the division exists within the state, if not, add it
        if division_name not in output_data[state_name]:
            output_data[state_name][division_name] = {}
        
        # Check if the district exists within the division, if not, add it
        if district not in output_data[state_name][division_name]:
            output_data[state_name][division_name][district] = {}
        
        # Add the office data
        try:

            output_data[state_name][division_name][district][office_name] = {
                "Pincode": row["Pincode"],
                "Latitude": float(row["Latitude"]),
                "Longitude": float(row["Longitude"])
            }
        except:
            output_data[state_name][division_name][district][office_name] = {
                "Pincode": row["Pincode"],
                "Latitude": (row["Latitude"]),
                "Longitude": (row["Longitude"])
            }
            print(row["Pincode"])

# Define the output JSON file name
json_file_name = "data.json"

# Write the JSON data to a file
with open(json_file_name, mode='w') as output_file:
    json.dump(output_data, output_file, indent=4)

json_file_name
