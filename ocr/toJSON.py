import json
import openai

# Set your OpenAI GPT API Key
openai.api_key = 'sk-proj-5M3RjMoZhFs5VvNI4DgwT3BlbkFJ3CK2mnyTBSfAANK6w8TX'  # Replace with your actual API key

def business_card_to_json(card_text):
    # Construct the prompt
    prompt = """
    You are BusinessCardScannerGPT. I will provide you with the OCR output TEXT of a business card and I need you to return specific outputs as a JSON file. 
    Parse through the text data and allocate the information to the fields I am requesting. 
    If the data for that input is not present or if the OCR text doesn't provide a clear response for a specific value, then enter null for that entry.
    
    ONLY respond with a JSON output for the following fields:
    {"Name": "Full Name", "Email": "email@example.com"}
    Clean up the data if visibly necessary, remember to maintain proper email format.
    """

    result_text = ""

    # Attempt to generate the response from GPT model
    while True:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt},
                {"role": "user", "content": card_text}
            ],
            temperature=0.7,
        )

        # Get the model's response
        result_text = response['choices'][0]['message']['content']

        # Try to parse the model's response as JSON
        try:
            json_output = json.loads(result_text)
            # If no error is raised, the response is valid JSON
            break
        except json.JSONDecodeError:
            # If an error is raised, prompt for a retry with specific JSON format
            card_text = "Please return the requested information in the correct JSON format."

    return json_output

# Example text from a scanned business card
example_text = "JOSH BOKELMAN\nChief Commercial Officer josh.bokelman@lpk.com\n+1513 426 4695\nbY"

# Process the OCR text and print the JSON result
print(business_card_to_json(example_text))
