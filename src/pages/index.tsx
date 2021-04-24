import { GetServerSidePropsWithSession } from '../common/types'

const Index = () => {
    return <div></div>
}

export default Index;

export const getServerSideProps: GetServerSidePropsWithSession = async (context) => {
    let { user_id } = context.req.session;
    if (user_id) {
        context.res.writeHead(302, { Location: '/me' })
        context.res.end()
    } else {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
    }
    return { props: {} }
}
