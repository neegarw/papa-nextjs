'use client';
import { useRouter } from 'next/navigation';
import DetailPage from '../../../components/Detail/DetailPage';
import { use } from 'react';

export default function ProductPage({ params }) {
    const { id, category } = use(params)
    const router = useRouter();


    return (
        <>
            <div
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => router.push('/menu')}
            />
            <div
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <DetailPage productId={id} category={category} />
            </div>
        </>
    );
}
