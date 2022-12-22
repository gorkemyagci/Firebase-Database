import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase';
import { login } from '../../store/auth';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);
            console.log("Giriş Yapıldı");
            dispatch(login(user));
            return user;
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-center mb-5 text-3xl font-semibold'>Giriş Yap</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 items-center justify-center">
                <div className='user-email'>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="outline-none h-10 px-5 rounded-md border border-gray-300 pl-2"
                    />
                </div>
                <div className='user-password'>
                    <input
                        type="text"
                        placeholder="Parola"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="outline-none h-10 px-5 rounded-md border border-gray-300 pl-2"
                    />
                </div>
                <button type='submit' className='font-medium bg-gray-100 rounded-md px-5 py-2'>Giriş Yap</button>
            </form>
        </div>
    )
}

export default Login