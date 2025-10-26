import Link from 'next/link'
import Image from 'next/image'
import { auth, signOut, signIn } from '@/auth'
import { redirect } from 'next/dist/server/api-utils';

const Navbar = async () => {
    const session = await auth();
    console.log(session)
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className='flex justify-between items-center'>
                <Link href="/">
                    <Image src="/logo.jpg" alt="Logo" width={60} height={30} ></Image>
                </Link>

                <div className='flex items-baseline gap-5 ml-auto'>
                    {session && session?.user ? (
                        <>
                            <Link href="/logo.png">
                                <span>Create</span>
                            </Link>

                            <form action={async () => { 'use server'; 
                                await signOut({redirectTo:"/"}); }}>
                                <button type="submit">
                                    <span>Logout</span>
                                </button>
                            </form>
                            <span>{session.user.name}</span>
                        </>
                    ) : (
                        <form action={async () => { 'use server'; await signIn('github'); }}>
                            <button type="submit"><span>Login</span></button>
                        </form>

                    )}

                </div>
                <div className=""></div>
            </nav>
        </header >
    )
}

export default Navbar