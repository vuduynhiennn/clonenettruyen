const authMiddleware = (req, res, next) => {
    if (0) {
        next() // chung thuc thanh cong
    } else {
        return res.json("vui long dang nhap")
    }
}

module.exports = authMiddleware