import pytesseract
from PIL import Image
import pdf2image

# Function to convert PDF file to images
def convert_pdf_to_images(pdf_path):
    return pdf2image.convert_from_path(pdf_path)

# Function to perform OCR using Tesseract
def perform_ocr(test_file_path):
    images = convert_pdf_to_images(test_file_path)
    full_text = ""
    for image in images:
        text = pytesseract.image_to_string(image)
        full_text += text + "\n"
    return full_text

# test_file_path = "./test.pdf"
# print("Performing OCR on the test file")
# print(perform_ocr(test_file_path))
