import Link from "next/link";
import Image from 'next/image';
import { UserAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import UserDropdown from "./UserDropDown";
import { useRouter } from "next/router";

const Navbar = () => {
    const { user, googleSignIn, logOut } = UserAuth()
    const [loading, setLoading] = useState(true)

    const handleSignIn = async () => { 
        try {
            await googleSignIn();
            redirect('/profile')
        }catch(err) {
            console.log(err)
        }
    }

    const handleSignOut = async () => { 
        try {
            await logOut();
            router.push('/');
        }catch(err) {
            console.log(err)
        }
    }

    // console.log(user)
    useEffect(() => {
        const checkAuthentication = async () => {
            await new Promise((resolve) => setTimeout(resolve, 50));
            setLoading(false);
        };
        checkAuthentication();
        
    }, [user]);

    return (
        <div className="navbar">
            <div className="navbar-content">
                <div className="navbar-left">
                   <Link href="/">
                        <Image src="/assets/images/mrkim-logo.svg" width={160} height={50} alt="mr. kim logo" priority className="image"/>
                    </Link>
                   
                    
                   
                    <div className="plus">
                         {!user ? (
                            <Link href="/jobs"> Make Request 
                            <Image src="/assets/images/plus2.svg" width={10} height={10} alt="Plus" priority className="imageplus" /></Link>
                            ) : (
                                <Link href="/profile">Make Request <Image src="/assets/images/plus2.svg" width={10} height={10} alt="Plus" priority className="imageplus" /></Link>
                        )}
       
                    </div>
                    
                </div>
                <div className="navbar-right">
                   {loading ? null : !user ? (
                        <div>
                        <Link href="/">Home</Link>
                        <Link href="/about">Jobs</Link>
                        <Link href="/categories">Talent</Link>
                        <Link href="/premium">Premium</Link>
                        <a onClick={handleSignIn} className="login">Login</a> 
                        <a className="signup" onClick={handleSignIn}>Sign Up</a>
                        </div>
                    ) : (
                            <div className="onsign">
                                <Link href="/about">Jobs</Link>
                        <Link href="/categories">Talent</Link>
                            <Image src="/assets/images/SVG/notification.svg" width={25} height={25} alt="mobile menu" className="menusa"/>
                            <Image src="/assets/images/SVG/messages.svg" width={25} height={25} alt="mobile menu" className="menusa"/>
        
                                <a className="signup" onClick={handleSignOut}>Sign Out</a>
                                <Link href="/" passHref>
                                    <Image src={user.photoURL} alt="user" width={50} height={50} className="user"/>
                                </Link>
                                <UserDropdown/>
                            </div>
                            
                    ) }
                </div>
                <Image src="/assets/images/menu.svg" width={30} height={30} alt="mobile menu" className="menu"/>
            </div>
        </div>
    )
}

export default Navbar   