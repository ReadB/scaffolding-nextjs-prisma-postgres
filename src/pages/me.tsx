import { GetServerSidePropsWithSession } from '../common/types'
import { PrismaClient } from '@prisma/client';

const Index = ({ user_id, username}: any) => {
    return <div>{user_id}:{username}</div>
}

export default Index;

export const getServerSideProps: GetServerSidePropsWithSession = async (context) => {
    let props: any = {};
    let { user_id: id } = context.req.session;
    if (id) {
        const prisma = new PrismaClient();
        let user = await prisma.user.findUnique({where:{id}})
        if (user) props.username = user?.username;

        props.user_id = id
    } else {
        context.res.writeHead(302, { Location: '/login' })
        context.res.end()
    }
    return { props }
}
