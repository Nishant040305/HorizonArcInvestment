import csv
import json
import re

def is_float(value):
    """Check if the value is a valid float."""
    try:
        float_value = float(value)
        # Ensure the number is finite
        return not (float_value == float('inf') or float_value == float('-inf'))
    except ValueError:
        return False

def clean_and_convert(value):
    """Remove unwanted characters and convert to float. Ignore if conversion fails."""
    if value == "NA":
        return None
    if(is_float(value)):
        return value
    # Remove dashes and any trailing spaces

    cleaned_value = re.sub(r'-', '', value).strip()
    if is_float(cleaned_value):
        return float(cleaned_value)
    return None

def calculate_average(coords):
    latitudes = [c['Latitude'] for c in coords if c['Latitude'] is not None]
    longitudes = [c['Longitude'] for c in coords if c['Longitude'] is not None]

    # Ensure all latitudes and longitudes are floats
    latitudes = [float(lat) for lat in latitudes if is_float(lat)]
    longitudes = [float(lon) for lon in longitudes if is_float(lon)]
    
    if not latitudes or not longitudes:
        return "NA", "NA"

    # Calculate averages
    avg_lat = sum(latitudes) / len(latitudes)
    avg_lon = sum(longitudes) / len(longitudes)

    return avg_lat, avg_lon


def process_data(data):
    rows = []

    for state, divisions in data.items():
        state_coords = []

        for division, districts in divisions.items():
            division_coords = []

            for district, villages in districts.items():
                district_coords = []

                for village, info in villages.items():
                    latitude = clean_and_convert(info.get('Latitude'))
                    longitude = clean_and_convert(info.get('Longitude'))
                    pincode = info.get('Pincode')
                    
                    if latitude is not None and longitude is not None:
                        rows.append([village, latitude, longitude, pincode])
                        district_coords.append({'Latitude': latitude, 'Longitude': longitude})
                
                # Calculate district average
                avg_lat, avg_lon = calculate_average(district_coords)
                if avg_lat != "NA" and avg_lon != "NA":
                    rows.append([district, avg_lat, avg_lon, ""])

                division_coords.extend(district_coords)
            
            # Calculate division average
            avg_lat, avg_lon = calculate_average(division_coords)
            if avg_lat != "NA" and avg_lon != "NA":
                rows.append([division, avg_lat, avg_lon, ""])
        
        # Calculate state average
        avg_lat, avg_lon = calculate_average(state_coords)
        if avg_lat != "NA" and avg_lon != "NA":
            rows.append([state, avg_lat, avg_lon, ""])
    
    return rows

def read_json(filename):
    with open(filename, 'r') as file:
        return json.load(file)

def write_csv(filename, rows):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Latitude", "Longitude", "Pincode"])
        writer.writerows(rows)

# File paths
input_file = r'C:\Users\Nishant Mohan\Desktop\my-vite-app\client\src\Constants\sorted_data.json'
output_file = r'C:\Users\Nishant Mohan\Desktop\my-vite-app\client\src\Constants\output.csv'

# Process the JSON data and write to CSV
data = read_json(input_file)
rows = process_data(data)
write_csv(output_file, rows)
