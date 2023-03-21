const authMiddleware = (req, res, next) => {
    if (0) { // kiem tra dieu kien chung thuc
        next() // chung thuc thanh cong
    } else {
        return res.json("vui long dang nhap")
    }
}

module.exports = authMiddleware