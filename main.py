import cv2
from ultralytics import YOLO
import torch

# Cek GPU available
device = 'cuda' if torch.cuda.is_available() else 'cpu'
print(f"Device: {device} (GPU untuk .engine cepat)")

# Path model .engine (pastikan di folder sama)
model_path = 'best.pt'  # Ganti jika nama lain
conf_thresh = 0.8  # Minimal threshold 0.7
IMG_SIZE = 640  # Input size (match model)

# Load model YOLOv11 dengan .engine (TensorRT auto GPU jika CUDA)
model = YOLO(model_path, task='detect')
model.conf = conf_thresh
model.classes = [1]  # Hanya class 0 (1 class)
# Names asli dari model (read-only)

print(f"Model loaded: {model_path} (device={device}, classes={model.names})")
print(f"Conf Threshold: {conf_thresh} (bbox tampil >=0.7, label tunjuk conf aktual)")

# Kamera ID 1 (ganti ke 0 jika built-in)
cap = cv2.VideoCapture(2)  # Webcam eksternal
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Error: Kamera ID 1 gagal. Coba ID 0: cap = cv2.VideoCapture(0)")
    exit()

print("Realtime deteksi dimulai. Tekan 'q' quit, 's' simpan frame.")

frame_count = 0
while True:
    ret, frame = cap.read()
    if not ret:
        print("Error baca frame. Restart kamera.")
        break
    
    frame_count += 1
    
    # Resize untuk model (jika perlu, tapi YOLO auto handle)
    frame_resized = cv2.resize(frame, (IMG_SIZE, IMG_SIZE))
    
    # Predict realtime (GPU/TensorRT cepat)
    results = model(frame_resized, verbose=False)
    
    # Draw bbox + conf (hanya >=0.7)
    annotated_frame = frame.copy()  # Original size untuk display
    for r in results:
        boxes = r.boxes
        if boxes is not None:
            for box in boxes:
                if int(box.cls) == 0:  # Class 0
                    conf = box.conf[0].cpu().numpy()
                    if conf >= conf_thresh:
                        # Koordinat bbox (scale ke original frame jika perlu)
                        x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                        # Scale ke frame size (jika resized)
                        scale_x = frame.shape[1] / IMG_SIZE
                        scale_y = frame.shape[0] / IMG_SIZE
                        x1, y1, x2, y2 = int(x1 * scale_x), int(y1 * scale_y), int(x2 * scale_x), int(y2 * scale_y)
                        
                        # Draw bbox hijau
                        cv2.rectangle(annotated_frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        
                        # Label: nama class + conf (dari model.names)
                        class_name = model.names[int(box.cls)]
                        label = f"{class_name} {conf:.2f}"
                        label_size = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.6, 2)[0]
                        cv2.rectangle(annotated_frame, (x1, y1 - label_size[1] - 10), (x1 + label_size[0], y1), (0, 255, 0), -1)
                        cv2.putText(annotated_frame, label, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)
                        
                        print(f"Frame {frame_count}: {class_name} deteksi conf {conf:.2f} (>= {conf_thresh})")
    
    # Tambah text threshold global (top-left)
    thresh_text = f"Conf Threshold: {conf_thresh}"
    cv2.putText(annotated_frame, thresh_text, (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    
    # Tampilkan frame
    cv2.imshow('YOLOv11 Realtime Deteksi (.engine, Kamera ID 1)', annotated_frame)
    
    # Kontrol
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        print("Quit oleh user.")
        break
    elif key == ord('s'):
        save_path = f'detected_frame_{frame_count}.jpg'
        cv2.imwrite(save_path, annotated_frame)
        print(f"Frame disimpan: {save_path}")
    
    # FPS limit ~30 (sleep jika perlu)
    cv2.waitKey(33)  # ~30 FPS

# Cleanup
cap.release()
cv2.destroyAllWindows()
print("Kamera dan window dibersihkan.")
