import bcrypt from 'bcryptjs';

const data = {
    products: [
        {
            //_id: '1',
            name: 'Smiley T-Shirt',
            slug: 'smiley-t-shirt',
            category: 'T-shirts',
            image: '/images/smileyshirt.jpg',
            price: 10,
            inStock: 59,
            brand: 'Test Brand',
            rating: 4.5,
            numReviews: 3,
            description: 'Really funk t-shirt with a cool smiley graphic!'
        },
        {
            //_id: '2',
            name: 'Frowney T-Shirt',
            slug: 'frowney-t-shirt',
            category: 'T-shirts',
            image: '/images/frowneyshirt.jpg',
            price: 70,
            inStock: 0,
            brand: 'Test Brand',
            rating: 5,
            numReviews: 78,
            description: 'Turn it upside down!'
        },
        {
            //_id: '3',
            name: 'Red Sox Hat',
            slug: 'red-sox-hat',
            category: 'Hats',
            image: '/images/redsoxhat.jpg',
            price: 88,
            inStock: 2,
            brand: 'Test Brand',
            rating: 4,
            numReviews: 99,
            description: 'Go sox!'
        }
    ],
    users: [
        {
            name: 'cade',
            email: 'cade@test.com',
            hash: bcrypt.hashSync('password' + 'salt'),
            salt: 'salt',
            roles: ['Admin']
        },
        {
            name: 'cade2',
            email: 'cade2@test.com',
            hash: bcrypt.hashSync('hello' + 'world'),
            salt: 'world'
        }
    ]
}

export default data;