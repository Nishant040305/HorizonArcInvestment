import data from "../Constants/output.json";  // Assuming the CSV is now JSON

export const Suggestion = (query) => {
    const results = [];

    const findMatches = (name, latitude, longitude, pincode) => {
        const lowerCaseName = name.toLowerCase();
        const lowerCaseQuery = query.toLowerCase();

        if (lowerCaseName.includes(lowerCaseQuery)) {
            results.push({
                name, latitude, longitude, pincode,
                relevance: lowerCaseName.indexOf(lowerCaseQuery) // Lower index is more relevant
            });
        }
    };

    // Iterate through the JSON data and find matches
    data.forEach(entry => {
        const { Name, Latitude, Longitude, Pincode } = entry;
        findMatches(Name, Latitude, Longitude, Pincode);
    });

    // Sort the results based on relevance (lower index first) and limit to 7 results
    results.sort((a, b) => a.relevance - b.relevance);

    return results.slice(0, 7);
};
