"use client";

import Logo from './logo';
import Image from 'next/image';
import "@fontsource/poppins";
import { ClientNotification, TutorNotification } from '@prisma/client';
import { useEffect, useState } from 'react';
import { ClientDropdown } from './clientDropdown';
import { TutorDropdown } from './tutorDropdown';
import ClientProfile from './clientProfile';
import TutorProfile from './tutorProfile';
import LoginDropdown from './loginDropdown';
import RegisterDropdown from './registerDropdown';
import { useSession } from 'next-auth/react';

type NavBarProps = {
  userImage: string | null;
  userName: string | null;
  userId: number | null;
  userRole: 'client' | 'tutor' | null;
  userNotifications: ClientNotification[] | TutorNotification[];
};

const NavBar = ({ userImage, userName, userRole, userId, userNotifications }: NavBarProps) => {
  const [clientsDropdown, setClientsDropdown] = useState(false);
  const [tutorsDropdown, setTutorsDropdown] = useState(false);
  const [registerDropdown, setRegisterDropdown] = useState(false);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [clientProfile, setClientProfile] = useState(false);
  const [tutorProfile, setTutorProfile] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const hoverText = (index: number) => ({
    color: hoverIndex === index ? "#5790AB" : "#000000",
    fontFamily: "Poppins",
    fontSize: 16,
    textDecoration: hoverIndex === index ? "underline" : "none",
  });

  const logoText = {
    color: "#5790AB",
    fontFamily: "Poppins",
    fontSize: 28,
    fontWeight: "bold",
  };
  const navBar = {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    padding: "16px 48px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    top: 0,
  };

  const registerButton = {
    backgroundColor: "#5790AB",
    color: "#FFFFFF",
    fontSize: 16,
  };

  const profile = {
    name: {
      color: "#000000",
      fontFamily: "Poppins",
      fontSize: 14,
      fontWeight: "bold",
    },
    role: {
      color: "#909090",
      fontFamily: "Poppins",
      fontSize: 14,
    },
    container: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      flexDirection: "column" as "column",
      padding: 2,
    },
    notificationCircle: {
      width: "24px",
      height: "24px",
      backgroundColor: "#5790AB",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "bold",
      marginLeft: "8px",
    },
  };

  return (
    <nav style={navBar}>
      <div className="flex items-center">
        <Logo />
        <div style={logoText} className="ml-2">
          TutorConnect
        </div>
      </div>
      <div className="flex-1 flex justify-center space-x-8">
        <div>
          <a href="/" style={hoverText(6)} onMouseEnter={() => setHoverIndex(6)} onMouseLeave={() => setHoverIndex(null)}>
            Home
          </a>
        </div>
        {(userRole === 'client' || !userRole) && (
          <div className="relative">
            <button
              style={hoverText(0)}
              onMouseEnter={() => setHoverIndex(0)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setClientsDropdown(!clientsDropdown)}
              className="flex items-center"
            >
              For Clients
              <Image src="/images/arrowdown.png" alt="Arrow down" width={20} height={20} />
            </button>
            {clientsDropdown && userId&& <ClientDropdown id={userId || -1} />}
          </div>
        )}
        {(userRole === 'tutor' || !userRole) && (
          <div className="relative">
            <button
              style={hoverText(1)}
              onMouseEnter={() => setHoverIndex(1)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setTutorsDropdown(!tutorsDropdown)}
              className="flex items-center"
            >
              For Tutors
              <Image src="/images/arrowdown.png" alt="Arrow down" width={20} height={20} />
            </button>
            {tutorsDropdown && <TutorDropdown id={userId || -1} />}
          </div>
        )}
        <div>
          <a
            href="/rates"
            style={hoverText(2)}
            onMouseEnter={() => setHoverIndex(2)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            Tuition Rates
          </a>
        </div>
        <div>
          <a
            href="/faq"
            style={hoverText(3)}
            onMouseEnter={() => setHoverIndex(3)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            FAQ
          </a>
        </div>
        <div>
          <a
            href="/contact_us"
            style={hoverText(4)}
            onMouseEnter={() => setHoverIndex(4)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            Contact Us
          </a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {userRole ? (
          userRole === 'client' ? (
            <div className="flex items-center space-x-2">
              <button
                style={hoverText(6)}
                onMouseEnter={() => setHoverIndex(6)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setClientProfile(!clientProfile)}
                className="flex items-center"
              >
                <Image
                  src={userImage || "/images/Blank Profile Photo.jpg"}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <div style={profile.container}>
                  <span style={profile.name}>{userName}</span>
                  <h3 style={profile.role}>Client</h3>
                </div>
                {userNotifications.filter((notif) => !notif.read).length > 0 && (
                  <div style={profile.notificationCircle}>
                    {userNotifications.filter((notif) => !notif.read).length}
                  </div>
                )}
              </button>
              {clientProfile && <ClientProfile notificationCount={userNotifications.filter((notif) => !notif.read).length} />}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                style={hoverText(7)}
                onMouseEnter={() => setHoverIndex(7)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setTutorProfile(!tutorProfile)}
                className="flex items-center"
              >
                <Image
                  src={userImage || "/images/Blank Profile Photo.jpg"}
                  alt="Profile Picture"
                  width={40}
                  height={40}
                  className="rounded-full mr-2"
                  style={{ width: "40px", height: "40px" }}
                />
                <div style={profile.container}>
                  <span style={profile.name}>{userName}</span>
                  <h3 style={profile.role}>Tutor</h3>
                </div>
                {userNotifications.filter((notif) => !notif.read).length > 0 && (
                  <div style={profile.notificationCircle}>
                    {userNotifications.filter((notif) => !notif.read).length}
                  </div>
                )}
              </button>
              {tutorProfile && <TutorProfile notificationCount={userNotifications.filter((notif) => !notif.read).length} />}
            </div>
          )
        ) : (
          <>
            <div className="relative">
              <button
                className="px-4 py-2 rounded"
                style={{ ...hoverText(5) }}
                onMouseEnter={() => setHoverIndex(5)}
                onMouseLeave={() => setHoverIndex(null)}
                onClick={() => setLoginDropdown(!loginDropdown)}
              >
                Log In
              </button>
              {loginDropdown && <LoginDropdown />}
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 rounded"
                style={{ ...registerButton }}
                onClick={() => setRegisterDropdown(!registerDropdown)}
              >
                Register
              </button>
              {registerDropdown && <RegisterDropdown />}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
