# 🚀 הוראות פריסה ב-Vercel - תיקון שגיאת 404

## הבעיה שתוקנה
השגיאה `404 (Not Found)` עבור `/api/send-email` נגרמה בגלל הגדרות שגויות ב-`vercel.json` שהיו מתאימות לגרסה ישנה של Vercel.

## ✅ מה תוקן:

### 1. עדכון `vercel.json`
```json
{
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ],
  "functions": {
    "api/send-email.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 2. עדכון `package.json`
- הוספת תלויות נכונות
- הגדרת Node.js 18.x
- הוספת scripts מעודכנים

### 3. שיפור `.gitignore`
- הוספת `.vercel` ועוד תיקיות זמניות

## 🔧 מה צריך לעשות עכשיו:

### שלב 1: דחיפת הקוד ל-GitHub
```bash
git push origin main
```

### שלב 2: הגדרת משתני סביבה ב-Vercel

1. **היכנס ל-[Vercel Dashboard](https://vercel.com/dashboard)**

2. **בחר את הפרויקט AFROZ**

3. **לך ל-Settings → Environment Variables**

4. **הוסף את המשתנים הבאים:**

   | שם המשתנה | ערך | סביבות |
   |-----------|-----|--------|
   | `EMAIL_USER` | `triroars@gmail.com` | Production, Preview, Development |
   | `EMAIL_PASS` | `qaxfahrrosleojfi` | Production, Preview, Development |

   **חשוב:** ודא שהמשתנים מוגדרים לכל שלוש הסביבות!

### שלב 3: Redeploy
1. חזור ל-Deployments tab
2. לחץ על הפריסה האחרונה
3. לחץ על "Redeploy" או שהפרויקט יתפרס אוטומטית אחרי ה-push

## 🧪 בדיקה:

לאחר הפריסה, נסה:
1. מלא טופס בפוטר האתר
2. מלא טופס בפופאפ
3. ודא שמגיעות הודעות הצלחה ירוקות
4. ודא שהמייל מגיע ל-jivany@nataraj.co.il

## 🔍 פתרון בעיות:

### אם עדיין יש שגיאת 404:
1. ודא שמשתני הסביבה הוגדרו נכון
2. ודא שהם מוגדרים לכל הסביבות
3. חכה כמה דקות לעדכון
4. נסה לעשות Hard Refresh (Ctrl+F5)

### אם האתר לא נטען:
1. ודא שיש קובץ `index.html` בתיקיית הבסיס
2. בדוק שה-rewrites ב-`vercel.json` נכונים

### אם המייל לא נשלח:
1. בדוק שמשתני הסביבה נכונים
2. ודא שה-Gmail App Password תקין
3. בדוק את Function Logs ב-Vercel

## 📞 קבלת עזרה:
אם יש עדיין בעיות, שלח screenshot של:
1. Environment Variables מ-Vercel
2. שגיאות מהקונסול של הדפדפן
3. Function Logs מ-Vercel Dashboard

## ⚡ סיכום השינויים:
- ✅ תוקן `vercel.json` לגרסה החדשה
- ✅ עודכן `package.json` עם תלויות נכונות  
- ✅ שופר `.gitignore`
- ✅ ה-API function נמצא במקום הנכון (`/api/send-email.js`)
- ✅ הקוד מוכן לפריסה

הבעיה העיקרית הייתה הגדרות שגויות ב-`vercel.json` שגרמו ל-Vercel לא לזהות את ה-API function. עכשיו הכל אמור לעבוד מושלם! 🎉 