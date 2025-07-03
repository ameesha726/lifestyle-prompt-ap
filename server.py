from flask import Flask, request, jsonify
from transformers import AutoProcessor, AutoModelForImageTextToText
from PIL import Image
import torch
import io
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

processor = AutoProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = AutoModelForImageTextToText.from_pretrained("Salesforce/blip-image-captioning-base")

@app.route("/caption", methods=["POST"])
def caption():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image_file = request.files['image']
    image = Image.open(io.BytesIO(image_file.read())).convert("RGB")

    inputs = processor(images=image, return_tensors="pt")
    outputs = model.generate(**inputs)
    caption = processor.batch_decode(outputs, skip_special_tokens=True)[0]

    return jsonify({"caption": caption})

if __name__ == "__main__":
    app.run(port=5000, debug=True)