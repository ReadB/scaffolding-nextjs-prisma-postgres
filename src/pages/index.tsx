import { GetServerSideProps } from 'next';

type Props = {
    index_variable: string | null
}
const Index = ({ index_variable }: Props) => {
    return <div>{index_variable}</div>
}

export default Index;

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {
            index_variable: process.env.INDEX_VARIABLE || null
        }
    }
}
