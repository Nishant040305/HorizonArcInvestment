import csv
import json

# Path to the input CSV file
csv_file_path = r'C:\Users\Nishant Mohan\Desktop\my-vite-app\client\src\Constants\output.csv'  # Replace with your CSV file path

# Path to the output JSON file
json_file_path = r'C:\Users\Nishant Mohan\Desktop\my-vite-app\client\src\Constants\output.json'  # Replace with the desired JSON output file path

# Read the CSV file and convert it to JSON
data = []
with open(csv_file_path, mode='r') as csv_file:
    csv_reader = csv.DictReader(csv_file)
    for row in csv_reader:
        data.append(row)

# Write the data to a JSON file
with open(json_file_path, mode='w') as json_file:
    json.dump(data, json_file, indent=2)

print(f"CSV file successfully converted to JSON and saved as {json_file_path}")
