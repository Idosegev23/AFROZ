#!/usr/bin/env python3
import os
import subprocess
import argparse
from pathlib import Path

def compress_video(input_file, output_file=None, resolution="1280x720", bitrate="1500k", crf=28):
    """
    דוחס קובץ וידאו באמצעות ffmpeg
    
    פרמטרים:
    - input_file: נתיב לקובץ הוידאו המקורי
    - output_file: נתיב לקובץ הפלט (אם לא מצוין, יקבל שם ברירת מחדל)
    - resolution: רזולוציית פלט (ברירת מחדל: 720p)
    - bitrate: הביטרייט המקסימלי (ברירת מחדל: 1500k)
    - crf: פקטור איכות (ערכים נמוכים=איכות גבוהה, טווח 0-51, ברירת מחדל: 28)
    """
    if not os.path.exists(input_file):
        print(f"קובץ הקלט {input_file} לא קיים!")
        return False
    
    # אם לא צוין קובץ פלט, צור שם קובץ חדש
    if output_file is None:
        input_path = Path(input_file)
        output_file = str(input_path.with_stem(f"{input_path.stem}_compressed"))
    
    # הפקודה לדחיסת הוידאו
    cmd = [
        "ffmpeg",
        "-i", input_file,
        "-vf", f"scale={resolution}:force_original_aspect_ratio=decrease",
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", str(crf),
        "-b:v", bitrate,
        "-maxrate", bitrate,
        "-bufsize", f"{int(bitrate[:-1]) * 2}k",
        "-c:a", "aac",
        "-b:a", "128k",
        "-movflags", "+faststart",
        "-y",  # דרוס קובץ קיים
        output_file
    ]
    
    try:
        print(f"מדחוס את הוידאו {input_file}...")
        print(f"פקודה מורצת: {' '.join(cmd)}")
        subprocess.run(cmd)
        output_size = os.path.getsize(output_file) / (1024 * 1024)  # גודל בMB
        input_size = os.path.getsize(input_file) / (1024 * 1024)
        
        print(f"\nדחיסה הושלמה בהצלחה!")
        print(f"קובץ פלט: {output_file}")
        print(f"גודל מקורי: {input_size:.2f} MB")
        print(f"גודל לאחר דחיסה: {output_size:.2f} MB")
        print(f"יחס דחיסה: {input_size/output_size:.2f}x")
        return True
    
    except Exception as e:
        print(f"שגיאה בדחיסת הוידאו: {e}")
        return False

def main():
    parser = argparse.ArgumentParser(description="כלי לדחיסת קבצי וידאו")
    parser.add_argument("input", help="קובץ הוידאו המקורי")
    parser.add_argument("-o", "--output", help="קובץ הפלט (אופציונלי)")
    parser.add_argument("-r", "--resolution", default="1280x720", 
                        help="רזולוציית הפלט, למשל 1280x720, 640x360 (ברירת מחדל: 1280x720)")
    parser.add_argument("-b", "--bitrate", default="1500k", 
                        help="ביטרייט מקסימלי (ברירת מחדל: 1500k)")
    parser.add_argument("-q", "--quality", type=int, default=28, 
                        help="רמת איכות CRF (0-51, נמוך יותר=איכות גבוהה יותר, ברירת מחדל: 28)")
    
    args = parser.parse_args()
    
    compress_video(
        args.input, 
        args.output, 
        args.resolution, 
        args.bitrate, 
        args.quality
    )

if __name__ == "__main__":
    main() 