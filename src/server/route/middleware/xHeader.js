export default function (req, res, next) {
    res.setHeader('x-hello-human', 'You should work for us (y) Email: vxthu.hanu@gmail.com');
    next();
}