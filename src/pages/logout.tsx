import { GetServerSidePropsWithSession } from '../common/types'

export default function Logout() { return null; }

export const getServerSideProps: GetServerSidePropsWithSession = async (context) => {
    context.req.session.destroy(()=>{});
    context.res.writeHead(302, { Location: '/login' })
    context.res.end()
    return { props: {} }
}
