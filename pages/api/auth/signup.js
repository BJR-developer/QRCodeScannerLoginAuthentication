import Login from '../../../lib/models/user'
import mongodb from '../../../lib/mongodb'


const handler = async (req, res) => {
    await mongodb();
    if (req.method === 'POST') {
        const data = req.body
        const { email, pass } = data;
        const allData = {
            email,
            password: pass
        }
        try {
            const storeData = await Login.insertMany(allData);
            console.log(storeData);
            res.status(201).json({success:true})
        } catch (error) {
            console.log(error);
            res.status(401).json({success:false})
        }
    }
}
export default handler;