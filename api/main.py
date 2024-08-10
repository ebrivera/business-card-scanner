import json
import os
import uuid

from ocr.read import perform_ocr

from fastapi import FastAPI, File, UploadFile
import logging

app = FastAPI() 

logging.basicConfig(level=logging.INFO)

@app.post("/process_image")
async def process_image(image: UploadFile = File(...)):
    logging.info("Received a file upload request")
    # read the data
    image_data = await image.read()
    # call the perform_ocr function

    logging.info("Finished reading the image data and calling perform_ocr")

    result = ocr_to_json(perform_ocr(image_data))

    filename = str(uuid.uuid4()) + ".json"
    filepath = os.path.join("./resume_jsons", filename)  # Replace 'path_to_folder' with the actual path

    with open(filepath, 'w') as f:
        json.dump(result, f) 

    return {"result": result, "filename": filename}


@app.get("/get_data")
async def get_data(filename: str):
    filepath = os.path.join("./resume_jsons", filename)

    with open(filepath, 'r') as f:
        data = json.load(f)

    # Parse the JSON string inside data
    parsed_data = json.loads(data)["result"]

    return {"result": parsed_data}

@app.get("/get_all_filenames")
async def get_all_filenames():
    directory = "./resume_jsons"
    filenames = [f for f in os.listdir(directory) if f.endswith('.json')]
    return {"filenames": filenames}

