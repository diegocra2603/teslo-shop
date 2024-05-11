import prisma from '../lib/prisma';
import { initialData } from './seed';
import { countries } from './seed-countries';

async function main() {

    //1. Borrar registros previos
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    await prisma.user.createMany({
        data: initialData.users
    })

    // Categorias
    await prisma.category.createMany({
        data: initialData.categories.map((category) => ({
            name: category
        }))
    })

    const categoriesDB = await prisma.category.findMany();

    const categoriesMap = categoriesDB.reduce((map, category) => {
        map[category.name.toLocaleLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>)

    // Productos
    initialData.products.forEach(async (product) => {
        const { type, images, ...rest } = product;
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        //Images
        await prisma.productImage.createMany({
            data: imagesData
        })
    })

    //Countries
    await prisma.country.createMany({
        data: countries
    })

    console.log('Seed Ejecutado')
}

(() => {

    if (process.env.NODE_ENV === 'production') return;

    main();
})();