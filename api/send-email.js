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
        console.log('🚀 === Gmail SMTP Email API Called ===');
        console.log('📧 Request body:', JSON.stringify(req.body, null, 2));
        
        const { name, phone, email, message, source } = req.body;

        // בדיקות בסיסיות
        if (!name || !phone || !email) {
            console.log('❌ Missing required fields:', { name: !!name, phone: !!phone, email: !!email });
            return res.status(400).json({ 
                error: 'Missing required fields: name, phone, email',
                received: { name: !!name, phone: !!phone, email: !!email }
            });
        }

        // בדיקת משתני סביבה
        console.log('🔐 Checking Gmail environment variables...');
        console.log('📨 EMAIL_USER exists:', !!process.env.EMAIL_USER);
        console.log('🔑 EMAIL_PASS exists:', !!process.env.EMAIL_PASS);
        console.log('📨 EMAIL_USER value:', process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 5)}...@gmail.com` : 'undefined');
        
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('❌ Missing Gmail environment variables');
            return res.status(500).json({ 
                error: 'Server configuration error - missing Gmail credentials',
                details: 'נדרשים משתני סביבה EMAIL_USER (Gmail address) ו-EMAIL_PASS (Gmail App Password)',
                setup_help: 'צריך ליצור App Password ב-Gmail Settings > Security > App passwords'
            });
        }

        console.log('⚙️ Creating Gmail nodemailer transporter...');
        
        // יצירת transporter עם הגדרות מעודכנות עבור Gmail 2024
        const transporter = nodemailer.createTransport({
            service: 'gmail', // שימוש בשירות Gmail המובנה
            // הגדרות גיבוי במקרה שה-service לא עובד
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // false עבור STARTTLS על פורט 587
            auth: {
                user: process.env.EMAIL_USER, // כתובת Gmail המלאה
                pass: process.env.EMAIL_PASS  // חייב להיות App Password (16 תווים) מ-Gmail!
            },
            tls: {
                rejectUnauthorized: false // מאפשר חיבורים גם עם תעודות לא מוכרות
            },
            pool: true, // שימוש ב-connection pooling לביצועים טובים יותר
            maxConnections: 5, // מגבלה על חיבורים בו-זמניים
            maxMessages: 100 // מגבלה על הודעות בחיבור אחד
        });

        // בדיקת חיבור ל-Gmail
        console.log('🔗 Verifying Gmail SMTP connection...');
        try {
            await transporter.verify();
            console.log('✅ Gmail SMTP connection verified successfully!');
        } catch (verifyError) {
            console.error('❌ Gmail SMTP connection verification failed:', verifyError);
            
            // הודעות שגיאה ספציפיות עבור Gmail
            let errorMessage = 'Failed to connect to Gmail SMTP server';
            let solution = 'בדוק את פרטי ההתחברות';
            
            if (verifyError.code === 'EAUTH') {
                errorMessage = 'Gmail authentication failed';
                solution = 'ודא שמשתנה EMAIL_PASS הוא App Password תקין מ-Gmail (לא סיסמה רגילה)';
            } else if (verifyError.responseCode === 535) {
                errorMessage = 'Gmail rejected the credentials';
                solution = 'צריך ליצור App Password חדש ב-Gmail Settings';
            }
            
            return res.status(500).json({ 
                error: errorMessage,
                details: verifyError.message,
                solution: solution,
                help: 'איך ליצור App Password: Google Account > Security > 2-Step Verification > App passwords'
            });
        }

        console.log('✉️ Preparing email content...');
        
        // הכנת תוכן המייל המעוצב
        const mailOptions = {
            from: `"AFROZ Retreat" <${process.env.EMAIL_USER}>`, // שם יפה לשולח
            to: 'jivany@nataraj.co.il',
            subject: `🌟 פנייה חדשה מאתר AFROZ - ${name}`,
            html: `
                <div style="direction: rtl; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
                    <div style="background: white; padding: 30px; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                        <h1 style="color: #D4AF37; text-align: center; margin-bottom: 30px; font-size: 28px;">🌟 פנייה חדשה לריטריט AFROZ</h1>
                        
                        <div style="background: linear-gradient(135deg, #f0f8f0 0%, #e8f5e8 100%); padding: 25px; border-radius: 12px; border-right: 5px solid #4CAF50; margin-bottom: 25px;">
                            <h2 style="color: #2E7D32; margin-top: 0; font-size: 22px;">👤 פרטי הלקוח:</h2>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr><td style="padding: 8px 0; font-weight: bold;">👤 שם:</td><td style="padding: 8px 0;">${name}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold;">📱 טלפון:</td><td style="padding: 8px 0;">${phone}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold;">✉️ אימייל:</td><td style="padding: 8px 0;">${email}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold;">📊 מקור:</td><td style="padding: 8px 0;">${source || 'אתר AFROZ'}</td></tr>
                                <tr><td style="padding: 8px 0; font-weight: bold;">⏰ תאריך:</td><td style="padding: 8px 0;">${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}</td></tr>
                            </table>
                        </div>

                        ${message ? `
                        <div style="background: linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%); padding: 20px; border-radius: 10px; margin-bottom: 25px; border-right: 3px solid #81C784;">
                            <h3 style="color: #2E7D32; margin-top: 0; font-size: 18px;">💬 הודעה נוספת:</h3>
                            <p style="margin: 0; white-space: pre-wrap; font-size: 16px; line-height: 1.6;">${message}</p>
                        </div>
                        ` : ''}

                        <div style="text-align: center; margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); border-radius: 10px;">
                            <h3 style="color: #D4AF37; margin-top: 0;">🚀 פעולות מהירות:</h3>
                            <div style="margin: 20px 0;">
                                <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #4CAF50, #45a049); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 8px; font-weight: bold; box-shadow: 0 4px 8px rgba(76,175,80,0.3);">📞 התקשר</a>
                                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #2196F3, #1976D2); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 8px; font-weight: bold; box-shadow: 0 4px 8px rgba(33,150,243,0.3);">✉️ אימייל</a>
                                <a href="https://wa.me/972${phone.replace(/[^0-9]/g, '').substring(1)}" style="display: inline-block; background: linear-gradient(135deg, #25D366, #128C7E); color: white; padding: 12px 24px; text-decoration: none; border-radius: 25px; margin: 8px; font-weight: bold; box-shadow: 0 4px 8px rgba(37,211,102,0.3);">💬 WhatsApp</a>
                            </div>
                        </div>
                        
                        <div style="text-align: center; margin-top: 25px; padding: 15px; font-size: 14px; color: #666; border-top: 1px solid #eee;">
                            <p style="margin: 0;">📧 הודעה זו נשלחה אוטומטית מאתר AFROZ Retreat</p>
                        </div>
                    </div>
                </div>
            `,
            // הוספת גרסת טקסט פשוטה
            text: `
