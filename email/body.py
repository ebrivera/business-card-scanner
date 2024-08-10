import json
import openai

# Set your OpenAI GPT API Key
openai.api_key = 'sk-proj-5M3RjMoZhFs5VvNI4DgwT3BlbkFJ3CK2mnyTBSfAANK6w8TX'  # Replace with your actual API key'

def generate_email_body(name, position, notes):

    # Construct the prompt
    prompt = f"""
    Compose an email body for a follow-up email. Here are the details:

    Name: {name}
    Position: {position}
    Meeting Notes: {notes}

    Use this information to compose a polite and professional email that addresses the individual appropriately, summarizes the key points from the meeting, and suggests a potential next step or follow-up action.
    """

    result_text = ""

    # Attempt to generate the response from GPT model
    response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": prompt}
            ],
            temperature=0.7,
    )

    result_text = response['choices'][0]['message']['content']

    return result_text

# Example usage
name = "Josh Bokelman"
position = "Chief Commercial Officer"
notes = "Discussed potential partnership opportunities and shared insights on market trends."

# Generate the email body
email_body = generate_email_body(name, position, notes)
print(email_body)
