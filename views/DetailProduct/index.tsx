import React from 'react'
import styles from './DetailProduct.module.scss'
import { productType } from '@/types/product.type'

export default function DetailProduct({ product } : { product: productType }) {
  return (
    <>
    <h1 className={styles.productDetail__title}>Detail Product</h1>

    <div className={styles.productDetail} key={product.id}>
        <div className={styles.productDetail__image}>
            <img src={product.image && product.image} alt={product.name} />
        </div>
        <h4 className={styles.productDetail__name}>{product.name}</h4>
        <p className={styles.productDetail__category}>{product.category}</p>
        <p className={styles.productDetail__price}>{product.price && product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
    </div>
    </>
  )
}
