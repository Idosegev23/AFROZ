const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('=== Email API Called ===');
        console.log('Request body:', JSON.stringify(req.body, null, 2));
        
        const { name, phone, email, message, source } = req.body;

        // בדיקות בסיסיות
        if (!name || !phone || !email) {
            console.log('Missing required fields:', { name: !!name, phone: !!phone, email: !!email });
            return res.status(400).json({ 
                error: 'Missing required fields: name, phone, email',
                received: { name: !!name, phone: !!phone, email: !!email }
            });
        }

        // בדיקת משתני סביבה
        console.log('Checking environment variables...');
        console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
        console.log('EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
        console.log('EMAIL_USER value:', process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 5)}...` : 'undefined');
        
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Missing environment variables');
            return res.status(500).json({ 
                error: 'Server configuration error - missing email credentials',
                details: 'נדרשים משתני סביבה EMAIL_USER ו-EMAIL_PASS'
            });
        }

        console.log('Creating nodemailer transporter...');
        
        // יצירת transporter עם הגדרות מפורטות ל-Gmail
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS // זה חייב להיות App Password מ-Gmail!
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // בדיקת חיבור
        console.log('Verifying transporter connection...');
        try {
            await transporter.verify();
            console.log('✅ SMTP connection verified successfully');
        } catch (verifyError) {
            console.error('❌ SMTP connection verification failed:', verifyError);
            return res.status(500).json({ 
                error: 'Failed to connect to email server',
                details: verifyError.message,
                solution: 'ודא שהמשתנה EMAIL_PASS הוא App Password מ-Gmail (לא סיסמה רגילה)'
            });
        }

        console.log('Preparing email content...');
        
        // הכנת תוכן המייל
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'jivany@nataraj.co.il',
            subject: `🌟 פנייה חדשה מאתר AFROZ - ${name}`,
            html: `
                <div style="direction: rtl; font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h1 style="color: #D4AF37; text-align: center; margin-bottom: 30px;">🌟 פנייה חדשה לריטריט AFROZ</h1>
                        
                        <div style="background: #f0f8f0; padding: 20px; border-radius: 8px; border: 2px solid #4CAF50; margin-bottom: 20px;">
                            <h2 style="color: #2E7D32; margin-top: 0;">פרטי הלקוח:</h2>
                            <p style="margin: 10px 0;"><strong>👤 שם:</strong> ${name}</p>
                            <p style="margin: 10px 0;"><strong>📱 טלפון:</strong> ${phone}</p>
                            <p style="margin: 10px 0;"><strong>✉️ אימייל:</strong> ${email}</p>
                            <p style="margin: 10px 0;"><strong>📊 מקור:</strong> ${source || 'לא צוין'}</p>
                            <p style="margin: 10px 0;"><strong>⏰ תאריך:</strong> ${new Date().toLocaleString('he-IL')}</p>
                        </div>

                        ${message ? `
                        <div style="background: #e8f5e8; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                            <h3 style="color: #2E7D32; margin-top: 0;">💬 הודעה נוספת:</h3>
                            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                        ` : ''}

                        <div style="text-align: center; margin-top: 30px;">
                            <h3 style="color: #D4AF37;">פעולות מהירות:</h3>
                            <div style="margin: 20px 0;">
                                <a href="tel:${phone}" style="display: inline-block; background: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">📞 התקשר</a>
                                <a href="mailto:${email}" style="display: inline-block; background: #2196F3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">✉️ אימייל</a>
                                <a href="https://wa.me/972${phone.replace(/[^0-9]/g, '').substring(1)}" style="display: inline-block; background: #25D366; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; margin: 5px;">💬 WhatsApp</a>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            // הוספת גרסת טקסט פשוטה למקרה שה-HTML לא נתמך
            text: `
פנייה חדשה לריטריט AFROZ

פרטי הלקוח:
שם: ${name}
טלפון: ${phone}
אימייל: ${email}
מקור: ${source || 'לא צוין'}
תאריך: ${new Date().toLocaleString('he-IL')}

${message ? `הודעה נוספת: ${message}` : ''}
            `
        };

        console.log('Sending email...');
        console.log('Email recipient:', mailOptions.to);
        console.log('Email subject:', mailOptions.subject);
        
        // שליחת המייל
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully!');
        console.log('Message ID:', info.messageId);
        console.log('Response:', info.response);

        return res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully to jivany@nataraj.co.il',
            messageId: info.messageId,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('❌ Email sending error:', error);
        console.error('Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode
        });
        
        // זיהוי שגיאות נפוצות של Gmail
        let userFriendlyError = 'Failed to send email';
        let solution = '';
        
        if (error.code === 'EAUTH') {
            userFriendlyError = 'שגיאת אימות Gmail';
            solution = 'ודא שמשתנה EMAIL_PASS הוא App Password מ-Gmail, לא סיסמה רגילה';
        } else if (error.response && error.response.includes('Username and Password not accepted')) {
            userFriendlyError = 'פרטי התחברות שגויים';
            solution = 'יש ליצור App Password ב-Gmail ולהשתמש בו במקום בסיסמה הרגילה';
        } else if (error.code === 'ECONNECTION') {
            userFriendlyError = 'בעיית חיבור לשרת Gmail';
            solution = 'בדוק חיבור לאינטרנט והגדרות Firewall';
        }
        
        return res.status(500).json({ 
            error: userFriendlyError,
            details: error.message,
            solution: solution,
            code: error.code,
            timestamp: new Date().toISOString()
        });
    }
}; 