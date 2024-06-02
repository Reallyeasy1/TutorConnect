"use client"
import NavBar from '@/components/nav-bar/navBar';
import React from 'react';
import Image from "next/image";
import Footer from '@/components/footer/footer';

export default function AllAssignments() {
    const styles = {
        body: {
            fontFamily: 'Poppins, sans-serif',
            margin: 0,
            padding: 0,
            boxSizing: 'border-box' as 'border-box',
        },
        hero: {
            textAlign: 'center' as 'center',
            padding: '4em 1em',
            backgroundColor: '#00000',
        },
        heroText: {
            maxWidth: '600px',
            margin: 'auto',
        },
        heroTitle: {
            fontSize: '2.5em',
            marginBottom: '0.5em',
        },
        heroDescription: {
            fontSize: '1.2em',
            marginBottom: '1em',
        },
        heroButton: {
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '0.75em 1.5em',
            textDecoration: 'none',
            borderRadius: '5px',
            display: 'inline-block',
        },
        features: {
            display: 'flex',
            justifyContent: 'space-around',
            padding: '2em 8em',
            backgroundColor: '#EFF8FA',
        },
        featuresContainer: {
          padding: '8px',
          backgroundColor: '#EFF8FA',
          textAlign: 'center' as 'center',
        },
        feature: {
            textAlign: 'center' as 'center',
            width: '220px',
        },
        featureTitle: {
          backgroundColor: '#EFF8FA',
          marginTop: "20px",
          color:"#313131",
          fontFamily: "Playfair Display",
          fontWeight: "bold",
          fontSize: 44
        },
        featureHeading: {
            fontFamily: "Poppins",
            fontSize: 16,
            color: "#313131",
            textAlign: "left" as "left",
            fontWeight: "bold"
        },
        featureBody: {
          fontFamily: "Poppins",
          fontSize: 12,
          color: "#909090",
          textAlign: "left" as "left",
        },
        ctaSection: {
            textAlign: 'center' as 'center',
            padding: '4em 1em',
        },
    };

    return (
        <div style={styles.body}>
            <NavBar />
            <div style={styles.hero}>
                <div style={styles.heroText}>
                    <h1 style={styles.heroTitle}>Find the right tutor<br />with TutorConnect</h1>
                    <p style={styles.heroDescription}>Find the perfect tutor for your needs instantly with TutorConnect's personalized matchmaking algorithm</p>
                    <a href="/client/register" style={styles.heroButton}>Register & Request Now</a>
                </div>
            </div>
            <div style={styles.features}>
                <div style={styles.feature}>
                    <Image src="/images/Hourglass.png" alt="Find Tutors Instantly" width={50} height={50} />
                    <h3 style = {styles.featureHeading}>Find Tutors Instantly</h3>
                    <p style = {styles.featureBody}>Our personalised algorithm gives you a list of tutors to choose from.</p>
                </div>
                <div style={styles.feature}>
                    <Image src="/images/moneybag.png" alt="Find Tutors Instantly" width={50} height={50} />
                    <h3 style = {styles.featureHeading}>No Agency Fees</h3>
                    <p style = {styles.featureBody}>Only pay a one-time matchmaking fee.</p>
                </div>
                <div style={styles.feature}>
                    <Image src="/images/tutor.png" alt="Find Tutors Instantly" width={50} height={50} />
                    <h3 style = {styles.featureHeading}>Verified Tutors</h3>
                    <p style = {styles.featureBody}>All tutors' credentials are verified.</p>
                </div>
            </div>
            <div style={styles.ctaSection}>
                <h2>Looking for clients? Join TutorConnect today!</h2>
                <p>Are you a passionate tutor looking for more students? Sign up now to find clients who need your expertise today!</p>
                <a href="/tutor/register" style={styles.heroButton}>Register as a Tutor</a>
            </div>
            <div style = {styles.featuresContainer}>
                <h2 style = {styles.featureTitle}>Matchmaking Made Easy!</h2>
                <div style={styles.features}>
                    <div style={styles.feature}>
                        <Image src="/images/exam.png" alt="Register and Request" width={50} height={50} />
                        <h3 style = {styles.featureHeading}>Register and Request</h3>
                        <p style = {styles.featureBody}>Create an account with us and start requesting for tutors.</p>
                    </div>
                    <div style={styles.feature}>
                        <Image src="/images/recruitment.png" alt="Select a Tutor" width={50} height={50} />
                        <h3 style = {styles.featureHeading}>Select a Tutor</h3>
                        <p style = {styles.featureBody}>Choose from a list of tutors and start negotiating with them.</p>
                    </div>
                    <div style={styles.feature}>
                        <Image src="/images/hand-shake.png" alt="Confirmation" width={50} height={50} />
                        <h3 style = {styles.featureHeading}>Confirmation</h3>
                        <p style = {styles.featureBody}>Matchmaking is confirmed once both parties agree.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

