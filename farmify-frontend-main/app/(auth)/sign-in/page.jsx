"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getCookie, setCookie } from 'cookies-next'
import { LoaderIcon } from 'lucide-react'
// import { useCookies } from 'next-client-cookies'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

function SignIn() {
    const [password,setPassword]=useState();
    const [email,setEmail]=useState();
    const router=useRouter();
    const [loader,setLoader]=useState();
    // const cookies = useCookies();

    useEffect(()=>{
        const jwt=getCookie('jwt');
        if(jwt)
        {
            router.push('/')
        }
    },[])

    const onSignIn=()=>{
        setLoader(true)
        GlobalApi.SignIn(email,password).then(resp=>{
            setCookie('user',JSON.stringify(resp.data.user));
            setCookie('jwt',resp.data.jwt);
            toast("Login Successfully")
            router.push('/');
            setLoader(false)
        },(e)=>{
            console.log(e);
            toast(e?.response?.data?.error?.message)
            setLoader(false)
        })
    }

  return (
    <div className='flex items-baseline justify-center my-20'>
        <div className='flex flex-col items-center justify-center
        p-10 bg-slate-100 border border-gray-200'>
            <Image src='/logo.png' width={200} height={200} alt='logo'/>
            <h2 className='font-bold text-3xl'>Sign In to Account</h2>
            <h2 className='text-gray-500'>Enter your Email and Password to Sign In </h2>
            <div className='w-full flex flex-col gap-5 mt-7'>
                <Input placeholder='name@example.com' 
                onChange={(e)=>setEmail(e.target.value)}/>
                <Input type='password' 
                placeholder='Password' 
                onChange={(e)=>setPassword(e.target.value)}/>
                <Button onClick={()=>onSignIn()}
                    disabled={!(email||password)}
                >
                   {loader?<LoaderIcon className='animate-spin'/>:'Sign In'} </Button>
                <p>Don't have an account  ?
                    <Link href={'/create-account'} className='text-blue-500'>
                         Click here to create new account
                    </Link>
                </p>
            </div>
        </div>
    </div>
  )
}

export default SignIn