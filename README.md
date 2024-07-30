# Thought Process for Dynamic Form Generation

## JSON Handling

- Created an initial form for JSON file upload
- Implemented JSON validation to ensure the uploaded file matches the expected structure
- Stored valid JSON in localStorage for persistence and easy access

## Dynamic Form Generation

- Designed a system to parse the JSON and generate form elements dynamically
- Grouped fields by sections to maintain logical structure
- Utilized React components for different field types (text, radio, select, etc.)

## Form State Management

- Used React state to manage form inputs
- Implemented draft feature using localStorage to preserve user input across sessions

## Validation

- Created a validation system based on the rules specified in the JSON
- Applied validations dynamically to each field

## Considerations

- Ensured the solution could handle various JSON structures following the given format
- Focused on creating a scalable and maintainable codebase
- Prioritized user experience with clear error messages and intuitive form layout

## Note on Database Usage

Due to time constraints, this implementation does not utilize a database for data persistence. Instead, it relies on localStorage for storing the JSON configuration and draft form data. In a production environment, integrating a database would provide more robust data management and allow for server-side processing and storage.

- to test this test json files are provided in the test folder