import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { auth, db } from '../../firebase';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { user } = await createUserWithEmailAndPassword(auth, email, password).then(result => {
            try {
                const ref = doc(db, "users", result.user.uid);
                const docRef = setDoc(ref, {
                    displayName: name,
                    email: email,
                    password: password,
                    created: Timestamp.now()
                })
                setDoc(doc(db, "posts", result.user.uid), { posts: [] });
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(result => {
                    console.log(result)
                }).catch(err => console.log(err));
                console.log("Hoş geldin")
            } catch (err) {
                console.log(err);
            }
        })
    }
    return (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <h1 className='text-center mb-5 text-3xl font-semibold'>KAYIT OL</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 items-center justify-center">
                <div className='user-name'>
                    <input
                        type="text"
                        placeholder="Ad"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="outline-none h-10 px-5 rounded-md border border-gray-300 pl-2"
                    />
                </div>
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
                <button type='submit' className='font-medium bg-gray-100 rounded-md px-5 py-2'>Kayıt Ol</button>
            </form>
        </div>
    )
}

export default SignUp