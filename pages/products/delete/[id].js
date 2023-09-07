import Layout from '@/components/Layout'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const DeleteProduct = () => {
 const router = useRouter();
 const {id} =router.query;
 const [product,setProduct]=useState();

 useEffect(()=>{
    if(!id){
        return;
    }
    axios.get(`/api/products?id=${id}`).then((res)=>{
        setProduct(res.data);
    })
 },[id])

 const DeleteProduct = async(e)=>{
    e.preventDefault();
    await axios.delete(`/api/products?id=${id}`)
    router.push('/products');
 }

  return (
    <Layout>
        <div className='fixed inset-0 bg-[#5D5FEF]/[0.33] z-50 grid place-items-center px-3.5 py-1 border-none'>
            <div className='flex flex-col items-center justify-center gap-5 h-2/6 w-4/12  rounded-xl bg-[#6163de4c] shadow-2xl'>
                <div className='text-xl'>Do you want you to really delete {product?.title} ?</div>
                <div className='flex gap-5 items-center'>
                    <button className='p-2 bg-red-300 px-8 rounded-xl' onClick={DeleteProduct}>Yes</button>
                    <Link href={'/products'} className='p-2 bg-[#a8a4a4] px-8 rounded-xl'>No</Link>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default DeleteProduct
