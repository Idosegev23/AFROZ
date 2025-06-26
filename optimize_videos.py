#!/usr/bin/env python3
import os
import subprocess
import shutil
from pathlib import Path

def compress_video_further(input_file, output_file):
    """
    דוחס קובץ וידאו עוד יותר עבור שימוש באתר
    """
    cmd = [
        "ffmpeg",
        "-i", input_file,
        "-vf", "scale=1080:608:force_original_aspect_ratio=decrease",  # Full HD עם יחס גובה-רוחב שמור
        "-c:v", "libx264",
        "-preset", "slow",  # דחיסה איטית יותר אך יעילה יותר
        "-crf", "32",  # איכות נמוכה יותר לגודל קטן יותר
        "-b:v", "800k",  # ביטרייט נמוך יותר
        "-maxrate", "1000k",
        "-bufsize", "1600k",
        "-c:a", "aac",
        "-b:a", "96k",  # איכות אודיו נמוכה יותר
        "-movflags", "+faststart",
        "-y",
        output_file
    ]
    
    try:
        print(f"מדחוס את {input_file}...")
        result = subprocess.run(cmd, capture_output=True, text=True)
        
        if result.returncode == 0:
            input_size = os.path.getsize(input_file) / (1024 * 1024)
            output_size = os.path.getsize(output_file) / (1024 * 1024)
            print(f"✅ דחיסה הושלמה: {input_size:.2f}MB → {output_size:.2f}MB")
            return True
        else:
            print(f"❌ שגיאה בדחיסה: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"❌ שגיאה: {e}")
        return False

def update_file_references(old_name, new_name):
    """
    מעדכן התייחסויות לקבצי וידאו בקבצי HTML
    """
    files_to_update = [
        "index.html",
        "sections/hero.html"
    ]
    
    for file_path in files_to_update:
        if os.path.exists(file_path):
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # עדכון הנתיבים
            old_path = f"public/videos/{old_name}"
            new_path = f"public/videos/{new_name}"
            
            if old_path in content:
                content = content.replace(old_path, new_path)
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✅ עודכן {file_path}: {old_name} → {new_name}")

def main():
    """
    הפונקציה הראשית שמבצעת את כל התהליך
    """
    videos_dir = Path("public/videos")
    
    if not videos_dir.exists():
        print("❌ תיקיית הווידאו לא נמצאה!")
        return
    
    # רשימת קבצי הווידאו לעיבוד
    video_files = [
        "afrozmobile_compressed.mp4",
        "afrozwebsite_compressed.mp4"
    ]
    
    print("🎬 מתחיל תהליך אופטימיזציה של קבצי הווידאו...")
    
    for video_file in video_files:
        input_path = videos_dir / video_file
        
        if not input_path.exists():
            print(f"⚠️  קובץ {video_file} לא נמצא, מדלג...")
            continue
        
        # יצירת שם קובץ חדש (הסרת "_compressed" והוספת "_optimized")
        base_name = video_file.replace("_compressed", "")
        new_name = base_name.replace(".mp4", "_optimized.mp4")
        output_path = videos_dir / new_name
        
        print(f"\n📹 מעבד: {video_file}")
        
        # דחיסת הווידאו
        if compress_video_further(str(input_path), str(output_path)):
            # עדכון התייחסויות בקוד
            update_file_references(video_file, new_name)
            
            # מחיקת הקובץ הישן
            try:
                input_path.unlink()
                print(f"🗑️  נמחק קובץ ישן: {video_file}")
            except Exception as e:
                print(f"⚠️  לא ניתן למחוק קובץ ישן {video_file}: {e}")
        else:
            # במקרה של כישלון, מחק את קובץ הפלט אם נוצר
            if output_path.exists():
                output_path.unlink()
    
    print("\n✨ תהליך האופטימיזציה הושלם!")
    print("\n📝 סיכום השינויים:")
    print("- קבצי הווידאו דוחסו נוספות להפחתת גודלם")
    print("- הקבצים החדשים נשמרו עם הסיומת '_optimized'")
    print("- ההתייחסויות בקוד עודכנו לקבצים החדשים")
    print("- הקבצים הישנים נמחקו")

if __name__ == "__main__":
    main() 