import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'SECRET_KEY', { expiresIn: '1d' });
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.json({ success: true, message: 'Profile updated' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
