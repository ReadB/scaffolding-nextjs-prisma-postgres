import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session, SessionData } from "express-session";

export interface GetServerSidePropsContextWithSession extends
    GetServerSidePropsContext { req: GetServerSidePropsContext["req"] & { session: Session & Partial<SessionData> } }

export type GetServerSidePropsWithSession = GetServerSideProps extends
    (...a: infer U) => infer R ? (context: GetServerSidePropsContextWithSession) => R : never;

declare module 'express-session' {
    export interface SessionData {
        user_id: string;
    }
}
