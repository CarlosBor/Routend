import { Member } from '../model/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const member = await Member.findOne({ where: { username } });
    if (!member) {
      return res.status(401).send('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const payload = { userId: member.idMember, isAdmin: member.isAdmin };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });


    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 }); 
    res.redirect('/trips');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

export const signup = async (req, res) => {
    const { name, username, password, confirmPassword, firstAid } = req.body;

    if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
    }

    try {
    const existingUser = await Member.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).send('Username already taken');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newMember = await Member.create({
        name,
        username,
        password:hashedPassword,
        isAdmin: 0,
        firstAid,
    });

    res.send(`
      <html>
        <body>
          <p>Account created for ${newMember.name}!</p>
          <p><a href="/login">Click here to log in</a></p>
        </body>
      </html>
    `);
    } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
    }
}

export const logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
};
