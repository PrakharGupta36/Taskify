import { auth } from "../Firebase";
import "../css/style.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";

import { ToggleButtonGroup, ToggleButton } from "@mui/material";

import { ReactComponent as GoogleLogo } from "../assets/google.svg";
import { ReactComponent as HeroLogo } from "../assets/hero.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggled, setIsToggled] = useState(true);

  const provider = new GoogleAuthProvider();

  function googleSignIn() {
    signInWithPopup(auth, provider);
  }

  function signIn(e) {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password);
  }
  function logIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password);
  }

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className='form-container'>
        <div style={{ display: "grid", padding: "3rem" }}>
          <h2 style={{ color: `white`, textAlign: "left" }}>
            {" "}
            Manage your daily task with{" "}
            <span style={{ color: `#7cfed1`, textDecoration: `underline` }}>
              {" "}
              Taskify{" "}
            </span>
          </h2>
          <HeroLogo width={`65%`} style={{ margin: `0 auto` }} />
          <p style={{ color: `white`, lineHeight: `2rem` }}>
            {" "}
            When you're overwhelmed by the amount of work you have on your
            plate, stop and rethink{" "}
          </p>
        </div>
        {isToggled ? (
          <form onSubmit={logIn}>
            <h2> Log in </h2>
            <div className='form-form'>
              <label htmlFor='email'> Email </label>
              <input
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                id='email'
                required
              />
            </div>
            <div className='form-form'>
              <label htmlFor='password'> Password </label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                required
              />
            </div>

            <button type='submit'> Submit </button>
          </form>
        ) : (
          <form onSubmit={signIn}>
            <h2> Sign In </h2>
            <div className='form-form'>
              <label htmlFor='email'> Email </label>
              <input
                type='email'
                id='email'
                onChange={(e) => setEmail(e.target.value)}
                placeholder='email'
                required
              />
            </div>
            <div className='form-form'>
              <label htmlFor='password'> Password </label>
              <input
                type='password'
                id='password'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                required
              />
            </div>
            <button type='submit'> Submit </button>
          </form>
        )}
        <div className='toggle'>
          <ToggleButtonGroup>
            <ToggleButton
              className={isToggled ? "active" : "not-active"}
              value='true'
              onClick={() => setIsToggled(true)}>
              Login
            </ToggleButton>
            <ToggleButton
              className={isToggled ? "not-active" : "active"}
              value='false'
              onClick={() => setIsToggled(false)}>
              Sign In
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <section className='divide'>
          <hr />
          Or sign with
          <hr />
        </section>
        <button
          onClick={googleSignIn}
          className='google-signIn'
          style={{ marginBottom: `2rem` }}>
          Sign in with <GoogleLogo width={`20px`} />
        </button>
      </motion.section>
    </AnimatePresence>
  );
}
