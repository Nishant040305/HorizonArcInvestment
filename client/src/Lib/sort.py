import json

# Function to recursively sort JSON data
def sort_json(data):
    if isinstance(data, dict):
        sorted_dict = {}
        for key in sorted(data):
            sorted_dict[key] = sort_json(data[key])
        return sorted_dict
    elif isinstance(data, list):
        return sorted([sort_json(item) for item in data])
    else:
        return data

# Read the JSON data from the file
with open('C:/Users/Nishant Mohan/Desktop/my-vite-app/client/src/Lib/data.json', 'r') as file:
    data = json.load(file)

# Sort the JSON data
sorted_data = sort_json(data)

# Write the sorted JSON data to a new file
with open('sorted_data.json', 'w') as file:
    json.dump(sorted_data, file, indent=4)

print("Data has been sorted and saved to sorted_data.json.")
