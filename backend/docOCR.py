
#PDF Resume Scanner

# READ ME!!!!!!
# make sure you activate the virtual environment so
# enter this into the terminal before running: 
# source venv/bin/activate

# to run: 
# python3 docOCR.py

# Importing the libraries
import os
import torch
import matplotlib.pyplot as plt

# Setting the working directory
lib_path = "/opt/homebrew/lib"
os.environ["DYLD_FALLBACK_LIBRARY_PATH"] = f"{lib_path}:{os.environ.get('DYLD_FALLBACK_LIBRARY_PATH', '')}"


# Importing the doctr libraries
from doctr.io import DocumentFile
from doctr.models.detection import db_resnet50
from doctr.models.recognition import crnn_vgg16_bn
from doctr.models import ocr_predictor

# Set Torch
os.environ['USE_TORCH'] = '1'
import matplotlib.pyplot as plt


# Set Detection Predictor
detection_predictor = db_resnet50(pretrained=False, assume_straight_pages=True)

# Load weights locally
detection_weights_path = os.path.expanduser("/Users/ernestorivera/Desktop/Whiting-Turner-Resume-App/ResumeReader/venv/include/db_resnet50-ac60cadc.pt")
detection_state_dict = torch.load(detection_weights_path, map_location=torch.device('cpu'))
detection_predictor.load_state_dict(detection_state_dict)

# Set Recognition Predictor
recognition_predictor = crnn_vgg16_bn(pretrained=True)

# Load weights locally
model = ocr_predictor(detection_predictor, recognition_predictor)
pathname = '/Users/ernestorivera/Desktop/Whiting-Turner-Resume-App/ResumeReader/testFiles/jibrail.pdf'
input_page = DocumentFile.from_pdf(pathname)
out = model(input_page)

# Iterate through pages
for page in out.pages:
    # Iterate through blocks
    for block in page.blocks:
        # Iterate through lines
        for line in block.lines:
            # Iterate through words
            for word in line.words:
                print(word.value, end=" ")
            print() # Add a newline after each line



