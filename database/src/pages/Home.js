import { signOut } from 'firebase/auth';
import { arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDatabase, ref, onValue } from "firebase/database";
import { NavLink } from 'react-router-dom';
import { auth, db } from '../firebase';
import { v4 as uuid } from 'uuid'
import { logout } from '../store/auth';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const handleLogout = async () => {
    await signOut(auth)
      .then(result => {
        dispatch(logout());
        console.log(result);
      })
      .catch(err => console.log(err));
  }
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      await updateDoc(doc(db, "posts", user.uid), {
        posts: arrayUnion({
          id: uuid(),
          title,
          content
        })
      })
      setContent('');
      setTitle('');
    }
  }
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "posts", user.uid), (data) => {
      if (data.exists()) {
        setPosts(data.data().posts)
      }
    })
    return () => {
      unSub();
    }
  });
  return (
    <>
      <div className='p-5'>
        {
          user ?
            <div className='flex flex-col gap-y-2'>
              <span>{user.displayName}</span>
              <span onClick={handleLogout} className="cursor-pointer text-xl font-semibold">Çıkış Yap</span>
            </div>
            :
            <>
              <NavLink to={"/login"}>Giriş</NavLink>
              <NavLink to={"/signup"} className="pl-3">Kayıt</NavLink>
            </>
        }
      </div>
      <div className='flex flex-col justify-center items-center'>
        <h2 className='font-semibold text-2xl'>Gönderi Paylaş</h2>
        <div className='add-post mt-5'>
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-2.5">
            <div>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="outline-none border-2 rounded-lg h-10 pl-2"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="outline-none border-2 rounded-lg h-10 pl-2"
              />
            </div>
            <button type='submit' className='bg-green-500 mt-3 rounded-md text-white px-5 py-2'>Paylaş</button>
          </form>
        </div>
        <div className='mt-10'>
          <h2 className='font-semibold text-2xl'>Gönderiler</h2>
          <div className='posts mt-5 grid grid-cols-4 w-full gap-10'>
            {posts?.map((post, index) => {
              return (
                <div key={index} className="flex flex-col gap-y-4 border-2 rounded-md">
                  <div className='border-b border-black border-opacity-30'>
                    <h2>{post.title}</h2>
                  </div>
                  <div>
                    <p>{post.content}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home