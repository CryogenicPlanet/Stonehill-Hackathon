# Stonehill Hackathon 2018
**Winners**

## Project
Using Face dection and Facial Recognition to identify indiviuals entering a room and controlling electronics in the room based on their preference, i.e turning on fans or air conditioners or which lights to turn on, what color the lights should be.

## Components

### IoT

The systems requires two IoT Components, one is the camera that detects people entering the room, for us this was setup on a raspberry pi using an external webcam, the motion is detected using opencv and harr casscades. The camera takes multiple successive images and then uploades them to our server, this upload is securely encrpyted.

The second component is controlling the electronics through a relay, we used to control electronics. We also connected to a phillips hue hub, to control phillips hue lights

### Server

The system uses Nodejs and express, the server connects the IoT components to the machine learning and does all the data handling, in terms of preferences and predicting who the person detected is.

### Machine Learning

The machine learning commponet uses a custom trained model, which was trained on many images of ourselves to help identify whose face the camera detected. Here we are using a convolutional neural network, and deep learning techniques. 
