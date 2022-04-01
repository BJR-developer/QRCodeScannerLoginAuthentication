import Users from '../../../lib/models/user'
import mongodb from '../../../lib/mongodb'
import jwt from 'jsonwebtoken'
import Cookies from 'universal-cookie';

export const config = {
    api: {
        externalResolver: true,
    },
}

const handler = async (req, res) => {
    await mongodb();
    const secret = process.env.NEXTAUTH_SECRET
    const cookies = new Cookies();

    if (req.method === 'POST') {
        const data = req.body
        const { email, pass } = data;
        const allData = {
            email,
            password: pass
        }
        try {
            const findData = await Users.findOne({ email });
            if (pass === findData.password) {
                console.log("Login Success");
                const token = jwt.sign({
                    allData
                }, secret, { expiresIn: '1h' });
                console.log(token);
                res.setHeader("Content-Type", "application/json")
                res.status(201).json(JSON.stringify({ token }))
            } else {
                console.log("Login Failed");
                res.status(401).json({ success: false })
                res.redirect('/Login')
            }
        } catch (error) {
            console.log(error);
            res.status(401).json({ success: false })
            res.redirect('/Login')
        }
    }
}
export default handler;