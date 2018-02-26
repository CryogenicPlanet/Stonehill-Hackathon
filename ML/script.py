import cv2
import numpy as np
from PIL import Image

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read('trainer.yml')
picture = 'uploads/temp.png'
print(picture)
image_pil = Image.open(picture).convert('L')
image = np.array(image_pil, 'uint8')
print(recognizer.predict(image))