פנייה חדשה לריטריט AFROZ

פרטי הלקוח:
שם: ${name}
טלפון: ${phone}
אימייל: ${email}
מקור: ${source || 'אתר AFROZ'}
תאריך: ${new Date().toLocaleString('he-IL', { timeZone: 'Asia/Jerusalem' })}

${message ? `הודעה נוספת: ${message}` : ''}

-- 
הודעה זו נשלחה אוטומטית מאתר AFROZ Retreat
            `,
            // הגדרות נוספות
            priority: 'normal',
            headers: {
                'X-Mailer': 'AFROZ Retreat Contact Form',
                'X-Priority': '3'
            }
        };

        console.log('📤 Sending email via Gmail...');
        console.log('📧 Recipient:', mailOptions.to);
        console.log('📝 Subject:', mailOptions.subject);
        console.log('👤 From name:', name);
        
        // שליחת המייל
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully via Gmail!');
        console.log('📨 Message ID:', info.messageId);
        console.log('🔄 Response:', info.response);
        console.log('📬 Accepted recipients:', info.accepted);
        
        // סגירת החיבור
        transporter.close();

        return res.status(200).json({ 
            success: true, 
            message: 'Email sent successfully via Gmail to jivany@nataraj.co.il',
            messageId: info.messageId,
            accepted: info.accepted,
            timestamp: new Date().toISOString(),
            from: name,
            email: email
        });

    } catch (error) {
        console.error('💥 Gmail SMTP sending error:', error);
        console.error('🔍 Error details:', {
            code: error.code,
            command: error.command,
            response: error.response,
            responseCode: error.responseCode,
            stack: error.stack
        });
        
        // זיהוי וטיפול בשגיאות נפוצות של Gmail
        let userFriendlyError = 'Failed to send email via Gmail';
        let solution = '';
        let helpLink = '';
        
        if (error.code === 'EAUTH' || error.responseCode === 535) {
            userFriendlyError = 'שגיאת אימות Gmail - App Password שגוי';
            solution = 'נדרש App Password תקין מ-Gmail (לא סיסמה רגילה). צריך ליצור App Password חדש';
            helpLink = 'https://support.google.com/accounts/answer/185833';
        } else if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
            userFriendlyError = 'בעיית חיבור לשרת Gmail';
            solution = 'בעיה זמנית בחיבור. נסה שוב בעוד כמה דקות';
        } else if (error.responseCode === 550) {
            userFriendlyError = 'Gmail דחה את המייל';
            solution = 'יתכן שהכתובת חסומה או שיש בעיה עם תוכן המייל';
        } else if (error.responseCode === 421) {
            userFriendlyError = 'שרת Gmail עמוס';
            solution = 'יותר מדי בקשות. נסה שוב בעוד כמה דקות';
        } else if (error.message && error.message.includes('rate limit')) {
            userFriendlyError = 'הגעת למגבלת השליחה היומית של Gmail';
            solution = 'Gmail מגביל לכ-500 מיילים ביום. נסה מחר';
        }
        
        return res.status(500).json({ 
            error: userFriendlyError,
            details: error.message,
            solution: solution,
            code: error.code,
            responseCode: error.responseCode,
            helpLink: helpLink,
            timestamp: new Date().toISOString(),
            service: 'Gmail SMTP'
        });
    }
}; 