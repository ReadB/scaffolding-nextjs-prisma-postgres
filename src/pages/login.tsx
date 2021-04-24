import axios from "axios";
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router'
import { GetServerSidePropsWithSession } from '../common/types'

function Login() {
    const [error, setError] = useState(false);
    const usernameRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);
    const router = useRouter()

    const userLogin = (event: FormEvent) => {
        setError(false);
        event.preventDefault();
        let loginData = {
            username: usernameRef?.current?.value,
            password: passwordRef?.current?.value
        }
        axios.post('/api/auth/login', loginData)
            .then(() => router.replace('/me'))
            .catch(() => setError(true));
    }

    return <div className="login-wrapper">
        <form onSubmit={userLogin}>
            <input ref={usernameRef} type="text" placeholder="Username" required />
            <input ref={passwordRef} type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
        {error && <div> Username or Password incorrect!</div>}
    </div>
}

export default Login

export const getServerSideProps: GetServerSidePropsWithSession = async (context) => {
    let { user_id } = context.req.session;
    if (user_id) {
        context.res.writeHead(302, { Location: '/me' })
        context.res.end()
    }
    return { props: {} }
}
