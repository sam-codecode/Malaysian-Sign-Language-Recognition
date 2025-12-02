# Malaysian-Sign-Language-Recognition
Real-time Malaysian Sign Language Alphabet Detection using MediaPipe, PyTorch & Flask   

A web-based AI system that recognizes Malaysian Sign Language (MSL) hand gestures from your webcam and converts them into live text with stable prediction logic, plus optional text-to-speech output.   
This project was built for a hackathon to demonstrate accessible communication using computer vision and deep learning.   

Features   
🔹 Real-Time Hand Tracking  
   - Uses MediaPipe Hands to extract 3D landmarks from video frames with high accuracy.  

🔹 Deep Learning Classification   
   - A custom PyTorch fully connected neural network predicts the MSL alphabet from extracted features.   

🔹 Stability Logic (Noise Reduction)  
  - A 70% rolling prediction buffer is applied to ensure only stable letters are added to the final output.   

🔹 Web-Based Interface (Flask + SocketIO)  
   - Live webcam feed  
   - Real-time predictions  
   - Stable text output  
   - Interactive controls (Clear, Delete, Space, Read Aloud)  

🔹 Speech Output (Text-to-Speech)  
   - Converts the recognized word/sentence to speech using pyttsx3.  

| Component               | Technology             |
| ----------------------- | ---------------------- |
| **Landmark Detection**  | MediaPipe Hands        |
| **Model Training**      | PyTorch, Scikit-learn  |
| **Backend**             | Flask + Flask-SocketIO |
| **Frontend**            | HTML, CSS, JavaScript  |
| **Real-Time Streaming** | Socket.IO              |
| **Speech Engine**       | pyttsx3                |

LIVE AT : https://huggingface.co/spaces/SamuelParker/Malaysian-Sign-Language-Recognition

Installation for you to run on local :  
1. Clone the repo :   
  git clone https://github.com/yourusername/MSL-SignLanguage-Recognition.git   
  cd MSL-SignLanguage-Recognition  
2. Install dependencies :   
   pip install -r requirements.txt   
3. Run the app :   
   python app.py  
4. Open in browser :  
   http://localhost:5000  

   
Future Improvements  
1.Full word-level recognition  
2.Real-time sentence translation  
3.Dataset expansion for 2-hand gestures  
4.Mobile version (TensorFlow Lite)  
5.Multi-language speech output  

Credits  
Developed by Samuel Raj.   
For educational and accessibility innovation.  
