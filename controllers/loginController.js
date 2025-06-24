const Modal = require('../Modal/modal');

exports.logincontroller = async(req, res) => {
    try {
            const { email, password } = req.body;
    
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
    
            const user = await Modal.findOne({ email });
    
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            if (user.password !== password) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
    
            res.status(200).json({ 
                message: 'Login successful',
            });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }

};



