// app/page.jsx or app/user-home/page.jsx
import { PrismaClient } from '@/prisma'
import Link from 'next/link';

const UserHome = async () => {
    const prisma = new PrismaClient();
    const data = await prisma.foods.findMany();
    return (
        <div>
            {data.map((dt) => (
                <div key={dt.id}>
                    <ul>
                        <li>
                            <Link href={`/user/${dt.id}`}>{dt.Foodname}</Link>
                        </li>
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default UserHome;
