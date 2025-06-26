const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, phone, email, message, source } = req.body;

    // Validate required fields
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Create nodemailer transporter
        const transporter = nodemailer.createTransporter({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'jivany@nataraj.co.il', // כתובת היעד הקבועה
            subject: `🌟 פנייה חדשה מאתר AFROZ - ${name}`,
            html: `
                <!DOCTYPE html>
                <html dir="rtl" lang="he">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>פנייה חדשה מאתר AFROZ</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; min-height: 100vh;">
                        <tr>
                            <td align="center" style="padding: 40px 20px;">
                                <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 16px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); overflow: hidden; max-width: 100%;">
                                    
                                    <!-- Header -->
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #3CAEA3 0%, #2C8C83 100%); padding: 30px 40px; text-align: center;">
                                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                                                🏝️ AFROZ - ריטריט מדיטציה
                                            </h1>
                                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">
                                                פנייה חדשה מאתר הנחיתה
                                            </p>
                                        </td>
                                    </tr>

                                    <!-- Main Content -->
                                    <tr>
                                        <td style="padding: 40px;">
                                            
                                            <!-- Alert Box -->
                                            <div style="background: linear-gradient(135deg, #FFB74D 0%, #FF9800 100%); padding: 20px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
                                                <h2 style="color: white; margin: 0 0 8px 0; font-size: 22px; text-shadow: 0 1px 2px rgba(0,0,0,0.2);">
                                                    🔔 לקוח חדש מעוניין!
                                                </h2>
                                                <p style="color: rgba(255,255,255,0.95); margin: 0; font-size: 16px; font-weight: 500;">
                                                    מומלץ ליצור קשר בהקדם האפשרי
                                                </p>
                                            </div>

                                            <!-- Customer Details -->
                                            <div style="background: #f8fcff; border: 2px solid #e3f2fd; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                                                <h3 style="color: #2C3E50; margin: 0 0 20px 0; font-size: 20px; font-weight: 600; border-bottom: 2px solid #3CAEA3; padding-bottom: 10px;">
                                                    👤 פרטי הלקוח
                                                </h3>
                                                
                                                <table width="100%" cellpadding="8" cellspacing="0">
                                                    <tr>
                                                        <td style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-right: 4px solid #3CAEA3; box-shadow: 0 2px 8px rgba(0,0,0,0.05);" colspan="2">
                                                            <strong style="color: #2C3E50; font-size: 16px;">📝 שם:</strong>
                                                            <span style="color: #444; font-size: 18px; font-weight: 600; margin-right: 10px;">${name}</span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-right: 4px solid #4CAF50; box-shadow: 0 2px 8px rgba(0,0,0,0.05); width: 50%;">
                                                            <strong style="color: #2C3E50; font-size: 16px;">📱 טלפון:</strong><br>
                                                            <a href="tel:${phone}" style="color: #4CAF50; font-size: 18px; font-weight: 600; text-decoration: none;">${phone}</a>
                                                        </td>
                                                        <td style="background: white; border-radius: 8px; padding: 15px; margin-bottom: 10px; border-right: 4px solid #2196F3; box-shadow: 0 2px 8px rgba(0,0,0,0.05); width: 50%;">
                                                            <strong style="color: #2C3E50; font-size: 16px;">✉️ אימייל:</strong><br>
                                                            <a href="mailto:${email}" style="color: #2196F3; font-size: 16px; font-weight: 600; text-decoration: none;">${email}</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="background: white; border-radius: 8px; padding: 15px; border-right: 4px solid #FF9800; box-shadow: 0 2px 8px rgba(0,0,0,0.05);" colspan="2">
                                                            <strong style="color: #2C3E50; font-size: 16px;">📊 מקור הפנייה:</strong>
                                                            <span style="color: #FF9800; font-size: 16px; font-weight: 600; margin-right: 10px;">${source === 'footer' ? 'טופס בפוטר האתר' : 'טופס פופאפ'}</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>

                                            ${message ? `
                                                <!-- Message Section -->
                                                <div style="background: linear-gradient(135deg, #E8F5E8 0%, #F1F8E9 100%); border: 2px solid #4CAF50; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                                                    <h3 style="color: #2E7D32; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                                                        💬 הודעה מהלקוח:
                                                    </h3>
                                                    <div style="background: white; border-radius: 8px; padding: 20px; border-right: 4px solid #4CAF50; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                                                        <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0; font-style: italic;">
                                                            "${message}"
                                                        </p>
                                                    </div>
                                                </div>
                                            ` : ''}

                                            <!-- Action Items -->
                                            <div style="background: linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%); border: 2px solid #FF9800; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                                                <h3 style="color: #E65100; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">
                                                    🎯 מה לעשות עכשיו:
                                                </h3>
                                                <ul style="color: #D84315; font-size: 16px; line-height: 1.8; margin: 0; padding-right: 20px;">
                                                    <li style="margin-bottom: 8px;"><strong>צרו קשר תוך 24 שעות</strong> - ככל שתגיבו מהר יותר, יותר סיכוי לסגירה</li>
                                                    <li style="margin-bottom: 8px;"><strong>התחילו בוואטסאפ</strong> - הכי נוח ללקוחות</li>
                                                    <li style="margin-bottom: 8px;"><strong>שלחו מידע על המחירים</strong> והזמנים הפנויים</li>
                                                    <li><strong>הזכירו שהמקומות מוגבלים</strong> - ליצור דחיפות</li>
                                                </ul>
                                            </div>

                                            <!-- Contact Buttons -->
                                            <div style="text-align: center; margin: 30px 0;">
                                                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background: linear-gradient(135deg, #25D366 0%, #20BA5A 100%); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3); transition: all 0.3s ease;">
                                                    📱 שלח וואטסאפ
                                                </a>
                                                <a href="tel:${phone}" style="display: inline-block; background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); color: white; padding: 15px 30px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 0 10px 10px 0; box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3); transition: all 0.3s ease;">
                                                    📞 התקשר עכשיו
                                                </a>
                                            </div>

                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="background: #f8f9fa; padding: 25px 40px; text-align: center; border-top: 1px solid #e9ecef;">
                                            <p style="color: #6c757d; margin: 0 0 10px 0; font-size: 14px;">
                                                ⏰ זמן קבלת הפנייה: <strong>${new Date().toLocaleString('he-IL', { 
                                                    timeZone: 'Asia/Jerusalem',
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</strong>
                                            </p>
                                            <p style="color: #adb5bd; margin: 0; font-size: 12px;">
                                                📧 מייל אוטומטי מאתר AFROZ | 🏝️ ריטריט מדיטציה לסבוס
                                            </p>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        console.log('Email sent successfully to: jivany@nataraj.co.il');
        res.status(200).json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
}; 