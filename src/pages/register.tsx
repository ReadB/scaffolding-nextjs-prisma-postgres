import axios from "axios";
import React, { FormEvent, useState } from 'react';
import { GetServerSidePropsWithSession } from '../common/types'

function Register() {
    const [response, setResponse] = useState<string | null>(null);
    const usernameRef = React.useRef<HTMLInputElement | null>(null);
    const passwordRef = React.useRef<HTMLInputElement | null>(null);

    const userRegister = (event: FormEvent) => {
        setResponse(null);
        event.preventDefault();
        let registerData = {
            username: usernameRef?.current?.value,
            password: passwordRef?.current?.value
        }
        axios.post('/api/auth/register', registerData)
            .then(() => setResponse('User created!'))
            .catch(() => setResponse('This username is already in use.'));
    }

    return <div className="register-wrapper">
        <form onSubmit={userRegister}>
            <input ref={usernameRef} placeholder="Username" required />
            <input ref={passwordRef} type="password" placeholder="Password" required />
            <button type="submit">Register</button>
        </form>

        {response && <div>{response}</div>}
    </div>
}

export default Register;

export const getServerSideProps: GetServerSidePropsWithSession = async (context) => {
    let { user_id } = context.req.session;
    if (user_id) {
        context.res.writeHead(302, { Location: '/protected' })
        context.res.end()
    }
    return { props: {} }
}
