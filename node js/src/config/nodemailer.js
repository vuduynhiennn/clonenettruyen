require('dotenv').config()
const nodemailer = require('nodemailer')
const { OAuth2Client } = require('google-auth-library')

const GOOGLE_MAILER_CLIENT_ID = process.env.CUSTOMER_ID
const GOOGLE_MAILER_CLIENT_SECRET = process.env.CUSTOMER_SECRET
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.REFRESH_TOKEN
const ADMIN_EMAIL_ADDRESS = process.env.ACC_EMAIL

const myOAuth2Client = new OAuth2Client(
  GOOGLE_MAILER_CLIENT_ID,
  GOOGLE_MAILER_CLIENT_SECRET
)

myOAuth2Client.setCredentials({
  refresh_token: GOOGLE_MAILER_REFRESH_TOKEN
})

const emailServices = async (email, random_code) => {
    try {
        const myAccessTokenObject = await myOAuth2Client.getAccessToken()
        const myAccessToken = myAccessTokenObject?.token
        const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: ADMIN_EMAIL_ADDRESS,
            clientId: GOOGLE_MAILER_CLIENT_ID,
            clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
            refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
            accessToken: myAccessToken
        }
        })

        const mailOptions = {
        to: email, // Gửi đến ai?
        subject: "Vui lòng nhập mã code sau đây để khôi phục lại mật khẩu", // Tiêu đề email
        html: `<h3>mã code là : ${random_code}</h3>` // Nội dung email
        }
        // Gọi hành động gửi email
        await transport.sendMail(mailOptions)
        // Không có lỗi gì thì trả về success
        console.log("message", 'Email sent successfully.')
    } catch (error) {
        // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client-        console.log(error)
        res.status(500).json({ errors: error.message })
    }
}

module.exports = emailServices